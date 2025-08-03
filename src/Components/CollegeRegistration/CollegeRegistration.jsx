import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ClgRegistration.module.css";
import { supabase } from "../../supabaseClient";

const CollegeRegistration = () => {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const location = useLocation();
    const { college, career } = location.state || {};

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        gender: "",
        tenthMarks: "",
        twelfthMarks: "",
        entranceExam: "",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            newErrors.fullName = "Only letters and spaces allowed";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be 10 digits";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!formData.dob.trim()) {
            newErrors.dob = "Date of Birth is required";
        }

        if (!formData.gender.trim()) {
            newErrors.gender = "Gender is required";
        }

        if (formData.tenthMarks === "") {
            newErrors.tenthMarks = "10th marks required";
        } else if (isNaN(formData.tenthMarks)) {
            newErrors.tenthMarks = "Enter a valid number";
        }

        if (formData.twelfthMarks === "") {
            newErrors.twelfthMarks = "12th marks required";
        } else if (isNaN(formData.twelfthMarks)) {
            newErrors.twelfthMarks = "Enter a valid number";
        }

        if (formData.entranceExam && isNaN(formData.entranceExam)) {
            newErrors.entranceExam = "Only numeric score allowed";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const { error } = await supabase.from("college_registrations").insert([
            {
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                dob: formData.dob,
                gender: formData.gender,
                tenth_marks: parseFloat(formData.tenthMarks),
                twelfth_marks: parseFloat(formData.twelfthMarks),
                entrance_exam: parseInt(formData.entranceExam || 0),
                selected_college: college,
                selected_career: career,
            },
        ]);

        if (error) {
            alert("Failed to register: " + error.message);
            console.error("Supabase Error:", error);
        } else {
            setShowSuccessModal(true); // 
        }
    };


    if (!college || !career) {
        return <p>College or Career data missing.</p>;
    }

    return (
        <>
            {showSuccessModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <h3>Registration Successful </h3>
                        <p>Your details have been submitted successfully.</p>
                        <button onClick={() => {
                            setShowSuccessModal(false);
                            // Redirect to student details page
                            navigate("/student-details", {
                                state: {
                                    ...formData,
                                    selectedCareer: career,
                                    selectedCollege: college,
                                },
                            });
                        }}>
                            OK
                        </button>
                    </div>
                </div>
            )}


            <div className={styles.container}>
                <h2>College Registration</h2>

                <div className={styles.selectedInfo}>
                    <p><strong>Selected Career:</strong> {career}</p>
                    <p><strong>Selected College:</strong> {college}</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <p className={styles.error}>{errors.phone}</p>}

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    {errors.address && <p className={styles.error}>{errors.address}</p>}

                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                    {errors.dob && <p className={styles.error}>{errors.dob}</p>}

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className={styles.error}>{errors.gender}</p>}

                    <input
                        type="number"
                        name="tenthMarks"
                        placeholder="e.g. 88.5"
                        value={formData.tenthMarks}
                        onChange={handleChange}
                        required
                    />
                    {errors.tenthMarks && <p className={styles.error}>{errors.tenthMarks}</p>}

                    <input
                        type="number"
                        name="twelfthMarks"
                        placeholder="e.g. 90.25"
                        value={formData.twelfthMarks}
                        onChange={handleChange}
                        required
                    />
                    {errors.twelfthMarks && <p className={styles.error}>{errors.twelfthMarks}</p>}

                    <input
                        type="number"
                        name="entranceExam"
                        placeholder="e.g. 150 (Enter 0 if not applicable)"
                        value={formData.entranceExam}
                        onChange={handleChange}
                    />
                    {errors.entranceExam && <p className={styles.error}>{errors.entranceExam}</p>}

                    <input type="text" name="selectedCareer" placeholder="Selected Career" value={career} onChange={handleChange} />
                    <input type="text" name="selectedCollege" placeholder="Selected College" value={college} onChange={handleChange} />

                    <button type="submit">Submit Registration</button>
                </form>
            </div>
        </>
    );
};

export default CollegeRegistration;
