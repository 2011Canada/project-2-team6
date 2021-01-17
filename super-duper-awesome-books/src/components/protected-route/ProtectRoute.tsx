import React from 'react'
import { Redirect } from 'react-router'
import {UserAuth} from './UserAuth'


const ProtectRoute = (Component: any) => {
 
    return (props: React.Component) => {

        return (
            <>
                <UserAuth>
                    <Component {...props} />
                </UserAuth>
            </>
        )
    }
}

export default ProtectRoute;