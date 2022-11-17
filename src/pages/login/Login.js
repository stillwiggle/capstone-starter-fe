import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert';

import { connect } from "react-redux";
import * as authActions from "../../redux/actions/auth";
import { bindActionCreators } from "redux";

import AuthService from "../../authService";
import { Redirect, withRouter } from "react-router-dom";
import LoginForm from "../../components/loginForm/LoginForm";

import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../../components/header/Header";

class Login extends Component {

    state = {
        errorMessage: null,
        success: false,
        formData: {
            email: "",
            password: ""
        }
    }

    client = new AuthService();

    handleChange = (event) => {
        let formData = { ...this.state.formData };
        formData[event.target.id] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.client.login(this.state.formData).then((response) => {
            // handle success
            localStorage.setItem('auth',
                JSON.stringify({
                    token: response.data.token,
                    email: response.data.email
                })
            );
            this.props.actions.login(response.data)
            this.setState({ success: true })
        })
            .catch((error) => {
                this.setState({ errorMessage: "Invalid Username/Password Combination" })
            })
    }

    render() {
        const params = new URLSearchParams(this.props.location.search);
        const flashMessage = params.get('message');
        if (this.state.success) {
            const redirect = params.get('redirect');
            return <Redirect to={(redirect) ? redirect : "/protected"} />
        }
        return (
            <div className="LoginForm">

                <Header />

                <div className="container">
                    {this.state.errorMessage && <Alert variant="danger">{this.state.errorMessage}</Alert>}
                    {flashMessage && <Alert variant="info">{flashMessage}</Alert>}
                </div>

                <Card style={{
                    width: '50%', marginTop: '5rem', height: '100%', margin: 'auto', padding: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}>

                    <Card.Body>
                        {/* <Card.Title style={{ marginBottom: '6rem', marginTop: '2rem', textAlign: 'center' }}>Choose one to get started</Card.Title> */}
                        <Container>

                            <LoginForm
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                formData={this.state.formData}
                            />

                        </Container>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login));
