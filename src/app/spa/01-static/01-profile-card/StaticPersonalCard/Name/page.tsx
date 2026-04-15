import styles from "./page.module.css";

export default function Name({ name }: { name: string }) {
  return <h1 className={styles.staticPersonalCardHeader}>{name}</h1>;
}
