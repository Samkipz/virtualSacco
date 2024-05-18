import MyBtn from '@/app/ui/button/page'
import styles from './cbo.module.css'

const cbo = () => {
  return (
    <div className={styles.container}>
        <div className={styles.topPart}>
            <MyBtn path='/admin/cbo/add' btnName='Register New Chama' />
        </div>
    </div>
  )
}

export default cbo