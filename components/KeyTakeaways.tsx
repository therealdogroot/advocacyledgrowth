/**
 * Designed Key takeaways box. Kept unused until approved manuscript copy exists.
 * Do not import on chapter pages.
 */
import styles from "./KeyTakeaways.module.css";

type KeyTakeawaysProps = {
  items: string[];
};

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  return (
    <div className={styles.box}>
      <p className={styles.label}>Key takeaways</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
