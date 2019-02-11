import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import '../styles/auth.css'
import axios from 'axios';
import {
    Form,
    Button,
    Col,
    Container,
    Image
} from 'react-bootstrap';
import logo from '../styles/logo.png';

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
            <Container className='all-auth'>
                <Image className='logo' src={logo} fluid/>
                <Form className='Auth-form'>
                    <h1 className='text-auth'>Login to get started</h1>
                    <p className='text-auth'>• Or signup if it's your first time here.</p>
                    <p className='border-line'></p>
                    <Col>
                        <Form.Group controlId="formGroupEmail" style={{
                            margin: 5
                        }}>
                            <Form.Label className='username-auth' style={{
                                margin: 5
                            }}>Username</Form.Label>
                            <Form.Control className='usernameInput' onChange={(e) => this.setState({user_name: e.target.value})} type="text" placeholder="Enter username" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className='password-auth'>Password</Form.Label>
                            <Form.Control className='passwordInput' onChange={(e) => this.setState({hash_value: e.target.value})} type="password" placeholder="Password"/>
                        </Form.Group>
                        <Form.Group style={{
                            marginBottom: 5
                        }}>
                            <Button variant="outline-success" className="button-auth" onClick={this.login}>Login</Button>
                            <Button className="button-auth" onClick={this.signup}>Sign Up</Button>      
                        </Form.Group>
                    </Col>
                </Form>

            </Container>
        )
    }
}
export default Auth;