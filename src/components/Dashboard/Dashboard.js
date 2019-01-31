import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            blogPosts: []
        }
    }

    logout = () => {
        axios.post('/auth/logout').then(res => {
            this.props.history.push('/')
        })
    }

    render(){
        return(
            <div className='Dashboard'>
                <h1>You made it to the DASHBOARD</h1>
                <div>
                    <button onClick={this.logout}>Logout</button>
                </div>
            </div>
        )
    }
}
export default Dashboard;