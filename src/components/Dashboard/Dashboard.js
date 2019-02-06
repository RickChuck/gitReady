import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import MovieRow from './MovieRow'
require('dotenv').config();

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            blogInput: ''
        }

        // const movieRows = []
        // movies.forEach((movie) => {
        //     const movieRow = <MovieRow movie={movie} />
        //     movieRows.push(movieRow)
        // })

        // this.state = {rows: movieRows}

        this.performSearch() 
    }
    
    componentDidMount = async () => {
        let res = await axios.get('/api/getPost')
        // console.log('res.data', res.data);
        this.setState({
            posts: res.data
        })
    }
    
    performSearch = (searchTerm) => {
        console.log('perform search')
        let API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
        const urlString = `https://api.themoviedb.org/3/search/movie?api_key=`+API_KEY+"&query="+searchTerm
        $.ajax({
            url: urlString,
            success: (searchResults) => {
                console.log("Fetched data successfully")
                console.log(searchResults);
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
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data");
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
                    <nav style={{
                            backgroundColor: "black",
                            display: "block",
                            padding: 20    
                        }}>

                        <button onClick={this.logout}>Logout</button>
                    </nav>
                </div>
                <div>
                    <div>
                        <h3>Search movie posters by title.</h3>
                        <input onChange={this.searchChangeHandler.bind(this)} style={{
                            fontSize: 24,
                            margin: 5,
                            width: "75%"
                        }} type="text"/>
                        {this.state.rows}
                    </div>
                    <h4>Share your thoughts.</h4>
                    <div>
                        
                    </div>
                    <input style={{
                            fontSize: 24,
                            margin: 5,
                            width: "75%",
                            height: 50
                        }}  onChange={(e) => this.setState({blogInput: e.target.value})} type="text"/>
                    <button style={{
                            fontSize: 18,
                            margin: 5
                        }}  onClick={() => this.addPost()}>Submit</button>
                </div>
                <hr/>
                <div>{blogDisplay}</div>
            </div>
        )
    }
}
export default Dashboard;