import React, {useRef, useState} from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {Modal} from "react-bootstrap";

const renderTime = ({ remainingTime }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const currentTime = useRef(remainingTime);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const prevTime = useRef(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isNewTimeFirstTick = useRef(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [, setOneLastRerender] = useState(0);

    if (currentTime.current !== remainingTime) {
        isNewTimeFirstTick.current = true;
        prevTime.current = currentTime.current;
        currentTime.current = remainingTime;
    } else {
        isNewTimeFirstTick.current = false;
    }

    // force one last re-render when the time is over to tirgger the last animation
    if (remainingTime === 0) {
        setTimeout(() => {
            setOneLastRerender(val => val + 1);
        }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;

    return (
        <div className="time-wrapper">
            <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
                {remainingTime}
            </div>
            {prevTime.current !== null && (
                <div
                    key={prevTime.current}
                    className={`time ${!isTimeUp ? "down" : ""}`}
                >
                    {prevTime.current}
                </div>
            )}
        </div>
    );
};

const GameStartModal = (props) => {
    return (
        <Modal show={props.isModalShow} size='sm'>
            <Modal.Body>
            <div className="App">
                <h4 style={{textAlign: 'center', color: '#A30000'}}>
                    Game starts in
                </h4>
                <div className="timer-wrapper">
                    <CountdownCircleTimer
                        isPlaying
                        duration={3}
                        size={100}
                        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                        onComplete={() => {props.handleOnComplete()}}>
                        {renderTime}
                    </CountdownCircleTimer>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    )
};

export default GameStartModal;
