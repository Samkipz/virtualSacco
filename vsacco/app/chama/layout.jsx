import Navbar from "../ui/navbar/page"
import styles from './chama.module.css'


const layout = ({children}) => {
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <Navbar/>
            <div className="min-h-[calc(100vh-64px)] pb-4">{children}</div>
        </div>
    </div>
  )
}

export default layout