import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const PageContainer = styled.div`
 background-color: #121212; /* Dark background for the page */
 min-height: 100vh;
 display: flex;
 justify-content: center;
 align-items: center;
`;


export const FormContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 background-color: #1e1e1e;
 padding: 40px;
 border-radius: 10px;
 box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
 max-width: 400px;
 margin: 80px auto; /* Added margin to push the form down */
 animation: fadeIn 1s ease-in-out;


 @keyframes fadeIn {
   from {
     opacity: 0;
     transform: translateY(-20px);
   }
   to {
     opacity: 1;
     transform: translateY(0);
   }
 }
`;


export const FormTitle = styled.h2`
 color: #ffffff;
 margin-bottom: 20px;
 font-size: 28px;
 font-weight: bold;
 text-transform: uppercase;
 letter-spacing: 2px;
`;


export const InputField = styled.input`
 width: 100%;  /* Adjusted width to leave some padding */
 padding: 12px 20px;
 margin: 8px 0;
 border: 1px solid #444;
 border-radius: 5px;
 background-color: #333;
 color: #ffffff;
 font-size: 16px;
 transition: border-color 0.3s ease;
 box-sizing: border-box; /* Ensures padding doesn't affect the width */


 &:focus {
   border-color: #888; /* Grey border on focus */
   outline: none;
 }
`;




export const SubmitButton = styled.button`
 width: 100%;
 background-color: white; /* Dark grey background */
 color: black;
 padding: 12px 20px;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 font-size: 16px;
 margin-top: 20px;
 transition: background-color 0.3s ease, transform 0.3s ease;


 &:hover {
   transform: translateY(-3px);
 }
`;


export const FormText = styled.p`
 margin-top: 20px;
 color: #bbbbbb;
 font-size: 14px;
`;


export const FormLink = styled(Link)`
 color: #cccccc; /* Light grey for the link */
 text-decoration: none;
 font-weight: bold;


 &:hover {
   text-decoration: underline;
   color: #ffffff; /* White on hover */
 }
`;



