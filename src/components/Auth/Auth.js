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
                        <p style={{
                            color: 'white'
                        }}>
                        <p style={{
                            margin: 0,
                        }}>Username:</p><input style={{
                            padding: 5,
                            margin: 5
                        }} onChange={(e) => this.setState({user_name: e.target.value})} type="text"/>
                        <p style={{
                            margin: 0
                        }}>Password:</p><input style={{
                            padding: 5,
                            margin: 5
                        }} onChange={(e) => this.setState({hash_value: e.target.value})} type="password"/>
                        <div style={{
                            margin: 5
                        }}>
                            <button style={{
                                margin: 5,
                                color: 'white',
                                backgroundColor: 'green',
                                border: 'none',
                                padding: 5,
                                fontSize: 20,
                                fontWeight: 800,
                                borderRadius: 7
                            }} onClick={this.login}>Login</button>
                            <button style={{
                                margin: 5,
                                color: 'white',
                                backgroundColor: 'green',
                                border: 'none',
                                padding: 5,
                                fontSize: 20,
                                fontWeight: 800,
                                borderRadius: 7
                            }} onClick={this.signup}>Sign Up</button>
                        </div>
                        </p>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Auth;