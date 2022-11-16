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
        let questionsAnswered = parseInt(localStorage.getItem("questionsAnswered"))
            this.getQuestions()
        if (questionsAnswered > 0){
            this.setQuestionsAnsweredNumber()
            this.determineCorrectAnswer()
            this.resetCurrentQuestionAndAnswer()
        }
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
        console.log(this.state.questionsAnswered)
        let newValue = this.state.questionsAnswered + 1
        console.log(newValue)
        localStorage.setItem("questionsAnswered", newValue.toString())
        console.log("Questions Answered" + localStorage.getItem("questionsAnswered"))
        console.log("Correct Answers" + localStorage.getItem("correctAnswers"))
        e.preventDefault()
        window.location.reload();
    }


    setCurrentAnswer = (e) => {
        localStorage.setItem("currentAnswers", e.target.value.toString())
        return console.log("It worked " + localStorage.getItem("currentAnswers"))
    }


    determineCorrectAnswer() {
        let correctAnswer = localStorage.getItem("correctAnswer")
        let currentAnswer = localStorage.getItem("currentAnswers")
        let correctAnswerCount = localStorage.getItem("correctAnswers")

        if (correctAnswerCount == "NaN"){
            localStorage.setItem("correctAnswers", this.state.correctAnswers.toString())
        }

        console.log("determine correct answer working")
        if(currentAnswer === correctAnswer) {
            let currentCorrectAnswers = parseInt(localStorage.getItem("correctAnswers"))
            let newCorrectAnswerCount = currentCorrectAnswers + 1
            localStorage.setItem("correctAnswers", newCorrectAnswerCount.toString())
            console.log("Your answer is correct")
        } else {
            console.log("Your answer is not correct")
        }
    }


    resetCurrentQuestionAndAnswer() {
        localStorage.setItem("currentAnswers", "")
        localStorage.setItem("currentQuestion", "")
    }


    setQuestionsAnsweredNumber() {
        let currentQuestion = localStorage.getItem("questionsAnswered");

        if (currentQuestion > 10){
            this.setState({showViewResults: true})
            console.log(currentQuestion)
        } if (currentQuestion == NaN) {
            this.setState({questionsAnswered: 0})
        } else {
            console.log(localStorage.getItem("questionsAnswered"))
            this.setState({questionsAnswered: parseInt(currentQuestion)})
        }
    }


    render() {
        return (
            <div className="Users">
                <Header />
                <h3 className="text-center" >Questions<div>{localStorage.getItem("correctAnswers")}</div></h3>
                <table>
                    <thead>
                    {!this.state.showViewResults &&
                    <tr>
                        <th>Question {this.state.questionsAnswered}</th>
                    </tr> }
                    {this.state.showViewResults &&
                        <tr>

                            <div>
                                <th>Results!</th>
                                <div>{localStorage.getItem("correctAnswers")}</div>
                                <div>{this.state.questionCount}</div>
                            </div>
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
                                    localStorage.setItem("correctAnswer", question.correctAnswer)
                                    newArray.push(question.correctAnswer)
                                    newArray.push(...question.incorrectAnswers)
                                    return <tr key={idx}>
                                        <Button questionindex={idx.toString()} onClick={this.setCurrentAnswer} value={newArray[0]} correctanswer={question.correctAnswer}>
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