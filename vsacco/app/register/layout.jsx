import Navbar from "../ui/navbar/page"
import styles from './register.module.css'


const layout = ({children}) => {
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <Navbar/>
            <div className={styles.children}>{children}</div>
        </div>
    </div>
  )
}

export default layout