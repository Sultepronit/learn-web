import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });


useEffect(() => {

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            heigth: window.innerHeight
        });
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    const cleanUp = () => {
        // I don't understand how it works...
        // It removes the EventListener at the start of the app... 
        // But the app still reacts to resize........
        console.log('cleaUp resize listener!'); 
        window.removeEventListener('resize', handleResize);
    }

    return cleanUp;

}, []);

    return windowSize;

}

export default useWindowSize;