import MyBtn from '@/app/ui/button/page'
import styles from './cbo.module.css'
import Image from 'next/image'
import Link from 'next/link'

const cbo = () => {
  return (
    <div className={styles.container}>
        <div className={styles.topPart}>
            <MyBtn path='/admin/cbo/add' btnName='Register New Chama' />
        </div>
        <div className={styles.top}>Top space</div>
      <div className={styles.tableContainer}>
        <div className={styles.tableTop}>
          {/* <Search placeholder="Search doctor" /> */}
          <input type='text' placeholder='Search'/>
          <Link href="/admin/user/add">
            <button className={`${styles.button} ${styles.addButton}`}>
              Add Doctor
            </button>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Staff No</td>
              <td>Name</td>
              <td>Gender</td>
              <td>DOB</td>
              <td>Speciality</td>
              <td>Phone</td>
              <td>Created At</td>
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