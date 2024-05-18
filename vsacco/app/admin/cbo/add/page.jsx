"use client"
import styles from './add.module.css'
import AddMembersForm from './addMembers/page'
import CreateChamaForm from './createChama/page'
import { usePathname } from 'next/navigation'

const addCBO = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.formArea}>
        <CreateChamaForm/>
        <AddMembersForm />
      </div>

    </div>
  )
}

export default addCBO