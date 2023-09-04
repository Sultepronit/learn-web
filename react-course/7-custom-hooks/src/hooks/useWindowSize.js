import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });
}

useEffect(() => {

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            heigth: window.innerHeight
        });
    }

    handleResize();

    window.addEventListener('resize', handleResize);

}, []);