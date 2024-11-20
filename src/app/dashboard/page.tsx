"use client";

import Pagination from "@/components/Pagination";
import ToDoTable from "@/components/ToDoTable";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/context/FormContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AllToDo() {
  const { setIsOpen } = useForm();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("add")) {
      setIsOpen(true);
    }
  }, []);
  return (
    <section className="container p-4 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-end">
        <div className="flex items-center mt-4 gap-x-3">
          <button
            onClick={() => setIsOpen(true)}
            className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-white dark:border-gray-700"
          >
            Add To Do
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <ToDoTable />
          </div>
        </div>
      </div>
      <Pagination />
    </section>
  );
}
