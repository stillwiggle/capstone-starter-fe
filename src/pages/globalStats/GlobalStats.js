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

        console.log(`mount log message`)
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
                this.setState(
                    {
                        // globalStats: JSON.stringify(data)
                        globalStats: data
                    }
                )
                console.log(`Fetch inside message:${this.state.globalStats}`)
                console.log("Fetch inside message:" + JSON.stringify(this.state.globalStats))
            })
            .catch((error) => {
                console.log(error)
            })
            console.log(`Fetch outside message: ${this.state.globalStats}`)

    }

    render() {
        return (
            <div className="globalStats">

                <Header isAuthenticated={this.props.isAuthenticated} />

                <h3 className="text-center" >Global Statistics</h3>
                {/* <h3 className="text-center" >{this.state.globalStats.email}'s Statistics</h3> */}

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
                                <td>{user.winRatio}</td>
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
