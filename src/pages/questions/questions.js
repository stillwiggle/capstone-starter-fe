import React, { Component } from "react"

import {generateAuthHeader} from "../../utils/authHelper"

import Header from "../../components/header/Header"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Questions extends Component {

    state = {
        categories: [],
        categoryAmount: null,
        formData: [],
        questionsAnswered: 0,
        questionCount: 10,
        correctAnswers: 0,
        showViewResults: false,
        currentQuestion: "",
        currentAnswers: "",
        correctAnswer: ""
    }

    componentDidMount() {
        this.getQuestions()
        this.setQuestionsAnsweredNumber()

    }

    getQuestions= () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        const category = 'Geography';

        fetch(`${apiURL}/api/questions/category?category=`+category, {
            // auth header for using the currently logged in user's token for the API call
            headers: {...generateAuthHeader()}
        })
            .then((results) => results.json())
            .then((data) =>{
                this.setState(
                    {
                        formData: data
                    }
                )
            })

            .catch((error) => {
                console.log(error)
            })
    }

    handleSubmit = (e) => {
        let newValue = this.state.questionsAnswered + 1
        localStorage.setItem("questionsAnswered", newValue.toString())
        e.preventDefault()
        window.location.reload();
    }

    handleChange = (e) => {

        // localStorage.setItem("currentAnswers", e.target.id.toString())
        // return console.log("It worked " + localStorage.getItem("currentAnswers"))
        //
        // this.state.formData.map((question, idx) => {
        //     return localStorage.setItem("currentAnswers", e.target.id.toString())
        // })
        //
        // // console.log(parseInt(e.target.id))
        // // return null
    }

    setCurrentAnswer = (e) => {
        localStorage.setItem("currentAnswers", e.target.value.toString())
        return console.log("It worked " + localStorage.getItem("currentAnswers"))
    }

//     if(idx === parseInt(e.target.id)) {
//     if(e.target.value.toString() === question.correctAnswer){
//     localStorage.setItem("questionsAnswered", newValue.toString())

    setQuestionsAnsweredNumber() {
        let currentQuestion = localStorage.getItem("questionsAnswered");

        if (currentQuestion > 10){
            this.setState({showViewResults: true})
            console.log(currentQuestion)
        } else {
            this.setState({questionsAnswered: parseInt(currentQuestion)})
        }

    }


    render() {
        return (
            <div className="Users">
                <Header />
                <h3 className="text-center" >Questions</h3>
                <table>
                    <thead>
                    {!this.state.showViewResults &&
                    <tr>
                        <th>Question {this.state.questionsAnswered}</th>
                    </tr> }
                    {this.state.showViewResults &&
                        <tr>
                            <th>Results!</th>
                        </tr> }
                    </thead>
                    <tbody>

                    {!this.state.showViewResults &&
                        this.state.formData.map((question, idx) => {
                            if (idx == this.state.questionsAnswered) {
                                return <tr key={idx}>
                                    <td>{question.question}</td>
                                </tr>
                            }
                        })
                    }

                    {!this.state.showViewResults &&
                        this.state.formData.map((question, idx) => {
                                let newArray = [];
                                if (idx == this.state.questionsAnswered) {
                                    newArray.push(question.correctAnswer);
                                    newArray.push(...question.incorrectAnswers)
                                    return <tr key={idx}>
                                        <Button id={idx.toString()} onClick={this.setCurrentAnswer} value={newArray[0]}>
                                            {newArray[0]}
                                        </Button>
                                        <Button key={idx} value={newArray[1]}>
                                            {newArray[1]}
                                        </Button>
                                        <Button key={idx} value={newArray[2]}>
                                            {newArray[2]}
                                        </Button>
                                        <Button key={idx} value={newArray[3]}>
                                            {newArray[3]}
                                        </Button>
                                    </tr>
                                }
                            })
                    }

                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Questions