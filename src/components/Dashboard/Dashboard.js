import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Modal from 'react-responsive-modal';
import {
    Button,
    Image
} from 'react-bootstrap';
import '../styles/dashboard.css';
import logo from '../styles/logo.png'

require('dotenv').config();

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            rows: [],
            blogInput: '',
            visable: false
        }

        this.review = {
            body: '',
            author: {id: 0, user_name: ''},
            movie: {poster_src: '', title: ''},
        }
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
                    const movieRow = <table key={movie.id}>
                    <tbody>
                        <tr>
                            <td>
                                <img onClick={() => this.handleMovie(movie)} src={movie.poster_src} className='search-results' alt="poster" width="150" tabIndex="0"/>
                            </td>
                            <td>
                                <h3>
                                    {movie.title}
                                </h3> 
                            </td>
                        </tr>
                    </tbody>
                </table>    
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

    handleMovie = (selectedMovie) => {
        // console.log(selectedMovie);
        this.review.movie = {title: selectedMovie.title, poster_src: selectedMovie.poster_src};
    }

    addPost = async () => {
        let {blogInput} = this.state
        // console.log(blogInput);
        this.review.body = blogInput;
        // console.log(this.review);
        
        let res = await axios.post(`/api/addPost`, {
            post: this.review
        })
        // console.log('addPost res.data', res.data);
        this.setState({ posts: res.data })
        this.closeModal();
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

    openModal = () => {
        this.setState({
            visable: true
        });
    }
    closeModal = () => {
        this.setState({
            visable: false
        })
    }


    render(){    
        // console.log('this.state.posts', this.state.posts);
        // console.log('this.state.rows', this.state.rows);
        const blogDisplay = this.state.posts.map((el, i) => {
            // console.log("el", el);
            return (
                <div key={i}>
                    <div>
                        <h3 className='username-dash'>• {el.user_name}</h3>
                    </div>
                    <div className='post-body'>
                        <div className='post-container'>
                            <img src={el.movie_poster} className='poster-img' alt="movie poster"/>
                            <p className='post-dash'>{el.post}</p>
                        </div>
                        {/* <Button className='delete-btn' onClick={() => {this.handleDelete(el.post_id)}}>X</Button> */}
                    </div>
                </div>
            )
        })
        return(
            <div className='Dashboard'>
                <div>
                    <nav className='navBar'>
                        <Image src={logo} alt="movieDot" className='logo-dash'/>
                        <Button className='logout-dash' onClick={this.logout}>Logout</Button>
                    </nav>
                </div>
                <section>
                    <Button className='makePost-btn' onClick={() => this.openModal()}>Make new post</Button>
                    <div className='post-module'>
                        <Modal open={this.state.visable} onClose={() => this.closeModal()}>
                            <form className="modal" onSubmit={this.handleSubmit.bind(this)}>
                                <h3>Search movie posters by title.</h3>
                                <input onChange={this.searchChangeHandler.bind(this)} style={{
                                    fontSize: 24,
                                    margin: 5,
                                    width: "75%",
                                    borderRadius: 4,
                                    backgroundColor: 'whiteSmoke'
                                }} type="text"/>
                                <div style={{
                                    display: "inline-block",
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    width: 500,
                                    height: 350,
                                    overflow: 'auto',
                                    border: '5px solid black',
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
                                <h4>Share your thoughts.</h4>
                                <div className='thoughts-input-containter'>
                                    <textarea className='postInput' onChange={(e) => this.setState({blogInput: e.target.value})} type="text"/>
                                    <Button className='button-auth' onClick={() => this.addPost()}>Submit</Button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </section>
                <div className='blogDisplay'>{blogDisplay}</div>
            </div>
        )
    }
}
export default Dashboard;