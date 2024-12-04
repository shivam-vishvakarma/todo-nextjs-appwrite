"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({
  totalPages,
  itemsPerPage,
}: {
  totalPages: number;
  itemsPerPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const total = Math.ceil(totalPages / itemsPerPage);
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  if (total <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">
      <Link
        href={`${pathname}?page=${Number(page) <= 1 ? 1 : Number(page) - 1}`}
        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${
          Number(page) <= 1 ? "pointer-events-none contrast-50" : ""
        }`}
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
        {pages.map((i) => (
          <Link
            key={i}
            href={`${pathname}?page=${i}`}
            className={`px-3 py-2 text-sm capitalize transition-colors duration-200 bg-white border rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 font-semibold ${
              Number(page) === i
                ? "text-blue-500"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            {i}
          </Link>
        ))}
      </div>
      <Link
        href={`${pathname}?page=${
          Number(page) >= total ? total : Number(page) + 1
        }`}
        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${
          Number(page) >= total ? "pointer-events-none contrast-50" : ""
        }`}
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
