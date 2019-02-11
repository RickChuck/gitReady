import React from 'react';
// import axios from 'axios';

class MovieRow extends React.Component {

    // handleAddMovie = async (req, res) => {
    //     let {rows} = this.props.rows
    //     let {posts} = this.props.posts
    //     let res = await axios.post('/api/addMovie', {
    //         posts: rows
    //     })
    // }

    test = (req, res) => {
        console.log('add movie');
        console.log(this.props.posts);
        
        console.log(this.props.movie);
        // let {poster} = this.props.movie.poster_src
        // let res = axios.post('/api/addMovie', {
        //     this
        // })
        
    }

    render() {
        return <table key={this.props.movie.id}>
        <tbody>
            <tr>
                <td>
                    <img onClick={this.test.bind(this)} src={this.props.movie.poster_src} alt="poster" width="150"/>
                </td>
                <td>
                    <h3>
                        {this.props.movie.title}
                    </h3> 
                </td>
            </tr>
        </tbody>
    </table>
    }
}

export default MovieRow;