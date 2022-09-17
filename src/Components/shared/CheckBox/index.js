import React from "react";
import styles from "./CheckBox.module.css";

const CheckBox = props => {
  const { label, small, onChange, value, checked } = props;
  return (
    <label className={`${styles.container} ${small ? "small" : ""} `}>
      {label}

      <input type="checkbox" onChange={onChange} value={value} checked={checked} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CheckBox;
