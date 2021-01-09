import React from 'react';
import {Button, Modal} from "react-bootstrap";

const InvitationModal = (props) => {
    return (
        <Modal show={props.invitation ? true : false}>
            <Modal.Header>
                <Modal.Title>INVITATION </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.invitation ? `${props.invitation.inviter} has invited you to play` : ''}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                        onClick={() => props.handleReplyInvitation(true)}>
                    Accept
                </Button>
                <Button variant="primary"
                        onClick={() => props.handleReplyInvitation(false)}>
                    Decline
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default InvitationModal;
