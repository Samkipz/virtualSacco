"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav.module.css";
import LogoutButton from "../../Logout/page";
import Image from "next/image";

const Nav = ({ session }) => {
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
    <nav className={styles.nav}>
      <ul className={styles.navList} data-type="navbar">
        <li className={styles.navItem}>
          <Link
            href="/"
            className={`${styles.navLink} ${
              pathname === "/" ? styles.active : ""
            }`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            href="/chama"
            className={`${styles.navLink} ${
              pathname === "/chama" ? styles.active : ""
            }`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Our Chamas
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            href="/sacco"
            className={`${styles.navLink} ${
              pathname === "/sacco" ? styles.active : ""
            }`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Our Saccos
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            href="/about"
            className={`${styles.navLink} ${
              pathname === "/about" ? styles.active : ""
            }`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            About Us
          </Link>
        </li>

        <li>
          {session ? (
            <span className={styles.userInfo}>
              <p>Welcome {session.firstname}!</p>
              <div className={styles.avatar}>
              <Image
                  src="/noavatar.png"
                  alt="profile pic"
                  width="40"
                  height="40"
                />
                <h6 className={styles.logoutBtn}><LogoutButton /></h6>
              </div>
              {/* <p className={styles.logoutBtn}><LogoutButton /></p>  */}
            </span>
          ) : (
            <div className={styles.loginRegister}>
              <span className={styles.navItem}>
                <Link
                  href="/register"
                  className={`${styles.navLink} ${
                    pathname === "/register" ? styles.active : ""
                  }`}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  Join Us
                </Link>
              </span>
              <span className={styles.navItem}>
                <Link
                  href="/login"
                  className={`${styles.navLink} ${
                    pathname === "/login" ? styles.active : ""
                  }`}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  Login
                </Link>
              </span>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
