import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

  export const FooterPage: React.FunctionComponent<any> = (props) => {
  return (

    <MDBFooter style={{position:"absolute" , bottom:"0", background:"#808080", width:"100%"}} color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="3">
            <h5 className="title">Company</h5>
            <ul>
            <li className="list-unstyled">
                <a href="#!">About us</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Careers</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Terms</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Privacy</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Interest Based Ads</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Ad Preferences</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Help</a>
              </li>
            </ul>
                <h5 className="title">Company</h5>
            <ul>
            <li className="list-unstyled">
                <a href="#!">About us</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Careers</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Terms</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Privacy</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Interest Based Ads</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Ad Preferences</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Help</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Team 6 </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;

// WORK WITH US
// Authors
// Advertise
// Authors & ads blog
// API

