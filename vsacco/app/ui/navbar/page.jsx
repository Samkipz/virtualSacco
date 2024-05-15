import styles from './navbar.module.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <div className={styles.brand_name}>
          <Link href='/'>MQ</Link>
        </div>
        <p className={styles.brand_slogan}>Your One Stop Sacco</p>
      </div>
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
    </div>
  )
}

export default Navbar