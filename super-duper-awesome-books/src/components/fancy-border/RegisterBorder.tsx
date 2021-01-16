import { Paper } from '@material-ui/core';
import React from 'react'

const RegisterBorder: React.FunctionComponent<any> = (props) => {

    return (
        
            <div style={{ border: "3px solid skyblue", display: "flex", justifyContent: "center", marginTop: "5%", width: "30%", height: "55vh", backgroundColor: "#ffd699" }}>
                {props.children}
            </div>
    )
}

export default RegisterBorder;