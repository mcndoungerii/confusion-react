import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Label, Col, Row } from 'reactstrap';

import { Control, Form, Errors, actions } from 'react-redux-form';
import { NavLink } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalLoginOpen: false,
            isModalRegisterOpen: false,
        };
        this.togglerNav = this.togglerNav.bind(this);
        this.toggleModalLogin = this.toggleModalLogin.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.toggleModalRegister = this.toggleModalRegister.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    togglerNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModalLogin() {
        this.setState({
          isModalLoginOpen: !this.state.isModalLoginOpen
        });
    }
    toggleModalRegister() {
        this.setState({
         isModalRegisterOpen: !this.state.isModalRegisterOpen
        });
    }

    handleLogin(values) {
        this.toggleModalLogin();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.resetLoginForm();
        this.props.postLogin(values.username, values.email, values.agree, values.password);

    }
    handleRegister(values) {
        this.toggleModalRegister();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.resetRegisterForm();
        this.props.postRegister(values.username, values.firstname, values.lastname, values.telnum, values.email, values.password);

    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.togglerNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41" 
                                alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModalLogin}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem>
                                 <NavItem>
                                    <Button outline onClick={this.toggleModalRegister}><span className="fa fa-user-plus fa-lg"></span> Register</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div> 
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron> 
                <Modal isOpen={this.state.isModalLoginOpen} toggle={this.toggleModalLogin}>
                    <ModalHeader toggle={this.toggleModalLogin}>Login</ModalHeader>
                    <ModalBody>
                        <Form model="register" onSubmit={(values) => this.Login(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="User Name or Email Address"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>                        
                            </Row>
                            
                            <Row className="form-group">
                                <Col>
                                    <Control.text model=".password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree"
                                                name="agree"
                                                className="form-check-input" /> {' '}
                                            <strong>Remember me</strong>
                                        </Label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isModalRegisterOpen} toggle={this.toggleModalRegister}>
                    <ModalHeader toggle={this.toggleModalRegister}>Register</ModalHeader>
                    <ModalBody>
                        <Form model="register" onSubmit={(values) => this.handleRegister(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="User Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />            
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                    <Col>
                                        <Control.text model=".telnum" id="telnum" name="telnum"
                                            placeholder="Tel. number"
                                            className="form-control"
                                            validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".telnum"
                                            show="touched"
                                            messages={{
                                                required: ' Required ',
                                                minLength: 'Must be greater than 2 numbers',
                                                maxLength: 'Must be 15 numbers or less',
                                                isNumber: 'Must be a number'
                                            }}
                                        />
                                    </Col>
                            </Row>
                            <Row className="form-group">
                                    <Col>
                                        <Control.text model=".email" id="email" name="email"
                                            placeholder="Email"
                                            className="form-control" 
                                            validators={{
                                            required, validEmail
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".email"
                                            show="touched"
                                            messages={{
                                                required: ' Required ',                                                
                                                validEmail: 'Invalid Email Address'
                                            }}
                                        />                                           
                                    </Col>
                            </Row>
                            <Row className="form-group">
                                    <Col>
                                        <Control.text model=".password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />                                           
                                    </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" value="submit" color="primary">
                                        Register
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;