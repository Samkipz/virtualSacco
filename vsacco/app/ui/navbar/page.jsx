import Image from "next/image";
import Brand from "../brand/page";
import styles from "./navbar.module.css";
import { MdNotifications, MdOutlineChat } from "react-icons/md";
import Nav from "./nav/nav";
import { auth } from "@/app/api/auth/auth";
import LogoutButton from "../Logout/page";

const Navbar = async ({ admin }) => {
  const session = await auth();
  session && console.log(session, 'session user is admin -- ', !session.isAdmin); 

  return (
    <div className={styles.container}>
      {!admin ? (
        <div className={styles.inContainer}>
          <Brand />
          <Nav session={session} />
        </div>
      ) : (
        <div className={styles.adminNavContainer}>
          <div className={styles.navTitle}>
            {/* {pathname.split("/").pop()} */} 
            Admin
          </div>
          <div className={styles.navMenu}>
            <MdNotifications size={30} />
            <MdOutlineChat size={30} />
            <div className={styles.avatar}>
              <Image
                src="/noavatar.png"
                alt="profile pic"
                width="40"
                height="40"
              />
              <h6>Some name</h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
