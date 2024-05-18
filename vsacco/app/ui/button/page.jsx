import Link from 'next/link'
import styles from './button.module.css'

const MyBtn = ({path, btnName}) => {
  return (
    <Link href={path} className={`${styles.btn} ${styles.btnMd} ${styles.btnPrimary}`}>{btnName}</Link>
  )
}

export default MyBtn