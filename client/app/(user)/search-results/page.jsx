"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/app/(user)/Breadcrumbs";
import LogoDark from "@/app/assets/images/logo-dark.png";
import { normalizeSearchResultUrl, searchSiteResults } from "@/app/utils/algoliaSearch";

const MIN_QUERY_LENGTH = 2;
const PAGE_RESULTS_LIMIT = 20;

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = useMemo(() => (searchParams?.get("q") || "").trim(), [searchParams]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const items = await searchSiteResults(query, {
          limit: PAGE_RESULTS_LIMIT,
          signal: controller.signal,
        });

        if (!isMounted) return;
        setResults(items);
      } catch (error) {
        if (!isMounted || error?.name === "AbortError") return;
        setResults([]);
        setIsError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [query]);

  return (
    <section className="pt-10 pb-16 font-inter">
      <div className="container">
        <div className="mb-5">
          <Link href="/" aria-label="Go to home page">
            <Image src={LogoDark.src} width={220} height={47} alt="Mindteck" />
          </Link>
        </div>
        <Breadcrumbs paths={["Search Results"]} />
        <h1 className="text-3xl font-semibold mt-2">Search Results</h1>
        {query ? (
          <p className="mt-2 text-gray-700">
            Showing results for: <span className="font-semibold">{query}</span>
          </p>
        ) : (
          <p className="mt-2 text-gray-700">Type at least 2 characters in search.</p>
        )}

        <div className="mt-6 space-y-3">
          {isLoading && <p className="text-sm text-gray-600">Loading search results...</p>}
          {!isLoading && isError && (
            <p className="text-sm text-red-600">Unable to load search results right now.</p>
          )}
          {!isLoading && !isError && query.length >= MIN_QUERY_LENGTH && results.length === 0 && (
            <p className="text-sm text-gray-600">No results found.</p>
          )}
          {!isLoading &&
            !isError &&
            results.map((item) => (
              <div key={`${item.url}-${item.title}`} className="border rounded-md p-4 hover:bg-gray-50 transition">
                <Link
                  href={normalizeSearchResultUrl(item.url)}
                  className="text-lg font-medium text-black hover:text-secondary"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{normalizeSearchResultUrl(item.url)}</p>
                {item.description ? (
                  <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
