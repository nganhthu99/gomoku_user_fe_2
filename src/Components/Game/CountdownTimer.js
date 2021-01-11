import React from 'react';
import Countdown from "react-countdown";

const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <span>Time out!</span>;
    } else {
        // Render a countdown
        return <span>{`${minutes} min : ${seconds} sec`}</span>;
    }
};

const CountdownTimer = (props) => {
    console.log('COUNTDOWN TIMER: ', (props.time * 60 - 1) * 1000)
    return(
        <Countdown
            onComplete={() => props.handleTimeOut()}
            date={Date.now() + (props.time * 60 - 1) * 1000}
            renderer={renderer}
        />
    )
};

export const MemoTimer = React.memo(CountdownTimer, (prevProps, nextProps) => true);
