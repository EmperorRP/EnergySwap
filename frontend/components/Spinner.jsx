import React from "react";
import styles from "../styles/Spinner.module.css";
import Image from 'next/image';

export default function Spinner() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.loading_spinner}>
      <Image src="/Logo.svg" alt="logo" width={40} height={46} />
      </div>
    </div>
  );
}