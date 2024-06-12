"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './nav.module.css'
import LogoutButton from '../../Logout/page'
import { useSession } from "next-auth/react";

const Nav = () => {
    const pathname = usePathname();

    const handleMouseOver = (e) => {
        const allLinks = document.querySelectorAll("li>a");

        allLinks.forEach(link => {
          const pattern = /active/.test(link.classList);

          if(pattern){
            link.classList.remove(styles.active);
          }
        });
        e.target.classList.add(styles.activeHover);
    };

    const handleMouseOut = (e) => {
      e.target.classList.remove(styles.activeHover);
      const allLinks = document.querySelectorAll("li>a");

      allLinks.forEach(link => {
          const linkPath = new URL(link.href).pathname; // Extract the pathname from the link's href
          const currentPathLink = new RegExp(`^${pathname}$`).test(linkPath);

          if (currentPathLink) {
              link.classList.add(styles.active);
          } else {
              link.classList.remove(styles.active);
          }
      });
    };

    return(
        <div>
            <nav className={styles.nav}>
                <ul className={styles.navList} data-type="navbar">
                    <li className={styles.navItem}>
                        <Link 
                            href='/' 
                            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Home
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link 
                            href='/chama' 
                            className={`${styles.navLink} ${pathname === '/chama' ? styles.active : ''}`}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Our Chamas
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link 
                            href='/sacco' 
                            className={`${styles.navLink} ${pathname === '/sacco' ? styles.active : ''}`}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Our Saccos
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link 
                            href='/about' 
                            className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            About Us
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link 
                            href='/register' 
                            className={`${styles.navLink} ${pathname === '/register' ? styles.active : ''}`}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Join Us
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link 
                            href='/login' 
                            className={`${styles.navLink} ${pathname === '/login' ? styles.active : ''}`}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <LogoutButton/>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;
