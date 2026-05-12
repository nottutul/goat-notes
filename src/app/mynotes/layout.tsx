import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { getUser } from "@/auth/server";
import { redirect } from "next/navigation";

export default async function MyNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider className="min-h-[calc(100svh-6rem)]">
      <AppSidebar />
      <div className="flex w-full flex-col">
        <div className="p-4">
          <SidebarTrigger />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}
