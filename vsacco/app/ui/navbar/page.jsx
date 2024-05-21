"use client"
import Image from 'next/image'
import Brand from '../brand/page'
import styles from './navbar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {MdNotifications, MdOutlineChat} from 'react-icons/md'

const Navbar = ({admin}) => {
  const pathname = usePathname();
  
  return (
    <div className={styles.container}>
      { (!admin) ? (<div className={styles.inContainer}>
        <Brand/>
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
                <Link href='/chamaList' className={pathname === '/chamaList' ? styles.active : undefined}>Our Chamas</Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/saccoList' className={pathname === '/saccoList' ? styles.active : undefined}>Our Saccos</Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/register' className={pathname === '/register' ? styles.active : undefined}>Join Us</Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/'>About Us</Link>
              </li>
          </ul>
      </nav>
        </div>) 
        : 
      (
      <div className={styles.adminNavContainer}>
        <div className={styles.navTitle}>
          {pathname.split("/").pop()}
        </div>
        <div className={styles.navMenu}>
          <MdNotifications size={30} />
          <MdOutlineChat size={30} />
          <div className={styles.avatar}>
            <Image 
              src="/noavatar.png"
              alt='profile pic'
              width='40'
              height='40'
            />
            <h6>Some name</h6>
          </div>
        </div>
      </div>
    )}
      
      

      
    </div>
  )
}

export default Navbar