import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import colSel from "./CollegeSelection.module.css";

const CollegeSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { college } = location.state || {};

    if (!college) {
        return <p>No college data available.</p>;
    }

    const handleRegister = () => {
        // Navigate to registration page and pass college name if needed
        navigate("/college-register",{
state: {
            college: college.name,
            career: college.career,
        },
        } 
        );
    };

    return (
        <div className={colSel.container}>
            <h1 className={colSel.pageHeading}>College Selection</h1>

            <h2>{college.name}</h2>
            <p><strong>Career:</strong> {college.career}</p>
            <p><strong>Location:</strong> {college.location}</p>
            <p><strong>Fees:</strong> ₹{college.fees}</p>
            <p><strong>Hostel Fees:</strong> ₹{college.hostel_charges}</p>
            <p><strong>Eligibility:</strong> {college.eligibility}</p>
            <p><strong>Placement:</strong> {college.placement}</p>
            <p><strong>Scholarship:</strong> {college.scholarship}</p>
            <p><strong>Campus Support:</strong> {college.campus_support}</p>

            <button className={`${colSel.registerBtn}`} onClick={handleRegister}>Register for this College</button>
        </div>
    );
};

export default CollegeSelection;
