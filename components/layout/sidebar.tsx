import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-background">
      <nav className="flex flex-col gap-1 p-4">
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          Overview
        </Link>
        <Link
          href="/dashboard/revenue"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          Revenue Analysis
        </Link>
        <Link
          href="/dashboard/inventory"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          Inventory Management
        </Link>
        <Link
          href="/dashboard/register"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          Product Registration
        </Link>
      </nav>
    </div>
  );
}