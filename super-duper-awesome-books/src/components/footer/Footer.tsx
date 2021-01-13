import React from "react";
import { MDBFooter } from "mdbreact";
import gitlogo from '../../pictures/GitHub-Mark.png';


export const Footer: React.FunctionComponent<any> = (props) => {
  return (

    <MDBFooter style={{ position: "absolute", bottom: "0", background: "#808080", width: "100%" }}>


      <div className="footer-copyright text-center">
        &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/2011Canada/project-2-team6-frontEnd">
          <img style={{ height: "50px", width: "50px", borderRadius: "40px" }} src={gitlogo} alt="Logo" />
        </a></div>


    </MDBFooter>
  );
}

export default Footer;
