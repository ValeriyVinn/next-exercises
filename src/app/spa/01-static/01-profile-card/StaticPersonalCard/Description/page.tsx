import styles from "./page.module.css";


export default function Description({ description }: { description: string }) {
  return <p className={styles.staticPersonalCardDescription}>{description}</p>;
}   