import styled, { keyframes } from 'styled-components';
import Bull from '../../BullOnCliff.PNG';
import Phone from '../../AppPhone.PNG';
import React, { useState, useEffect } from "react";
import SotdPage from '../../modules/SOTD/sotdpage.png';

// Keyframes for the cinematic animation
const cinematicCamera = keyframes`
 from {
   perspective-origin: 60% 40%;
 }
 to {
   perspective-origin: 40% 60%;
 }
 from,
 to {
   opacity: 0;
 }
 25%,
 75% {
   opacity: 1;
 }
`;

const imagePop = keyframes`
 70%,
 100% {
   transform: translate3d(0, 0, 60px);
 }
`;

const cinematic = keyframes`
 from {
   transform: translateZ(-200px) rotateY(30deg) translateY(50vh);
 }
 to {
   transform: translateZ(-100px) rotateY(-30deg) translateY(-100%) translateY(50vh);
 }
`;

const animStar = keyframes`
  from {
    transform: translateY(100vh);
  }
  to {
    transform: translateY(-100vh);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    background-color: white;
  }
  to {
    opacity: 1;
    background-color: transparent;
  }
`;

// Styled components for the cinematic animation
const Container = styled.div`
 perspective: 1200px;
 transform-style: preserve-3d;
 animation: ${cinematicCamera} 11s cubic-bezier(0.6, 0, 0.4, 1) both infinite;
 &:after {
   content: "";
   background: linear-gradient(to bottom, #000, #0000 20%, #0000 80%, #000);
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
 }
`;

const Main = styled.main`
 background: #111;
 border: solid 1px #222;
 padding: 2rem;
 max-width: 100%;
 width: 960px;
 margin: 0 auto;
 display: grid;
 grid-template-columns: 1fr 1fr;
 grid-gap: 2rem;
 transform-origin: top center;
 transform-style: preserve-3d;
 animation: ${cinematic} 11s cubic-bezier(0.6, 0, 0.4, 1) both infinite;
 > * {
   grid-column: 1 / -1;
 }
 img {
   max-width: 100%;
   display: block;
   transform-style: preserve-3d;
   animation: ${imagePop} 11s cubic-bezier(0.6, 0, 0.4, 1) both infinite;
   &:last-of-type {
     animation-delay: 4s;
   }
 }
`;

const Header = styled.header`
 display: grid;
 align-content: center;
 grid-column: 1 / -1;
 h2.subheader {
   font-size: 2vw;
 }
`;

const Callout = styled.div`
 text-align: center;
 background-color: #3173fa;
 padding: 1vw 3vw;
  > p {
   color: white;
 }
`;

const StyledH1 = styled.h1`
  line-height: 1.3;
  font-size: 5vw;
  margin: 1rem 0;
  color: white;
`;

const StyledH2 = styled.h2`
  font-size: 4vw;
  margin: 1rem 0;
  color: white;
`;

const StyledH3 = styled.h3`
 font-size: 2vw;
 font-weight: bold;
`;

const StyledP = styled.p`
 line-height: 1.8;
 margin: 1rem 0;
 color: rgb(158, 166, 184);
`;

// Styled components for the disclaimer
const DisclaimerWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 960px;
  margin: 20px auto;
  text-align: center;
  position: fixed;
  margin-top: 180px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const DisclaimerText = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const AcceptButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;

const ShootingStar = styled.div`
  width: 2px;
  height: 2px;
  background: white;
  box-shadow: 0 0 8px white, 0 0 10px white, 0 0 15px white, 0 0 25px white;
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  animation: ${animStar} 20s linear infinite;
  transform-origin: left top;
  animation-fill-mode: forwards;
`;

const HomeWrapper1 = styled.div`
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  width: 100%;
  height: 200vh;
  position: absolute;
  top: 0;
  overflow: hidden;
  filter: ${({ blur }) => (blur ? 'blur(8px)' : 'none')};

  @media (max-width: 768px) {
    height: 250vh;
  }
`;

const Bullimg = styled.img`
  width: 42%;
  height: auto;
  position: absolute;
  right: 62%;
  top: 16%;

  @media (max-width: 1024px) {
    width: 40%;
    right: 63.5%;
    top: 16%;
  }

  @media (max-width: 768px) {
    width: 60%;
    right: 45.5%;
    top: 10%;
  }

  @media (max-width: 480px) {
    width: 80%;
    right: 5%;
    top: 35%;
  }
`;

const Phoneimg = styled.img`
  width: 40%;
  height: auto;
  position: absolute;
  right: 5%;
  top: 45%;

  @media (max-width: 1024px) {
    width: 40%;
    right: 10%;
    top: 50%;
  }

  @media (max-width: 768px) {
    width: 50%;
    right: -5%;
    top: 40%;
  }

  @media (max-width: 480px) {
    width: 80%;
    right: 5%;
    top: 55%;
  }
`;

const HomeText1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 5vw;
  font-family: Ubuntu;
  margin: 125px 0;
  font-weight: bold;
  color: #D4F1F4;
  margin-top: 200px;
  z-index: -1;

  @media (max-width: 768px) {
    font-size: 8vw;
    margin-top: 100px;
  }
`;

const HomeText2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 2vw;
  font-family: Ubuntu;
  margin: -115px 0;
  color: white;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const HomeText3 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5vw;
  font-family: Ubuntu;
  border-radius: 50px;
  border: 2px solid white;
  width: 20%;
  height: 4.3%;
  margin: 250px auto;
  padding: 4px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  position: relative;
  background-color: ${props => (props.selected ? 'white' : 'transparent')};

  &, a, a:visited, a:hover, a:active {
    color: white !important;
    text-decoration: none;
  }

  &:hover {
    background-color: white; /* Background turns white */
    color: black !important; /* Text turns navy blue */
    transition: background-color 0.3s ease-out, color 0.3s ease-out;
  }

  &:hover a {
    color: black !important; /* Text turns navy blue */
  }

  @media (max-width: 768px) {
    font-size: 3vw;
    width: 50%;
  }
`;

const HomeText4 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  font-size: 6vw;
  font-family: Ubuntu;
  margin: 240px 0;
  position: relative;
  font-weight: bold;
  color: white;
  top: 70px;

  @media (max-width: 768px) {
    font-size: 8vw;
    margin-top: 100px;
  }
`;

const HomeText5 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  font-size: 2vw;
  font-family: Ubuntu;
  margin: -220px 0;
  position: relative;
  color: #D4F1F4;
  top: 80px;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

export const Home = () => {
  const [showSlideshow, setShowSlideshow] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlideshow(false);
      setShowDisclaimer(true); // Show disclaimer after slideshow ends
      setBlurBackground(true); // Blur background when disclaimer shows
    }, 11000); // Duration of the slideshow animation

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setShowDisclaimer(false);
    setBlurBackground(false); // Unblur background when disclaimer is accepted
  };

  const shootingStars = Array.from({ length: 60 }).map((_, index) => (
    <ShootingStar
      key={index}
      top={Math.random() * 100}
      left={Math.random() * 100}
    />
  ));

  return (
    <div>
      {showSlideshow ? (
        <Container>
          <Main>
            <Header>
              <StyledH1>The first fully functional AI-powered stock screener leveraging advanced algorithms.</StyledH1>
              <StyledP>Welcome to the future of stock trading. Our AI-driven platform analyzes vast market data to present you with the top-performing stocks daily, empowering your trading decisions with precision and speed.</StyledP>
            </Header>
            <img src="https://images.unsplash.com/photo-1558459654-c430be5b0a44?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=80&w=960&h=500" alt="" />
            <section>
              <StyledH2>About the App</StyledH2>
              <StyledP>SOTD is designed for traders who demand accuracy and efficiency. Our AI continuously monitors and evaluates market trends, delivering real-time stock recommendations tailored to your trading strategy.</StyledP>
            </section>
            <section>
              <StyledH2>Our Mission</StyledH2>
              <StyledP>Our mission is to democratize stock trading by providing cutting-edge AI tools that make high-level market analysis accessible to everyone, from novice investors to seasoned traders.</StyledP>
            </section>
            <Callout>
              <StyledH3>Join 10,000+ traders leveraging advanced algorithmic trading.</StyledH3>
              <StyledP>Become part of a growing network of traders who are leveraging AI to stay ahead of the market. With SOTD, you're not just trading smarter—you're joining a movement that's transforming the way people invest.</StyledP>
            </Callout>
            <img src={SotdPage} alt="SOTD Page" />
          </Main>
        </Container>
      ) : (
        <HomeWrapper1 blur={blurBackground}>
          {shootingStars}
          <HomeText1>
            <div> Get the best, Earn the most </div>
          </HomeText1>
          <HomeText2>
            <div> First fully AI automated stock screener </div>
            <div> with price entry and exits </div>
          </HomeText2>
          <HomeText3 onClick={() => console.log("Today's watchlist clicked!")}>
            <a href="/sotd" style={{ color: "black" }}>Today's watchlist</a>
          </HomeText3>
          <HomeText4>
            <div> We are </div>
            <div>Coming soon… </div>
          </HomeText4>
          <HomeText5>
            <div> SOTD app </div>
          </HomeText5>
          <Bullimg src={Bull} />
          <Phoneimg src={Phone} />
        </HomeWrapper1>
      )}

      {showDisclaimer && (
        <DisclaimerWrapper>
          <DisclaimerText>
            Stock of The Day (SOTD) is a tool intended to assist you in identifying potential stocks to trade. However, it should not be the sole basis for your investment decisions. It's important to conduct your own research and consult with a financial advisor before making any trades. Please note that the regular SOTD only covers US stocks and all information is based on Eastern Standard Time (EST).
          </DisclaimerText>
          <AcceptButton onClick={handleAccept}>I Accept</AcceptButton>
        </DisclaimerWrapper>
      )}
    </div>
  );
};
