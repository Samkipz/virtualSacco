"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav.module.css";
import LogoutButton from "../../Logout/page";
import Image from "next/image";
import React, { useState } from "react";
import Brand from "../../brand/page";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronDown, MailIcon } from "lucide-react";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Trash2,
  Users,
  View,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Nav = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleMouseOver = (e) => {
    const allLinks = document.querySelectorAll("li>a");

    allLinks.forEach((link) => {
      const pattern = /active/.test(link.classList);

      if (pattern) {
        link.classList.remove(styles.active);
      }
    });
    e.target.classList.add(styles.activeHover);
  };

  const handleMouseOut = (e) => {
    e.target.classList.remove(styles.activeHover);
    const allLinks = document.querySelectorAll("li>a");

    allLinks.forEach((link) => {
      const linkPath = new URL(link.href).pathname; // Extract the pathname from the link's href
      const currentPathLink = new RegExp(`^${pathname}$`).test(linkPath);

      if (currentPathLink) {
        link.classList.add(styles.active);
      } else {
        link.classList.remove(styles.active);
      }
    });
  };

  return (
    // <nav className={styles.nav}>
    //   <ul className={styles.navList} data-type="navbar">
    //     <li className={styles.navItem}>
    //       <Link
    //         href="/"
    //         className={`${styles.navLink} ${
    //           pathname === "/" ? styles.active : ""
    //         }`}
    //         onMouseOver={handleMouseOver}
    //         onMouseOut={handleMouseOut}
    //       >
    //         Home
    //       </Link>
    //     </li>
    //     <li className={styles.navItem}>
    //       <Link
    //         href="/chama"
    //         className={`${styles.navLink} ${
    //           pathname === "/chama" ? styles.active : ""
    //         }`}
    //         onMouseOver={handleMouseOver}
    //         onMouseOut={handleMouseOut}
    //       >
    //         Our Chamas
    //       </Link>
    //     </li>
    //     <li className={styles.navItem}>
    //       <Link
    //         href="/sacco"
    //         className={`${styles.navLink} ${
    //           pathname === "/sacco" ? styles.active : ""
    //         }`}
    //         onMouseOver={handleMouseOver}
    //         onMouseOut={handleMouseOut}
    //       >
    //         Our Saccos
    //       </Link>
    //     </li>
    //     <li className={styles.navItem}>
    //       <Link
    //         href="/about"
    //         className={`${styles.navLink} ${
    //           pathname === "/about" ? styles.active : ""
    //         }`}
    //         onMouseOver={handleMouseOver}
    //         onMouseOut={handleMouseOut}
    //       >
    //         About Us
    //       </Link>
    //     </li>

    //     <li>
    //       {session ? (
    //         <Link href="/profile">
    //         <span className={styles.userInfo}>
    //           <p>Welcome {session.firstname}!</p>
    //           <div className={styles.avatar}>
    //           <Image
    //               src="/noavatar.png"
    //               alt="profile pic"
    //               width="40"
    //               height="40"
    //             />
    //             <h6 className={styles.logoutBtn}><LogoutButton /></h6>
    //           </div>
    //           {/* <p className={styles.logoutBtn}><LogoutButton /></p>  */}
    //         </span>
    //         </Link>
    //       ) : (
    //         <div className={styles.loginRegister}>
    //           <span className={styles.navItem}>
    //             <Link
    //               href="/register"
    //               className={`${styles.navLink} ${
    //                 pathname === "/register" ? styles.active : ""
    //               }`}
    //               onMouseOver={handleMouseOver}
    //               onMouseOut={handleMouseOut}
    //             >
    //               Join Us
    //             </Link>
    //           </span>
    //           <span className={styles.navItem}>
    //             <Link
    //               href="/login"
    //               className={`${styles.navLink} ${
    //                 pathname === "/login" ? styles.active : ""
    //               }`}
    //               onMouseOver={handleMouseOver}
    //               onMouseOut={handleMouseOut}
    //             >
    //               Login
    //             </Link>
    //           </span>
    //         </div>
    //       )}
    //     </li>
    //   </ul>
    // </nav>

    //     <div className="save">
    //       <div className="border-2 flex flex-row justify-between md:flex-col w-full md:w-auto">

    // <div className="flex items-center flex-shrink-0 text-white">
    //   {/* <img src={locofy} className="w-100 h-10 mr-2" alt="Logo" /> */}
    //   <Brand />
    // </div>
    // <div className="block lg:hidden">
    // <button
    //   onClick={() => setIsOpen(!isOpen)}
    //   className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black w-full-400"
    // >
    //   <svg
    //     className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
    //     viewBox="0 0 20 20"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    //   </svg>
    //   <svg
    //     className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
    //     viewBox="0 0 20 20"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
    //   </svg>
    // </button>
    // </div>
    //       </div>

    //       <div
    //       className={`lg:flex-grow lg:flex lg:flex-row
    //         lg:items-center lg:h-full lg:w-auto justify-end ${
    //         isOpen ? "flex" : "hidden"
    //       }`}
    //       >
    //       <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
    //         <Link
    //           href="/"
    //           className="text-lg flex  justify-start md:justify-center items-center px-3
    //            mr-1 mr-4 hover:bg-white hover:text-black"
    //         >
    //           Home
    //         </Link>
    //         <Link
    //           href="/chama"
    //           className="text-lg flex  justify-start md:justify-center items-center px-3
    //           text-white-200 mr-4 hover:bg-white hover:text-black"
    //         >
    //           Our Chamas
    //         </Link>
    //         <Link
    //           href="/sacco"
    //           className="text-lg flex  justify-start md:justify-center items-center px-3
    //           text-white-200 mr-4 hover:bg-white hover:text-black"
    //         >
    //           Our Saccos
    //         </Link>
    //         <Link
    //           href="/about"
    //           className="text-lg flex  justify-start md:justify-center items-center px-3
    //           text-white-200 mr-4 hover:bg-white hover:text-black"
    //         >
    //           About Us
    //         </Link>
    //         {session ? (
    //           <Link href="/profile" className="flex max-w-fit">
    //             <span className={styles.userInfo}>
    //               <p>Welcome {session.firstname}!</p>
    //               <div className={styles.avatar}>
    //               <Image
    //                   src="/noavatar.png"
    //                   alt="profile pic"
    //                   width="40"
    //                   height="40"
    //                 />
    //                 <h6 className={styles.logoutBtn}><LogoutButton /></h6>
    //               </div>
    //             </span>
    //           </Link>
    //         ) : (
    //           <div className={styles.loginRegister}>
    //             <span className={styles.navItem}>
    //               <Link
    //                 href="/register"
    //                 className={`${styles.navLink} ${
    //                   pathname === "/register" ? styles.active : ""
    //                 }`}
    //                 onMouseOver={handleMouseOver}
    //                 onMouseOut={handleMouseOut}
    //               >
    //                 Join Us
    //               </Link>
    //             </span>
    //             <span className={styles.navItem}>
    //               <Link
    //                 href="/login"
    //                 className={`${styles.navLink} ${
    //                   pathname === "/login" ? styles.active : ""
    //                 }`}
    //                 onMouseOver={handleMouseOver}
    //                 onMouseOut={handleMouseOut}
    //               >
    //                 Login
    //               </Link>
    //             </span>
    //           </div>
    //         )}
    //       </div>
    //       </div>
    //     </div>
    <>
      {/* <div className="flex bg-primary items-center flex-wrap shadow-xl w-full p-2"> 
        <div className="flex flex-grow flex-col">
          <div className="font-bold text-3xl flex">
            <Link href='/'>MQ</Link>
          </div>
          <p className="flex">Your One Stop Sacco</p>
      </div>
      <div className="flex flex-col">
      {session ?
        <div className="flex md:hidden">Welcome {session.firstname}!</div> :
        <Link
            href="/login"
            className="md:hidden text-lg flex whitespace-nowrap justify-start md:justify-center items-center px-3
            text-white-200 hover:bg-white hover:text-black w-full"
          >
          Login
        </Link>
      }
        <div className="flex justify-end">
          <div className="block md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
            >
            <svg
              className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className={ 
      clsx(
        "bg-primary px-3",
          {
            'text-white': isOpen,
            'hidden md:flex': !isOpen,
          },
        )}
      >
          <Link
            href="/"
            className={clsx("text-lg  flex whitespace-nowrap justify-start md:justify-center items-center px-3 py-1 text-white-200 mr-1 hover:bg-white hover:text-black w-full",
            {
              'bg-white text-black': pathname === '/'
            })}
          >
            Home
          </Link>
          <Link
            href="/chama"
            className={clsx("text-lg  flex whitespace-nowrap justify-start md:justify-center items-center px-3 py-1  mr-1 hover:bg-white hover:text-black w-full",
              {
                'bg-white text-black': pathname === '/chama'
              })}
          >
            Our Chamas
          </Link>
          <Link
            href="/"
            className="text-lg  flex whitespace-nowrap justify-start md:justify-center items-center px-3
             mr-1 hover:bg-white hover:text-black w-full"
          >
            Our Saccos
          </Link>
          <Link
            href="/"
            className="text-lg flex  justify-start md:justify-center items-center px-3
             mr-1 hover:bg-white hover:text-black w-full"
          >
            About
          </Link>
          <div className="hidden md:flex">
            {session ? (
                <Link href="/profile" className="flex max-w-fit">
                  <span className={styles.userInfo}>
                    <p className="whitespace-nowrap">Welcome {session.firstname}!</p>
                    <div className={styles.avatar}>
                    <Image
                        src="/noavatar.png"
                        alt="profile pic"
                        width="40"
                        height="40"
                      />
                      <h6 className={styles.logoutBtn}><LogoutButton /></h6>
                    </div>
                  </span>
                </Link>
              ) : (
                <div className={styles.loginRegister}>
                  <span className={styles.navItem}>
                    <Link
                      href="/register"
                      className="text-lg flex whitespace-nowrap justify-start md:justify-center items-center px-3
                       mr-1 hover:bg-white hover:text-black w-full"
                    >
                      Join Us
                    </Link>
                  </span>
                  <span className={styles.navItem}>
                      <Link
                          href="/login"
                          className="text-lg flex whitespace-nowrap justify-start md:justify-center items-center px-3
                           mr-1 hover:bg-white hover:text-black w-full"
                        >
                        Login
                      </Link>
                  </span>
                </div>
              )}
          </div>
           {session && 
           <span
           className="md:hidden text-lg flex  justify-start md:justify-center items-center px-3
           mr-1 hover:bg-white hover:text-black w-full"
         >
           <h6 className="flex"><LogoutButton /></h6>
         </span>
          }
          
      </div> */}

      <header className="flex justify-between h-20 items-center bg-primary px-4 md:px-6 md:py-6 w-full">
        <div className="flex md:w-auto items-start text-lg font-medium text-white capitalize">
          <div className="flex flex-grow flex-col">
            <div className="font-bold text-3xl flex">
              <Link href="/">MQ</Link>
            </div>
            <p className="flex">Your One Stop Sacco</p>
          </div>
        </div>
        <div className="hidden justify-between font-medium md:flex md:flex-row md:items-center  md:text-sm ">
          <Link
            href="/"
            className={clsx(
              "font-medium flex whitespace-nowrap items-center w-full transition-colors hover:text-foreground hover:bg-gray-300 px-8 py-7",
              {
                "text-black bg-white": pathname === "/",
              }
            )}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Home
          </Link>
          <Link
            href="/chama"
            className={clsx(
              "font-medium flex whitespace-nowrap items-center w-full transition-colors hover:text-foreground hover:bg-gray-300 px-8 py-7",
              {
                "text-black bg-white": pathname === "/chama",
              }
            )}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Our Chamas
          </Link>
          <Link
            href="#"
            className={clsx(
              "font-medium flex whitespace-nowrap items-center w-full transition-colors hover:text-foreground hover:bg-gray-300 px-8 py-7",
              {
                "text-black bg-white": pathname === "/sacco",
              }
            )}
          >
            Our Saccos
          </Link>
          <Link
            href="#"
            className={clsx(
              "font-medium flex whitespace-nowrap items-center w-full transition-colors hover:text-foreground hover:bg-gray-300 px-8 py-7",
              {
                "text-black bg-white": pathname === "/about",
              }
            )}
          >
            About
          </Link>
          {session ? (
            <div className="flex items-center gap-4 px-4 lg:px-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="flex gap-4 items-center">
                    <Link href="/profile">
                      <span className="flex flex-col gap-2 justify-center items-center">
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <p className="whitespace-nowrap">
                          Welcome {session.firstname}!
                        </p>
                      </span>
                    </Link>

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
                  <DropdownMenuLabel>
                    <Link href="/profile">My Account</Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href="/login"
              className={clsx(
                "font-medium flex whitespace-nowrap items-center w-full transition-colors hover:text-foreground hover:bg-gray-300 px-8 py-7",
                {
                  "text-black bg-white":
                    pathname === "/login" || pathname === "/register",
                }
              )}
            >
              Login
            </Link>
          )}
          {/* <Link
            href="#"
            className={clsx(
              "font-medium flex whitespace-nowrap items-center w-full transition-colors hover:text-foreground hover:bg-gray-300 px-8 py-7",
              {
                "text-black bg-white": pathname === "/logi",
              }
            )}
          >
            Login/L
          </Link> */}
        </div>
        {/* Mobile view */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden text-foreground"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold p-3"
                >
                  <div className="flex flex-grow flex-col ">
                    <div className="font-bold text-3xl flex">MQ</div>
                    <p className="flex">Your One Stop Sacco</p>
                  </div>
                  <span className="sr-only">Sacco Logo</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted p-3"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted p-3"
                >
                  Our Chamas
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted p-3"
                >
                  Our Saccos
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted p-3"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="hover:text-foreground hover:bg-muted p-3"
                >
                  Logout Area
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default Nav;
