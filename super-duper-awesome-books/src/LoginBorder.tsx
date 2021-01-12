import React from 'react'

const LoginBorder:React.FunctionComponent<any> = (props) =>{

    return (
        <div style={{border: "1px solid skyblue", display: "flex", justifyContent:"center", marginLeft: "30%", marginTop: "15%", width:"30%", height: "30vh"}}>
                    {props.children}
            </div>
    )
}

export default LoginBorder;

