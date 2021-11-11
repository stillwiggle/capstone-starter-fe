import React, { Component } from "react";
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";
import Header from "../../components/header/Header";

class Protected extends Component {

    render() {
        return (
            <div className="Protected">
                <Header isAuthenticated={this.props.isAuthenticated} />
                <div className="container">
                    <h2>Protected Content</h2>
                </div>
            </div>
        );
    }
}

export default mustBeAuthenticated(Protected);