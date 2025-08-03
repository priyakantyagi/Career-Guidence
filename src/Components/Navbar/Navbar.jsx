import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import nav from './Nav.module.css';
import navRes from './NavRes.module.css';
import { FaUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Navbar = ({ session }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            {/* Before Login */}
            {!session ? (
                <div className={nav['container-first']}>
                    <div className={`${nav['nav-bar']} ${nav.flex} ${nav['space-bet']}`}>
                        <div className={`${nav['col-2']} ${navRes['col-t-5']} ${navRes['col-p-12']} ${navRes['main-heading']}`}>
                            <h1 onClick={() => navigate('/')}>CareerGuide</h1>
                        </div>
                        <div className={`${nav['col-9']} ${navRes['col-t-6']} ${navRes['col-p-12']}`}>
                            <ul className={`${nav.flex} ${nav['nav-ul']} ${nav['justify-cont']}`}>
                                <li
                                    onClick={() => navigate('/signup')}
                                    className={`${location.pathname === '/signup' ? nav.active : ''} ${navRes.optionLi}`}
                                >
                                    <FaUser className={`${nav.loginicon}`} style={{ marginRight: "10px", verticalAlign: "middle", color: location.pathname === '/signup' ? 'blue' : 'white' }} />
                                    Signup
                                </li>

                                <li
                                    onClick={() => navigate('/login')}
                                    className={`${location.pathname === '/login' ? nav.active : ''} ${navRes.optionLi}`}
                                >
                                    <FaUser className={`${nav.loginicon}`} style={{ marginRight: "10px", verticalAlign: "middle", color: location.pathname === '/login' ? 'blue' : 'white' }} />
                                    Login
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )

                :

                // After Login
                (
                    <div className={nav['container-first']}>
                        <div className={`${nav['nav-bar']} ${nav.flex} ${nav['space-bet']}`}>
                            <div className={`${nav['col-2']} ${navRes['col-t-12']} ${navRes['col-p-12']} ${navRes['main-heading']}`}>
                                <h1 onClick={() => navigate('/')}>CareerGuide</h1>
                            </div>
                            <div className={`${nav['col-9']} ${navRes['col-t-12']} ${navRes['col-p-12']}`}>
                                <ul className={`${nav.flex} ${navRes['nav-ul2']} ${nav['nav-ul2']}`}>
                                    <li onClick={() => navigate('/career-selection')}
                                        className={`${location.pathname === '/career-selection' ? nav.active : ''} ${navRes.optionLi}`}>
                                        Career Selection
                                    </li>
                                    <li onClick={() => navigate('/profile')}
                                        className={`${location.pathname === '/profile' ? nav.active : ''} ${navRes.optionLi}`}>  
                                        Profile
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </>
    );
};

export default Navbar;
