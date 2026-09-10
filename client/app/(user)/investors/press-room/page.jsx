export const revalidate = 300;

import { axiosInstance } from "@/app/utils/axiosInstance";
import { makePressReleaseSlug } from "@/app/utils/slug";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

import * as motion from "motion/react-client";
import "../../../style.css";
import { varFade } from "@/lib/animate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

export const metadata = getStaticPageMetadata("/investors/press-room");

export default async function page() {
  let data = {};
  try {
    const response = await axiosInstance("public/press-release/getallPublished");
    data = response?.data || {};
  } catch (_error) {
    data = {};
  }
  const years = Object.keys(data || {}).sort((a, b) => Number(b) - Number(a));
  const defaultYear = years[0] || new Date().getFullYear().toString();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={varFade().inUp}
    >
      <Tabs defaultValue={defaultYear} className="w-full">
        <ScrollArea className="whitespace-nowrap rounded-md">
          <TabsList className="min-w-max inline-flex h-auto items-center justify-start rounded-none bg-transparent p-0 gap-3 sm:gap-4 md:gap-5 w-full border-b">
            {years.map((el) => (
              <TabsTrigger
                key={el}
                value={el}
                className="inline-flex items-center justify-center whitespace-nowrap px-2.5 sm:px-3 py-3 sm:py-4 text-sm sm:text-[15px] md:text-[16px] font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none relative group data-[state=active]:font-bold hover:text-foreground"
              >
                {el}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-data-[state=active]:scale-x-100" />
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {years.map((year) => {
          const values = data?.[year] || [];
          return (
            <TabsContent
              value={year}
              key={year}
              className="w-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="pt-2 sm:pt-3">
                {[...values].reverse().map((el) => (
                  <div
                    key={el._id}
                    className="border-b hover:bg-gray-100 transition-colors"
                  >
                    <Link
                      href={`/investors/press-room/${el._id}/${makePressReleaseSlug(
                        el?.title
                      )}`}
                      className="text-sm sm:text-[15px] md:text-md leading-snug font-normal font-inter px-2.5 sm:px-3 py-3 block break-words"
                    >
                      {el.title}
                    </Link>
                  </div>
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </motion.div>
  );
}
