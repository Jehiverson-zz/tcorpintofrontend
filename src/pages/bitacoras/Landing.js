import React from 'react';
import { useHistory } from "react-router-dom";
import {
  MDBEdgeHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBIcon,
  MDBAnimation
} from 'mdbreact';
import MenuLink from '../../components/menuLink';
import Navbar from '../parcials/Navbar'


const Landing = () => {
    const history = useHistory();

    if(localStorage.getItem('session') != "true"){
        history.push(`/`);
    }

    return (
        <Navbar>
                <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
                <MDBAnimation type='zoomIn' duration='500ms'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md='8' className='mt-3 mx-auto'>
                                <MDBJumbotron>
                                    <h1 className='text-center'>
                                        <MDBIcon icon='window-restore' className='mr-2 indigo-text' />
                  Bitácoras
                </h1>
                                    <ul className='list-unstyled example-components-list'>
                                        <MenuLink to='/persons/detail' title='Bitácora Ejecución' />
                                        <MenuLink to='/addons/iframe' title='Bitácora Venta Diaria' />
                                    </ul>
                                </MDBJumbotron>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBAnimation>
                </ Navbar>
        )
    }

export default Landing