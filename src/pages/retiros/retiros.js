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

import Layaout from '../parcials/Layaout';


const Landing = () => {
    const history = useHistory();

    if (localStorage.getItem('session') != "true") {
        history.push(`/`);
    }

    return (
        <Layaout>
            <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
            <MDBAnimation type='zoomIn' duration='500ms'>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md='8' className='mt-3 mx-auto'>
                            <MDBJumbotron>
                                <h1 className='text-center'>
                                    <MDBIcon icon='window-restore' className='mr-2 indigo-text' />
                                    Retiro
                                </h1>
                                <ul className='list-unstyled example-components-list'>
                                    <MenuLink to='/retreats_form' title='Nuevo Retiro' />
                                    <MenuLink to='/retreats_bitacoras_list' title='Total de retiro' />
                                    <MenuLink to='/retreats_history' title='Historial Retiros' />
                                </ul>
                            </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBAnimation>
        </Layaout>
    )
}

export default Landing