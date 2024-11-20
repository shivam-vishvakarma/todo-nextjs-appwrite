import Pagination from "@/components/Pagination";
import ToDoTable from "@/components/ToDoTable";

export default function Completed() {
  return (
    <section className="container p-4 mx-auto">
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
