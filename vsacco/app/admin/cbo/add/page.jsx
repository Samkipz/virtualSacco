"use client"
import styles from './add.module.css'
import AddMembersForm from './addMembers/page'
import CreateChamaForm from './createChama/page'
import { usePathname } from 'next/navigation'

const AddCBO = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
        <CreateChamaForm/>
        <AddMembersForm />
    </div>
  )
}

export default AddCBO