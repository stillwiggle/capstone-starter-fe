import React, { Component } from "react"
import { withRouter } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table'
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";
// import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";


// importing the ability to retrieve and use the Auth Header for API calls
import { generateAuthHeader, getUserEmail } from "../../utils/authHelper"

// importing components needed for the header 
import Header from "../../components/header/Header"

class Users extends Component {

    state = {
        users: [],
        globalStats: []
    }

    componentDidMount() {
        this.getUsers()
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

    getUsers = () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/users`, {
            // auth header for using the currently logged in user's token for the API call
            headers: { ...generateAuthHeader() }
        })
            .then((results) => results.json())
            .then((data) => {
                this.setState(
                    {
                        users: data
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })

    }

    addFavorites = event => {

        const favoritesEmail = event.target.getAttribute("data-email")

        let currentUserStats = this.getCurrentUserStats()
        currentUserStats[0].favoritesList.push(favoritesEmail)

        fetch(`${process.env.REACT_APP_API_URL}/api/stats/${getUserEmail()}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                ...generateAuthHeader()
            },
            body: JSON.stringify({
                favoritesList: currentUserStats[0].favoritesList
            })
        })
            .then((results) => results.json())
            .then((data) => {
                let message = "User added to favorites"
                this.props.history.push(`${this.props.location.pathname}?message=${message}`)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getCurrentUserStats = () => {
        let currentUserStats = this.state.globalStats.filter(userStat => {
            return getUserEmail() === userStat.email
        })
        return currentUserStats
    }

    isFriend = (email) => {

        let currentUserStats = this.getCurrentUserStats()

        if (currentUserStats.length) {
            return currentUserStats[0].favoritesList.includes(email)
        }

        return false

    }

    render() {

        const params = new URLSearchParams(this.props.location.search);
        const flashMessage = params.get('message');

        return (
            <div className="Users">

                <Header isAuthenticated={this.props.isAuthenticated} />

                <div className="container">
                    {flashMessage && <Alert variant="info">{flashMessage}</Alert>}
                </div>

                {/* <h3 className="text-center" >Registered Users</h3> */}
                <Card style={{
                    width: '50%', marginTop: '5rem', height: '100%', margin: 'auto', padding: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}>

                    <Card.Body>
                        <Card.Title style={{ marginBottom: '6rem', marginTop: '2rem', textAlign: 'center' }}>Registered Users</Card.Title>
                        <Container>
                        <Table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((user, idx) => {
                                    return <tr key={idx}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td><button {...((this.isFriend(user.email) || user.email === getUserEmail()) && { disabled: true })} data-email={user.email} onClick={this.addFavorites} className="update-btn">Add to Favorites</button></td>
                                    </tr>

                                })
                                }
                            </tbody>
                        </Table>
                    </Container>
                </Card.Body>
            </Card>

            </div >
        )
    }

}

export default withRouter(mustBeAuthenticated(Users))
