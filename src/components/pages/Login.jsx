import React, { useState } from 'react';
import { Button, Container, Form, Header, Segment } from 'semantic-ui-react';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const submitHandle = async () => {
    const login = await AuthService.login(username, password);
    
    if (login?.id) {
      navigate('/news-management');
      window.location.reload();
    } else {
      toast.error(login?.message);
    }
  };

  return (
    <>
      <Container style={{margin: '5em 0em 0em', width: '30em'}}>
        <Segment size='big' color='blue'>
          <Form onSubmit={submitHandle}>
            <Header>Login</Header>
            <Form.Field>
              <label>Username</label>
              <input placeholder="Username" name="username" onChange={e => setUsername(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder="Password" name="password" type="password" onChange={e => setPassword(e.target.value)}/>
            </Form.Field>
            <Button primary type="submit">Submit</Button>
          </Form>
        </Segment>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Login;
