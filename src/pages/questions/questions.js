import React, { Component } from "react"

import {generateAuthHeader} from "../../utils/authHelper"

import Header from "../../components/header/Header"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";

class Questions extends Component {

    state = {
        categories: [],
        categoryAmount: null,
        formData: [],
        questionsAnswered: 0,
        questionCount: 10,
        correctAnswers: 0,
        resultModal: false,
        showViewResults: false,
        currentQuestion: "",
        currentAnswers: "",
        correctAnswer: "",
        userStatsQuestionCount: 0,
        userStatsCorrectCount: 0
    }

    componentDidMount() {
        let questionsAnswered = parseInt(localStorage.getItem("questionsAnswered"))
        this.getQuestions()

        if (questionsAnswered > 0){
            this.setQuestionsAnsweredNumber()
            this.determineCorrectAnswer()
            this.resetCurrentQuestionAndAnswer()
        } else {
            localStorage.setItem("correctAnswers", "0")
        }
    }

    getQuestions= () => {

        // get the API URL from the environment variable (.env)
        const apiURL = process.env.REACT_APP_API_URL

        //This pulls the category from the URL param
        let category = this.props.match.params.category


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

    //After the user submits their answer this function will set the questionsanswered local storage value to +1
    nextQuestion = (e) => {
        let newValue = this.state.questionsAnswered + 1
        localStorage.setItem("questionsAnswered", newValue.toString())

    }

    handleClose = () => {
        this.setState({resultModal: false})
    }

    handleShow = () => {
        this.setState({resultModal: true})
    }


    setCurrentAnswer = (e) => {
        //This takes the value of the event target and set's it as the current answer in local storage
        localStorage.setItem("currentAnswers", e.target.value.toString())
    }


    determineCorrectAnswer() {
        let correctAnswer = localStorage.getItem("correctAnswer")
        let currentAnswer = localStorage.getItem("currentAnswers")
        let correctAnswerCount = localStorage.getItem("correctAnswers")

        if (correctAnswerCount == "NaN"){
            localStorage.setItem("correctAnswers", this.state.correctAnswers.toString())
        }

        if(currentAnswer === correctAnswer) {
            let currentCorrectAnswers = parseInt(localStorage.getItem("correctAnswers"))
            let newCorrectAnswerCount = currentCorrectAnswers + 1
            localStorage.setItem("correctAnswers", newCorrectAnswerCount.toString())
            console.log("Your answer is correct")
        } else {
            console.log("Your answer is not correct")
        }
    }

//Helper function to reset current question and answer in local storage for the next question
    resetCurrentQuestionAndAnswer() {
        localStorage.setItem("currentAnswers", "")
        localStorage.setItem("currentQuestion", "")
    }

//This is helper function to reset all local storage values so you can retry the questions
    resetAllLocalStorageValues() {
        localStorage.setItem("currentAnswers", "")
        localStorage.setItem("currentQuestion", "")
        localStorage.setItem("correctAnswers", "0")
        localStorage.setItem("questionsAnswered", "0")
    }

//This is the logic to set the localstorage value of questions answered
    setQuestionsAnsweredNumber() {
        let currentQuestion = localStorage.getItem("questionsAnswered");

        if (currentQuestion > 10){
            this.setState({showViewResults: true})
        //Sometimes the questionsAnswered will have a value of NaN. This if statement is to get past this
        } if (currentQuestion == NaN) {
            this.setState({questionsAnswered: 0})
        } else {
            this.setState({questionsAnswered: parseInt(currentQuestion)})
        }
    }

    handleFinishGame = (e) =>{
        let userEmail = "string@gmail.com"
        const apiURL = process.env.REACT_APP_API_URL
        let apiBody
        let sessionCorrectAnswers = parseInt(localStorage.getItem("correctAnswers"))
        let oldQuestionsAttempted
        let oldCorrectAnswers
        let newQuestionsAnsweredValue
        let newCorrectAnswerValue

        //Get userstats value from userstats db
        fetch(`${apiURL}/api/stats/${userEmail}`, {
            // auth header for using the currently logged in user's token for the API call
            method: 'GET',
            headers: {...generateAuthHeader()}
        })
            .then((results) => results.json())
            .then((data) =>{
                localStorage.setItem("userStatsQuestionCount", data.questionsAttempted.toString())
                localStorage.setItem("userStatsCorrectCount", data.correctAnswers.toString())
            })

            .catch((error) => {
                console.log(error)
            })

        //Add new game values to userstats
        oldQuestionsAttempted = parseInt(localStorage.getItem("userStatsQuestionCount"))
        oldCorrectAnswers = parseInt(localStorage.getItem("userStatsCorrectCount"))

        newQuestionsAnsweredValue = this.state.questionCount + oldQuestionsAttempted
        newCorrectAnswerValue = oldCorrectAnswers + sessionCorrectAnswers

        console.log("this is question " + newQuestionsAnsweredValue)

        apiBody = {
            questionsAttempted: newQuestionsAnsweredValue,
            correctAnswers: newCorrectAnswerValue
        }

        //Patch the new values to the userstats db
        fetch(`${apiURL}/api/stats/${userEmail}`, {
            method: 'PATCH',
            headers: {'content-type': 'application/json', ...generateAuthHeader()},
            body: JSON.stringify(apiBody)
        }).then((r) => console.log(r.status))
            .catch((error) => {
                        console.log(error)
                    })

        //Deleting Localstorage Values at end of
        e.preventDefault()
        console.log("this worked")
    }


    render() {
        return (
            <div className="Users">
                <Header />
                <h3 className="text-center" >Questions<div>{localStorage.getItem("correctAnswers")}</div></h3>

                {/*<Card style={{width: '28rem', marginTop:'5rem', height: '30rem', margin: 'auto', padding: '10px',*/}
                {/*    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>*/}
                {/*    <Card.Body>*/}
                {/*        {!this.state.showViewResults &&*/}
                {/*            this.state.formData.map((question, idx) => {*/}
                {/*                if (idx == this.state.questionsAnswered) {*/}
                {/*                    return >*/}
                {/*                }*/}
                {/*            })*/}
                {/*        }*/}
                {/*        {!this.state.showViewResults &&*/}
                {/*            this.state.formData.map((question, idx) => {*/}
                {/*                if (idx == this.state.questionsAnswered) {*/}
                {/*                    return <tr key={idx}>*/}
                {/*                        <td>{question.question}</td>*/}
                {/*                    </tr>*/}
                {/*                }*/}
                {/*            })*/}
                {/*        }*/}

                {/*    </Card.Body>*/}
                {/*</Card>*/}


                <table>
                    <thead>
                    {/*This will only show if showViewResults State variable is true*/}
                    {!this.state.showViewResults &&
                    <tr>
                        <th>Question {this.state.questionsAnswered + 1}</th>
                    </tr> }
                    {/*This will only show if showViewResults State variable is false*/}
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
                    {/*This will only show if showViewResults State variable is true*/}
                    {!this.state.showViewResults &&
                        this.state.formData.map((question, idx) => {
                            if (idx == this.state.questionsAnswered) {
                                return <tr key={idx}>
                                    <td>{question.question}</td>
                                </tr>
                            }
                        })
                    }
                    {/*This will only show if showViewResults State variable is true*/}
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

                        <Form onSubmit={this.nextQuestion}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <Form onSubmit={this.resetAllLocalStorageValues}>
                            <Button variant="primary" type="submit">
                                Reset
                            </Button>
                        </Form>
                        {this.state.questionsAnswered == 9 &&
                            <Form onSubmit={this.handleFinishGame}>
                            <Button variant="primary" type="submit">
                            Handle Finish Game
                            </Button>
                            </Form>
                        }

                    </div>
                    </tbody>
                </table>

                <Button variant="primary" onClick={this.handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={this.state.resultModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Question {this.state.questionsAnswered}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><h5>Woohoo, you're reading this text in a modal!</h5></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default Questions