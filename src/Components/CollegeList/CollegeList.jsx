import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import colList from "./CollegeList.module.css";

const CollegeList = () => {
    const reactRouterLocation = useLocation();
    const navigate = useNavigate();
    const { career, location: studyLocation } = reactRouterLocation.state || {};

    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchColleges = async () => {
            const { data, error } = await supabase
                .from("colleges_data")
                .select("*")
                .ilike("career", career)
                .ilike("location", studyLocation);

            if (error) {
                console.error("Error fetching colleges:", error);
            } else {
                setColleges(data);
            }
            setLoading(false);
        };

        fetchColleges();
    }, [career, studyLocation]);

    const handleCollegeClick = (college) => {
        navigate("/college-selection", { state: { college } });
    };

    return (
        <div className={`${colList.bigContainer}`}>
            <div className={colList.container}>
                <h2 className={colList.heading}>
                    Colleges for {career} in {studyLocation}
                </h2>

                {loading ? (
                    <p>Loading...</p>
                ) : colleges.length > 0 ? (
                    <ul className={colList.list}>
                        {colleges.map((clg) => (
                            <li
                                key={clg.id}
                                className={colList.card}
                                onClick={() => handleCollegeClick(clg)}
                            >
                                <h3>{clg.name}</h3>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No colleges found for this combination.</p>
                )}
            </div>
        </div>
    );
};

export default CollegeList;
