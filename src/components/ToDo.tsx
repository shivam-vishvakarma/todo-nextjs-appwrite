"use client";

import { useForm } from "@/context/FormContext";
import { useState } from "react";

export default function ToDo() {
  const { setIsOpen } = useForm();
  const setFormOpen = setIsOpen;
  const [open, setOpen] = useState(false);
  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">
            09-11-2024
          </h2>
          <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
            12:30 PM
          </p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">
            11-11-2024
          </h2>
          <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
            12:30 PM
          </p>
        </div>
      </td>

      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">Market</h2>
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div>
          <h4 className="text-gray-700 dark:text-gray-200">
            Content curating app
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Brings all your news into one place
          </p>
        </div>
      </td>
      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
        <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
          Completed
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap relative">
        {/* this is an overlay div for closing the dropdown */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed h-screen w-screen top-0 left-0"
          ></div>
        )}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute right-10 top-1/2 -translate-y-1/2 z-20 mt-2 overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 border`}
        >
          <button
            onClick={() => {setFormOpen(true); setOpen(false)}}
            className="block px-4 py-2 text-sm text-blue-500 transition-colors duration-300 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Edit
          </button>
          <button className="block px-4 py-2 text-sm text-green-500 transition-colors duration-300 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            Mark Completed
          </button>
          <button className="block px-4 py-2 text-sm text-black transition-colors duration-300 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            Mark Incomplete
          </button>
          <button className="block px-4 py-2 text-sm text-red-500 transition-colors duration-300 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
