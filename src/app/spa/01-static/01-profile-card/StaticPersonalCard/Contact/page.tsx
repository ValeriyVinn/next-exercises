import styles from "./page.module.css";

export default function Contact({ phone }: { phone: string }) {


  return (
    <div className={styles.staticPersonalCardContact}>
      <p>{phone}</p>
    </div>
  );
}
