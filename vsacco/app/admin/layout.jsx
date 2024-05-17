import Navbar from "../ui/navbar/page"
import Sidebar from "../ui/sidebar/page"
import styles from './admin.module.css'


const layout = ({children}) => {
  return (
    <div className={styles.container}>
        <div className={styles.leftBar}>
          <Sidebar/>
        </div>
        <div className={styles.content}>
            <Navbar admin='admin'/>
            <div className={styles.children}>{children}</div>
        </div>
    </div>
  )
}

export default layout