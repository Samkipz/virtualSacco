import styles from "./profilepage.module.css";
import Link from "next/link";
import Image from "next/image";
import {
  MdCheckCircle,
  MdOutlinePending,
  MdLockClock,
  MdOutlineWarningAmber,
} from "react-icons/md";
import { auth } from "../api/auth/auth";
// import { redirect } from "next/navigation";
// import { getUserProfile } from "../lib/actions/getUser";

const Profile = async () => {
  const session = await auth();
  const userIdNum = session.idNum;

  const user = await prisma.user.findUnique({
    where: {
      idNum: userIdNum,
    },
    include: {
      user_has_chama: {
        include:{
          chama: true,
        }
      },
    },
  });

  // const user = JSON.stringify(fetchUser, null, 2)

  console.log("Profile user -->>", user);
  // console.log("Profile user -->>", user?.firstname);

  // Dummy data for demonstration
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "0712345678",
    dob: "1990-01-01",
    cbos: [
      { name: "CBO One", role: "Member", status: "Active" },
      { name: "CBO Two", role: "Admin", status: "Pending" },
      { name: "CBO Three", role: "Member", status: "Revoked" },
    ],
    saccos: [
      { name: "Sacco One", role: "Member", status: "Active" },
      { name: "Sacco Two", role: "Admin", status: "Pending" },
      { name: "Sacco Three", role: "Member", status: "Revoked" },
    ],
    events: [{ name: "Event One", date: "2024-06-15" }],
    finances: {
      balance: "10000",
      contributions: "200000",
    },
    loans: [
      { name: "Loan One", amount: "200", status: "Paid" },
      { name: "Loan Two", amount: "300", status: "Ongoing" },
    ],
    otherCbos: [{ name: "CBO Four" }, { name: "CBO Five" }],
  };

  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.row} ${styles.left}`}>
        <div className={styles.profilePicArea}>
          <Image
            src="/noavatar.png"
            alt="profile pic"
            width="200"
            height="200"
          />
          <div className={styles.userNameInfo}>
            <h4 className={styles.h4}>
              {user.firstname} {user.othernames}
            </h4>
            <h6 className={styles.h6}>{user.email}</h6>
            <Link href="#" className={styles.editBtn}>
              Edit Profile
            </Link>
          </div>
        </div>
        <div className={styles.profileCompleteArea}>
          <div className={styles.uiWidgets}>
            <div className={styles.uiValues}>85%</div>
          </div>
          <h4 className={styles.h4}>Profile Complete</h4>
        </div>
      </div>

      <div className={`${styles.row} ${styles.middle}`}>
        <div className={styles.profileCard}>
          <h3 className={styles.h3}>Personal Information</h3>

          <div className={styles.userInfo}>
            <h6 className={styles.h6}>Name</h6>
            <p>
              {user.firstname} {user.othernames}
            </p>
          </div>
          <div className={styles.userInfo}>
            <h6 className={styles.h6}>Email</h6>
            <p>{user.email}</p>
          </div>
          <div className={styles.userInfo}>
            <h6 className={styles.h6}>Phone</h6>
            <p>
              {user.phone1} / {user.phone2}
            </p>
          </div>
          <div className={styles.userInfo}>
            <h6 className={styles.h6}>Date of Birth:</h6>
            <p>{userData.dob}</p>
          </div>
        </div>
        <div className={styles.profileCard}>
          <h3 className={styles.h3}>My Memberships</h3>
          <div className={styles.membershipExplore}>
            <h4 className={styles.h4}>Chama Memberships</h4>
            <Link href="/#"> Explore Chamas</Link>
          </div>

          

          {user.user_has_chama.length  ? (
          
          <table className={styles.table}>
            <thead>
              <tr className={styles.thead}>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.user_has_chama.map((chama, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{chama.chama.name}</td>
                  <td>{chama.role}</td>
                  <td>
                    <div
                      className={`${styles.status} ${
                        chama.status === "approved"
                          ? styles.active
                          : chama.status === "pending"
                          ? styles.pending
                          : styles.revoked
                      }`}
                    >
                      {chama.status === "approved" ? (
                        <p>
                          <MdCheckCircle /> Active
                        </p>
                      ) : chama.status === "pending" ? (
                        <p>
                          <MdOutlinePending /> Pending
                        </p>
                      ) : (
                        <p>
                          <MdOutlineWarningAmber /> Revoked
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <Link href={`/profile/chama/${encodeURIComponent(chama.chama.name)}`} className={styles.linKBtn}>
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) :
          <span className={styles.noMembership}>
            You have not joined any Chama. Click explore
            Chamas button above to browse and join chamas</span>}
          
          <br />
          <div className={styles.membershipExplore}>
            <h4 className={styles.h4}>Sacco Memberships</h4>
            <Link href="/#"> Explore Sacco</Link>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.saccos.map((sacco, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {sacco.name}
                  </td>
                  <td>{sacco.role}</td>
                  <td>
                    <div
                      className={`${styles.status} ${
                        sacco.status === "Active"
                          ? styles.active
                          : sacco.status === "Pending"
                          ? styles.pending
                          : styles.revoked
                      }`}
                    >
                      {sacco.status === "Active" ? (
                        <p>
                          <MdCheckCircle /> Active
                        </p>
                      ) : sacco.status === "Pending" ? (
                        <p>
                          <MdOutlinePending /> Pending
                        </p>
                      ) : (
                        <p>
                          <MdOutlineWarningAmber /> Revoked
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <Link href={`/profile/sacco/${encodeURIComponent(sacco.name)}`} className={styles.linKBtn}>
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${styles.row} ${styles.right}`}>
        <div className={styles.profileCard}>
          <h3 className={styles.h3}>Financial Details</h3>

          <div className={styles.financialSection}>
            <h4 className={styles.h4}>Chama Contributions</h4>
            <div className={styles.lightRedRegion}>
              <h4 className={styles.h4}>
                {userData.finances.contributions} KES
              </h4>
            </div>
            <div className={styles.extraInfo}>
              <div className={styles.smallCol}>
                <h6 className={styles.h6}>Term</h6>
                <p>6 Months</p>
              </div>
              <hr />
              <div className={styles.smallCol}>
                <h6 className={styles.h6}>Deductions</h6>
                <p>Excluded</p>
              </div>
              <hr />
              <div className={styles.smallCol}>
                <h6 className={styles.h6}>Chamas</h6>
                <p>3 Chamas</p>
              </div>
            </div>
          </div>

          <div className={styles.financialSection}>
            <h4 className={styles.h4}>Sacco Contributions</h4>
            <div className={styles.lightRedRegion}>
              <h4 className={styles.h4}>{userData.finances.balance} KES</h4>
            </div>
            <div className={styles.extraInfo}>
              <div className={styles.smallCol}>
                <h6 className={styles.h6}>Term</h6>
                <p>4 Months</p>
              </div>
              <hr />
              <div className={styles.smallCol}>
                <h6 className={styles.h6}>Deductions</h6>
                <p>Excluded</p>
              </div>
              <hr />
              <div className={styles.smallCol}>
                <h6 className={styles.h6}>Saccos</h6>
                <p>1 Sacco</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileCard}>
          <h3 className={styles.h3}>My Loans</h3>

          <table className={styles.table}>
            <thead>
              <tr className={styles.thead}>
                <td>Name</td>
                <td>Amount</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {userData.loans.map((loan, index) => (
                <tr key={index}>
                  <td>
                    {index + 1} {loan.name}
                  </td>
                  <td>{loan.amount}</td>
                  <td>
                    <div
                      className={`${styles.status} ${
                        loan.status === "Paid"
                          ? styles.active
                          : loan.status === "Ongoing"
                          ? styles.pending
                          : styles.revoked
                      }`}
                    >
                      {loan.status === "Paid" ? (
                        <p>
                          <MdCheckCircle /> Paid
                        </p>
                      ) : loan.status === "Ongoing" ? (
                        <p>
                          <MdOutlinePending /> Ongoing
                        </p>
                      ) : (
                        <p>
                          <MdOutlineWarningAmber /> Arrears
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.profileCard}>
          <h3 className={styles.h3}>Upcoming Events</h3>
          {userData.events.map((event, index) => (
            <div key={index} className={styles.eventItem}>
              <div className={styles.dateArea}>
                <div className={styles.bgDate}>8</div>
                <div className={styles.smallMonth}>Nov</div>
              </div>
              <div className={styles.detailsArea}>
                <h4 className={styles.h4}>SOME TITLE</h4>
                <div className={styles.eventDetails}>
                  CBO One contribution Deadline
                </div>
                <div className={styles.eventTime}>
                  <p>
                    <MdLockClock /> 10.45 am
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <h2 className={styles.h2}>Profile</h2>
        <div className={styles.profileCard}>
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Date of Birth:</strong> {userData.dob}</p>
        </div>
        <div className={styles.profileCard}>
          <h3>CBO Memberships</h3>
          {userData.cbos.map((cbo, index) => (
            <div key={index} className={styles.cboItem}>
              <p><strong>Name:</strong> {cbo.name}</p>
              <p><strong>Role:</strong> {cbo.role}</p>
              <p><strong>Status:</strong> {cbo.status}</p>
            </div>
          ))}
        </div>
        <div className={styles.profileCard}>
          <h3>Profile Settings</h3>
          <Link href="/profile/settings">Edit Profile</Link>
        </div>
        <div className={styles.profileCard}>
          <h3>Upcoming Events</h3>
          {userData.events.map((event, index) => (
            <div key={index} className={styles.eventItem}>
              <p><strong>Event:</strong> {event.name}</p>
              <p><strong>Date:</strong> {event.date}</p>
            </div>
          ))}
        </div>
        <div className={styles.profileCard}>
          <h3>User Finances</h3>
          <p><strong>Balance:</strong> {userData.finances.balance}</p>
          <p><strong>Contributions:</strong> {userData.finances.contributions}</p>
        </div>
        <div className={styles.profileCard}>
          <h3>Loans</h3>
          {userData.loans.map((loan, index) => (
            <div key={index} className={styles.loanItem}>
              <p><strong>Loan:</strong> {loan.name}</p>
              <p><strong>Amount:</strong> {loan.amount}</p>
              <p><strong>Status:</strong> {loan.status}</p>
            </div>
          ))}
        </div>
        <div className={styles.profileCard}>
          <h3>Other CBOs</h3>
          {userData.otherCbos.map((cbo, index) => (
            <div key={index} className={styles.cboItem}>
              <p>{cbo.name}</p>
              <Link href={`/cbos/${cbo.name}`}>View Details</Link>
            </div>
          ))}
        </div> */}
    </div>
  );
};

export default Profile;
