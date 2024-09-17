import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import WideBull from "../../WideBull.jpg";

// Animation for fading in content
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animation for scaling on hover
const hoverScale = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const PageContainer = styled.div`
  background: linear-gradient(135deg, #0d0d0d 0%, #434343 100%);
  min-height: 220vh;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AboutText1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 75px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  margin-bottom: 70px;
  margin-top: 120px;
  padding: 10px;
  animation: ${fadeIn} 1s ease-in-out;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: white;
`;

const AboutText2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 20px;
  color: #b3b3b3;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const AboutText3 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 22px;
  font-family: 'Poppins', sans-serif;
  width: 66%;
  margin: auto;
  color: #D4F1F4;
  margin-bottom: 60px;
  animation: ${fadeIn} 2s ease-in-out;
  line-height: 1.6;
`;

const AboutText4 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 30px;
  color: #FFF;
  margin-top: 140px;
  animation: ${fadeIn} 2.5s ease-in-out;
`;

const AboutText8 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 22px;
  font-family: 'Poppins', sans-serif;
  width: 66%;
  margin: auto;
  color: #D4F1F4;
  margin-bottom: 50px;
  animation: ${fadeIn} 3s ease-in-out;
  line-height: 1.6;
`;

const AboutTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-family: 'Poppins', sans-serif;
  margin: 35px 0;
  margin-top: 30px;
  animation: ${fadeIn} 3.5s ease-in-out;
`;

const AboutTextContainer2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-family: 'Poppins', sans-serif;
  margin: 35px 0;
  animation: ${fadeIn} 4s ease-in-out;
`;

const AboutText5 = styled.div`
  font-size: 22px;
  border: 2px solid #D4F1F4;
  width: 20%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  padding: 15px;
  color: ${(props) => (props.selected ? '#189AB4' : '#FFF')};
  background-color: ${(props) =>
    props.selected ? '#D4F1F4' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease-out;
  position: relative;
  z-index: 1;

  &:hover {
    animation: ${hoverScale} 0.3s forwards;
    color: #189AB4;
    background-color: #FFF;
    box-shadow: 0px 0px 15px 2px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

const NewDiv = styled.div`
  margin-top: 30px;
  font-size: 20px;
  width: 1000px;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  color: #FFF;
  text-align: left;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  animation: ${fadeIn} 4.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 18px;
    width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    width: 100%;
  }
`;

const WideBullImg = styled.img`
  width: 65%;
  height: auto;
  position: relative;
  margin: 60px auto 0;
  display: block;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-out;
  animation: ${fadeIn} 5s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
  }
`;

const LegalLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const LegalLink = styled.div`
  color: #D4F1F4;
  font-size: 18px;
  margin: 10px;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: color 0.3s ease, border-bottom 0.3s ease;

  &:hover {
    color: #FFF;
    border-bottom: 1px solid #FFF;
  }
`;

const TermsOfServiceContainer = styled.div`
  padding: 40px;
  background: #1e1e1e;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
`;

const TermsTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
`;

const TermsContent = styled.div`
  font-size: 18px;
`;

export const About = () => {
  const [selectedTab, setSelectedTab] = useState("about");
  const [selectedStrategy, setSelectedStrategy] = useState(0);

  const renderAboutContent = () => (
    <>
      <AboutText1>
        <div>ABOUT SOTD</div>
      </AboutText1>
      <AboutText2>
        <div>OUR MISSION</div>
      </AboutText2>
      <AboutText3>
        <div>
          At SOTD, we are committed to helping traders discover a more efficient way to trade by providing a streamlined, precise method for identifying top stocks for the day with a single click. By leveraging advanced AI technology, we generate insightful and data-driven analysis for each stock to assist in making informed trading decisions.
        </div>
      </AboutText3>
      <WideBullImg src={WideBull} />
      <AboutText4>
        <div>OUR TRADING STRATEGIES</div>
      </AboutText4>
      <AboutTextContainer>
        <AboutText5
          selected={selectedStrategy === 0}
          onClick={() => setSelectedStrategy(0)}
        >
          Day-Trading
        </AboutText5>
        <AboutText5
          selected={selectedStrategy === 1}
          onClick={() => setSelectedStrategy(1)}
        >
          Swing-Trading
        </AboutText5>
        <AboutText5
          selected={selectedStrategy === 2}
          onClick={() => setSelectedStrategy(2)}
        >
          Long-Term
        </AboutText5>
      </AboutTextContainer>
      <AboutTextContainer2>
        <NewDiv show={selectedStrategy === 0}>
          Our day-trading strategy at SOTD is focused on providing quick and precise analysis to identify short-term opportunities. By analyzing stocks with high volume, small market cap, and other key indicators, our AI system generates targeted recommendations that are aimed at maximizing returns within a single trading day.
        </NewDiv>
        <NewDiv show={selectedStrategy === 1}>
          Our swing-trading strategy is designed to capitalize on market movements over several days to a few weeks. By integrating AI-generated analysis with critical factors such as short interest, stock float, and price action, we offer insights that help identify the best stocks to trade in the medium term.
        </NewDiv>
        <NewDiv show={selectedStrategy === 2}>
          Our long-term trading strategy utilizes AI-generated insights that focus on sustained growth and value. By evaluating indicators like moving averages, RSI, and earnings trends, our strategy is tailored to identify stocks with strong long-term potential, ensuring that our clients make well-informed investment decisions.
        </NewDiv>
      </AboutTextContainer2>
    </>
  );

  const renderTermsOfServiceContent = () => (
    <TermsOfServiceContainer>
      <TermsTitle>Terms of Service</TermsTitle>
      <TermsContent>
        <p>
          Welcome to SOTD.ai, a service provided by Isharzi LLC. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using SOTD.ai, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
        </p>
        <p>
          <strong>Use of Service</strong>
          <br />
          You may use SOTD.ai for personal, non-commercial purposes only.
          <br />
          You must be at least 18 years old to use our services.
          <br />
          You agree not to use our services for any illegal or unauthorized purpose.
        </p>
        <p>
          <strong>Account Registration</strong>
          <br />
          To use certain features of SOTD.ai, you may need to create an account.
          <br />
          You are responsible for maintaining the confidentiality of your account information, including your password.
          <br />
          You agree to notify us immediately of any unauthorized use of your account.
        </p>
        <p>
          <strong>Intellectual Property</strong>
          <br />
          All content on SOTD.ai, including but not limited to text, graphics, logos, and software, is the property of Isharzi LLC and is protected by intellectual property laws.
          <br />
          You may not reproduce, distribute, or create derivative works from any content on our website without our express written permission.
        </p>
        <p>
          <strong>Prohibited Conduct</strong>
          <br />
          You agree not to engage in any of the following activities: (i) using automated means to access the site, (ii) attempting to interfere with the site’s functionality, (iii) using the site to distribute spam, viruses, or harmful content, or (iv) violating any laws or regulations through your use of the site.
        </p>
        <p>
          <strong>Termination</strong>
          <br />
          We reserve the right to terminate or suspend your access to SOTD.ai at any time, with or without cause or notice, for conduct that we believe violates these Terms.
        </p>
        <p>
          <strong>Changes to Terms</strong>
          <br />
          Isharzi LLC reserves the right to modify these Terms at any time. Any changes will be effective immediately upon posting on the website. Your continued use of SOTD.ai after changes are posted constitutes your acceptance of the new Terms.
        </p>
        <p>
          <strong>Governing Law</strong>
          <br />
          These Terms shall be governed by and construed in accordance with the laws of the state in which Isharzi LLC is headquartered, without regard to its conflict of law principles.
        </p>
        <p>
          <strong>Dispute Resolution</strong>
          <br />
          Any disputes arising out of or relating to these Terms or your use of SOTD.ai shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
        </p>
        <p>
          <strong>Intellectual Property and Protection of Proprietary Rights</strong>
          <br />
          By accessing and using SOTD.ai, you acknowledge that the concept, design, name, domain, and all associated intellectual property related to SOTD.ai are the exclusive property of Isharzi LLC. You agree not to copy, reproduce, distribute, or create derivative works based on any aspect of SOTD.ai without explicit written consent from Isharzi LLC. Any attempt to replicate, misappropriate, or otherwise infringe upon the proprietary rights of Isharzi LLC, including but not limited to the website's idea, name, or domain, will be considered a violation of these Terms of Service and may result in legal action. Isharzi LLC reserves all rights to protect its intellectual property to the fullest extent of the law.
        </p>
      </TermsContent>
    </TermsOfServiceContainer>
  );

  const renderRiskDisclosureContent = () => (
    <TermsOfServiceContainer>
      <TermsTitle>Risk Disclosure</TermsTitle>
      <TermsContent>
        <p>
          Trading stocks involves risk and may not be suitable for every investor. The value of stocks may fluctuate, and investors may lose all or part of their investment. It is important to understand the risks associated with trading stocks before acting on any recommendations provided by SOTD.ai.
        </p>
        <p>
          <strong>Market Risk</strong>
          <br />
          Stock markets can be volatile, with prices fluctuating rapidly due to various factors such as economic data, corporate earnings, geopolitical events, and market sentiment.
        </p>
        <p>
          <strong>Investment Risk</strong>
          <br />
          The stocks recommended by SOTD.ai may not perform as expected. You should be prepared for the possibility of losing part or all of your investment.
        </p>
        <p>
          <strong>No Guarantee of Returns</strong>
          <br />
          Past performance is not indicative of future results. SOTD.ai does not guarantee any specific outcome or return on investment.
        </p>
        <p>
          <strong>Independent Verification</strong>
          <br />
          Users are strongly encouraged to conduct their own research and seek professional advice before making any investment decisions based on the recommendations provided by SOTD.ai.
        </p>
      </TermsContent>
    </TermsOfServiceContainer>
  );

  const renderPrivacyPolicyContent = () => (
    <TermsOfServiceContainer>
      <TermsTitle>Privacy Policy</TermsTitle>
      <TermsContent>
        <p>
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.
        </p>
        <p>
          <strong>Information We Collect</strong>
          <br />
          We collect personal information such as your name, email address, and payment details when you create an account or make a purchase on SOTD.ai.
          <br />
          We may also collect non-personal information such as your IP address, browser type, and usage data to improve our services.
        </p>
        <p>
          <strong>How We Use Your Information</strong>
          <br />
          We use your personal information to provide and improve our services, process transactions, communicate with you, and comply with legal obligations.
          <br />
          We may use your non-personal information for analytics and to improve our website's functionality.
        </p>
        <p>
          <strong>Data Security</strong>
          <br />
          We implement security measures to protect your personal information from unauthorized access, disclosure, or alteration.
          <br />
          However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        <p>
          <strong>Third-Party Services</strong>
          <br />
          We may share your personal information with third-party service providers who assist us in operating our website, processing payments, or providing customer support.
          <br />
          These third parties are obligated to protect your information and use it only for the purposes for which it was disclosed.
        </p>
        <p>
          <strong>Your Rights</strong>
          <br />
          You have the right to access, correct, or delete your personal information at any time. You can do so by contacting us through the contact information provided on our website.
        </p>
      </TermsContent>
    </TermsOfServiceContainer>
  );

  const renderDisclaimerContent = () => (
    <TermsOfServiceContainer>
      <TermsTitle>Disclaimer</TermsTitle>
      <TermsContent>
        <p>
          The information provided on SOTD.ai is for informational purposes only and does not constitute financial advice. SOTD.ai does not guarantee the accuracy or completeness of the information provided.
        </p>
        <p>
          <strong>No Financial Advice</strong>
          <br />
          SOTD.ai does not provide personalized financial advice or investment recommendations. The information provided on our site is based on our analysis and should not be taken as specific advice for your financial situation.
        </p>
        <p>
          <strong>Accuracy of Information</strong>
          <br />
          While we strive to provide accurate and up-to-date information, SOTD.ai cannot guarantee the accuracy, completeness, or reliability of the information provided.
        </p>
        <p>
          <strong>User Responsibility</strong>
          <br />
          Users are responsible for their own investment decisions and should seek independent financial advice before making any investment decisions based on the information provided by SOTD.ai.
        </p>
      </TermsContent>
    </TermsOfServiceContainer>
  );

  const renderApiUsageDisclosureContent = () => (
    <TermsOfServiceContainer>
      <TermsTitle>API Usage Disclosure</TermsTitle>
      <TermsContent>
        <p>
          The data provided by SOTD.ai is sourced from external APIs. We rely on third-party services to provide the data used in our analysis and recommendations. While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy or completeness of the data provided by these external sources.
        </p>
        <p>
          <strong>Third-Party Data</strong>
          <br />
          SOTD.ai relies on third-party services to provide the data used in our analysis and recommendations.
        </p>
        <p>
          <strong>Service Availability</strong>
          <br />
          The availability of data from third-party APIs may be subject to change, interruptions, or delays, which could affect the accuracy or timeliness of the information provided by SOTD.ai.
        </p>
        <p>
          <strong>No Warranty</strong>
          <br />
          SOTD.ai does not provide any warranty or guarantee regarding the availability, accuracy, or completeness of the data sourced from external APIs.
        </p>
      </TermsContent>
    </TermsOfServiceContainer>
  );

  const renderDataAccuracyDisclaimerContent = () => (
    <TermsOfServiceContainer>
      <TermsTitle>Data Accuracy Disclaimer</TermsTitle>
      <TermsContent>
        <p>
          While we strive to provide accurate and reliable data, the information provided on SOTD.ai is sourced from third-party APIs, and we cannot guarantee its accuracy, completeness, or reliability. Users should verify the information independently before making any investment decisions.
        </p>
        <p>
          <strong>No Guarantee of Accuracy</strong>
          <br />
          SOTD.ai cannot guarantee the accuracy, completeness, or reliability of the data provided by third-party APIs. The data may be subject to errors, omissions, or delays.
        </p>
        <p>
          <strong>User Verification</strong>
          <br />
          Users should independently verify the information provided by SOTD.ai before making any investment decisions. SOTD.ai is not responsible for any losses or damages resulting from reliance on the data provided.
        </p>
        <p>
          <strong>Limitations of Liability</strong>
          <br />
          SOTD.ai shall not be liable for any errors, inaccuracies, or omissions in the data provided, nor for any actions taken based on the information provided on our website.
        </p>
      </TermsContent>
    </TermsOfServiceContainer>
  );

  const renderLicenseAgreementContent = () => (
    <TermsOfServiceContainer>
      <TermsTitle>License Agreement</TermsTitle>
      <TermsContent>
        <p>
          By using SOTD.ai, you agree to comply with all applicable laws and regulations. The software, content, and services provided by SOTD.ai are protected by intellectual property laws. Users are granted a limited, non-exclusive, non-transferable license to access and use the services for personal or internal business purposes only.
        </p>
        <p>
          <strong>Limited License</strong>
          <br />
          Users are granted a limited, non-exclusive, non-transferable license to access and use the services provided by SOTD.ai for personal or internal business purposes only.
        </p>
        <p>
          <strong>Prohibited Use</strong>
          <br />
          Users may not (i) copy, distribute, or modify any part of SOTD.ai without our express written permission, (ii) reverse engineer or attempt to extract the source code of our software, (iii) use our services for any illegal or unauthorized purpose, or (iv) resell, sublicense, or transfer the rights granted to you under this license.
        </p>
        <p>
          <strong>Termination of License</strong>
          <br />
          This license is revocable at any time, and SOTD.ai reserves the right to terminate your access to our services if you violate any of the terms of this agreement.
        </p>
      </TermsContent>
    </TermsOfServiceContainer>
  );

  const renderUserAgreementContent = () => (
    <TermsOfServiceContainer>
      <TermsTitle>User Agreement</TermsTitle>
      <TermsContent>
        <p>
          By using SOTD.ai, you agree to be bound by our user agreement, which outlines the terms under which you may interact with our website and services. This includes the acceptable use of content, user contributions, and restrictions on how you may use the information provided by SOTD.ai.
        </p>
        <p>
          <strong>User Contributions</strong>
          <br />
          Users may contribute content, such as comments or reviews, to SOTD.ai. By doing so, you grant SOTD.ai a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute your content.
        </p>
        <p>
          <strong>Acceptable Use</strong>
          <br />
          Users agree to use SOTD.ai in a manner that is lawful, respectful, and in compliance with these Terms. You may not use our services to harass, abuse, or harm others, or to post content that is defamatory, obscene, or otherwise objectionable.
        </p>
        <p>
          <strong>Restrictions on Use</strong>
          <br />
          Users may not (i) use SOTD.ai to transmit or distribute any viruses, malware, or other harmful software, (ii) engage in any activity that could disrupt or interfere with the proper functioning of SOTD.ai, or (iii) attempt to gain unauthorized access to any part of our website or services.
        </p>
        <p>
          <strong>Termination</strong>
          <br />
          SOTD.ai reserves the right to terminate your access to our website and services if you violate any of the terms of this agreement. Upon termination, you must immediately cease all use of SOTD.ai and destroy any copies of content or software obtained from our website.
        </p>
      </TermsContent>
    </TermsOfServiceContainer>
  );

  return (
    <PageContainer>
      {selectedTab === "about" && renderAboutContent()}
      {selectedTab === "terms" && renderTermsOfServiceContent()}
      {selectedTab === "risk" && renderRiskDisclosureContent()}
      {selectedTab === "privacy" && renderPrivacyPolicyContent()}
      {selectedTab === "disclaimer" && renderDisclaimerContent()}
      {selectedTab === "api" && renderApiUsageDisclosureContent()}
      {selectedTab === "accuracy" && renderDataAccuracyDisclaimerContent()}
      {selectedTab === "license" && renderLicenseAgreementContent()}
      {selectedTab === "user" && renderUserAgreementContent()}
      <LegalLinksContainer>
        <LegalLink onClick={() => setSelectedTab("about")}>About</LegalLink>
        <LegalLink onClick={() => setSelectedTab("terms")}>Terms of Service</LegalLink>
        <LegalLink onClick={() => setSelectedTab("risk")}>Risk Disclosure</LegalLink>
        <LegalLink onClick={() => setSelectedTab("privacy")}>Privacy Policy</LegalLink>
        <LegalLink onClick={() => setSelectedTab("disclaimer")}>Disclaimer</LegalLink>
        <LegalLink onClick={() => setSelectedTab("api")}>API Usage Disclosure</LegalLink>
        <LegalLink onClick={() => setSelectedTab("accuracy")}>Data Accuracy Disclaimer</LegalLink>
        <LegalLink onClick={() => setSelectedTab("license")}>License Agreement</LegalLink>
        <LegalLink onClick={() => setSelectedTab("user")}>User Agreement</LegalLink>
      </LegalLinksContainer>
    </PageContainer>
  );
};
