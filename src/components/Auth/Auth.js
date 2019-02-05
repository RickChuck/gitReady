import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            hash_value: '',
            loggedInUser: {}
        }
    }

    signup = async () => {
        console.log('fired')
        let { user_name, hash_value} = this.state;
        let res = await axios.post('/auth/signup', {user_name: user_name, hash_value: hash_value})
        this.setState({ loggedInUser: res.data })
        await this.props.history.push('/dashboard')
    }
    
    login = async () => {
        console.log('fired')
        let { user_name, hash_value} = this.state;
        let res = await axios.post('/auth/login', {user_name: user_name, hash_value: hash_value})
        this.setState({ loggedInUser: res.data })
        await this.props.history.push('/dashboard')
    }

    render(){
        // console.log(this.state.loggedInUser);        
        return(
            <div className='Auth'>
                <div>
                    <ul>
                        <p>
                        Username: <input onChange={(e) => this.setState({user_name: e.target.value})} type="text"/>
                        Password: <input onChange={(e) => this.setState({hash_value: e.target.value})} type="password"/>
                        <button onClick={this.login}>Login</button>
                        <button onClick={this.signup}>Sign Up</button>
                        </p>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Auth;