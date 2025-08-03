import React from "react";
import foot from "./Footer.module.css";
import footRes from "./FootRes.module.css"

const Footer = () => {
    return (
        <div className={foot.container}>
            <h3>Resources</h3>
            <div className={foot.row}>
                <ul className={`${foot.footUl} ${footRes.footUl}`}>
                    <li>
                            <a href="https://www.careerindia.com/courses/unique-career-options-after-12th-cid-15/" target="_blank" rel="noopener noreferrer">Career Paths Explained</a>
                    </li>
                    <li>
                            <a href="https://www.shiksha.com/online-courses/articles/aptitude-test-preparation-tips-blogId-113934" target="_blank" rel="noopener noreferrer">Aptitude Test Tips</a>
                    </li>
                    <li>
                            <a href="https://byjus.com/free-study-material/" target="_blank" rel="noopener noreferrer">Study Materials & Guides</a>
                    </li>
                </ul>
            </div>
            <div className={`${foot.footerBottom} ${footRes.footerBottom}`}>
                    © {new Date().getFullYear()} Career Guidance. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;
