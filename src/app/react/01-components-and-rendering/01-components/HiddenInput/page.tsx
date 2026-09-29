import React from "react";
import styles from  "./page.module.css";

export default function CustomRadio() {
  return (
    <form>
      <h3>Кастомна стилізація з прихованим input</h3>

      <input type="radio" id="kraken" name="monster" value="kraken" className={styles.hiddenInput} />
      <label htmlFor="kraken" className={styles.customLabel} >
        Kraken
      </label>

      <input type="radio" id="hydra" name="monster" value="hydra" className={styles.hiddenInput} />
      <label htmlFor="hydra" className={styles.customLabel}>
        Hydra
      </label>
    </form>
  );
}