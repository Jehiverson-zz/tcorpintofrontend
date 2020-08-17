import React, { Component } from 'react';
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
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';
import Routes from './Routes';

class App extends Component {
  state = {
    collapseID: ''
  };


  _logOut = () => {
    localStorage.clear();
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };

  componentWillMount(){
    console.log("local",localStorage.getItem('session'))
    console.log("Entro");

  }

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
      <Router>
        <div className='flyout'>
          <main style={{ marginTop: '4rem' }}>
            <Routes />
          </main>
          <MDBFooter color='info-color'>
            <p className='footer-copyright mb-0 py-3 text-center' style={{ color: 'white' }}>
              &copy; {new Date().getFullYear()} Copyright:
              Corpinto S. A.
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
