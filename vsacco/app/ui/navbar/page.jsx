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
                <Link href='/'>Home</Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/'>Services</Link>
                  {/* <a href="index-1.html" class="sf-with-ul">About us</a>
                  <ul style="display: none;">
                      <li style="opacity: 0;"><a href="#">Lorem ipsum dolor </a>

                      </li>
                      <li style="opacity: 0;"><a href="#">Ait amet conse </a></li>
                      <li class="" style="opacity: 0;"><a href="#" class="sf-with-ul">Ctetur adipisicing elit</a>
                          <ul style="display: none;">
                              <li style="opacity: 0;"><a href="#">Lorem ipsum dolor</a></li>
                              <li style="opacity: 0;"><a href="#">Lorem ipsum dolor</a></li>
                          </ul>
                      </li>
                      <li style="opacity: 0;"><a href="#">Sed do eiusmod </a></li>
                      <li style="opacity: 0;"><a href="#">Tempor incididunt </a></li>
                  </ul> */}
              </li>
              <li className={styles.navItem}>
                <Link href='/'>Blog</Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/'>Contact Us</Link>
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