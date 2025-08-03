import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Location.module.css";

const LocationSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const career = location.state?.career;

  const handleSelect = (locationValue) => {
    navigate("/college-list", {
      state: { career, location: locationValue }
    });
  };

  return (
    <div className={`${styles.bigContainer}`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Select Your Preferred Study Location</h2>
        <div className={styles.grid}>
          <div className={styles.card} onClick={() => handleSelect("India")}>
            <img
              src="https://img.icons8.com/color/480/india.png"
              alt="India"
              className={styles.image}
            />
            <h3>India</h3>
          </div>
          <div className={styles.card} onClick={() => handleSelect("Abroad")}>
            <img
              src="https://img.icons8.com/color/480/globe--v1.png"
              alt="Abroad"
              className={styles.image}
            />
            <h3>Abroad</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelection;
