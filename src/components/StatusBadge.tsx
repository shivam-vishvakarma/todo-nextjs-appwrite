import { ToDoItem } from "@/lib/server/databaseService";
import ButtonLoader from "./ButtonLoader";

export default function StatusBadge({
  status,
  onChange,
  showLoader,
}: {
  status: ToDoItem["status"];
  showLoader: boolean;
  onChange: (status: ToDoItem["status"]) => void;
}) {
  //   switch (status) {
  //     case "ongoing":
  //       return (
  //         <div className="inline px-3 py-1 text-sm font-normal rounded-full text-yellow-500 gap-x-2 bg-yellow-100/60 dark:bg-gray-800">
  //           Ongoing
  //         </div>
  //       );
  //     case "pending":
  //       return (
  //         <div className="inline px-3 py-1 text-sm font-normal rounded-full text-blue-500 gap-x-2 bg-blue-100/60 dark:bg-gray-800">
  //           Pending
  //         </div>
  //       );
  //     case "rejected":
  //       return (
  //         <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60 dark:bg-gray-800">
  //           Rejected
  //         </div>
  //       );
  //     case "completed":
  //       return (
  //         <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
  //           Completed
  //         </div>
  //       );
  //     case "missed":
  //       return (
  //         <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60 dark:bg-gray-800">
  //           Missed
  //         </div>
  //       );
  //   }

  const getBgColor = (status: ToDoItem["status"]) => {
    switch (status) {
      case "ongoing":
        return "bg-yellow-400/60 dark:bg-yellow-400/60 text-yellow-500";
      case "pending":
        return "bg-blue-400/60 dark:bg-blue-400/60 text-blue-500";
      case "rejected":
        return "bg-red-400/60 dark:bg-red-400/60 text-red-500";
      case "completed":
        return "bg-emerald-400/60 dark:bg-emerald-400/60 text-emerald-500";
      case "missed":
        return "bg-red-400/60 dark:bg-red-400/60 text-red-500";
    }
  };

  if (showLoader) {
    return (
      <div
        className={
          `py-1 text-md font-bold rounded-full w-min` +
          getBgColor(status)
        }
      >
        <ButtonLoader />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as ToDoItem["status"])}
      className={`outline-none rounded-full p-2 ${getBgColor(status)}`}
    >
      <option value="ongoing">Ongoing</option>
      <option value="pending">Pending</option>
      <option value="rejected">Rejected</option>
      <option value="completed">Completed</option>
      <option value="missed">Missed</option>
    </select>
  );
}
