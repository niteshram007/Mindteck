"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { normalizeSearchResultUrl, searchSiteResults } from "@/app/utils/algoliaSearch";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;
const DROPDOWN_LIMIT = 5;

const buildSearchResultsPageUrl = (query) =>
  `/search-results?q=${encodeURIComponent(query.trim())}`;

export default function SearchBar({ isHome }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const abortRef = useRef(null);
  const suggestionsListId = "site-search-suggestions";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const value = query.trim();
    if (value.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      setError(false);
      setActiveIndex(-1);
      if (abortRef.current) {
        abortRef.current.abort();
      }
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(false);
      try {
        const items = await searchSiteResults(value, {
          limit: DROPDOWN_LIMIT,
          signal: controller.signal,
        });
        setResults(items.slice(0, DROPDOWN_LIMIT));
        setActiveIndex(-1);
        setOpen(true);
      } catch (err) {
        if (err.name !== "AbortError") {
          setResults([]);
          setOpen(true);
          setError(true);
          setActiveIndex(-1);
        }
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = query.trim();
    if (value.length < MIN_QUERY_LENGTH) return;
    setOpen(false);
    setActiveIndex(-1);
    router.push(buildSearchResultsPageUrl(value));
  };

  const navigateToResult = (url) => {
    if (!url) return;
    const resolved = normalizeSearchResultUrl(url);
    setOpen(false);
    setActiveIndex(-1);

    if (/^https?:\/\//i.test(resolved) || resolved.startsWith("//")) {
      window.location.href = resolved;
      return;
    }

    router.push(resolved);
  };

  const handleInputKeyDown = (event) => {
    if (!open || results.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => {
        if (prev <= 0) return results.length - 1;
        return prev - 1;
      });
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0 && activeIndex < results.length) {
      event.preventDefault();
      navigateToResult(results[activeIndex]?.url);
    }
  };

  const borderClass = isHome ? "border-white" : "border-[#84754E]";

  return (
    <div ref={containerRef} className="relative w-[190px] max-w-[190px] shrink-0">
      <form
        onSubmit={handleSubmit}
        className={`search-container relative w-full ${borderClass} border rounded-md flex items-center bg-white/0`}
      >
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            if (results.length > 0) setOpen(true);
          }}
          onKeyDown={handleInputKeyDown}
          placeholder="Search"
          className="w-full h-8 border-transparent focus-visible:ring-0"
          aria-label="Search"
          aria-expanded={open}
          aria-controls={suggestionsListId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${suggestionsListId}-${activeIndex}` : undefined
          }
        />
        <button type="submit" className="flex items-center justify-center" aria-label="Search">
          <Icons.search className="w-5 h-5 mr-2" />
        </button>
      </form>

      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-md border border-[#e5e5e5] bg-white shadow-lg z-50">
          <ul className="max-h-64 overflow-auto" role="listbox" id={suggestionsListId}>
            {loading && (
              <li className="px-3 py-2 text-sm text-gray-500">Searching...</li>
            )}
            {!loading && error && (
              <li className="px-3 py-2 text-sm text-red-600">
                Search unavailable. Please try again.
              </li>
            )}
            {!loading && !error && results.length === 0 && query.trim().length >= MIN_QUERY_LENGTH && (
              <li className="px-3 py-2 text-sm text-gray-500">No results found.</li>
            )}
            {!loading &&
              !error &&
              results.map((item, index) => (
                <li
                  key={`${item.url}-${index}`}
                  className="border-b last:border-b-0"
                  role="option"
                  aria-selected={index === activeIndex}
                  id={`${suggestionsListId}-${index}`}
                >
                  <button
                    type="button"
                    className={`block text-left w-full px-3 py-2 hover:bg-gray-100 ${
                      index === activeIndex ? "bg-gray-100" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => navigateToResult(item.url)}
                  >
                    <p className="text-sm text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {normalizeSearchResultUrl(item.url)}
                    </p>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
