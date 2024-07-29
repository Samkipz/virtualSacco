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


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Brand from "../ui/brand/page";

import AdminSidebar from "../ui/adminSidebar/page";
import AdminNav from "../ui/adminNav/page";




const layout = async ({ children}) => {
  return (
    <div className="flex min-h-screen w-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      
      <div className="hidden border-r md:block bg-primary text-primary-foreground md:w-1/4">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6 ">
            <Brand />
          </div>
          <AdminSidebar/>

          {/* Upgrade to Pro */}
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
      
      <div className="flex flex-col md:w-3/4 bg-slate-100">
        <AdminNav/>
        {/* Children */}
          <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6l bg-slate-100">{children}</div>
      </div>
    </div>
  );
};

export default layout;
