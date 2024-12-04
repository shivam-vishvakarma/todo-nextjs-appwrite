"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import ToDoTable from "@/components/ToDoTable";
import { useAuth } from "@/context/AuthContext";
import databaseService, { ToDoItem } from "@/lib/server/databaseService";
import { Models } from "appwrite";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ToDoStatus({
  params,
}: {
  params: Promise<{ status: ToDoItem["status"] }>;
}) {
  const { user } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const [todos, setTodos] = useState<Models.DocumentList<ToDoItem>>();

  useEffect(() => {
    if (user) {
      params.then(({ status }) => {
        databaseService.getToDoItems(user.$id, status, page, limit).then((res) => {
          setTodos(res as Models.DocumentList<ToDoItem>);
          console.log("res", res, "page", page);
          setShowLoader(false);
        });
      });
    }
  }, [user, page]);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <section className="container p-4 mx-auto">
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <ToDoTable todos={todos} />
          </div>
        </div>
      </div>
      <Pagination
        totalPages={todos?.total || 0}
        itemsPerPage={limit}
      />
    </section>
  );
}
