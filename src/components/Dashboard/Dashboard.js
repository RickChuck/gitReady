import React, { Component } from 'react';
import axios from 'axios';
// require('dotenv').config();

// const URL = "https://api.themoviedb.org/3/movie/550?api_key=";
// const API_KEY = process.env.API_KEY;

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            blogInput: ''
        }
    }

    componentDidMount = async () => {
        let res = await axios.get('/api/getPost')
        // console.log('res.data', res.data);
        this.setState({
            posts: res.data
        })
    }

    // getPosters = async () => {
    //     let res = await axios.get(URL+`${API_KEY}`)
    //     this.setState({ movie: res.data})
    // }

    addPost = async () => {
        let {blogInput} = this.state
        let res = await axios.post(`/api/addPost`, {
            post: blogInput
        })
        // console.log(res.data);
        
        this.setState({ posts: res.data })
    }

    handleDelete = async (id) => {
        let res = await axios.delete(`/api/deletePost/${id}`)
        // console.log(res.data)
        this.setState({ posts: res.data })
    }

    logout = async () => {
        await axios.post('/auth/logout')
        this.props.history.push('/')
    }

    render(){    
        // console.log('this.state.posts', this.state.posts);
        const blogDisplay = this.state.posts.map((el, i) => {
            return (
                <div key={i}>
                    <div>
                        <h3>User: {el.user_name}</h3>
                    </div>
                    <div>
                        <p>{el.post}</p>
                        <button onClick={() => {this.handleDelete(el.id)}}>X</button>
                    </div>
                    <hr/>
                </div>
            )
        })
        return(
            
            <div className='Dashboard'>
                <h1>You made it to the DASHBOARD</h1>
                <div>
                    <button onClick={this.logout}>Logout</button>
                </div>
                <div>
                    <input onChange={(e) => this.setState({blogInput: e.target.value})} type="text"/>
                    <button onClick={() => this.addPost()}>Submit</button>
                </div>
                <hr/>
                <div>{blogDisplay}</div>
            </div>
        )
    }
}
export default Dashboard;