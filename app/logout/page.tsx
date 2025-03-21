"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LogoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutComplete, setLogoutComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await supabase.auth.signOut();
      setLogoutComplete(true);

      // Optional: Set a timer to redirect after showing the success message
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("An error occurred while logging out. Please try again.");
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {logoutComplete
              ? "You have been logged out"
              : "Log out of your account"}
          </h1>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        {logoutComplete ? (
          <div className="space-y-4">
            <div className="p-3 text-sm text-green-600 bg-green-100 rounded-md">
              You have successfully logged out of your account.
            </div>
            <div className="flex justify-center">
              <Link
                href="/login"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Are you sure you want to log out? You will need to log back in to
              access your account.
            </p>

            <div className="flex justify-between space-x-4">
              <button
                onClick={() => router.back()}
                className="inline-flex justify-center w-1/2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoggingOut}
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex justify-center w-1/2 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
