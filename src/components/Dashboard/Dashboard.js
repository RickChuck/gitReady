import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
// import PostPortal from '../PostPortal.js/PostPortal';
import MovieRow from './MovieRow';
import {
    Button
} from 'react-bootstrap';
import '../styles/dashboard.css';

require('dotenv').config();

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            rows: [],
            blogInput: ''
        }

        // this.state = {rows: movieRows}

        // this.performSearch() 
    }
    
    componentDidMount = async () => {
        let res = await axios.get('/api/getPost')
        // console.log('res.data', res.data);
        this.setState({
            posts: res.data
        })
    }
    

    performSearch = (searchTerm) => {
        // console.log('perform search')
        let API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
        const urlString = `https://api.themoviedb.org/3/search/movie?api_key=`+API_KEY+"&query="+searchTerm
        $.ajax({
            url: urlString,
            success: (searchResults) => {
                // console.log("Fetched data successfully")
                // console.log(searchResults);
                const results = searchResults.results
                // console.log(results[0]);

                let movieRows = []

                results.forEach((movie) => {
                    movie.poster_src = "https://image.tmdb.org/t/p/w185"+movie.poster_path
                    // console.log(movie.poster_path);
                    const movieRow = <MovieRow key={movie.id} movie={movie}/>
                    movieRows.push(movieRow)
                })

                this.setState({rows: movieRows})
                // console.log("movieRows", movieRows)
            },
            error: (err) => {
                console.error("Failed to fetch data", err);
            }
        })
    }
    
    searchChangeHandler = (event) => {
        const boundObject = this
        const searchTerm = event.target.value
        this.performSearch(searchTerm)
        boundObject.performSearch(searchTerm)
    }

    addPost = async () => {
        let {blogInput} = this.state
        let res = await axios.post(`/api/addPost`, {
            post: blogInput
        })
        // console.log('addPost res.data', res.data);
        this.setState({ posts: res.data })
    }

    handleDelete = async (id) => {
        // console.log(id)
        let res = await axios.delete(`/api/deletePost/${id}`)
        // console.log("res.data", res.data)
        this.setState({ posts: res.data })
    }

    logout = async () => {
        await axios.post('/auth/logout')
        this.props.history.push('/')
    }

    handleSubmit(e){
        e.preventDefault();
        e.target.reset();
    }


    render(){    
        // console.log('this.state.posts', this.state.posts);
        console.log('this.state.rows', this.state.rows);
        const blogDisplay = this.state.posts.map((el, i) => {
            // console.log("el", el);
            return (
                <div key={i}>
                    <div>
                        <h3>• {el.user_name}</h3>
                    </div>
                    <div>
                        <p>{el.post}</p>
                        <Button onClick={() => {this.handleDelete(el.post_id)}}>X</Button>
                    </div>
                    <hr/>
                </div>
            )
        })
        return(
            <div className='Dashboard'>
                <div>
                    <nav style={{
                            backgroundColor: "black",
                            display: "block",
                            padding: 30    
                        }}>

                        <Button className='button-auth' onClick={this.logout}>Logout</Button>
                    </nav>
                </div>
                <div className='post-module'>
                    <form className="post_inputs" onSubmit={this.handleSubmit.bind(this)}>
                    <h3>Search movie posters by title.</h3>
                    <input onChange={this.searchChangeHandler.bind(this)} style={{
                        fontSize: 24,
                        margin: 5,
                        width: "75%"
                    }} type="text"/>
                    <div style={{
                        display: "inline-block",
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '55%',
                        height: 450,
                        overflow: 'auto',
                        border: '5px solid whiteSmoke',
                        borderRadius: 10,
                        margin: 5,
                        scrollBehavior: "smooth",
                    }}>
                        <h3 style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            margin: 10,
                            marginLeft: 45,
                            flexWrap: 'wrap',
                            fontSize: 18,
                        }}>
                            {this.state.rows}
                        </h3>
                    </div>
                    </form>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <h4>Share your thoughts.</h4>
                        <input style={{
                            fontSize: 24,
                            margin: 5,
                            width: "75%",
                            height: 50
                        }}  onChange={(e) => this.setState({blogInput: e.target.value})} type="text"/>
                        <Button className='button-auth' onClick={() => this.addPost()}>Submit</Button>
                    </form>
                </div>
                <div>{blogDisplay}</div>
            </div>
        )
    }
}
export default Dashboard;