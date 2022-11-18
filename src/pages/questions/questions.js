import React, { Component } from "react"

import {generateAuthHeader, getUserEmail} from "../../utils/authHelper"

import Header from "../../components/header/Header"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Container, Modal} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        correctAnswer: "",
        userStatsQuestionCount: 0,
        userStatsCorrectCount: 0,
        apiBody: []
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
        if (category == "Film%20&%20TV"){
            category = "Geography"
        } else {
            console.log(category)
        }


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

        if(newValue == 10){
            this.handleEndGame()
        }

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

        if (currentQuestion > 9){
            this.setState({showViewResults: true})
        //Sometimes the questionsAnswered will have a value of NaN. This if statement is to get past this
        } if (currentQuestion == NaN) {
            this.setState({questionsAnswered: 0})
        } else {
            this.setState({questionsAnswered: parseInt(currentQuestion)})
        }
    }

    fetchUserStats = (e) => {
        const apiURL = process.env.REACT_APP_API_URL
        fetch(`${apiURL}/api/stats/${getUserEmail()}`, {
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
        return Promise.resolve();
    }

    createUserStatsAPIBody(){
        let oldQuestionValue = parseInt(localStorage.getItem("userStatsQuestionCount"))
        let oldCorrectValue = parseInt(localStorage.getItem("userStatsCorrectCount"))

        console.log("test old ques value " + oldQuestionValue)
        console.log("corr old ans value " + oldCorrectValue)

        let newQuestionValue = this.state.questionCount
        let newCorrectValue = parseInt(localStorage.getItem("correctAnswers"))

        console.log("test new ques value " + newQuestionValue)
        console.log("corr new ans value " + newCorrectValue)

        let questionsAttempted = newQuestionValue + oldQuestionValue
        let correctAnswers = newCorrectValue + oldCorrectValue

        console.log("test ques value " + questionsAttempted)
        console.log("corr ans value " + correctAnswers)

        let apiBody = {
            questionsAttempted: questionsAttempted,
            correctAnswers: correctAnswers
        }

        return apiBody
    }

    handleEndGame = (e) => {

        this.fetchUserStats()
        let apiBody = this.createUserStatsAPIBody()
        this.patchUSerStats(apiBody)
        // e.preventDefault()

    }

    patchUSerStats(apiBody){
        const apiURL = process.env.REACT_APP_API_URL
        fetch(`${apiURL}/api/stats/${getUserEmail()}`, {
            method: 'PATCH',
            headers: {'content-type': 'application/json', ...generateAuthHeader()},
            body: JSON.stringify(apiBody)
        }).then((r) => console.log(r.status))
            .catch((error) => {
                        console.log(error)
                    })

        console.log("patch user stats works")
        return Promise.resolve();
    }

    sendToCategories = (e) => {
        this.resetAllLocalStorageValues()
        this.resetCurrentQuestionAndAnswer()
        this.props.history.push("/categories")
    }


    render() {
        return (
            <div className="Users">
                <Header />
                <h1 className="text-center" style={{marginTop:'5rem', marginBottom: '5rem', fontStyle: '1000%', opacity: '.85'}}><div style={{fontSize: '200%', background: 'white'}}>{this.props.match.params.category}</div></h1>
                    {!this.state.showViewResults &&
                        this.state.formData.map((question, idx) => {
                            let newArray = [];
                            if (idx == this.state.questionsAnswered) {
                                localStorage.setItem("correctAnswer", question.correctAnswer)
                                newArray.push(question.correctAnswer)
                                newArray.push(...question.incorrectAnswers)
                                return <Card style={{width: '28rem', marginTop:'5rem', height: '32rem', margin: 'auto', padding: '10px',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                            <Card.Title key={idx}
                                                        value={question.question}
                                                        style={{textAlign: 'center', marginBottom: '3rem'}}>
                                                Question {this.state.questionsAnswered + 1}
                                            </Card.Title>
                                            <Card.Title key={idx}
                                                        value={question.question}
                                                        style={{marginBottom: '3rem', textAlign: 'center'}}>
                                                {question.question}
                                            </Card.Title>
                                                <Container>
                                                    <Row style={{marginLeft: '.25rem'}}>
                                                        <Col sm={6}>
                                                            <Button questionindex={idx.toString()}
                                                                    onClick={this.setCurrentAnswer}
                                                                    correctanswer={question.correctAnswer}
                                                                    variant="secondary"
                                                                    value={newArray[0]}
                                                                    style={{ width: '10rem',
                                                                        height: '5rem', marginBottom: '3rem',
                                                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), ' +
                                                                            '0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                                                {newArray[0]}
                                                            </Button>
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Button questionindex={idx.toString()}
                                                                    onClick={this.setCurrentAnswer}
                                                                    variant="secondary"
                                                                    value={newArray[1]}
                                                                    style={{ width: '10rem',
                                                                        height: '5rem', marginBottom: '3rem',
                                                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), ' +
                                                                            '0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                                                {newArray[1]}
                                                            </Button>
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Button questionindex={idx.toString()}
                                                                    onClick={this.setCurrentAnswer}
                                                                    variant="secondary"
                                                                    value={newArray[2]}
                                                                    style={{ width: '10rem',
                                                                        height: '5rem', marginBottom: '3rem',
                                                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), ' +
                                                                            '0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                                                {newArray[2]}
                                                            </Button>
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Button questionindex={idx.toString()}
                                                                    onClick={this.setCurrentAnswer}
                                                                    variant="secondary"
                                                                    value={newArray[3]}
                                                                    style={{ width: '10rem',
                                                                        height: '5rem', marginBottom: '3rem',
                                                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), ' +
                                                                            '0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                                                {newArray[3]}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                                <Container>
                                                    <Row style={{marginLeft: '.25rem'}}>
                                                        <Col sm={6}>
                                                            <Form onSubmit={this.sendToCategories}>
                                                                <Button variant="outline-danger"
                                                                        type="submit"
                                                                        style={{ width: '10rem',
                                                                            height: '2.5rem', marginBottom: '3rem', marginTop: '1.25rem',
                                                                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), ' +
                                                                        '0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                                                    Quit
                                                                </Button>
                                                            </Form>
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Form onSubmit={this.nextQuestion} style={{ color: 'green'}}>
                                                                <Button variant="outline-success"
                                                                        class="btn btn-secondary"
                                                                        type="submit"
                                                                        style={{ width: '10rem',
                                                                    height: '2.5rem', marginBottom: '3rem', marginTop: '1.25rem',
                                                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), ' +
                                                                        '0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                                                    Next
                                                                </Button>

                                                            </Form>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                        </Card>
                            }
                        })
                    }

                    {this.state.showViewResults &&
                        <Card style={{width: '28rem', marginTop:'5rem', height: '32rem', margin: 'auto', padding: '10px',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                            <Card.Title style={{textAlign: 'center', marginBottom: '3rem', marginTop: '4rem'}}>
                                View Results
                            </Card.Title>
                            <Card.Title style={{textAlign: 'center', marginBottom: '3rem'}}>
                                {localStorage.getItem("correctAnswers")} / {this.state.questionCount} Correct
                            </Card.Title>
                            <Card.Title style={{textAlign: 'center', marginBottom: '3rem'}}>
                                Great work!!! Thank you for Playing!
                            </Card.Title>
                            <Button onClick={this.sendToCategories} style={{marginTop: '3rem', height: '6rem', marginLeft: '2rem', marginRight: '2rem'}} variant="success" size="lg">
                                Play Again
                            </Button>
                        </Card>
                    }

                <Form onSubmit={this.handleEndGame}>
                    <Button variant="outline-danger"
                            type="submit"
                            style={{ width: '10rem',
                                height: '2.5rem', marginBottom: '3rem', marginTop: '1.25rem',
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), ' +
                                    '0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        Refresh Patch
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Questions