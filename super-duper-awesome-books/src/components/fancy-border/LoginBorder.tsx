import React from 'react'

const LoginBorder: React.FunctionComponent<any> = (props) => {

    return (
        <div style={{ border: "3px solid skyblue", display: "flex", justifyContent: "center", marginLeft: "34%", marginTop: "5%", width: "30%", height: "50vh" }}>
            {props.children}
        </div>
    )
}

export default LoginBorder;