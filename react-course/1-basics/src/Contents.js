import {useState} from 'react';

function Contents() {
    const [number, setNumber] = useState(0);
    const [timer, setTimer] = useState(0);

    function setRandomInt() {
        setNumber(Math.floor(Math.random() * 1000));
    }

    // Doesn't work properly.
    // Looks like there are several threads that make chaos.....
    function handleTimer() {
        setInterval(() => {
            setTimer(timer + 2);
            console.log(timer);
        }, 2000);
    }
    //handleTimer();
    //if(timer < 1) handleTimer();

    function handleClick() {
        console.log('Clicked!');
    }

    function handleClick2(parameter) {
        console.log(`${parameter} inserted!`);
    }

    function handleClick3(e) {
        console.log(e);
        console.log(e.target);
        console.log(e.target.innerText);
    }

    return (
    <main>
        <p>1 + 2</p>
        <p>{1 + 2}</p>
        <p>Timer: {timer}</p>
        <p>Here's your random number: {number}</p>
        <button onClick={setRandomInt}>change number!</button>
        <button onClick={handleClick}>Click me!</button>
        <button onClick={() => handleClick2('Hello!')}>Click me too!</button>
        <button onClick={(e) => handleClick3(e)}>And me!</button>
    </main>
    )
}

export default Contents;
