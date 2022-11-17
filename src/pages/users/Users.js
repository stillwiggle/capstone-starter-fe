import React, { Component } from "react"
import { withRouter } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import Table from 'react-bootstrap/Table'
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";

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

                <h3 className="text-center" >Registered Users</h3>
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

            </div>
        )
    }

}

export default withRouter(mustBeAuthenticated(Users))
