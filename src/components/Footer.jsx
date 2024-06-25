import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import styles from './Footer.module.css';
import './../../public/icons.css'

const SectionTitle = styled.h2`
    font-size: 0.9em;
    font-weight: 500;
    color: #1e1e1e;
    margin-bottom: 1rem;
`;

const LinksUl = styled.ul`
    color: #1c1c1c;
    margin-bottom: 0.75rem;
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 0.2rem;
    width: 300px;
`;

const Line = styled.div`
    background-color: #9a9595;
    height: 1px;
    width: 100%;
`;

const Link = styled.li`
    font-size: 14px;
    text-decoration: none;
    transition: hover .3s;
    padding: 4px;
    padding-left: 0;
    &:hover {
        text-decoration: underline;
    }
`;

const FooterBottom = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    align-items: center;
    width: 100%;
    height: 90px;
    padding-bottom: 1.5rem;
    box-sizing: content-box;
`;

const FooterBottomLeft = styled.div`
    display: flex;
    align-items: center;
    min-width: 400px;
    gap: 1rem;
    font-size: 0.92em;
    font-weight: 400;
    color: #202020;
    padding-left: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
`;

const FooterBottomRight = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-right: .5rem;
    min-width: 400px;
    justify-content: center;
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0.25rem .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #1e1e1e;
    font-weight: 400;
    font-style: normal;
    gap: .5rem;
    margin-left: .75rem;
`;

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
    background-color: #fff;
`;

const TopFooter = styled.section`
    max-width: 960px;
    min-width: 300px;
    margin-bottom: 1rem;
    padding: 2.5rem 0 0.5rem;
    margin-left: 1rem;
    position: relative;
`;

const ScrollButton = styled.button`
    position: absolute;
    top: calc(50% + 2.5rem);
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    color: #000;
    border: none;
    cursor: pointer;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: opacity 0.3s;
    opacity: ${({ show }) => (Boolean(show) ? '1' : '0')};
`;

const ScrollButtonLeft = styled(ScrollButton)`
    left: 0;
`;

const ScrollButtonRight = styled(ScrollButton)`
    right: 0;
`;

const GradientOverlay = styled.div`
    position: absolute;
    bottom: 10px;
    height: 50px;
    width: 30px;
    z-index: 1;
    pointer-events: none;
`;

const GradientLeft = styled(GradientOverlay)`
    left: 0;
    background: linear-gradient(to right, f, transparent);
`;

const GradientRight = styled(GradientOverlay)`
    right: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.8), transparent);
`;

const ScrollContainer = styled.div`
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    position: relative;

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }
`;

const FooterNav = styled.ul`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 1.25rem;
    border-bottom: 1px solid #a9a9a9c5;
    max-height: 50px;
    padding: 1rem 2rem;
    position: relative;
`;

const FooterNavItem = styled.li`
    height: 100%;
    border-bottom: 2px solid transparent;
    padding: .8rem 0;
    width: fit-content;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        text-decoration: none;
    }
`;

const Column = styled.section`
    padding: 0.75rem;
    flex-grow: 1; 
    min-width: 280px;
`;

const Header1 = styled.h1`
    font-size: 1.3em;
    margin-bottom: 1.75rem;
`

const footerBottomLeftContent = () =>{
    return(
        <>
            <p>©{new Date().getFullYear()}Airbnb, Inc.</p>
                        <ul>
                            <li>Terms</li>
                            ·<li>Sitemap</li>
                            ·<li>Privacy</li>
                            ·<li>Your Privacy Choices</li>
                        </ul>
        </>
    )
}

const footerBottomRightContent = () =>{
    return(
        <>
            <Button className={styles.footer_button}>
                                <i className='ico language-ico font18'></i>
                                <span>English</span>
                            </Button>
                            <Button className={styles.footer_button}>
                                <i>$</i>
                                <span>USD</span>
                            </Button>
                            <div className={styles.social_icons}>
                                <div className='social_icon_div center square1_4em radius4 scale1_05'>
                                    <i className='ico facebook-ico square1_4em ' />
                                </div>

                                <div className='social_icon_div center square1_4em radius4 '>
                                    <i className='ico X-ico font20 square1_2em' />
                                </div>
                                <div className='social_icon_div center square1_4em radius4 scale0_95'>
                                    <i className='ico insta-ico font20 square1_3em' />
                                </div>
                            </div>
        </>
    )
}
const Footer = (props) => {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const [clickedItems, setClickedItems] = useState(Array(props.categories.length).fill(false));

    const scrollContainerRef = useRef(null);

    const handleCategoryClick = (index) => {
        const newClickedItems = clickedItems.map((clicked, i) => i === index ? true : false);
        setClickedItems(newClickedItems);
        setTimeout(() => {
            setClickedItems(Array(props.categories.length).fill(false));
        }, 300); // Adjust the duration to match the CSS transition duration
        setCategoryIndex(index);
    };

    const handleScroll = () => {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const clientWidth = scrollContainerRef.current.clientWidth;

        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    };

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    useEffect(() => {
        handleScroll(); // Initialize button visibility
    }, []);


        // State to store the current width of the page
        const [isWide, setIsWide] = useState(window.innerWidth > 1025);

        // Function to check and update the width state
        const checkWidth = () => {
            setIsWide(window.innerWidth > 1025);
        };

        useEffect(() => {
            // Add event listener to check width on resize
            window.addEventListener('resize', checkWidth);

            // Initial check when component mounts
            checkWidth();

            // Cleanup event listener when component unmounts
            return () => {
            window.removeEventListener('resize', checkWidth);
            };
        }, []);

    return (
        <FooterContainer>
            <TopFooter>
                <Header1>Inspiration for future getaways</Header1>
                <ScrollButtonLeft show={`${showLeftButton}`} onClick={scrollLeft}>
                    &lt;
                </ScrollButtonLeft>
                <ScrollButtonRight show={`${showRightButton}`} onClick={scrollRight}>
                    &gt;
                </ScrollButtonRight>
                <GradientLeft />
                <GradientRight />
                <ScrollContainer ref={scrollContainerRef} onScroll={handleScroll}>
                    <FooterNav>
                        {props && props.categories.map((category, index) => (
                            <FooterNavItem
                                className={`
                                    ${styles.animated_div} ${clickedItems[index] ? styles.shrink : ''} ${(index === categoryIndex ? styles.active : styles.inActive)}
                                `}
                                key={index + 1}
                                onClick={() => handleCategoryClick(index)}
                            >
                                <span>{category}</span>
                            </FooterNavItem>
                        ))}
                    </FooterNav>
                </ScrollContainer>
            </TopFooter>
             <section className={styles.column_container}>
                {props && props.footer_cols.map((col, index) => {
                    return (
                        <Column key={index + 1}>
                            <SectionTitle>{col.title}</SectionTitle>
                            <LinksUl>
                                {col.links && col.links.map((link, ind) => {
                                    return (
                                        <Link key={ind + 1}>{link}</Link>
                                    )
                                })}
                            </LinksUl>
                        </Column>
                    )
                })}
            </section>
            <Line />
            <FooterBottom className={styles.FooterBottom}>
                {isWide ? (
                    <>
                        <FooterBottomLeft>{
                            footerBottomLeftContent()
                        }
                        </FooterBottomLeft>
                        <FooterBottomRight>{
                            footerBottomRightContent()
                        }    
                        </FooterBottomRight>
                    </>
                ):(
                    <>  
                        <div className='w100 justify_center'>
                            <FooterBottomRight className='w400px'>{
                                footerBottomRightContent()
                            }
                            </FooterBottomRight>
                        </div>   
                        
                        <div className='w100 justify_center'>
                            <FooterBottomLeft className='w400px gap0 pad0'>{
                                footerBottomLeftContent()
                            }
                            </FooterBottomLeft>
                        </div>
                    </>
                )
            }
                
                
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;