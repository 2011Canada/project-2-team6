import React from 'react'
import { Redirect } from 'react-router'



export const AuthContext = React.createContext<any>(undefined)

export const UserAuth: React.FunctionComponent<any> = (props) => {


    return (
        <AuthContext.Consumer>
        { user =>

            (user) ?
            <>
                {props.children}
            </>
            :
            <Redirect to="/login" />
        }
        </AuthContext.Consumer>
    )
}
