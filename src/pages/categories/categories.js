import React, { Component } from "react"

import {generateAuthHeader} from "../../utils/authHelper"

import Header from "../../components/header/Header"
import Button from "react-bootstrap/Button";

class Categories extends Component {

    state = {
        categories: [],
        categoryAmount: null
    }

    componentDidMount() {
        console.log("this just ran")
        this.getCategories()
    }

    getCategories= () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        fetch(`${apiURL}/api/questions/categories`, {
            // auth header for using the currently logged in user's token for the API call
            headers: {...generateAuthHeader()}
        })
            .then((results) => results.json())
            .then((data) =>{
                console.log(data)
                this.setState(
                    {
                        categories: data
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
                <Header />
                <h3 className="text-center" >Registered Users</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Choose a Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.categories.map(category =>(
                        <div>
                            <Button>
                                {category}
                            </Button>
                        </div>
                    ))}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Categories