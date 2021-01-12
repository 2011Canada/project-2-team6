import React from 'react';

export default class LoginControl extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loggedIn: false,
            currentUser: null
        }
    }

    render() {
        return (
            
                 <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1529026760l/39832183.jpg" alt="First slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1572940430l/4667024._SY475_.jpg" alt="Second slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1554086139l/19288043.jpg" alt="Third slide"/>
                            </div>
                        </div>
                    </div>
        
/*
            div id = "myCarousel" className = "carousel slide" data - ride="carousel" >
  < !--Indicators -->
  <ol className="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>

  <!--Wrapper for slides-- >
  <div className="carousel-inner">
    <div className="item active">
      <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1554086139l/19288043.jpg" alt="Los Angeles"/>
    </div>

    <div className="item">
      <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1572940430l/4667024._SY475_.jpg" alt="Chicago"/>
    </div>

    <div className="item">
      <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1529026760l/39832183.jpg" alt="New York"/>
    </div>
  </div>

  <!--Left and right controls-- >
  <a className="left carousel-control" href="#myCarousel" data-slide="prev">
    <span className="glyphicon glyphicon-chevron-left"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="right carousel-control" href="#myCarousel" data-slide="next">
    <span className="glyphicon glyphicon-chevron-right"></span>
    <span className="sr-only">Next</span>
  </a>
</div >
*/
)

    }
}




