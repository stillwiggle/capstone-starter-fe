import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// importing the ability to retrieve and use the Auth Header for API calls
import { generateAuthHeader } from "../../utils/authHelper"

// importing components needed for the header 
import Header from "../../components/header/Header"
import Favorites from "../favorites/Favorites"

class GlobalStats extends Component {

    state = {
        globalStats: []
    }

    componentDidMount() {

        // Run the getglobalStats method using the email obtained above
        this.getglobalStats()
    }

    getglobalStats = () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/stats/`, {
            // auth header for using the currently logged in user's token for the API call
            headers: { ...generateAuthHeader() }
        })
            .then((results) => results.json())
            .then((data) => {
                // Sorts the data by winRatio before setting the state
                data.sort((a, b) => b.winRatio - a.winRatio)
                this.setState(
                    {
                        globalStats: data
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })

    }

    // render() {
    //     return (
    //         <div className="globalStats">

    //             <Header isAuthenticated={this.props.isAuthenticated} />

    //             <h3 className="text-center" >Global Statistics</h3>

    //             <Table>
    //                 <thead>
    //                     <tr>
    //                         <th>User</th>
    //                         <th>Win Percentage</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {this.state.globalStats.map((user, idx) => {
    //                         return <tr key={idx}>
    //                             <td>{user.email}</td>
    //                             <td>{user.winRatio}%</td>
    //                         </tr>
    //                     })
    //                     }
    //                 </tbody>
    //             </Table>


    //         </div>
    //     )
    // }
    render() {
        return (
            <div className="globalStats">
                <Header isAuthenticated={this.props.isAuthenticated} />
                {/* <h3 className="text-center" style={{ marginTop: '5rem', marginBottom: '5rem' }}>Global Statistic</h3> */}

                <Card style={{
                    width: '28rem', marginTop: '5rem', height: 'auto', margin: 'auto', padding: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}>

                    <Card.Body>
                        <Card.Title style={{ marginBottom: '1rem', marginTop: '1rem', textAlign: 'center' }}>Global Statistics</Card.Title>
                        <Container>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Win Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.globalStats.map((user, idx) => {
                                        return <tr key={idx}>
                                            <td>{user.email}</td>
                                            <td>{user.winRatio}%</td>
                                        </tr>
                                    })
                                    }
                                </tbody>
                            </Table>
                            <Favorites />
                        </Container>
                    </Card.Body>
                </Card>

            </div>
        )
    }

}

export default mustBeAuthenticated(GlobalStats)
