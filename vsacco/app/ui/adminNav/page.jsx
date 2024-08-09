import Link from "next/link";
import { Bell, ChevronDown, MailIcon, Menu } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import AdminSidebar from "../adminSidebar/page";

const AdminNav = () => {
  return (
    <header className="sticky top-0 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 bg-primary text-primary-foreground">
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
          <AdminSidebar />

          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
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
      <div className="flex flex-1">ADMIN</div>
      <div className="flex items-center gap-4 px-4 lg:px-6">
        <Button
          variant="outline"
          size="icon"
          className="bg-primary text-primary-foreground border-none ml-auto h-8 w-8"
        >
          <MailIcon />
          <span className="sr-only">Toggle Mail</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-primary text-primary-foreground border-none ml-auto h-8 w-8"
        >
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
                <div className="hidden text-sm text-muted md:inline">Admin</div>
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
  );
};

export default AdminNav;
