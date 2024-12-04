"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  return (
    <header className="text-black body-font border-b-2 fixed z-20 top-0 left-0 right-0 backdrop-blur-3xl h-20">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between max-w-screen-xl">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-3xl font-bold">To-Do Wala</span>
        </Link>
        {user ? (
          <button
            onClick={logout}
            className="inline-flex items-center bg-black border-2 text-white transition-all font-semibold border-black py-1 px-3 focus:outline-none hover:bg-white rounded text-base hover:text-black mt-4 md:mt-0"
          >
            Log Out
          </button>
        ) : (
          <>
            {pathname === "/login" ? (
              <Link
                href={"/register"}
                className="inline-flex items-center bg-black border-2 text-white transition-all font-semibold border-black py-1 px-3 focus:outline-none hover:bg-white rounded text-base hover:text-black mt-4 md:mt-0"
              >
                Sign Up
              </Link>
            ) : (
              <Link
                href={"/login"}
                className="inline-flex items-center bg-black border-2 text-white transition-all font-semibold border-black py-1 px-3 focus:outline-none hover:bg-white rounded text-base hover:text-black mt-4 md:mt-0"
              >
                Login
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
