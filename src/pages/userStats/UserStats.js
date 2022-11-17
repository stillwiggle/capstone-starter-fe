import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";

// importing the ability to retrieve and use the Auth Header for API calls
import { generateAuthHeader } from "../../utils/authHelper"

// importing components needed for the header 
import Header from "../../components/header/Header"

import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class UserStats extends Component {

    state = {
        userStats: []
    }

    componentDidMount() {

        //get the student's id from the URL to make the API call
        const email = this.props.match.params.email;

        // Run the getUserStats method using the email obtained above
        this.getUserStats(email)
    }

    getUserStats = (email) => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/stats/${email}`, {
            // auth header for using the currently logged in user's token for the API call
            headers: { ...generateAuthHeader() }
        })
            .then((results) => results.json())
            .then((data) => {
                this.setState(
                    {
                        userStats: data
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {
        return (
            <div className="userStats">

                <Header isAuthenticated={this.props.isAuthenticated} />

                {/* <h3 className="text-center" >{this.state.userStats.email}'s Statistics</h3> */}
                <Card style={{
                    width: '28rem', marginTop: '5rem', height: '40rem', margin: 'auto', padding: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}>

                    <Card.Body>
                        <Card.Title style={{ marginBottom: '6rem', marginTop: '2rem', textAlign: 'center' }}>{this.state.userStats.email}'s Statistics</Card.Title>
                        <Container>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Number of questions answered</th>
                                        <th>Correct Answers</th>
                                        <th>Wrong Answers</th>
                                        <th>Win Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.userStats.questionsAttempted}</td>
                                        <td>{this.state.userStats.correctAnswers}</td>
                                        <td>{this.state.userStats.wrongAnswers}</td>
                                        <td>{this.state.userStats.winRatio}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Container>
                    </Card.Body>
                </Card>

            </div>
        )
    }

}

export default mustBeAuthenticated(UserStats)
