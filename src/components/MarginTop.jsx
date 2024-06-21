import React,{useState , useEffect} from "react";
import styled from "styled-components";

const Margin = styled.div`
    transform: translateY(${ ({scroll}) => (scroll===0 ? '30vh': '18vh') });
    margin-top: ${ ({scroll}) => (scroll===0 ? '30vh': '18vh') };
    width: 100%;
    transition: all .7s;
`

function MarginTop(){
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrollTop(currentScrollTop);
    };

    // Add the event listener
    window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <Margin scroll={scrollTop}/>
    )
}

export default MarginTop;