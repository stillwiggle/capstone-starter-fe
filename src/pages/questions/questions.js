import React, { Component } from "react"

import {generateAuthHeader} from "../../utils/authHelper"

import Header from "../../components/header/Header"
import Button from "react-bootstrap/Button";

class Questions extends Component {

    state = {
        categories: [],
        categoryAmount: null,
        formData: [],
        questionsAnswered: 9,
        questionCount: 10,
        correctAnswers: 9,
        showViewResults: false,
        currentQuestion: "",
        currentAnswers: "",
        correctAnswer: ""
    }

    componentDidMount() {
        this.getQuestions()
        console.log(this.state.formData)
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
                console.log(this.state.formData)
                console.log(typeof this.state.formData)
            })

            .catch((error) => {
                console.log(error)
            })
    }
    //
    // createAnswerList(){
    //     //this is where we will take questions from the object and create a new array to how the correct and inccorect answers
    //
    //     let questionIndex = this.state.questionsAnswered;
    //     let answerList = [];
    //
    //
    // }
    //
    // submitAnswer(userAnswer) {
    //     //this is function where the questionAnswered state variable will add to the count when the user answers a question
    //     let questionIndex = this.state.questionsAnswered;
    //
    //     if(userAnswer === this.state.formData[questionIndex].correctAnswer) {
    //         // this.state.questionsAnswered++;
    //         this.setState((questionsAnswered, props) => ({
    //             counter: questionsAnswered.counter + 1
    //         }));
    //
    //         this.setState((correctAnswers, props) => ({
    //             counter: correctAnswers.counter + 1
    //         }));
    //     } else {
    //         this.setState((questionsAnswered, props) => ({
    //             counter: questionsAnswered.counter + 1
    //         }));
    //     }
    // }
    //
    // mapQuestions() {
    //
    // }


    render() {
        return (
            <div className="Users">
                <Header />
                <h3 className="text-center" >Questions</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Question {this.state.questionsAnswered + 1}</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.questionsAnswered < this.state.questionCount &&
                        this.state.formData.map((question, idx) => {
                            if (idx == this.state.questionsAnswered) {
                                return <tr key={idx}>
                                    <td>{question.question}</td>
                                </tr>
                            }
                        })
                    }

                    {this.state.questionsAnswered < this.state.questionCount &&
                        this.state.formData.map((question, idx) => {
                                let newArray = [];
                                if (idx == this.state.questionsAnswered) {
                                    newArray.push(question.correctAnswer);
                                    newArray.push(...question.incorrectAnswers);
                                    console.log(newArray)
                                    return <tr key={idx}>
                                        <Button value={newArray[0]}>
                                            {newArray[0]}
                                        </Button>
                                        <Button value={newArray[1]}>
                                            {newArray[1]}
                                        </Button>
                                        <Button value={newArray[2]}>
                                            {newArray[2]}
                                        </Button>
                                        <Button value={newArray[3]}>
                                            {newArray[3]}
                                        </Button>
                                    </tr>
                                }
                            })
                    }

                    {this.state.questionsAnswered < this.state.questionCount &&
                        <div>
                            <Button>
                                Quit
                            </Button>
                            <Button>
                                Next
                            </Button>
                        </div>
                    }
                    {console.log("Front end Log" + this.state.formData)}





                    {this.state.showViewResults &&
                        <div>Session Results</div>
                    }

                    </tbody>
                </table>

            </div>
        )
    }
}

export default Questions