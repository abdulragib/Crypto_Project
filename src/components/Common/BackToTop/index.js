import React, { useEffect, useRef } from 'react';
import './style.css';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const BackToTop = () => {
    const mybuttonRef = useRef(null);

    // When the user scrolls down 20px from the top of the document, show the button
    useEffect(() => {
        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybuttonRef.current.style.display = "flex";
            } else {
                mybuttonRef.current.style.display = "none";
            }
        }
        window.addEventListener("scroll", scrollFunction);
        return () => window.removeEventListener("scroll", scrollFunction);
    }, []);

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div className="back-to-top-btn" ref={mybuttonRef} onClick={topFunction}>
            <ArrowUpwardRoundedIcon style={{ color: "var(--blue)" }} />
        </div>
    );
};

export default BackToTop;
