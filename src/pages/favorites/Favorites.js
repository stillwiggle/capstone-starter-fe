import React, { Component } from "react"
// import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";

// importing the ability to retrieve and use the Auth Header for API calls
import {generateAuthHeader,getUserEmail} from "../../utils/authHelper"

// importing components needed for the header 
import Header from "../../components/header/Header"


class Favorites extends Component {

    state = {
        favorites: []
    }

    componentDidMount() {
        console.log("this just ran")
        this.getFavorites()
    }

    getFavorites= () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/stats/${getUserEmail()}`, {
            // auth header for using the currently logged in user's token for the API call
            headers: {...generateAuthHeader()}
        })
            .then((results) => results.json())
            .then((data) =>{
                console.log(data)
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

    render() {
        return (
            <div className="Favorites">

                {/* <Header isAuthenticated={this.props.isAuthenticated} /> */}
                <Header />

                <h3 className="text-center" >Favorites</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.favorites.map((email, idx) => {
                                return <tr key={idx}>
                                        <td>{email}</td>
                                        </tr>
                                
                            })
                        }
                    </tbody>
                </table>

            </div>
        )
    }

}

// export default mustBeAuthenticated(Users)
export default Favorites
