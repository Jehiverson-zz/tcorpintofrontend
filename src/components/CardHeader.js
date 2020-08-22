import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBJumbotron,
    MDBIcon,
} from 'mdbreact';

export default function CardHeader(props) {
    return (
        <React.Fragment>
            <MDBContainer>
                <MDBCard style={{paddingLeft: "10px"}}>
                    <MDBCardBody className="center" style={{marginTop: "60px"}}>
                        {props.children}
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </React.Fragment>
    )
}