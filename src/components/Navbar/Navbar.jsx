import React, { useState } from 'react';
import styled from 'styled-components';
import styles from './Navbar.module.css';
import airbnbLogo from 'C:/Users/user/Desktop/airbnb_clone/public/airbnb_logo.png';
import profile from './../../../public/profile.png';
import language from './../../../public/internet.png';


import './../../../public/icons.css';

const NavContainer = styled.section`
    padding: 0 1.5rem;
    background-color: #fff;
    width: 100%;
    margin-bottom: 1.5rem;
    height: 18vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
`;

const Logo = styled.div`
    background-image: url(${airbnbLogo});
    background-repeat: no-repeat;
    background-size: cover;
    width: 140px;
    height: 80px;
    cursor: pointer;
`;

const Controls = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
`;

const Button = styled.button`
    display: grid;
    align-items: center;
    font-weight: 900;
    background-color: transparent;
    color: #1e1e1e;
    font-weight: 400;
    padding: 0.25rem .75rem;
    border-radius: 30px;
    &:hover {
        background-color: #eaeaea;
    }
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 40%;
`;

const ProfileBar = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    width: 5rem;
    height: 8vh;
    padding: 0.5rem 0.25rem;
    cursor: pointer;
    border-radius: 30px;
    border: 1px solid #b5b5b5;
    position: relative;
    transition: all .3s;
    &:hover ,&:active{
        box-shadow: -2px 2px 2px 1px #e1e1e1,  /* Gray shadow on the left */
                    2px 2px 2px  1px #e1e1e1,  /* White shadow on the right */
                    2px 2px 2px  1px #e1e1e1;  /* Gray shadow at the bottom */
    }
`;

const DropDownProfileBar = styled.ul`
    position: absolute;
    top: 100%;
    right: 0;
    display: ${props => (props.visible ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    padding: 0.5rem 0;
    width: 240px;
    border-radius: 12px;
    border: 1px solid #1e1e1e;
    z-index: 1000;
    transform: translateY(0.5rem);
    box-shadow: 10px 1px 15px -6px rgba(140,137,140,1), -10px 1px 15px -6px rgba(140,137,140,1);
`;

const DropDownItem = styled.li`
    width: 100%;
    padding: 0.25rem 0;
    padding-left: 1rem;
    &:hover {
        text-decoration: none;
        background-color: #f3f3f3;
    }
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    margin: 2px 0;
    background-color: #d6d6d6;
`;

const DropDownData = [
    'Sign up',
    'Log in',
    'Gift cards',
    'Airbnb your home',
    'Help Center'
];
const Icon = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
`

const InnerImage = styled.div`
    width: 30px;
    height: 30px;
    background-image: url(${profile});
    background-repeat: no-repeat;
    background-size: cover;
`

const Navbar = (props) => {
    const [dropDown, setDropDown] = useState(false);

    return (
        <NavContainer>
            <nav className={styles.navbar}>
                <a href=""><Logo /></a>
                
                <Controls>
                    <Button>Airbnb your home</Button>
                    <Button>
                        <InnerImage style={{width:'20px',height:'20px',backgroundImage:`url(${language})`}}/>
                    </Button>
                    <ProfileBar onClick={() => setDropDown(!dropDown)}>
                        <Icon style={{fontSize:'20px',height:'100%'}}> <i className='ico ico_burger_bar'/> </Icon>
                        <Icon>
                            <InnerImage/>
                        </Icon>

                        <DropDownProfileBar visible={dropDown}>
                            {DropDownData.map((item, index) => (
                                <React.Fragment key={index}>
                                    {index === 2 && <Line />}
                                    <DropDownItem>
                                        {item}
                                    </DropDownItem>
                                </React.Fragment>
                            ))}
                        </DropDownProfileBar>
                    </ProfileBar>
                </Controls>
            </nav>
        </NavContainer>
    );
};

export default Navbar;
