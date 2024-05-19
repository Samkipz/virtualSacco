import styles from './multistepformbar.module.css'
import { FaPeopleGroup } from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";
import { FaSlideshare } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";


const MultistepFormBar = () => {
  return (
        <div className={styles.multistepBar}>
            <div className={styles.multistepItem}>
                <div className={styles.text}>
                    <FaPeopleGroup />Create Chama
                </div>
                <span> 
                    <h3>1</h3> 
                    <hr className={styles.myHr}/> 
                    <h4>❯❯</h4> 
                </span>
            </div>

            <div className={styles.multistepItem}>
                <div className={styles.text}>
                    <MdGroupAdd />Add Members
                </div>
                <span> 
                    <h3>2</h3> 
                    <hr className={styles.myHr}/> 
                    <h4>❯❯</h4> 
                </span>
            </div>

            <div className={styles.multistepItem}>
                <div className={styles.text}>
                    <FaSlideshare />Set up contribution
                </div>
                <span> 
                    <h3>3</h3> 
                    <hr className={styles.myHr}/> 
                    <h4>❯❯</h4> 
                </span>
            </div>

            <div className={styles.multistepItem}>
                <div className={styles.text}>
                    <RiBankFill />Configure Bank
                </div>
                <span> 
                    <h3>4</h3> 
                    <hr className={styles.myHr}/> 
                    <h4>❯❯</h4> 
                </span>
            </div>
                
            <div className={styles.multistepItem}>
                <div className={styles.text}>
                    <GiConfirmed />Confirm details
                </div>
                <span> 
                    <h3>5</h3> 
                    <hr className={styles.myHr}/> 
                    <h4>❯❯</h4> 
                </span>
            </div>
        </div>
  )
}

export default MultistepFormBar