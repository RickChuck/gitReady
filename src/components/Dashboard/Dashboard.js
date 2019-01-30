import React, { Component } from 'react';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            blogPosts: []
        }
    }
    render(){
        return(
            <div className='Dashboard'>
                <h1>You made it to the DASHBOARD</h1>
            </div>
        )
    }
}
export default Dashboard;