import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  const activeClass =
    "inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none";
  const inactiveClass =
    "inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400";
  return (
    <div className="mt-4 flex justify-center overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
      <Link
        href={"/dashboard/"}
        className={pathname === "/dashboard" ? activeClass : inactiveClass}
      >
        All To-Do
      </Link>

      <Link
        href={"/dashboard/completed"}
        className={pathname === "/dashboard/completed" ? activeClass : inactiveClass}
      >
        Completed To-Do
      </Link>

      <Link
        href={"/dashboard/profile"}
        className={pathname === "/dashboard/profile" ? activeClass : inactiveClass}
      >
        Profile
      </Link>
    </div>
  );
}
