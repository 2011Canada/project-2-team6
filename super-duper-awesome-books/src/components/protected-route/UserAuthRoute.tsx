import React from 'react'
// import { Redirect } from 'react-router'
// import { UserContext } from '../../App'





// const UserAuthRoute: React.FunctionComponent<any> = (props) => {

// //I would probably pass in accepted roles as props to UserAuth

//     return (
//         <UserContext.Consumer>
//         { user =>

//             (user) ?
//             <>
//                 {props.children}
//             </>
//             :
//             <Redirect to="/login" />
//         }
//         </UserContext.Consumer>
//     )
// }


// //HOC
// //just a function
// const protectComponent = (Component: any) => {
//     //return a new component
//     return (props: any) => {
//         //use the custom hook
//         return (
//             <>
//                 <UserAuthRoute>
//                     <Component {...props} />
//                 </UserAuthRoute>
//             </>
//         )
//     }
// }

// export default protectComponent