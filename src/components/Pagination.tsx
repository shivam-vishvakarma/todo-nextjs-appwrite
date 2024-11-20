"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 0;

  return (
    <div className="flex items-center justify-between mt-6">
      <Link
        href={`${pathname}?page=${Number(page) <= 0 ? 0 : Number(page) - 1}`}
        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>previous</span>
      </Link>
      <div className="items-center hidden md:flex gap-x-3">
        <Link
          href="#"
          className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
        >
          1
        </Link>
        <Link
          href="#"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          2
        </Link>
        <Link
          href="#"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          3
        </Link>
        <Link
          href="#"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          ...
        </Link>
        <Link
          href="#"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          12
        </Link>
        <Link
          href="#"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          13
        </Link>
        <Link
          href="#"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          14
        </Link>
      </div>
      <Link
        href={`${pathname}?page=${Number(page) >= 10 ? 10 : Number(page) + 1}`}
        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
}
