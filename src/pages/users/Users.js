import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";

// importing the ability to retrieve and use the Auth Header for API calls
import {generateAuthHeader} from "../../utils/authHelper"

// importing components needed for the header 
import Header from "../../components/header/Header"

class Users extends Component {

    state = {
        users: []
    }

    componentDidMount() {
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

                <Header isAuthenticated={this.props.isAuthenticated} />

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
                                        <td>Add Friend</td>
                                    </tr>
                                
                            })
                        }
                    </tbody>
                </Table>

            </div>
        )
    }

}

export default mustBeAuthenticated(Users)
