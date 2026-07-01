import Link from "next/link";
import { MainNavBar } from "./navbar";
import Footer from "./Footer";

export default function NotFound() {
  return (
    <div className="page-container font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <MainNavBar hiddenSidebar />
      <div className="flex justify-center items-center h-[300px] flex-col">
        <p className="text-xl font-semibold block">
          Could not find requested resource
        </p>
        <Link
          href="/"
          className="p-2 text-center bg-secondary text-white rounded-sm block text-md font-semibold  mt-3 w-[200px]"
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
