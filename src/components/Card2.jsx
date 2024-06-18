import React, { useState } from "react";
import styled from "styled-components";
import './Card.css';

const CardContainer = styled.section`
    display: flex;
    width: 250px;
    flex-direction: column;
    margin: 0.5rem;
    /* background-color: #fff; */
    color: #1e1e1e;
    gap: 0.5rem;
    border-radius: 0.35rem;
`;

const ImagesContainer = styled.div`
    display: flex;
    width: 100%;
    height: 250px;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-behavior: smooth;
`;

const ImageDiv = styled.div`
    flex: 0 0 auto;
    width: 250px;
    height: 250px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const Card = (props) => {
    return (
        <CardContainer>
            <ImagesContainer>
                {props.images && props.images.map((imgPath, index) => {
                    return (
                        <ImageDiv
                            style={{ backgroundImage: `url(${imgPath})` }}
                            key={index}
                        />
                    )
                })}
            </ImagesContainer>
            <h3 className="title">{props.title}</h3>
            <p className="hosted_by">{props.hostedBy}</p>
            <div className="sub_title">{props.subTitle}</div>
        </CardContainer>
    )
}

export default Card;
