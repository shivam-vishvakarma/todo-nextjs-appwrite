"use client";

import DashboardNav from "@/components/DashboardNav";
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
  }, [user, loading]);
  return (
    <main className="w-full">
      <section className="max-w-screen-xl mx-auto pt-20 flex flex-col gap-4">
        <h4 className="mx-auto text-5xl text-center font-semibold pt-4">
          Welcome: <span className="text-blue-500">{user?.name}</span>
        </h4>
        <section>
          <div className="sticky top-20 z-10">
            <DashboardNav />
          </div>
          <div>{children}</div>
        </section>
      </section>
    </main>
  );
}
