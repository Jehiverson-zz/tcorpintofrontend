import React from 'react';
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

const TicketsPage = () => {

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
                                    Tickets
                                </h1>
                                <ul className='list-unstyled example-components-list'>
                                    <MenuLink to='/tickets/traslado_sistema' title='Traslado de Sistema' />
                                    <MenuLink to='/addons/iframe' title='Entregas Inmediatas' />
                                    <MenuLink to='/addons/iframe' title='Retiros Externos' />
                                    <MenuLink to='/addons/iframe' title='Retiros Fotografía' />
                                    <MenuLink to='/addons/iframe' title='Histórico Tickets' />
                                </ul>
                            </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBAnimation>
        </Navbar>
    )
}

export default TicketsPage