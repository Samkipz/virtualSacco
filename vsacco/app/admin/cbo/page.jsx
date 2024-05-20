import MyBtn from '@/app/ui/button/page'
import styles from './cbo.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { MdAdd } from "react-icons/md";
import Search from '@/app/ui/search/search';

const cbo = () => {
  return (
    <div className={styles.container}>
        <div className={styles.topPart}>
            <MyBtn icon={<MdAdd />} path='/admin/cbo/add' btnName='Register New Chama' />
        </div>
        <div className={styles.top}>Top space</div>
      <div className={styles.tableContainer}>
        <div className={styles.tableTop}>
          <Search placeholder="Search for chama"/>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Description</td>
              <td>Location</td>
              <td>Address</td>
              <td>Certificate Number</td>
              <td>Created On</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            
              <tr>
                <td>12345</td>
                <td>
                  <div className={styles.user}>
                    <Image
                      src="/noavatar.png"
                      alt="doctor avatar"
                      width={40}
                      height={40}
                      className={styles.avatar}
                    />
                    Sam Kipz
                  </div>
                </td>
                <td>sam@mail.com</td>
                <td>13.01.1995</td>
                <td>Dermatologist</td>
                <td>0712345678</td>
                <td>13.01.2024</td>
                <td>
                  <div className={styles.buttons}>
                    {/* <MyBtn icon=w' /> */}
                    <Link href="/">
                      <button className={`${styles.button} ${styles.view}`}> 
                        View
                      </button>
                    </Link>
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default cbo