import MultistepFormBar from '@/app/ui/multiStepFormBar/page'
import styles from './add.module.css'
const layout = ({children}) => {
  return (
    <div className={styles.container}>
        <MultistepFormBar/>
        <div className={styles.content}>
            <div className={styles.children}>{children}</div>
        </div>
    </div>
  )
}

export default layout