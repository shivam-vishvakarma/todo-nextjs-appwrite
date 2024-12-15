"use client";

import { useForm } from "@/context/FormContext";
import databaseService, { ToDoItem } from "@/lib/server/databaseService";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function ToDo({ todo }: { todo: ToDoItem }) {
  const { setIsOpen, setTodo } = useForm();
  const { callAlert } = useAlert();
  const router = useRouter();
  const setFormOpen = setIsOpen;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(todo.status);
  const [loader, setLoader] = useState(false);

  const handleStatusChange = async (status: ToDoItem["status"]) => {
    setLoader(true);
    const res = await databaseService.changeToDoItemStatus(todo.$id, status);
    if (res) {
      setStatus(res.status);
    }
    setLoader(false);
  };

  const handleEdit = () => {
    setTodo(todo);
    setFormOpen(true);
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await databaseService.deleteToDoItem(todo.$id);
      if (res) {
        router.refresh();
      }
    } catch (error) {
      callAlert("Error deleting todo " + error, "error");
    }
    setOpen(false);
  };

  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">
            {new Date(todo.$createdAt).toLocaleDateString()}
          </h2>
          <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
            {new Date(todo.$createdAt).toLocaleTimeString()}
          </p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">
            {new Date(todo.deadline).toLocaleDateString()}
          </h2>
          <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
            {new Date(todo.deadline).toLocaleTimeString()}
          </p>
        </div>
      </td>

      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">
            {todo.title}
          </h2>
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div>
          <h4 className="text-gray-700 dark:text-gray-200">
            {todo.description}
          </h4>
        </div>
      </td>
      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
        <StatusBadge
          status={status}
          onChange={handleStatusChange}
          showLoader={loader}
        />
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap relative">
        {/* this is an overlay div for closing the dropdown */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed h-screen w-screen top-0 left-0 z-10"
          ></div>
        )}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="px-1 py-1 text-gray-500 z-0 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
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
            onClick={handleEdit}
            className="block px-4 py-2 text-sm text-blue-500 transition-colors duration-300 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="block px-4 py-2 text-sm text-red-500 transition-colors duration-300 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
