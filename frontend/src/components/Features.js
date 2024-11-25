import React from 'react';
import styled from 'styled-components';
// Import your images here
// import feature_1 from './assets/img/feature_1.jpg';
import feature_2 from './assets/img/feature_2.jpg';
import feature_3 from './assets/img/feature_3.jpg';
import feature_4 from './assets/img/feature_4.jpg';
import feature_5 from './assets/img/feature_5.jpg';
import feature_6 from './assets/img/feature_6.jpg';

const companies = [
  { src: feature_2, alt: 'Feature' },
  { src: feature_3, alt: 'Feature' },
  { src: feature_4, alt: 'Feature' },
  { src: feature_5, alt: 'Feature' },
  { src: feature_6, alt: 'Feature' },
];

const Section = styled.div`
  padding: 40px 20px;
  text-align: center;
  
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap; /* Optional: Wrap if screen size is too small */
  margin-bottom: 20px;
`;

const Logo = styled.div`
  max-width: 100px; /* Control the size of each logo */
   transition: transform 0.3s ease; /* Smooth transition for scaling */
  
  &:hover {
    transform: scale(1.1); /* Scale up the logo on hover */
  }
  img {
    width: 100%;
    height: auto;
    filter: grayscale(100%); /* Optional: Apply grayscale to match style */
  }
`;

const Description = styled.p`
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 27px;
          text-align: center;
`;

const Link = styled.a`
  color: inherit; /* Inherit color from parent */
  text-decoration: none; /* Remove underline */
  transition: color 0.3s ease, transform 0.3s ease; /* Smooth transition for color and scaling */
  display: inline-block; /* Ensure the link behaves like a block for scaling */
  margin-right: 30px; /* Add right margin for spacing between links */
  margin-left: 30px; /* Add right margin for spacing between links */
  
  &:hover {
    color: #007BFF; /* Change color on hover */
    transform: scale(1.2); /* Increase size more on hover for a pronounced effect */
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3); /* Optional: Add text shadow */
  }
`;

const FeedbackContainer = styled.div`
  flex: 1; /* Allow this section to take up space */
  margin-left: 20px; /* Space between links and feedback */
  text-align: center; /* Center the feedback content */
  background: linear-gradient(135deg, #ff7e5f, #feb47b); /* Exciting gradient background */
  padding: 20px; /* Padding inside the feedback section */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const FeedbackTitle = styled.h3`
  font-size: 24px; /* Title font size */
  margin-bottom: 10px; /* Space below the title */
`;

const FeedbackItem = styled.div`
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Center items vertically */
  justify-content: center; /* Center items horizontally */
  margin: 10px 0; /* Space between feedback items */
`;

const FeedbackImage = styled.img`
  width: 50px; /* Set image size */
  height: 50px; /* Set image size */
  border-radius: 50%; /* Make images circular */
  margin-right: 10px; /* Space between image and text */
`;

const FeedbackText = styled.p`
  font-size: 16px; /* Feedback text size */
  color: #555; /* Feedback text color */
`;


const Feature = () => {
  return (
    <Section>
      <LogosContainer>
        {companies.map((company, index) => (
          <Logo key={index}>
            <img src={company.src} alt={company.alt} />
          </Logo>
        ))}
      </LogosContainer>
      <Description>
          The one platform for fitness goals <br/> 
          <Link href="https://example.com" target="_blank" rel="noopener noreferrer">Fitness Companion</Link> | 
          <Link href="https://example.com" target="_blank" rel="noopener noreferrer"> Progress Log</Link> | 
          <Link href="https://example.com" target="_blank" rel="noopener noreferrer"> Calorie Count</Link> | 
          <Link href="https://example.com" target="_blank" rel="noopener noreferrer"> Custom Diet and Fitness</Link> | 
          <Link href="https://example.com" target="_blank" rel="noopener noreferrer"> Food Insights</Link>
      </Description>

      <FeedbackContainer>
  <FeedbackTitle>User Feedback</FeedbackTitle>
  <FeedbackItem>
    <FeedbackImage src="https://via.placeholder.com/50" alt="User 1" />
    <FeedbackText>"This app has transformed my fitness journey!" - User 1</FeedbackText>
  </FeedbackItem>
  <FeedbackItem>
    <FeedbackImage src="https://via.placeholder.com/50" alt="User 2" />
    <FeedbackText>"I love the calorie counting feature!" - User 2</FeedbackText>
  </FeedbackItem>
  <FeedbackItem>
    <FeedbackImage src="https://via.placeholder.com/50" alt="User 3" />
    <FeedbackText>"The custom diet plans are a game changer!" - User 3</FeedbackText>
  </FeedbackItem>
</FeedbackContainer>
    </Section>
  );
};
export default Feature;
