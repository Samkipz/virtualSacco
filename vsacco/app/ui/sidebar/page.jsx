'use client'
import Brand from "../brand/page";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  
  const sideBarItems = [
    {
      title: "Dashboard",
      list: [
        {
          name: "Dashboard",
          path: "/admin",
        },
        {
          name: "CBO",
          path: "/admin/cbo",
        },
        {
          name: "Sacco",
          path: "/admin/sacco",
        },
        {
          name: "Accounts",
          path: "/admin/accounts",
        },
        {
          name: "Finances",
          path: "/admin/finances",
        },
        {
          name: "Secretary",
          path: "/admin/finances",
        },
      ],
    },
  ];
  return (
    <div className={styles.container}>
      <Brand />

      <ul className={styles.sideBarMenu}>
        {sideBarItems.map((category) => (
          <li key={category.title}>
            <span>{category.title}</span>
            <ul className={styles.sideBarList}>
              {category.list.map((listItem) => (
                <li key={listItem.name}>
                  <Link href={listItem.path} 
                  className={`${styles.listItem} ${pathname === listItem.path && styles.active}`}>
                    {listItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
