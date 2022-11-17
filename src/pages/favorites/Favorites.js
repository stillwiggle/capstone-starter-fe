import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated"

// importing the ability to retrieve and use the Auth Header for API calls
import { generateAuthHeader, getUserEmail } from "../../utils/authHelper"

// importing components needed for the header 
import Header from "../../components/header/Header"


class Favorites extends Component {

    state = {
        favorites: []
    }

    componentDidMount() {
        this.getFavorites()
    }

    getFavorites = () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/stats/${getUserEmail()}`, {
            // auth header for using the currently logged in user's token for the API call
            headers: { ...generateAuthHeader() }
        })
            .then((results) => results.json())
            .then((data) => {
                this.setState(
                    {
                        favorites: data.favoritesList
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })

    }

    removeFavorites = event => {

        const favoritesEmail = event.target.getAttribute("data-email")

        // find index of item to be removed
        const favoriteName = (favorite) => favorite === favoritesEmail
        const favoriteIndex = this.state.favorites.findIndex(favoriteName)
    
        // splice the array using the index of the user to remove
        this.state.favorites.splice(favoriteIndex, 1)

        fetch(`${process.env.REACT_APP_API_URL}/api/stats/${getUserEmail()}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                ...generateAuthHeader()
            },
            body: JSON.stringify({
                favoritesList: this.state.favorites
            })
        })
            .then((results) => results.json())
            .then((data) => {
                let message = "User removed from favorites"
                this.props.history.push(`${this.props.location.pathname}?message=${message}`)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {

        const params = new URLSearchParams(this.props.location.search)
        const flashMessage = params.get('message')

        return (
            <div className="Favorites">

                <Header isAuthenticated={this.props.isAuthenticated} />

                <div className="container">
                    {flashMessage && <Alert variant="info">{flashMessage}</Alert>}
                </div>

                <h3 className="text-center" >Favorites</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Email Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.favorites.map((email, idx) => {
                            return <tr key={idx}>
                                <td>{email}</td>
                                <td><button data-email={email} onClick={this.removeFavorites} className="remove-btn">Remove</button></td>
                            </tr>

                        })
                        }
                    </tbody>
                </Table>

            </div>
        )
    }

}

export default withRouter(mustBeAuthenticated(Favorites))
