"use client";

import DashboardNav from "@/components/DashboardNav";
import ToDoForm from "@/components/ToDoForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user]);
  return (
    <main className="w-full">
      <section className="max-w-screen-xl mx-auto pt-20">
        <h4 className="mx-auto text-5xl text-center font-semibold">
          Welcome: <span className="text-blue-500">Shivam</span>
        </h4>
        <section>
          <div>
            <DashboardNav />
          </div>
          <div>{children}</div>
          <ToDoForm />
        </section>
      </section>
    </main>
  );
}
