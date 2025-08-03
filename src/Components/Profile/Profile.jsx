import React, { useEffect, useState } from 'react';
import profile from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Profile = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setSession(data.session);
            } else {
                navigate('/'); 
            }
            setLoading(false);
        };

        getSession();
    }, [navigate]);

    const handleLogout = async () => {
        setLoggingOut(true);
        await supabase.auth.signOut();
        setSession(null);
        navigate('/');
    };

    if (loading) return <div className={profile.loading}>Loading...</div>;

    const user = session?.user;
    const name = user?.user_metadata?.full_name || 'Anonymous';
    const email = user?.email;

    if (loggingOut) {
    return (
        <div className={profile.overlay}>
            <div className={profile.modal}>
                <div className={profile.spinner}></div>
                <p>Logging out...</p>
            </div>
        </div>
    );
}

    return (
        <>
            <div className={profile.container}>
                <div className={profile.card}>
                     <h2>Your Profile</h2>
                    <h3>Name:- {name}</h3>
                    <h4>Email:- {email}</h4>
                    <div className={profile.btnGroup}>
                        <button onClick={handleLogout} className={profile.logoutBtn}>Logout</button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Profile;
