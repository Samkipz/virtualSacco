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
                <FaPeopleGroup />
                Create Chama
            </div>
            <div className={styles.multistepItem}>
                <MdGroupAdd />
                Add Members
            </div>
            <div className={styles.multistepItem}>
                <FaSlideshare />
                Contribution setup
            </div>
            <div className={styles.multistepItem}>
                <RiBankFill />
                Configure Bank
            </div>
            <div className={styles.multistepItem}>
                <GiConfirmed />
                Confirmaton
            </div>
        </div>
  )
}

export default MultistepFormBar