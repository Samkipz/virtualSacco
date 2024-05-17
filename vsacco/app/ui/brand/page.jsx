import Link from "next/link"
import styles from "./brand.module.css"

const Brand = () => {
  return (
    <div className={styles.brand}>
        <div className={styles.brand_name}>
          <Link href='/'>MQ</Link>
        </div>
        <p className={styles.brand_slogan}>Your One Stop Sacco</p>
      </div>
  )
}

export default Brand