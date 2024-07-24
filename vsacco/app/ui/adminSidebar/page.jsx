"use client";
import React from "react";
import Link from "next/link";
import {
  Bell,
  Boxes,
  HandCoins,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const AdminSidebar = () => {
  const pathname = usePathname();
  
  return (
    <div className="flex-1">
        {/* <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav> */}
      <nav className="grid text-lg font-medium items-start px-2 md:text-sm lg:px-4 gap-2">
        <Link
          href="/admin"
          className={clsx(
            "flex items-center gap-3 rounded-lg hover:bg-muted/80 px-3 py-4 transition-all hover:text-accent-foreground",
            {
              "bg-muted text-primary": pathname === "/admin",
            }
          )}
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>

        <Link
          href="/admin/cbo"
          className={clsx(
            "flex items-center gap-3 rounded-lg hover:bg-muted/80 px-3 py-4 transition-all hover:text-accent-foreground",
            {
              "bg-muted text-primary": pathname === "/admin/cbo",
            }
          )}
        >
          <HandCoins className="h-4 w-4"/>
          Chama
        </Link>

        <Link
          href="/admin/sacco"
          className={clsx(
            "flex items-center gap-3 rounded-lg hover:bg-muted/80 px-3 py-4 transition-all hover:text-accent-foreground",
            {
              "bg-muted text-primary": pathname === "/admin/sacco",
            }
          )}
        >
          <Boxes className="h-4 w-4" />
          Sacco
        </Link>

        <Link
          href="/admin/analytics"
          className={clsx(
            "flex items-center gap-3 rounded-lg hover:bg-muted/80 px-3 py-4 transition-all hover:text-accent-foreground",
            {
              "bg-muted text-primary": pathname === "/admin/analytics",
            }
          )}
        >
          <LineChart className="h-4 w-4" />
          Analytics
        </Link>

        <Link
          href="/admin/settings"
          className={clsx(
            "flex items-center gap-3 rounded-lg hover:bg-muted/80 px-3 py-4 transition-all hover:text-accent-foreground",
            {
              "bg-muted text-primary": pathname === "/admin/settings",
            }
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
