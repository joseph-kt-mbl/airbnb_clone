import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import styles from './Card.module.css';

const CardContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: ${props => props.width}px;
    height: 360px;
    margin: 0.5rem;
    color: #1e1e1e;
    border-radius: 0.35rem;
    position: relative;
    transition: hover 0.5s;
    &:hover button {
        display: block;
    }
    padding-bottom: 0.5rem;
`;

const Up = styled.span`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #c1bbbbbb;
    color: #1e1e1e;
    &:hover {
        background-color: #e1dbdbf1;
    }
    cursor: pointer;
`;

const ImagesContainer = styled.div`
    display: flex;
    width: 100%;
    height: 250px;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    border-radius: 0.35rem;
`;

const ImageDiv = styled.div`
    flex: 0 0 auto;
    width: ${props => props.width}px;
    height: 250px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 0.35rem;
`;

const ScrollButton = styled.button`
    position: absolute;
    padding-top: 0.2rem;
    top: 125px;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.7);
    color: #2d2d2d;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    display: none;
    cursor: pointer;
    z-index: 1;
    transition: all 0.5s;
    &:hover {
        background: rgba(255, 255, 255, 1);
        color: #000;
    }
`;

const LeftButton = styled(ScrollButton)`
    left: 0.5rem;
`;

const RightButton = styled(ScrollButton)`
    right: 0.5rem;
`;

const Card = (props) => {
    const containerRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [width, setWidth] = useState(270);

    const checkScrollPosition = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setAtStart(scrollLeft === 0);
            setAtEnd(scrollLeft + clientWidth === scrollWidth);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const handleScroll = () => checkScrollPosition();
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        const updateWidth = () => {
            const currentWidth = window.innerWidth;
            if (currentWidth <= 665 ) {
                setWidth(300);
            } 
            else if(currentWidth <= 725){
                setWidth(220)
            }
            else if(currentWidth <= 955){
                setWidth(300);
            }
            else {
                setWidth(270);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const scroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = direction === 'left' ? -width : width;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <CardContainer width={width} className={styles.resposive_width}>
            <ImagesContainer ref={containerRef}>
                {props.images && props.images.map((imgPath, index) => (
                    <ImageDiv
                        width={width}
                        className={styles.resposive_width}
                        style={{ backgroundImage: `url(${imgPath})` }}
                        key={index}
                    />
                ))}
            </ImagesContainer>
            {!atStart && <LeftButton onClick={() => scroll('left')} className={styles.center}>
                <i className={`${styles.ico} ${styles.to_left_arrow_ico}`}></i>
            </LeftButton>}
            {!atEnd && <RightButton onClick={() => scroll('right')} className={styles.center}>
                <i className={`${styles.ico} ${styles.to_right_arrow_ico}`}></i>
            </RightButton>}
            <h3 className={`${styles.title} ${styles.ml_dot20}`}>{props.title}</h3>
            <p className={`${styles.hostedBy} ${styles.ml_dot20}`}>{props.hostedBy}</p>
            <h4 className={`${styles.sub_title} ${styles.ml_dot20}`}>{props.subTitle}</h4>
            <Up className={styles.center}>
                <i className={`${styles.ico} ${styles.upload_ico}`}></i>
            </Up>
        </CardContainer>
    );
};

export default Card;
