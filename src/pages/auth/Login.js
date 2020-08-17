import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn
} from 'mdbreact';

//Complements
import SectionContainer from '../../components/sectionContainer';
import Navbar from '../parcials/Navbar'

//Css
import './Login.css'

//Functions
import { login } from '../../functions/UserFunctions';

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    const _Login = () => {

        const userData = {
            user: user,
            password: password
        }

        login(userData).then(res => {
            if (res.error === 1) {
                Swal.fire('Oops...', res.message, 'error');
            } else {
                history.push(`/bitacoras`);
            }
        })
    }

    const onChangeUser = e => {
        setUser(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    if (localStorage.getItem('session')) {
        history.push(`/bitacoras`);
    }

    return (
        <Navbar>
            <MDBContainer className='mt-5'>
                <SectionContainer noBorder>
                    <MDBRow>
                        <MDBCol className="card-login" md='6'>
                            <SectionContainer>
                                <form>
                                    <p className='h5 text-center mb-4'>Iniciar Sesión</p>
                                    <div className='grey-text'>
                                        <MDBInput
                                            label='Ingrese usuario'
                                            icon='user'
                                            group
                                            type='text'
                                            validate
                                            error='wrong'
                                            success='right'
                                            name='user'
                                            onChange={onChangeUser}
                                        />
                                        <MDBInput
                                            label='Ingrese Contraseña'
                                            icon='lock'
                                            group
                                            type='password'
                                            name='password'
                                            onChange={onChangePassword}
                                            validate
                                        />
                                    </div>
                                    <div className='text-center'>
                                        <MDBBtn color="info" onClick={_Login}>Ingresar</MDBBtn>
                                    </div>
                                </form>
                            </SectionContainer>
                        </MDBCol>
                    </MDBRow>
                </SectionContainer>
            </MDBContainer>
            </Navbar>
    )
}

export default Login