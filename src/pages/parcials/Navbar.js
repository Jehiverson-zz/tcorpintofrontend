import React, { useState, Component, Children } from 'react'
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import MenuLink from '../../components/menuLink';
import './Navbar.css'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBLink,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdbreact';

class Navbar extends Component {


  state = {
    collapseID: ''
  };


  _logOut = () => {
    localStorage.clear();
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    })
    );

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };

  render() {
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.toggleCollapse('mainNavbarCollapse')}
      />
    );


    const { collapseID } = this.state;
    return (
      <>
        <MDBNavbar color='info-color' dark expand='md' fixed='top' scrolling>
          <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
            <Logo style={{ height: '2.5rem', width: '2.5rem' }} />
            <strong className='align-middle'>Corpinto</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            onClick={this.toggleCollapse('mainNavbarCollapse')}
          />

          <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar >

            <MDBNavbarNav right >

              <MDBNavItem>
                <MDBNavLink
                  exact
                  to='/bitacoras'
                  onClick={this.closeCollapse('mainNavbarCollapse')}
                >
                  <strong>Bitácoras</strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  exact
                  to='/tickets'
                  onClick={this.closeCollapse('mainNavbarCollapse')}
                >
                  <strong>Tickets</strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  onClick={this.closeCollapse('mainNavbarCollapse')}
                  to='/modals'
                >
                  <strong>Modals</strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/css'
                  >
                    <strong>CSS</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/components'
                  >
                    <strong>Components</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/advanced'
                  >
                    <strong>Advanced</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/navigation'
                  >
                    <strong>Navigation</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/forms'
                  >
                    <strong>Forms</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/tables'
                  >
                    <strong>Tables</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/modals'
                  >
                    <strong>Modals</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/addons'
                  >
                    <strong>Addons</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBLink className='waves-effect waves-light' to='#!'>
                    <MDBIcon icon='cog' className='mr-1' />
                    Configuración
                  </MDBLink>
                </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon='user' className='mr-1' />
                        Perfil
                      </MDBDropdownToggle>
                  <MDBDropdownMenu className='dropdown-default' right>
                    <MDBDropdownItem href='#!'>Mi cuenta</MDBDropdownItem>
                    <MDBDropdownItem href='/' onClick={this._logOut}>Salir</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        {collapseID && overlay}
        {this.props.children}
      </>
    );
  }
}

export default Navbar;