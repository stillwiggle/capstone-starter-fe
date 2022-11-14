import React, { Component } from "react"
import Table from 'react-bootstrap/Table'


// importing the ability to retrieve and use the Auth Header for API calls
import {generateAuthHeader} from "../../utils/authHelper"

// importing components needed for the header 
import Header from "../../components/header/Header"

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

    getUserStats= (email) => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/stats/${email}`, {
            // auth header for using the currently logged in user's token for the API call
            headers: {...generateAuthHeader()}
        })
            .then((results) => results.json())
            .then((data) =>{
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

                {/* <Header isAuthenticated={this.props.isAuthenticated} /> */}
                <Header />

                <h3 className="text-center" >{this.state.userStats.email}'s Statistics</h3>
                
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
                

            </div>
        )
    }

}

// export default mustBeAuthenticated(Users)
export default UserStats
