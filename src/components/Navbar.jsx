import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Input, Menu } from 'semantic-ui-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('home');

  const handleClick = (_e, { name }) => {
    setActive(name);
    if (name === 'home') {
      navigate('/');
    } else {
      navigate(`/${name}`);
    }
  };

  const handleLogo = () => {
    setActive('home');
    navigate("/")
  }

  return (
    <>
      <Menu fixed='top'>
        <Menu.Item onClick={handleLogo}>
          <Image src="./ucilogo.jpg" size="tiny" wrapped />
        </Menu.Item>
        <Menu.Item
          name={'home'}
          active={active === 'home'}
          onClick={handleClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
          name={'contactus'}
          active={active === 'contactus'}
          onClick={handleClick}
        >
          Contact Us
        </Menu.Item>
        <Menu.Item
          name={'news'}
          active={active === 'news'}
          onClick={handleClick}
        >
          News
        </Menu.Item>
        <Menu.Item
          name={'discoverkalimantan'}
          active={active === 'discoverkalimantan'}
          onClick={handleClick}
        >
          Discover Kalimantan
        </Menu.Item>
        <Menu.Item
          name={'standings'}
          active={active === 'standings'}
          onClick={handleClick}
        >
          Standings
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default Navbar;
