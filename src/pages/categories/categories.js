import React, { Component } from "react"

import {generateAuthHeader} from "../../utils/authHelper"

import Header from "../../components/header/Header"
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Categories extends Component {

    state = {
        categories: [],
        categoryAmount: null
    }

    componentDidMount() {
        console.log("this just ran")
        this.getCategories()
    }

    getCategories= () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/questions/categories`, {
            // auth header for using the currently logged in user's token for the API call
            headers: {...generateAuthHeader()}
        })
            .then((results) => results.json())
            .then((data) =>{
                console.log(data)
                this.setState(
                    {
                        categories: data
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

    sendToQuestions = (e) => {
        let category = e.target.value.toString()
        console.log(category)
        this.resetAllLocalStorageValues()
        this.props.history.push("/questions/"+category)
        console.log("thisworks"+e.target.value.toString())
    }


//This is helper function to reset all local storage values so you can retry the questions
    resetAllLocalStorageValues() {
        localStorage.setItem("currentAnswers", "")
        localStorage.setItem("currentQuestion", "")
        localStorage.setItem("correctAnswers", "0")
        localStorage.setItem("questionsAnswered", "0")
        localStorage.setItem("currentAnswers", "")
        localStorage.setItem("currentQuestion", "")
    }

    render() {
        return (
            <div className="Users">
                <Header />
                <h3 className="text-center" style={{marginTop:'5rem', marginBottom: '5rem'}}>Categories</h3>

                <Card style={{width: '28rem', marginTop:'5rem', height: '30rem', margin: 'auto', padding: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>

                    <Card.Body>
                        <Card.Title style={{marginBottom: '6rem', marginTop: '2rem', textAlign: 'center'}}>Choose one to get started</Card.Title>
                        <Container>
                            <Row>
                                {this.state.categories.map(category =>(
                                    <Col sm={6}>
                                        <Button onClick={this.sendToQuestions} value={category}
                                                style={{ width: '10rem', height: '5rem', marginBottom: '3rem',
                                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                            {category}
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default Categories