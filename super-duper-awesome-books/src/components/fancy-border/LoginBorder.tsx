import { Paper } from '@material-ui/core';
import React from 'react'

const LoginBorder: React.FunctionComponent<any> = (props) => {

    return (
        
            <div style={{ border: "3px solid skyblue", display: "flex", justifyContent: "center", marginTop: "5%", width: "30%", height: "50vh", backgroundColor: "#ffd699" }}>
                {props.children}
            </div>
    )
}

export default LoginBorder;