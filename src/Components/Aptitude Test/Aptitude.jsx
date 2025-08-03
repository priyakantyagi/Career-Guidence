import React from "react";
import styles from "./Aptitude.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const Aptitude = () => {
  const location = useLocation();
  const { selectedCollege, studentDetails } = useLocation().state || {};
  const navigate = useNavigate();

  const handleQuantitativeTest = () => {
    navigate("/quantitative-test", {
      state: {
        selectedCollege,
        studentDetails,
      },
    });
  }
  const handleVerbalTest = () => {
    navigate("/verbal-test", {
      state: {
        selectedCollege,
        studentDetails,
      },
    });
  }
  const handleGkTest = () => {
    navigate("/generalKnowledge-test", {
      state: {
        selectedCollege,
        studentDetails,
      },
    });
  }

  console.log("student college", selectedCollege)
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h2 className={styles.heading}>Aptitude Test</h2>
        <h3 className={styles.description}>
          Prepare yourself with a variety of questions in Quantitative, Verbal, and General Knowledge.
        </h3>

        <div className={styles.sectionGrid}>
          <div onClick={handleQuantitativeTest} className={styles.sectionCard}>
            <h3>Quantitative</h3>
            <p>Test your problem-solving and math skills.</p>
            <button className={styles.startBtn}>Start</button>
          </div>

          <div onClick={handleVerbalTest} className={styles.sectionCard}>
            <h3>Verbal</h3>
            <p>Improve grammar, vocabulary, and comprehension.</p>
            <button className={styles.startBtn}>Start</button>
          </div>

          <div onClick={handleGkTest} className={styles.sectionCard}>
            <h3>General Knowledge</h3>
            <p>Stay sharp with current affairs and static GK.</p>
            <button className={styles.startBtn}>Start</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Aptitude;
