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


const Landing = () => {
    const history = useHistory();

    if(localStorage.getItem('session') != "true"){
        history.push(`/`);
    }

    return (
            <>
                <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
                <MDBAnimation type='zoomIn' duration='500ms'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md='8' className='mt-3 mx-auto'>
                                <MDBJumbotron>
                                    <h1 className='text-center'>
                                        <MDBIcon icon='window-restore' className='mr-2 indigo-text' />
                  Actividades
                </h1>
                                    <ul className='list-unstyled example-components-list'>
                                        <MenuLink to='/persons/detail' title='Personas' />
                                        <MenuLink to='/addons/iframe' title='Bolsas' />
                                        <MenuLink to='/addons/notifications' title='Despensas' />
                                        <MenuLink to='/addons/notifications' title='Extras' />
                                    </ul>
                                </MDBJumbotron>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBAnimation>
            </>
        )
    }

export default Landing