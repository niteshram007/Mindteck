export const revalidate = 300;
import * as motion from "motion/react-client";
import Link from "next/link";
import { MainNavBar } from "@/app/navbar";
import Breadcrumbs from "../Breadcrumbs";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { varFade } from "@/lib/animate";

const BOOKING_URL =
  "https://outlook.office.com/book/Mindteck1@mindteck.us/?ismsaljsauthenabled";

export default function BookACallPage() {
  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className="border-t-[3px] rounded-sm border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />

      <section className="mt-3 z-10 relative">
        <MainNavBar hiddenSidebar />
        <div className="container">
          <div className="rounded-md overflow-hidden bg-[#05191A] text-white px-8 py-10 md:px-12 md:py-14">
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="font-athelas text-3xl sm:text-4xl md:text-5xl leading-tight"
            >
              Book a Call with Expert
            </motion.h1>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 }).inLeft}
              className="text-md mt-4 max-w-[65ch]"
            >
              Schedule a call to explore your team's goals, timelines, and how we can help drive
              your growth.
            </motion.p>
          </div>
          <Breadcrumbs paths={["Book a Call"]} />
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-md p-6">
              <h2 className="font-athelas text-3xl text-secondary mb-3">Schedule Details</h2>
              <p className="text-md mb-4">
                You will book directly using Microsoft Bookings. Once confirmed, the invite and
                meeting details are sent automatically.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-md">
                <li>Duration and slots as per availability</li>
                <li>Automatic calendar invite on confirmation</li>
              </ul>
              <a
                href={BOOKING_URL}
                className="inline-flex items-center rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-black mt-6"
              >
                Start Booking
              </a>
              <div className="pt-4">
                <Link href="/talent" className="text-secondary underline text-sm">
                  Back to Talent
                </Link>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
                <iframe
                  src={BOOKING_URL}
                  title="Book a Call - Mindteck"
                  loading="lazy"
                  className="w-full min-h-[860px]"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
