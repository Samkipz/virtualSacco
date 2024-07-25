// import Navbar from "../ui/navbar/page"
// import Sidebar from "../ui/sidebar/page"
// import styles from './admin.module.css'

// const layout = ({children}) => {
//   return (
//     <div className={styles.container}>
//         <div className={styles.leftBar}>
//           <Sidebar/>
//         </div>
//         <div className={styles.content}>
//             <Navbar admin='admin'/>
//             <div className={styles.children}>{children}</div>
//         </div>
//     </div>
//   )
// }

// export default layout

import Link from "next/link";
import {
  Bell,
  ChevronDown,
  CircleUser,
  Home,
  LineChart,
  MailIcon,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Brand from "../ui/brand/page";

import AdminSidebar from "../ui/adminSidebar/page";




const layout = async ({ children}) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r md:block bg-primary text-primary-foreground">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 ">
            <Brand />
          </div>
          <AdminSidebar/>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 bg-primary text-primary-foreground">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-primary text-primary-foreground border-none shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <AdminSidebar/>
              
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            ADMIN
            {/* <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form> */}
          </div>
          <div className="flex items-center gap-4 px-4 lg:px-6">
            <Button variant="outline" size="icon" className="bg-primary text-primary-foreground border-none ml-auto h-8 w-8">
              <MailIcon />
              <span className="sr-only">Toggle Mail</span>
            </Button>
            <Button variant="outline" size="icon" className="bg-primary text-primary-foreground border-none ml-auto h-8 w-8">
              <Bell />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="flex flex-col">
                    <div className="font-medium">Olivia Smith</div>
                    <div className="hidden text-sm text-muted md:inline">
                      Admin
                    </div>
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-primary text-primary-foreground border-none ml-auto h-8 w-8"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <span className="sr-only">Toggle user menu</span>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
          <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6l bg-slate-100">{children}</div>
      </div>
    </div>
  );
};

export default layout;
