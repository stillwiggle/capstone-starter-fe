import React, { Component } from "react"
// import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";

// importing the ability to retrieve and use the Auth Header for API calls
import {generateAuthHeader} from "../../utils/authHelper"

// importing components needed for the header 
import Header from "../../components/header/Header"

class Users extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        console.log("this just ran")
        this.getUsers()
    }

    getUsers= () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/users`, {
            // auth header for using the currently logged in user's token for the API call
            headers: {...generateAuthHeader()}
        })
            .then((results) => results.json())
            .then((data) =>{
                console.log(data)
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

    render() {
        return (
            <div className="Users">

                {/* <Header isAuthenticated={this.props.isAuthenticated} /> */}
                <Header />

                <h3 className="text-center" >Registered Users</h3>

            </div>
        )
    }

}

// export default mustBeAuthenticated(Users)
export default Users
