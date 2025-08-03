import React, { useEffect, useState } from 'react';
import banner from "./Home.module.css";
import bannerRes from "./HomeRes.module.css";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <>
            <div className={`${banner.containerBanner}`}>
                <div className={`${banner.rowFirst}`}>
                    <div className={`${banner.col12} ${bannerRes.colT12} ${bannerRes.colM12} ${bannerRes.colP12} ${banner.bannerCol} ${bannerRes.bannerCol}`}>
                        <h2>Welcome to <br /> CareerGuide</h2>

                        <div className={`${banner.para} ${bannerRes.para}`}>
                            <p>
                                SecureDocs is a safe and easy-to-use platform where users can upload, store, and manage their documents digitally. It helps you keep your files organized, access them anytime from anywhere, and share them securely when needed.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate(user ? '/upload' : '/suplogin')}
                            className={`${banner.bannerBtn} ${bannerRes.bannerBtn}`}
                        >
                            {user ? "Explore Now" : "Check Now"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
