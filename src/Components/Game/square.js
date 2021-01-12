import React from "react";
import { IoEllipseOutline , IoCloseOutline} from "react-icons/io5";
import {Button} from "react-bootstrap";

const Square = (props) => {
    return (
        <Button variant="outline-primary"
                style={props.isColored ? {
                    display:'flex',
                    height: 23,
                    width: 23,
                    borderRadius: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: "yellow"
                } : {
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 23,
                    width: 23,
                    borderRadius: 0,
                    padding: 0,
                    margin: 0,
                }}
                onClick={props.onClickHandle}>
            {props.value === 'X' && <IoCloseOutline color= 'green' size={20}/>}
            {props.value === 'O' && <IoEllipseOutline color='red' size={16}/>}
        </Button>
    )
}

export default Square
