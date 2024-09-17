import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Logo from '../../WhiteLogo.PNG';
import AccessControl from './AccessControl'; // Adjust this import path accordingly
import ReactPlayer from 'react-player';


const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(10px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;


const rotation = keyframes`
0% {
  transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
  animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
}
50% {
  transform: rotateX(45deg) rotateY(0) rotateZ(225deg);
  animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
}
100% {
  transform: rotateX(45deg) rotateY(0) rotateZ(405deg);
  animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
}
`;


const bouncing = keyframes`
0% {
  transform: translateY(-40px);
  animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
}
45% {
  transform: translateY(40px);
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
100% {
  transform: translateY(-40px);
  animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
}
`;


const bouncingShadow = keyframes`
0% {
  transform: translateZ(-80px) scale(1.3);
  animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  opacity: 0.05;
}
45% {
  transform: translateZ(0);
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 0.3;
}
100% {
  transform: translateZ(-80px) scale(1.3);
  animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  opacity: 0.05;
}
`;


const PageContainer = styled.div`
background-color: #1e1e1e;
min-height: 100vh;
font-family: 'Roboto', sans-serif;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 20px;
animation: ${fadeIn} 1s ease-in-out;
`;


const Scene = styled.div`
position: relative;
z-index: 2;
height: 220px;
width: 220px;
display: grid;
place-items: center;
margin-top: -30px;
`;


const CubeWrapper = styled.div`
transform-style: preserve-3d;
animation: ${bouncing} 2s infinite;
`;


const Cube = styled.div`
transform-style: preserve-3d;
transform: rotateX(45deg) rotateZ(45deg);
animation: ${rotation} 2s infinite;
`;


const CubeFaces = styled.div`
transform-style: preserve-3d;
height: 80px;
width: 80px;
position: relative;
transform-origin: 0 0;
transform: translateX(0) translateY(0) translateZ(-40px);
`;


const CubeFace = styled.div`
position: absolute;
inset: 0;
background: #ffffff;
border: solid 1px #ffffff;
&.shadow {
  transform: translateZ(-80px);
  animation: ${bouncingShadow} 2s infinite;
}
&.top {
  transform: translateZ(80px);
}
&.front {
  transform-origin: 0 50%;
  transform: rotateY(-90deg);
}
&.back {
  transform-origin: 0 50%;
  transform: rotateY(-90deg) translateZ(-80px);
}
&.right {
  transform-origin: 50% 0;
  transform: rotateX(-90deg) translateY(-80px);
}
&.left {
  transform-origin: 50% 0;
  transform: rotateX(-90deg) translateY(-80px) translateZ(80px);
}
`;


const LogoImageStyled = styled.img`
position: absolute;
width: 105px;
height: 105px;
z-index: 3;
`;


const LoadingText = styled.div`
color: #ffffff;
font-size: 18px;
margin-top: 5px;
`;


const ButtonContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
flex-direction: column;
`;


const TapToViewText = styled.div`
margin-top: -100px;
color: #ffffff;
font-size: 34px;
margin-bottom: 30px;
`;


const StockOfTheDayText = styled.div`
color: #ffffff;
font-size: 15px;
margin-top: 18px;
`;


const LogoButton = styled.button`
background-color: transparent;
border: 1px solid #ffffff;
border-radius: 28px;
padding: 10px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
width: 160px;
height: 160px;
transition: transform 0.3s ease;
&:hover {
  transform: scale(1.1);
}
`;


const TabContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
`;


const TabButton = styled.button`
background-color: ${({ active }) => (active ? '#444' : '#333')};
color: white;
border: none;
padding: 15px 30px;
margin: 0 5px;
cursor: pointer;
border-radius: 5px;
font-size: 16px;
transition: background-color 0.3s ease, transform 0.2s ease;
&:hover {
  background-color: #555;
  transform: translateY(-3px);
}
`;


const StockItem = styled.div`
 width: 400000px; /* Increase this percentage to make the tab longer */
 max-width: 1000px; /* Increase this value to control the max width */
 margin-bottom: 30px;
 background-color: #2e2e2e;
 padding: 20px;
 border-radius: 10px;
 box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
 animation: ${fadeIn} 0.8s ease-in-out;
 transition: transform 0.2s ease;
 &:hover {
   transform: scale(1.02);
 }
 ${({ isBlurred }) => isBlurred && `
   filter: blur(10px);
 `}
`;




const StockHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;


const CompanyName = styled.div`
font-size: 24px;
color: #ffffff;
font-weight: bold;
transition: color 0.2s ease;
&:hover {
  color: #00ff00;
}
`;


const TickerText = styled.div`
font-size: 16px;
color: #b0b0b0;
margin-top: 5px;
`;


const StockInfo = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`;


const PriceText = styled.div`
font-size: 20px;
color: #fbfcf6;
font-weight: bold;
`;


const ChangePercentText = styled.div`
font-size: 16px;
color: ${({ positive }) => (positive ? '#00ff00' : '#ff0000')};
margin-top: 5px;
`;


const Separator = styled.hr`
border: none;
border-top: 1px solid #444;
margin: 15px 0;
`;


const DetailsText = styled.div`
font-size: 14px;
color: #b0b0b0;
margin-top: 10px;
`;


const AIAnalysisText = styled.div`
font-size: 14px;
color: #b0b0b0;
margin-top: 10px;
${({ isBlurred }) => isBlurred && `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
`}
`;


const StockContentWrapper = styled.div`
margin-top: 100px;
padding: 20px;
${({ isBlurred }) => isBlurred && `
  filter: blur(5px);
  pointer-events: none;
  user-select: none;
`}
`;


const GuestPopup = styled.div`
background-color: #333;
padding: 50px;
border-radius: 30px;
text-align: center;
color: #ffffff;
position: absolute;
top: 60%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 10;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;


const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: column;
 gap: 15px;
 align-items: center;
`;


const GuestViewText = styled.h2`
font-size: 29px;
margin-bottom: 30px;
font-weight: bold;
`;


const WatchAdButton = styled.button`
background-color: white;
color: black;
border: 2px solid white;
padding: 20px 130px;
font-size: 18px;
border-radius: 50px;
cursor: pointer;
transition: all 0.3s ease;
font-weight: bold;


&:hover {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}
`;


const SOTDPlusButton = styled(WatchAdButton)`
 // Use the same styles as WatchAdButton
`;


const FeatureList = styled.ul`
 list-style-type: disc;
 margin-top: 20px;
 color: white;
 text-align: left;
`;


const FeatureListItem = styled.li`
 margin-bottom: 10px;
`;


const AdContainer = styled.div`
 display: ${({ show }) => (show ? 'flex' : 'none')};
 background-color: #000;
 color: #fff;
 width: 100%;
 height: 100%;
 position: absolute;
 top: 0;
 left: 0;
 z-index: 20;
 justify-content: center;
 align-items: center;
 flex-direction: column;
`;


const formatPrice = (price) => {
 if (!price) return 'N/A';
 let formattedPrice = price.toFixed(6);
 while (formattedPrice.endsWith('0') && !formattedPrice.endsWith('.00')) {
   formattedPrice = formattedPrice.substring(0, formattedPrice.length - 1);
 }
 return formattedPrice;
};


export const SOTD = () => {
const [data, setData] = useState(null);
const [contentLoaded, setContentLoaded] = useState(false);
const [activeTab, setActiveTab] = useState('Day Trading');
const [loading, setLoading] = useState(false);
const [loadingMessage, setLoadingMessage] = useState('Analyzing stock data...');
const [guestMode, setGuestMode] = useState(null);
const [showAd, setShowAd] = useState(false);
const [adWatched, setAdWatched] = useState(false);


useEffect(() => {
  // Reset adWatched to false whenever the component mounts
  setAdWatched(false);


  if (loading) {
    const messages = [
      'Analyzing stock data...',
      'Identifying key market trends...',
      'Calculating RSI indicators...',
      'Assessing market volatility...',
      'Optimizing entry and exit points...',
      'Gathering real-time stock updates...',
    ];
    let index = 0;
    const messageInterval = setInterval(() => {
      setLoadingMessage(messages[index]);
      index = (index + 1) % messages.length;
    }, 2000);


    axios
      .get('http://localhost:5001/api/filtered_stocks')
      .then((response) => {
        setData(response.data);
        setContentLoaded(true);
        setLoading(false);
        clearInterval(messageInterval);
      })
      .catch((error) => {
        console.log('ERROR:', error);
        setLoading(false);
        clearInterval(messageInterval);
      });


    return () => clearInterval(messageInterval);
  }
}, [loading]);


const handleAccessGranted = (isGuest) => {
  setGuestMode(isGuest);
};


const handleWatchAd = () => {
  setShowAd(true);
};


const handleSOTDPlusClick = () => {
  window.location.href = 'https://checkout.stripe.com/c/pay/cs_test_a15AnJ6KW2aQpXpfcQ950p84GGgyhbGdPB6GGwrYEKJqxjDrpAmh7vt5Cl#fidkdWxOYHwnPyd1blpxYHZxWjA0VXNQbDNGYV1jX3FGdTNkXG9ia2t%2FcTM2NWBSamtJbzxQMWpDUGFVa1JkYkJNSVZvNEs2dGk2b3BTUzd9T2lcQUJ8RGZtNndMYjZyM1ZxY2Bob31AV2NGNTVrUUlhTkE2PCcpJ2hsYXYnP34nYnBsYSc%2FJzYwNzIxNmQ3KGNkYTMoMTRkMig9PDBmKGAxYWM3YzA3MWc9MDY9PTc1ZycpJ2hwbGEnPyc2MjJmPTdhMihjPWAxKDE0PDwoPTUwZCg0Z2ExZjw8PGZmPDdgMmdgYGMnKSd2bGEnPyc2ZjVkNz1gMig8ZDMzKDFgPDAoZGA8PCg2Zz1gY2c1PDxkMmNgMjE1YzYneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXU%2FKippamZkaW1qdnE%2FNjU1NSd4JSUl';
};


const handleAdEnded = () => {
  setShowAd(false);
  setAdWatched(true);
};


return (
  <PageContainer>
    {!contentLoaded ? (
      <ButtonContainer>
        {loading ? (
          <>
            <Scene>
              <CubeWrapper>
                <Cube>
                  <CubeFaces>
                    <CubeFace className="shadow" />
                    <CubeFace className="bottom" />
                    <CubeFace className="top" />
                    <CubeFace className="left" />
                    <CubeFace className="right" />
                    <CubeFace className="back" />
                    <CubeFace className="front" />
                  </CubeFaces>
                </Cube>
              </CubeWrapper>
            </Scene>
            <LoadingText>{loadingMessage}</LoadingText>
          </>
        ) : (
          <>
            <TapToViewText>Tap to view</TapToViewText>
            <LogoButton onClick={() => setLoading(true)}>
              <LogoImageStyled src={Logo} alt="Logo" />
            </LogoButton>
            <StockOfTheDayText>Stock of The Day</StockOfTheDayText>
          </>
        )}
      </ButtonContainer>
    ) : (
      <>
        {guestMode === null && <AccessControl onAccessGranted={handleAccessGranted} />}


        <TabContainer>
          <TabButton active={activeTab === 'Day Trading'} onClick={() => setActiveTab('Day Trading')}>
            Day Trading
          </TabButton>
          <TabButton active={activeTab === 'Swing Trading'} onClick={() => setActiveTab('Swing Trading')}>
            Swing Trading
          </TabButton>
          <TabButton active={activeTab === 'Long Term'} onClick={() => setActiveTab('Long Term')}>
            Long Term
          </TabButton>
        </TabContainer>


        <StockContentWrapper isBlurred={guestMode && !adWatched}>
          {activeTab === 'Day Trading' && (
            <div>
              <h2 style={{ color: '#ffffff', textAlign: 'center', marginTop: '20px', fontSize: '34px', fontWeight: 'bold' }}>
                Day Trading
              </h2>
              <h3 style={{ color: '#b0b0b0', textAlign: 'center', marginBottom: '40px' }}>Top picks for today</h3>
              <ul>
                {data &&
                  data['Day Trading']?.map((stock, index) => (
                    <StockItem key={index} isBlurred={adWatched && (index === 2 || index === 3 || index === 4)}>
                      <StockHeader>
                        <div>
                          <CompanyName>{index + 1}. {stock.name}</CompanyName>
                          <TickerText>{stock.ticker}</TickerText>
                        </div>
                        <StockInfo>
                          <PriceText>${stock.price ? formatPrice(stock.price) : 'N/A'}</PriceText>
                          <ChangePercentText positive={stock.change_percent >= 0}>
                            {stock.change_percent ? stock.change_percent.toFixed(2) : 'N/A'}%
                          </ChangePercentText>
                        </StockInfo>
                      </StockHeader>
                      <Separator />
                      <DetailsText>Volume: {stock.volume ? stock.volume.toLocaleString() : 'N/A'}</DetailsText>
                      <DetailsText>Market Cap: {stock.market_cap ? stock.market_cap.toLocaleString() : 'N/A'}</DetailsText>
                      <DetailsText>P/E Ratio: {stock.pe_ratio ? stock.pe_ratio.toFixed(2) : 'N/A'}</DetailsText>
                      <DetailsText>Entry Point: ${stock.entry_point ? stock.entry_point.toFixed(2) : 'N/A'}</DetailsText>
                      <DetailsText>Exit Point: ${stock.exit_point ? stock.exit_point.toFixed(2) : 'N/A'}</DetailsText>
                      <AIAnalysisText isBlurred={adWatched}>AI Analysis: {stock.analysis}</AIAnalysisText>
                    </StockItem>
                  ))}
              </ul>
            </div>
          )}


          {activeTab === 'Swing Trading' && (
            <div>
              <h2 style={{ color: '#ffffff', textAlign: 'center', marginTop: '20px', fontSize: '34px', fontWeight: 'bold' }}>
                Swing Trading
              </h2>
              <h3 style={{ color: '#b0b0b0', textAlign: 'center', marginBottom: '40px' }}>Top picks for today</h3>
              <ul>
                {data &&
                  data['Swing Trading']?.map((stock, index) => (
                    <StockItem key={index} isBlurred={adWatched && (index === 2 || index === 3 || index === 4)}>
                      <StockHeader>
                        <div>
                          <CompanyName>{index + 1}. {stock.name}</CompanyName>
                          <TickerText>{stock.ticker}</TickerText>
                        </div>
                        <StockInfo>
                          <PriceText>${stock.price ? formatPrice(stock.price) : 'N/A'}</PriceText>
                          <ChangePercentText positive={stock.change_percent >= 0}>
                            {stock.change_percent ? stock.change_percent.toFixed(2) : 'N/A'}%
                          </ChangePercentText>
                        </StockInfo>
                      </StockHeader>
                      <Separator />
                      <DetailsText>Volume: {stock.volume ? stock.volume.toLocaleString() : 'N/A'}</DetailsText>
                      <DetailsText>Market Cap: {stock.market_cap ? stock.market_cap.toLocaleString() : 'N/A'}</DetailsText>
                      <DetailsText>P/E Ratio: {stock.pe_ratio ? stock.pe_ratio.toFixed(2) : 'N/A'}</DetailsText>
                      <DetailsText>Entry Point: ${stock.entry_point ? stock.entry_point.toFixed(2) : 'N/A'}</DetailsText>
                      <DetailsText>Exit Point: ${stock.exit_point ? stock.exit_point.toFixed(2) : 'N/A'}</DetailsText>
                      <AIAnalysisText isBlurred={adWatched}>AI Analysis: {stock.analysis}</AIAnalysisText>
                    </StockItem>
                  ))}
              </ul>
            </div>
          )}


          {activeTab === 'Long Term' && (
            <div>
              <h2 style={{ color: '#ffffff', textAlign: 'center', marginTop: '20px', fontSize: '34px', fontWeight: 'bold' }}>
                Long Term
              </h2>
              <h3 style={{ color: '#b0b0b0', textAlign: 'center', marginBottom: '40px' }}>Top picks for today</h3>
              <ul>
                {data &&
                  data['Long Term']?.map((stock, index) => (
                    <StockItem key={index} isBlurred={adWatched && (index === 2 || index === 3 || index === 4)}>
                      <StockHeader>
                        <div>
                          <CompanyName>{index + 1}. {stock.name}</CompanyName>
                          <TickerText>{stock.ticker}</TickerText>
                        </div>
                        <StockInfo>
                          <PriceText>${stock.price ? formatPrice(stock.price) : 'N/A'}</PriceText>
                          <ChangePercentText positive={stock.change_percent >= 0}>
                            {stock.change_percent ? stock.change_percent.toFixed(2) : 'N/A'}%
                          </ChangePercentText>
                        </StockInfo>
                      </StockHeader>
                      <Separator />
                      <DetailsText>Volume: {stock.volume ? stock.volume.toLocaleString() : 'N/A'}</DetailsText>
                      <DetailsText>Market Cap: {stock.market_cap ? stock.market_cap.toLocaleString() : 'N/A'}</DetailsText>
                      <DetailsText>P/E Ratio: {stock.pe_ratio ? stock.pe_ratio.toFixed(2) : 'N/A'}</DetailsText>
                      <DetailsText>Entry Point: ${stock.entry_point ? stock.entry_point.toFixed(2) : 'N/A'}</DetailsText>
                      <DetailsText>Exit Point: ${stock.exit_point ? stock.exit_point.toFixed(2) : 'N/A'}</DetailsText>
                      <AIAnalysisText isBlurred={adWatched}>AI Analysis: {stock.analysis}</AIAnalysisText>
                    </StockItem>
                  ))}
              </ul>
            </div>
          )}
        </StockContentWrapper>


        {guestMode && !adWatched && (
          <GuestPopup>
            <GuestViewText>View Today’s Selection</GuestViewText>
            <ButtonWrapper>
              <WatchAdButton onClick={handleWatchAd}>Watch Ad</WatchAdButton>
              <SOTDPlusButton onClick={handleSOTDPlusClick}>SOTD+</SOTDPlusButton> {/* New button with click handler */}
            </ButtonWrapper>
            <FeatureList>
              <FeatureListItem>Full access to SOTD database</FeatureListItem>
              <FeatureListItem>Real-time entry and exit points</FeatureListItem>
              <FeatureListItem>AI analysis</FeatureListItem>
              <FeatureListItem>Ad free</FeatureListItem>
            </FeatureList>
          </GuestPopup>
        )}
      </>
    )}


    {/* Video Ad Popup */}
    <AdContainer show={showAd}>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=uXlWYZ022zU"
        playing
        controls
        onEnded={handleAdEnded}
        width="80%"
        height="400px"
      />
      <p>Watch the full ad to continue</p>
    </AdContainer>
  </PageContainer>
);
};



