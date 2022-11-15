import React, { Component } from "react"

import {generateAuthHeader} from "../../utils/authHelper"

import Header from "../../components/header/Header"

class Questions extends Component {

    state = {
        categories: [],
        categoryAmount: null,
        formData: {},
        questionsAnswered: 0,
        correctAnswer: 0,
        showViewResults: false
    }

    componentDidMount() {
        console.log("this just ran")
        this.getQuestions()
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
                console.log(data)
                this.setState(
                    {
                        formData: data
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })
        console.log("This is the 2nd console" + this.state.formData)
    }

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

    render() {
        return (
            <div className="Users">
                <Header />
                <h3 className="text-center" >Questions</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Questions 1</th>
                    </tr>
                    </thead>
                    <tbody>

                    {/*{this.state.formData.toString()}*/}

                    {/*<div>HI{Object.keys(this.state.formData).map(question) => }</div>*/}


                    </tbody>
                </table>

            </div>
        )
    }
}

export default Questions