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
                    <MDBJumbotron style={{padding: "20px",top: "11%",position: "fixed", borderRadius: "0.25rem"}}>
                            <h2>
                                <MDBIcon icon={props.icon} className='form-header indigo-text' />
                            </h2>
                    </MDBJumbotron>
                    <MDBCardBody className="center" style={{marginTop: "60px"}}>
                        {props.children}
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </React.Fragment>
    )
}