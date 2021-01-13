import React from 'react';
import {Button, Modal} from "react-bootstrap";

const InvitationDecline = (props) => {
    return (
        <Modal show={props.decliner ? true : false}>
            <Modal.Header>
                <Modal.Title>INVITATION DECLINE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.decliner ? `@${props.decliner} has decline your invitation. Your room is now public so other player can join` : ''}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary"
                        onClick={() => props.handleClose()}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default InvitationDecline;
