import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBCardTitle
} from 'mdbreact';

export default function CardHeader(props) {
    return (
        <React.Fragment>
            <MDBContainer>
                <MDBCard>
                    <MDBCardTitle style={{paddingTop: "10px"}}><h1 className="center-element"><b>{props.title}</b></h1></MDBCardTitle>
                    <MDBCardBody className="center">
                        {props.children}
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </React.Fragment>
    )
}