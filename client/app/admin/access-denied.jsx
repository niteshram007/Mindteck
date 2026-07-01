
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AccessDenied = () => {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
        {/* ShadCN Alert component */}
        <div className="text-center">
          <div className="mb-4">
            <span className="text-red-500 text-5xl">🚫</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Access Denied
          </h1>
          <p className="text-gray-600 mt-2">
            You do not have permission to view this page.
          </p>
        </div>

        {/* Button to go back to the home page */}
        <div className="text-center">
          <Link
            className="w-full py-3 text-lg"
            href='/admin'
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
