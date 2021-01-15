import React from 'react'


export const FancyBorder:React.FunctionComponent<any> = (props) =>{

    return (
        <div style={{border: "3px solid skyblue"}}>
            <div style={{border: "2px dashed cadetblue",
                        margin:"3px" }}>
                    {props.children}
            </div>
        </div>
    )
}