import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StudentDetails.module.css";

const StudentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        fullName,
        email,
        phone,
        address,
        dob,
        gender,
        tenthMarks,
        twelfthMarks,
        entranceExam,
        selectedCollege,
        selectedCareer,
    } = location.state || {};

    const studentDetails = {
        fullName,
        email,
        phone,
        address,
        dob,
        gender,
        tenthMarks,
        twelfthMarks,
        entranceExam,
        selectedCareer,
    };

    const handleAptitudeTest = () => {
        navigate("/aptitude-test", {
            state: {
                selectedCollege,
                studentDetails,
            },
        });
    };

    if (!location.state) {
        return <p className={styles.error}>No student data found.</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>Student Details</h2>
                <div className={styles.infoGrid}>
                    <div><strong>Full Name:</strong><p>{fullName}</p></div>
                    <div><strong>Email:</strong><p>{email}</p></div>
                    <div><strong>Phone:</strong><p>{phone}</p></div>
                    <div><strong>Address:</strong><p>{address}</p></div>
                    <div><strong>Date of Birth:</strong><p>{dob}</p></div>
                    <div><strong>Gender:</strong><p>{gender}</p></div>
                    <div><strong>10th Marks:</strong><p>{tenthMarks}</p></div>
                    <div><strong>12th Marks:</strong><p>{twelfthMarks}</p></div>
                    <div><strong>Entrance Exam Score:</strong><p>{entranceExam || "N/A"}</p></div>
                    <div><strong>Selected Career:</strong><p>{selectedCareer}</p></div>
                    <div><strong>Selected College:</strong><p>{selectedCollege}</p></div>
                </div>
                <div className={styles.buttonWrapper}>
                    <button onClick={handleAptitudeTest} className={styles.startBtn}>
                        Start Aptitude Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
