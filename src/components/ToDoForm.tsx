"use client";

import { useForm } from "@/context/FormContext";
import { useState } from "react";

type FormData = {
  title: string;
  deadline: string;
  description: string;
};

export default function ToDoForm() {
  const { isOpen, setIsOpen, todo, setTodo } = useForm();

  const [formData, setFormData] = useState<FormData>({} as FormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Form Data", formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setIsOpen(false);
  };
  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } fixed top-0 left-0 h-screen w-screen z-10 backdrop-brightness-90`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-1/2 mx-auto p-8 bg-white rounded-md shadow-md">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">Add New To Do</h2>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <svg
              className="w-[30px] h-[30px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="deadline"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Deadline
            </label>

            <input
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              placeholder="Deadline"
              className="block  mt-2 w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              rows={4}
              placeholder="Some description"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              defaultValue={""}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
