import React, { useState } from 'react';
import {
  Button,
  Grid,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import AuthService from '../../services/auth.service';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ children, title }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState('news-management');
  const [visible, setVisible] = useState(false);

  const handleClick = (_e, { name }) => {
    setActive(name);
    if (name === 'home') {
      navigate('/');
    } else {
      navigate(`/${name}`);
    }
  };

  const logoutHandle = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <>
      <Grid columns={1} style={{ minHeight: '105vh' }}>
        <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="push"
              icon="labeled"
              inverted
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width="thin"
            >
              <Menu.Item as="a" name='news-management' active={active === 'news-management'} onClick={handleClick}>
                <Icon name="newspaper" />
                News
              </Menu.Item>
              <Menu.Item as="a" name='disc-kalimantan-management' active={active === 'disc-kalimantan-management'} onClick={handleClick}>
                <Icon name="accusoft" />
                Discover Kalimantan
              </Menu.Item>
              <Menu.Item as="a" name='standings-management' active={active === 'standings-management'} onClick={handleClick}>
                <Icon name="chart bar" />
                Standings
              </Menu.Item>
              <Menu.Item as="a" name='contactus-inbox' active={active === 'contactus-inbox'} onClick={handleClick}>
                <Icon name="mail" />
                Contact Us Inbox
              </Menu.Item>
              <Menu.Item as="a" name='privacypolicy-management' active={active === 'privacypolicy-management'} onClick={handleClick}>
                <Icon name="universal access" />
                Privacy Policy
              </Menu.Item>
              <Menu.Item as="a" name='termsconditions-management' active={active === 'termsconditions-management'} onClick={handleClick}>
                <Icon name="cubes" />
                Terms and Conditions
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
              <Segment basic>
                <Menu secondary>
                  <Menu.Item>
                    <Button icon basic onClick={() => setVisible(true)}>
                      <Icon name="bars" />
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Header>{title}</Header>
                  </Menu.Item>
                  <Menu.Menu position="right">
                    <Menu.Item
                      name="logout"
                      onClick={logoutHandle}
                    />
                  </Menu.Menu>
                </Menu>
                {children}
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid> 
    </>
  );
};

export default Dashboard;
