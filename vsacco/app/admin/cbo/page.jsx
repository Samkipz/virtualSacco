import MyBtn from '@/app/ui/button/page'
import styles from './cbo.module.css'
import Link from 'next/link'
import { MdAdd } from "react-icons/md";
import Search from '@/app/ui/search/search';
import prisma from '@/app/lib/prisma';

const cbo = async () => {
  const chamaList = await prisma.chama.findMany({
    where:{
      deleted: 0,
    }
  });

  // Function to format date
  function formatCreatedDate(isoDateString) {
    // Parse the ISO date string into a Date object
    const dte = new Date(isoDateString);

    // Format the date to a human-readable format
    return dte.toLocaleDateString();
  }

  let num = 1

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
            {chamaList.map((chama)=>(
              <tr key={chama.id}>
                <td> { num++ }</td>
                <td>
                  <div className={styles.user}>
                    {chama.name}
                  </div>
                </td>
                <td>{chama.description}</td>
                <td>{chama.location}</td>
                <td>{chama.address}</td>
                <td>{chama.certificate?chama.certificate:'_'}</td>
                <td>{formatCreatedDate(chama.date_created)}</td>
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
            ))}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default cbo