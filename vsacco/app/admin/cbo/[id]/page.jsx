import styles from "./chamaId.module.css";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cards}>
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

      <div className={styles.buttons}>
        <button className={styles.button}>Post a blog</button>
        <button className={styles.button}>Edit Chama</button>
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
              <td><button className={styles.button}>Accept</button></td>
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
              <td><button className={styles.button}>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.circleContainer}>
        <div className={styles.circle}>
          <p>Total Loans</p>
          <h4>KShs. 20000</h4>
        </div>
        <div className={styles.circle}>
          <p>Total Contribution</p>
          <h4>KShs. 100000</h4>
        </div>
      </div>
    </div>
  );
};

export default page;
