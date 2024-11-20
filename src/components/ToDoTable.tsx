import ToDo from "./ToDo";

export default function ToDoTable() {
    return (
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <button className="flex items-center gap-x-3 focus:outline-none">
                  <span>Date Created</span>
                </button>
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <button className="flex items-center gap-x-3 focus:outline-none">
                  <span>Dead Line</span>
                </button>
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Status
              </th>
              <th scope="col" className="relative py-3.5 px-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            <ToDo />
            <ToDo />
            <ToDo />
            <ToDo />
            <ToDo />
            <ToDo />
            <ToDo />
            <ToDo />
            <ToDo />
            <ToDo />
          </tbody>
        </table>
      </div>
    );
}