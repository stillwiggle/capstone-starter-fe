import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";

// importing the ability to retrieve and use the Auth Header for API calls
import {generateAuthHeader} from "../../utils/authHelper"

// importing components needed for the header 
import Header from "../../components/header/Header"

class GlobalStats extends Component {

    state = {
        globalStats: []
    }

    componentDidMount() {

        // Run the getglobalStats method using the email obtained above
        this.getglobalStats()
    }

    getglobalStats= () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/stats/`, {
            // auth header for using the currently logged in user's token for the API call
            headers: {...generateAuthHeader()}
        })
            .then((results) => results.json())
            .then((data) =>{
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

    render() {
        return (
            <div className="globalStats">

                <Header isAuthenticated={this.props.isAuthenticated} />

                <h3 className="text-center" >Global Statistics</h3>

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


            </div>
        )
    }

}

export default mustBeAuthenticated(GlobalStats)
