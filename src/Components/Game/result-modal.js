import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ResultModal = (props) => {
    return (
        <Modal show={props.gameResult ? true : false}>
            <Modal.Header>
                <Modal.Title>CONGRATULATION </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.gameResult ? props.gameResult.message : ''}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                        onClick={() => props.handleNewGame()}>
                    New game
                </Button>
                <Button variant="primary"
                        onClick={() => props.handleExitGame()}>
                    Exit room
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ResultModal;
