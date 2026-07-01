import { MainNavBar } from "@/app/navbar";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import BannerImage from "../../assets/images/banners-and-bg/research-collaboration.jpg";
import CID from "../../assets/images/who-we-are/cid.png";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="page-container bg-gray-100 font-inter pt-2">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />

      <section className=" mt-3  z-10 relative">
        <MainNavBar hiddenSidebar />
        <div className="container">
          <div>
            <img
              src={BannerImage.src}
              className="h-full w-full object-cover max-h-[360px]"
            />
          </div>
          <Breadcrumbs paths={["Research Collaboration"]} />
          <h1 className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3">
            Research Collaboration
          </h1>
        </div>
      </section>
      <section className="bg-white pt-10 pb-20 ">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 md:gap-10 gap-y-4">
            <div className="col-span-9">
              <h2 className="text-xl text-primary mb-3">
                Founding Member of 'The Atlas of Economic Complexity'
              </h2>
              <p className="text-md">
                Mindteck works with the Center for International Development
                (CID) at Harvard University - a leading research hub focused on
                resolving the dilemmas of public policy associated with
                generating stable, shared and sustainable prosperity in
                developing countries. We are a Founding Member of 'The Atlas of
                Economic Complexity', and also provide ongoing technical
                advisory and big data services for this important resource.
                <br />
                <br />
                'The Atlas of Economic Complexity' (https://www.atlas.cid.harvard.edu)
                is a powerful, interactive tool that provides visualizations of
                growth opportunities for over 170 countries worldwide.
                Investors, policymakers, entrepreneurs, and academics use the
                tool to visualize a country's global trade flows, track how
                these dynamics change over time, and garner insights for fueling
                economic growth around the globe.
              </p>
              <hr className="my-5" />
              <div className="flex gap-3">
                <Image src={CID} width={136} height={93} alt="cid" />
                <p className="text-md">
                  CID, Harvard's university-wide research center at the Kennedy
                  School, is leading the continual development and evolution of
                  this dynamic resource. Try it:{" "}
                  <Link
                    href="https://www.atlas.cid.harvard.edu" target="_blank" rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    www.atlas.cid.harvard.edu
                  </Link>
                </p>
              </div>
              <hr className="my-5" />
            </div>
            <div className="col-span-3">
              <div className='bg-gray-200 p-5'>
                <p className="text-[13px] text-justify leading-relaxed">
                  "Mindteck has helped us make significant improvements and
                  continues to support the development of the tool. With their
                  help, we are now working on regional versions of The Atlas
                  which will give policymakers a more granular economic picture
                  and allow for more actionable development policies."
                </p>
                <p className="text-right text-xs italic mt-4">
 - Marcela  Escobari,
                  <br />
                  Former Executive Director at CID
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
