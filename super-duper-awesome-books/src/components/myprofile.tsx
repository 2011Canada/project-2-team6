import React, { useEffect, useState } from 'react'

//Requirements: Prop user object with username and userid, should be enclosed in an authentication component
export const MyProfile: React.FunctionComponent<any> = (props) => {
    const [userDescription, changeDescription] = useState("")
    const [userReviews, changeReviews] = useState(new Array<any>())
    const [profileImage, changeProfileImage] = useState({})
    const [offset, changeOffset] = useState(0)
    const [limit, changeLimit] = useState(10)

    //Runs on first load
    useEffect(()=> {
        //TODO: Replace example content with content from db, fetched using the user's ID as given by props
        

        let exampleDescription = "I am the greatest person in the entirety of the universe."
        changeDescription(exampleDescription)


        let exampleReviews:Object[] = [
            {bookId: 1,
                reviewId: 1,
                reviewTitle: "Absolutely terrible",
                reviewDescription: "This book made my life worse than ever before after reading the first 2 pages, thanks.",
                rating: 0},
            {bookId: 2,
                reviewId: 2,
                reviewTitle: "Greatest book ever written in the history of the universe.",
                reviewDescription: "You must buy it and read it. Also, buy one for your parents, your siblings, your children, your dog. They will love it and forever love you for buying it for them, I promise you.",
                rating: 10}
        ]

        changeReviews(exampleReviews)
        

        //fetch pfp from db 



    }, []) 

    let showPreviousReviews = () => {
        if(limit-10>0) {
            changeOffset(limit-10)
            changeLimit(limit-10)
        }

      }

    let showNextReviews = () => {
        if(limit<=userReviews.length){
            changeOffset(limit)
            changeLimit(limit+10)
        }

        
      }


    return (
        <div className = "content">
            <div className = "dashboard">
                <div className = "profile-picture-container">

                </div>
                <div className = "profile-info">
                    <h2>{props.user.username}</h2>
                </div>
                <div className = "description">
                    <p>{userDescription}</p>
                </div>
                <button type = "button">Add Friend</button>
            </div>
            <div className = "reviews-container">
                
                {userReviews.slice(limit - 10, limit).map((review, i) => {
                  return(
                    <div className = "review-element">
                        <div className = "review-title" key={i}>{review.reviewTitle}</div>
                        <div className = "review-description" key={i}>{review.reviewDescription}</div>
                        <div className = "rating" key={i}>{review.rating}</div> 
                    </div>
                  )})
                }
                <div><button type="button" onClick={()=>showPreviousReviews()}>Previous 10</button></div>
               <div><button type="button" onClick={()=>showNextReviews()}>Next 10</button></div>
                

            </div>
        </div>


    ) 



}