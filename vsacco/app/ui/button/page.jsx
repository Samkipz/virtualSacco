import Link from 'next/link'
import styles from './button.module.css'

const MyBtn = ({icon, path, btnName}) => {
  return (
    <Link href={path} className={`${styles.btn} ${styles.btnMd} ${styles.btnPrimary}`}>{icon} {btnName}</Link>
  )
}

export default MyBtn