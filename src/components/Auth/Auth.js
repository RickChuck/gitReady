import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedInUser: {}
        }
    }

    signup = async () => {
        let { username, password} = this.state;
        //**Check line 18 for signup issues**
        let res = await axios.post('/auth/signup', {user_name: username, password: password})
        this.setState({ loggedInUser: res.data })
        await this.props.history.push('/dashboard')
    }

    render(){
        return(
            <div>
                <ul>
                    <p>
                    Username: <input type="text"/>
                    Password: <input type="password"/>
                    <Link to={'/dashboard'}>
                        <button type='button'>
                            !!!
                        </button>
                    </Link>
                    </p>
                </ul>
            </div>
        )
    }
}
export default Auth;