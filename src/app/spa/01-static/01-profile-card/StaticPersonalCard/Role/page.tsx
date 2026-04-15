import styles from "./page.module.css";

export default function Role({ role }: { role: string }) {
  return <h2 className={styles.staticPersonalCardRole}>{role}</h2>;
}