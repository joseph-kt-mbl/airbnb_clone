import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import styles from './Card.module.css';
import Additional_Components from "./additional_components/additional";

const CardContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: ${props => props.width}px;
    height: ${props => props.width + 110}px;
    margin: 0.5rem;
    color: #1e1e1e;
    border-radius: 0.5rem;
    position: relative;
    transition: hover 0.5s;
    &:hover button {
        display: block;
    }
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
    height: ${props => props.height}px;
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
    border-radius: 0.5rem;
`;

const ImageDiv = styled.div`
    flex: 0 0 auto;
    width: ${props => props.width}px;
    height: ${props => props.width}px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 0.5rem;
`;

const ScrollButton = styled.button`
    position: absolute;
    padding-top: 0.2rem;
    top: ${props => props.width / 2}px;
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

const SliderDots = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 120px;
    width: 100%;
`;

const Dot = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    margin: 0 4px;
    background-color: ${props => (props.active ? "aliceblue" : "#898989e0")};
    border-radius: 50%;
    cursor: pointer;
    transition: width 0.3s, height 0.3s;
`;

const Card = ({images,title,subTitle,hostedBy,children}) => {
    const containerRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [width, setWidth] = useState(270);
    const [activeIndex, setActiveIndex] = useState(0);

    const checkScrollPosition = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setAtStart(scrollLeft === 0);
            setAtEnd(scrollLeft + clientWidth === scrollWidth);
            setActiveIndex(Math.round(scrollLeft / width));
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
    }, [width]);

    useEffect(() => {
        const updateWidth = () => {
            const currentWidth = window.innerWidth;
            if (currentWidth <= 665) {
                setWidth(250);
            } else if (currentWidth <= 785) {
                setWidth(300);
            } else if (currentWidth <= 955) {
                setWidth(350);
            } else {
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

    const getDotSize = (index) => {
        const distance = Math.abs(index - activeIndex);
        if (distance < 2) return 6;
        if (distance === 2) return 5;
        return 4;
    };

    const getVisibleDots = () => {
        if (!images) return [];
        const totalImages = images.length;
        const dotsToShow = 5;
        let start = 0;
        let end = dotsToShow;

        if (totalImages > dotsToShow) {
            if (activeIndex < 2) {
                start = 0;
                end = dotsToShow;
            } else if (activeIndex > totalImages - 3) {
                start = totalImages - dotsToShow;
                end = totalImages;
            } else {
                start = activeIndex - 2;
                end = activeIndex + 3;
            }
        } else {
            end = totalImages;
        }

        return Array.from({ length: end - start }, (_, i) => start + i);
    };

    return (
        <CardContainer width={width} className={styles.responsive_width}>
            {children}
            <ImagesContainer height={width} ref={containerRef}>
                {images && images.map((imgPath, index) => (
                    <ImageDiv
                        width={width}
                        className={styles.responsive_width}
                        style={{ backgroundImage: `url(${imgPath})` }}
                        key={index}
                    />
                ))}
            </ImagesContainer>
            {!atStart && (
                <LeftButton width={width} onClick={() => scroll('left')} className={styles.center} aria-label="Scroll left">
                    <i className={`${styles.ico} ${styles.to_left_arrow_ico}`}></i>
                </LeftButton>
            )}
            {!atEnd && (
                <RightButton width={width} onClick={() => scroll('right')} className={styles.center} aria-label="Scroll right">
                    <i className={`${styles.ico} ${styles.to_right_arrow_ico}`}></i>
                </RightButton>
            )}
            <SliderDots>
                {getVisibleDots().map((index) => (
                    <Dot
                        key={index}
                        size={getDotSize(index)}
                        active={index === activeIndex}
                        onClick={() => {
                            if (containerRef.current) {
                                containerRef.current.scrollTo({
                                    left: index * width,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </SliderDots>
            <h3 className={`${styles.title} ${styles.ml_dot20}`}>{title}</h3>
            <p className={`${styles.hostedBy} ${styles.ml_dot20}`}>{hostedBy}</p>
            <h4 className={`${styles.sub_title} ${styles.ml_dot20}`}>{subTitle}</h4>
            <Up className={styles.center} aria-label="Upload">
                <i className={`${styles.ico} ${styles.upload_ico}`}></i>
            </Up>
        </CardContainer>
    );
};

export default Card;