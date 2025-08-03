import React, { useEffect, useState } from "react";
import { useScore } from "../../Context/ScoreContext";
import { supabase } from "../../supabaseClient";
import styles from "./TestCompletion.module.css";
import { useNavigate,useLocation } from "react-router-dom";

const TestCompletion = () => {
    const location = useLocation();
    const { selectedCollege, studentDetails } = location.state || {};
    const { scores } = useScore();
    const total = scores.quantitative + scores.verbal + scores.gk;
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({
        tenth: null,
        twelfth: null,
    });
    const handleEligibilityClick = () => {
        navigate("/check-eligibility", {
            state: {
                selectedCollege,
                studentDetails,
            },
        });
    };

    useEffect(() => {
        const fetchStudentData = async () => {
            // 🔹 Step 1: Get user session
            const { data: userData, error: userErr } = await supabase.auth.getUser();
            console.log("Supabase User:", userData);

            const userEmail = userData?.user?.email;
            if (!userEmail) {
                console.warn("User email not found.");
                return;
            }

            // 🔹 Step 2: Fetch from Supabase
            const { data, error } = await supabase
                .from("college_registrations")
                .select("tenth_marks, twelfth_marks")
                .eq("email", userEmail)
                .limit(1);
    console.log(data[0]) ;


            console.log("Supabase response:", { data, error });

            if (error) {
                console.error("Error fetching student data:", error.message);
            } else if (data) {
                console.log("Fetched student marks:", data);
                setStudentData({
                    tenth: data[0].tenth_marks,
                    twelfth: data[0].twelfth_marks,
                });
            } else {
                console.warn("No student record found.");
            }
        };

        fetchStudentData();
    }, []);


    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Test Completed!</h2>

            <div className={styles.scoreSection}>
                <p>Quantitative Score:&nbsp;&nbsp; <strong>{scores.quantitative}</strong></p>
                <p>Verbal Score:&nbsp;&nbsp; <strong>{scores.verbal}</strong></p>
                <p>General Knowledge Score:&nbsp;&nbsp; <strong>{scores.gk}</strong></p>
                <hr />
                <h3>Total Score:&nbsp; <strong>{total} / 30</strong></h3>
            </div>

            <div className={styles.percentSection}>
                <h4>Your Academic Percentages:</h4>
                <p>10th Percentage:&nbsp;&nbsp; <strong>{studentData.tenth ?? "Loading..."}</strong></p>
                <p>12th Percentage:&nbsp;&nbsp; <strong>{studentData.twelfth ?? "Loading..."}</strong></p>
            </div>

            <div className={styles.eligibilityButtonWrapper}>
                <button onClick={handleEligibilityClick} className={styles.eligibilityButton}>
                    Check: Am I eligible for this college?
                </button>
            </div>
        </div>
    );
};

export default TestCompletion;
