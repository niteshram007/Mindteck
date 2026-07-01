import { MainNavBar } from "@/app/navbar";
import ContactForm from "@/components/common-client-component/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BannerImage from "../../assets/images/banners-and-bg/contact-us.jpg";
import Image from "next/image";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import { MapPin, PhoneCall, Printer } from "lucide-react";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { varFade } from "@/lib/animate";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { unstable_cache } from "next/cache";

export const revalidate = 600;

const getAllOffices = unstable_cache(
  async () => {
    const { data } = await axiosInstance("public/office/getall");
    return Array.isArray(data) ? data : [];
  },
  ["public-office-getall"],
  { revalidate: 600 },
);

function groupByProperty(data, key) {
  return data.reduce((grouped, item) => {
    // Split the key by '.' to handle nested properties
    const keys = key.split(".");
    let groupKey = item;

    // Traverse through the keys to get the value from the nested property
    for (let k of keys) {
      groupKey = groupKey[k];
      if (groupKey === undefined) break;
    }

    // If the groupKey is not undefined, group by it
    if (groupKey !== undefined) {
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(item);
    }

    return grouped;
  }, {});
}
export default async function page() {
  const officeData = await getAllOffices();
  const mappedData = officeData.map((el) => ({
    ...el,
    countryName: el?.location?.[0]?.name || "Other",
  }));
  const groupedDataByCountry = groupByProperty(mappedData, "countryName");

  return (
    <div className="font-inter">
      <div className="page-container bg-gray-100 font-inter pt-2">
        <div className="container relative">
          <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <GeometricShapes />

        <section className="mt-3  z-10 relative">
          <MainNavBar hiddenSidebar />
          <div className="container">
            <div className="header-banner">
              <div className="grid grid-cols-12 items-stretch align-middle">
                <div
                  className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4  py-5 px-10"
                  style={{
                    background:
                      "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                  }}
                >
                  <div className="flex-col flex h-full justify-center gap-5">
                    <motion.h1
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={varFade().inLeft}
                      className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight"
                    >
                      Get in Touch with Us
                    </motion.h1>
                    <hr className="border border-secondary w-full" />
                    <motion.p
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={varFade({ delay: 0.2 }).inLeft}
                      className="font-inter text-md text-white"
                    >
                      We value your inquiries and are here to assist you.
                      Whether you need support, have a business proposal, or
                      require more information, our team is ready to connect
                      with you. Reach out today.
                    </motion.p>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                  <Image
                    src={BannerImage}
                    className="max-h-[360px] w-full object-cover"
                    alt="banner"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                  />
                </div>
              </div>
            </div>
            <Breadcrumbs paths={["Contact Us"]} />

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="text-secondary text-3xl sm:text-4xl md:text-5xl font-normal font-athelas"
            >
              Contact
            </motion.h2>

            <br />
          </div>
        </section>
      </div>

      <section className="font-inter py-10">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal mb-7"
          >
            Worldwide Locations
          </motion.h2>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={varFade().inUp}
              >
                <Tabs defaultValue="India">
                  <ScrollArea className="whitespace-nowrap rounded-md">
                    <TabsList className="inline-flex h-auto items-center justify-start rounded-none bg-transparent p-0 gap-5 w-full border-b">
                      {Object.keys(groupedDataByCountry || {}).map((el) => (
                        <TabsTrigger
                          key={el}
                          value={el}
                          className="inline-flex items-center justify-center whitespace-nowrap px-3 py-4 text-[16px]  font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none relative group data-[state=active]:font-bold hover:text-foreground"
                        >
                          {el}
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-data-[state=active]:scale-x-100" />
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                  {Object.entries(groupedDataByCountry || {}).map(
                    ([key, values]) => (
                      <TabsContent
                        value={key}
                        key={key}
                        className="mt-10 w-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <div className="grid md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-2">
                          {values.map((el) => (
                            <div key={el._id} className="mb-3">
                              <h3 className="text-md font-bold font-inter">
                                {el.name}
                              </h3>
                              <p className="text-sm text-muted-foreground leading-[23px] mb-2">
                                {el.address1}
                                <br />
                                {el.address2}
                                {el.address3 && (
                                  <>
                                    <br />
                                    {el.address3}
                                  </>
                                )}
                                {el.address4 && (
                                  <>
                                    <br />
                                    {el.address4}
                                  </>
                                )}
                                {el.address5 && (
                                  <>
                                    <br />
                                    {el.address5}
                                  </>
                                )}
                              </p>
                              {el.phone && (
                                <p className="flex items-center">
                                  <PhoneCall
                                    size={"18px"}
                                    className="text-secondary"
                                  />
                                  &nbsp; {el.phone}
                                </p>
                              )}
                              {el.fax && (
                                <p className="flex items-center mt-1">
                                  <Printer
                                    size={"18px"}
                                    className="text-secondary"
                                  />
                                  &nbsp; {el.fax}
                                </p>
                              )}
                              {el.mapLocationAddress && (
                                <p className="flex items-center mt-1">
                                  <MapPin
                                    size={"18px"}
                                    className="text-secondary"
                                  />
                                  &nbsp;{" "}
                                  <a
                                    href={el.mapLocationAddress}
                                    target="_blank"
                                    className="text-sm underline text-blue-800 font-[500]"
                                  >
                                    View map
                                  </a>
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <section className="pb-10 bg-[#DDDEDE]">
        <div className="container text-center">
          <p className="text-base text-black">
            You can also email us directly at{" "}
            <a
              href="mailto:info@mindteck.com"
              className="font-semibold text-primary underline"
            >
              info@mindteck.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
