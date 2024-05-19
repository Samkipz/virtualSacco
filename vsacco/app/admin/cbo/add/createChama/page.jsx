import { useState } from "react";
import styles from './createchama.module.css'

const CreateChamaForm = () => {
  const [isDependant, setIsDependant] = useState(false);

  return (
    <div className={styles.container}>
      <form action='' className={styles.form} >
        
        <label className={styles.label}>Name of the Chama</label>
        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Name of the Chama"
            name="chama_name"
            required
          />
        </div>

        <label className={styles.label}>Description</label>
        <div className={styles.inputArea}>
          <textarea
          placeholder="Give a detailed description of the chama"
          name="description"
          required
          />
        </div>

        <div className={styles.inputArea}>
          <div className={styles.halfWidth}>
            <label className={styles.label}>Maximum number of Members</label>
            <input type="number" name="maxMembers" placeholder="e.g. 10" required />
          </div>
          <div className={styles.halfWidth}>
            <label className={styles.label}>Niche the Chama Belongs to</label>
            <select name="niche" className={styles.dropdown}>
              <option value="education">--Select the Category of this Chama--</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="community_development">Community Development</option>
              <option value="housing">Housing</option>
              <option value="general">General</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className={styles.inputArea}>
          <div className={styles.halfWidth}>
            <label className={styles.label}>County the Chama Belongs</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className={styles.halfWidth}>
            <label className={styles.label}>Address</label>
            <input type="text" name="address" placeholder="Address" />
          </div>
        </div>




        <div className={styles.inputArea}>
          <div className={styles.halfWidth}>
          <div className={styles.checkboxToreveal}>
          <div className={styles.checboxLabel}>
            Is the chama registered?
          </div>

          <div className={styles.checkboxOption}>
            <input
              type="radio"
              id="yesDependant"
              name="dependant"
              onChange={() => setIsDependant(true)}
              checked={isDependant}
            />
            <label htmlFor="yesDependant">Yes</label>
            <input
              type="radio"
              id="noDependant"
              name="dependant"
              onChange={() => setIsDependant(false)}
              checked={!isDependant}
            />
            <label htmlFor="noDependant">No</label>
          </div>
        </div>
        </div>
          <div className={styles.halfWidth}>
          {isDependant && (
        <div>
          <label className={styles.label}>Enter the certificate registration number</label>
          <input
            type="text"
            name="certificate"
            placeholder="e.g. DFR6772GV22S55"
            required
          />
        </div>
      )}
          </div>
        </div>
        
        <button type="submit" className={styles.submitButton}>
          Save and Continue
        </button>
      </form>
    </div>
  )
}

export default CreateChamaForm