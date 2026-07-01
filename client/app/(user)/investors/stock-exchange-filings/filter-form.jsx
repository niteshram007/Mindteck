"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterForm({ defaultSession = "", availableYears = [] }) {
  const query = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = new URLSearchParams();

  return (
    <div className="max-w-[200px]">
      <Select
        onValueChange={(value) => {
          searchParams.append("session", value);
          router.push(`${pathName}?${searchParams.toString()}`, {
            scroll: false,
          });
        }}
        defaultValue={query.get("session") || defaultSession || undefined}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Financial Year" />
        </SelectTrigger>

        <SelectContent className="max-h-[300px]">
          {availableYears.length ? (
            availableYears.map((el) => (
              <SelectItem value={el} key={el}>
                {el}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="__no_years" disabled>
              No Financial Years Available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
