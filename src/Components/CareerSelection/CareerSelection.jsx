import React from "react";
import cl from "./CareerSelection.module.css";
import clRes from "./CareerSelRes.module.css"
import { useNavigate } from "react-router-dom";
import engineering from '../Assets/engineering.avif';
import medical from '../Assets/medical.avif';
import law from '../Assets/Law.avif';
import coding from '../Assets/coding.avif';

const CareerSelection = () => {
  const navigate = useNavigate();

  const careers = [
    { title: "Engineering", image: engineering },
    { title: "Medical", image: medical },
    { title: "Computer Science", image: coding },
    { title: "Law", image: law },
  ];

  const handleSelect = (career) => {
    navigate("/location-selection", { state: { career } });
  };

  return (
    <div className={`${cl.bigContainer}`}>
        <h2 className={cl.heading}>Select Your Career Interest</h2>
      <div className={cl.containerfirst}>
        <div className={`${cl.row}`}>
          {careers.map((career, index) => (
            <div
              key={index}
              className={`${cl.col4} ${clRes.colT5} ${clRes.colp12} ${cl.card}`}
              onClick={() => handleSelect(career.title)}
            >
              <img src={career.image} alt={career.title} className={cl.image} />
              <h3>{career.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerSelection;
