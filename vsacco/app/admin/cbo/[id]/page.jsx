"use client"
import { fetchChama } from "@/app/lib/actions/fetchChama";
import styles from "./chamaId.module.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const SingleChama = () => {
  const [Chama, setChama] = useState(null);
  const pathname = usePathname();

  const chamaId = pathname.split("/").pop();

  const getChama = async (chamaId) =>{
    const fetchedChama = await fetchChama(chamaId);
    setChama(fetchedChama);
  }

  useEffect(()=>{
    getChama(chamaId);
  },[chamaId])

  if(Chama) console.log("------->",Chama);



  return (
    <div className={styles.container}>
      <div className={styles.cardsCircleRow}>
        <div className={styles.cardsColumn}>
          <div className={styles.card}>
            <h3>Members</h3>
            <p>Total: 8</p>
          </div>
          <div className={styles.card}>
            <h3>Contribution</h3>
            <p>KShs. 200000</p>
          </div>
          <div className={styles.card}>
            <h3>Events</h3>
            <p>2 Upcoming this month</p>
          </div>
        </div>

        <div className={styles.circlesBtnColumn}>
          <div className={styles.BtnsRow}>
              <button className={styles.button}>Contributions</button>
              <button className={styles.button}>Edit Chama</button>
              <button className={styles.button}>Create Event</button>
              <button className={styles.button}>Post a blog</button>
          </div>

          <div className={styles.circlesRow}>
            <div className={styles.circle}>
              <h4>KShs. 20000</h4>
              <p>Total Loans</p>
            </div>
            <div className={styles.circle}>
              <h4 className={styles.h4}>KShs. 100000</h4>
              <p>Total Contribution</p>
            </div>
          </div>

        </div>
      </div>

      

      <div className={styles.tableContainer}>
        <h3>Recent Members</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Names</th>
              <th>Id Number</th>
              <th>Id File</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Joe Doe</td>
              <td>32628002</td>
              <td>
                <a href="/path/to/file/sample.pdf" download>
                  sample.pdf
                </a>
              </td>
              <td>
              <div className={styles.BtnsRow}>
                  <button className={styles.button}>Accept</button>
                  <button className={styles.button}>Decline</button>
                  <button className={styles.button}>View</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.tableContainer}>
        <h3>Recent Transactions</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Names</th>
              <th>Transaction Type</th>
              <th>Transaction Category</th>
              <th>Transaction Id</th>
              <th>Transaction Date</th>
              <th>Authorized By</th>
              <th>View More Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Smith</td>
              <td>Deposit</td>
              <td>General Contribution</td>
              <td>TX123456</td>
              <td>2024-06-24</td>
              <td>Admin</td>
              <td>
                <button className={styles.button}>View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleChama;
