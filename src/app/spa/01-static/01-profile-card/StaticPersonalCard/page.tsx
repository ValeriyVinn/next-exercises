import Image from "next/image";
import styles from "./page.module.css";
import MBM from "./images/MBM.jpg";
import Name from "./Name/page";
import Role from "./Role/page";
import Description from "./Description/page";
import Contact from "./Contact/page";

export default function StaticPersonalCard() {
  const object = {
    name: "Richard Hot Smile",
    role: "Marching Band member",
    description:
      "Richard is a smiling member of the marching band, known for his exceptional talent and passionate performance.",
    contact: {
      phone: "(123) 456-78-90",
    },
  };

  return (
    <div className={styles.staticPersonalCardContainer}>
      <Image
        src={MBM}
        alt="Profile"
        className={styles.staticPersonalCardImage}
        width={400}
        height={400}
      />
      <Name name={object.name} />
      <Role role={object.role} />
      <Description description={object.description} />

      <address className={styles.staticPersonalCardAddress}>
        <Contact phone={object.contact.phone} />
        <button className={styles.staticPersonalCardCallButton}>Call</button>
      </address>
    </div>
  );
}
