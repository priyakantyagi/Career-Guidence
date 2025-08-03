import React from "react";
import styles from "./CheckEligibility.module.css";
import { useLocation,useNavigate } from "react-router-dom";
import { useScore } from "../../Context/ScoreContext";

const collegeEligibilityCriteria = {
    // INDIA
    "IIT Kharagpur": {
        required10th: 80,
        required12th: 80,
        requiredAptitude: 20,
    },
    "IIT Bombay": {
        required10th: 85,
        required12th: 85,
        requiredAptitude: 20,
    },
    "IIT Delhi": {
        required10th: 75,
        required12th: 80,
        requiredAptitude: 20,
    },
    "AIIMS New Delhi": {
        required10th: 80,
        required12th: 75,
        requiredAptitude: 20,
    },
    "JIPMER Puducherry": {
        required10th: 80,
        required12th: 75,
        requiredAptitude: 20,
    },
    "AFMC Pune": {
        required10th: 80,
        required12th: 85,
        requiredAptitude: 20,
    },
    "CMC Vellore": {
        required10th: 75,
        required12th: 85,
        requiredAptitude: 20,
    },
    "IIT Kanpur": {
        required10th: 80,
        required12th: 85,
        requiredAptitude: 20,
    },
    "National Law University, Delhi": {
        required10th: 85,
        required12th: 85,
        requiredAptitude: 20,
    },
    "India Institute of Technology, Kharagpur": {
        required10th: 85,
        required12th: 80,
        requiredAptitude: 20,
    },
    "NALSAR University of Law, Hyderabad": {
        required10th: 70,
        required12th: 75,
        requiredAptitude: 20,
    },
    "Gujarat National Law University": {
        required10th: 80,
        required12th: 85,
        requiredAptitude: 20,
    },

    //   ABROAD
    "Stanford University (USA)": {
        required10th: 90,
        required12th: 90,
        requiredAptitude: 25,
    },
    "University of Oxford (UK)": {
        required10th: 95,
        required12th: 90,
        requiredAptitude: 25,
    },
    "Imperial College London (UK)": {
        required10th: 90,
        required12th: 90,
        requiredAptitude: 25,
    },
    "California Institute of Technology (USA)": {
        required10th: 90,
        required12th: 90,
        requiredAptitude: 25,
    },
    "John Hopkins University (USA)": {
        required10th: 95,
        required12th: 90,
        requiredAptitude: 28,
    },
    "University of Cambridge (UK)": {
        required10th: 90,
        required12th: 90,
        requiredAptitude: 25,
    },
    "Harvard University (USA)": {
        required10th: 95,
        required12th: 90,
        requiredAptitude: 28,
    },
    "Carnegie Mellon University, USA": {
        required10th: 95,
        required12th: 90,
        requiredAptitude: 25,
    },
    "Columbia University, USA": {
        required10th: 95,
        required12th: 90,
        requiredAptitude: 25,
    },
    "University College London, UK": {
        required10th: 90,
        required12th: 90,
        requiredAptitude: 25,
    },
    "Carnegie Mellon University, USA": {
        required10th: 95,
        required12th: 90,
        requiredAptitude: 25,
    },
    "University of Oxford, UK": {
        required10th: 90,
        required12th: 90,
        requiredAptitude: 25,
    },
    "University of Cambridge, UK": {
        required10th: 90,
        required12th: 90,
        requiredAptitude: 25,
    },

};

const CheckEligibility = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { scores } = useScore();
    const studentDetails = location.state?.studentDetails;
    const selectedCollege = location.state?.selectedCollege;

    const studentApti = scores.quantitative + scores.verbal + scores.gk;
    const tenth = studentDetails?.tenthMarks || 0;
    const twelfth = studentDetails?.twelfthMarks || 0;

    const collegeCriteria = collegeEligibilityCriteria[selectedCollege];

    const notEligibleReasons = [];

    if (collegeCriteria) {
        if (tenth < collegeCriteria.required10th) {
            notEligibleReasons.push("your 10th percentage is less than required");
        }
        if (twelfth < collegeCriteria.required12th) {
            notEligibleReasons.push("your 12th percentage is less than required");
        }
        if (studentApti < collegeCriteria.requiredAptitude) {
            notEligibleReasons.push("your aptitude score is less than required");
        }
    }

    const isEligible = collegeCriteria && notEligibleReasons.length === 0;

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}></h2>
            <h2 className={styles.heading}>Your Scores</h2>
            <p><b>10th Percentage:</b>&nbsp;&nbsp;{tenth}%</p>
            <p><b>12th Percentage:</b>&nbsp;&nbsp;{twelfth}%</p>
            <p><b>Aptitude Score:</b>&nbsp;&nbsp;{studentApti}</p>

            <h2 className={styles.heading2}>Required Scores</h2>
            <p><b>Required 10th Percentage:</b>&nbsp;&nbsp;{collegeCriteria?.required10th ?? "N/A"}%</p>
            <p><b>Required 12th Percentage:</b>&nbsp;&nbsp;{collegeCriteria?.required12th ?? "N/A"}%</p>
            <p><b>Required Aptitude Score:</b>&nbsp;&nbsp;{collegeCriteria?.requiredAptitude ?? "N/A"}</p>

            <div className={styles.result}>
                {collegeCriteria ? (
                    isEligible ? (
                        <p className={styles.eligible}>
                            Congratulations! You're eligible for this college.
                        </p>
                    ) : (
                        <p className={styles.notEligible}>
                            Sorry! You're not eligible for this college
                            {notEligibleReasons.length > 0 && (
                                <>
                                    , because {notEligibleReasons.join(", ")}.
                                </>
                            )}
                        </p>
                    )
                ) : (
                    <p className={styles.notEligible}>
                        No eligibility data found for the selected college.
                    </p>
                )}
            </div>
            <div className={styles.BackButtonWrapper}>
                <button onClick={()=>navigate('/career-selection')} className={styles.BackButton}>
                    Back to home
                </button>
            </div>
        </div>
    );
};

export default CheckEligibility;
