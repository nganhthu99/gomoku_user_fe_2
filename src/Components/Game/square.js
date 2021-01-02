import React from "react";
import { IoEllipseOutline , IoCloseOutline} from "react-icons/io5";
import {Button} from "react-bootstrap";

const Square = (props) => {
    return (
        <Button variant="outline-primary"
                style={props.isColored ? {
                    height: 30,
                    width: 30,
                    borderRadius: 0,
                    fontSize: 15,
                    padding: 0,
                    margin: 0,
                    backgroundColor: "yellow"
                } : {
                    height: 30,
                    width: 30,
                    borderRadius: 0,
                    fontSize: 15,
                    padding: 0,
                }}
                onClick={props.onClickHandle}>
            {props.value === 'X' && <IoCloseOutline color= 'green' size={26}/>}
            {props.value === 'O' && <IoEllipseOutline color='red' size={22}/>}
        </Button>
    )
}

export default Square
