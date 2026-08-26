import styles from "./KeyboardFirst.module.css";

type AccordionItem = {
  id: string;
  label: string;
  description?: string;
  items?: AccordionItem[];
};

type AccordionSection = {
  id: string;
  title: string;
  items: AccordionItem[];
};

type KeyboardFirstData = {
  title: string;
  sections: AccordionSection[];
};

type Props = {
  data: KeyboardFirstData;
};

function AccordionItem({
  item,
  level,
}: {
  item: AccordionItem;
  level: number;
}) {
  return (
    <details open={level === 0}>
      <summary>{item.label}</summary>

      {item.description && <p className= {styles.description}>{item.description}</p>}

      {item.items?.map((child) => (
        <AccordionItem
          key={child.id}
          item={child}
          level={level + 1}
        />
      ))}
    </details>
  );
}

export default function KeyboardFirst({ data }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data.title}</h1>

      <div className={styles.sections}>
        {data.sections.map((section) => (
          <details
            key={section.id}
            className={styles.section}
          >
            <summary className={styles.sectionButton}>
              <span>{section.title}</span>
              <span className={styles.arrow}>⌄</span>
            </summary>

            <div className={styles.sectionContent}>
              {section.items.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  level={0}
                />
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}