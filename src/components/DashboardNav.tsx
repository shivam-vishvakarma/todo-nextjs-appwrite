import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();

  const routes = [
    { name: "All To-Do", path: "/dashboard" },
    { name: "Ongoing", path: "/dashboard/todo/ongoing" },
    { name: "Pending", path: "/dashboard/todo/pending" },
    { name: "Rejected", path: "/dashboard/todo/rejected" },
    { name: "Completed", path: "/dashboard/todo/completed" },
    { name: "Missed", path: "/dashboard/todo/missed" },
    { name: "Profile", path: "/dashboard/profile" },
  ];

  const activeClass =
    "inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none";
  const inactiveClass =
    "inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400";
  return (
    <div className="flex justify-center overflow-x-auto overflow-y-hidden border-b bg-white border-gray-200 whitespace-nowrap dark:border-gray-700">
      {routes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={pathname === route.path ? activeClass : inactiveClass}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
}
