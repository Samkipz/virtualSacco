"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './nav.module.css'
import LogoutButton from '../../Logout/page'
import { useSession } from "next-auth/react";

const Nav = () => {
    const pathname = usePathname();

    return(
        <div>
            <nav className={styles.nav}>
          <ul className={styles.navList} data-type="navbar">
              <li className={styles.navItem}>
                <Link 
                  href='/' 
                  className={pathname === '/' ? styles.active : undefined}
                >
                  Home
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/chama' className={pathname === '/chama' ? styles.active : undefined}>Our Chamas</Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/sacco' className={pathname === '/sacco' ? styles.active : undefined}>Our Saccos</Link>
              </li><li className={styles.navItem}>
                <Link href='/' className={pathname === '/about' ? styles.active : undefined}>About Us</Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/register' className={pathname === '/register' ? styles.active : undefined}>Join Us</Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/login' className={pathname === '/login' ? styles.active : undefined}>Login</Link>
              </li>
              <li>
                <LogoutButton/>
              </li>
          </ul>
        </nav>
        </div>
    )
}

export default Nav

