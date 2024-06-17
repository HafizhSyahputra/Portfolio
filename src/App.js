import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import profileImage from "./assets/img/Putra-Image.png";
import pdfFile from "./assets/file/CV Hafizh Syahputra.pdf";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";

// Animations
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const slideInFromRight = keyframes`
  0% { opacity: 0; transform: translateX(100%); }
  100% { opacity: 1; transform: translateX(0); }
`;

const slideInFromLeft = keyframes`
  0% { opacity: 0; transform: translateX(-100%); }
  100% { opacity: 1; transform: translateX(0); }
`;

// Styled Components
const Container = styled.div`
  margin-top: 0px;
  display: flex;
  flex-wrap: wrap;
  background-color: #2e2f34;
  color: #fff;
  font-family: "Arial, sans-serif";
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 110px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateX(${(props) => (props.isVisible ? "0" : "-100%")});
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;

  @media (max-width: 1024px) {
    margin-left: 10px;
    margin-top:50px;
    padding: 20px;
  }
`;

const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
  position: relative;
  span {
    color: white;
  }
  .highlight {
    color: #FFC700;
  }

  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 1px;
    background-color: #ffa500;
    position: absolute;
    bottom: -20px;
    left: 23%;
    transform: translateX(-50%);
  }
`;

const SocialLinks = styled.div`
  display: grid;
  margin-top: 50px;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-right: 70px;
  margin-bottom: 2rem;
  font-family: "Poppins", sans-serif;

  @media (max-width: 768px) {
    margin-right: 0;
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const SocialLink = styled.a`
  color: #fff;
  font-size: 13px;
  text-decoration: none;

  &:hover {
    color: #8a6c00;
  }
`;

const ContactButton = styled.button`
  background-color: transparent;
  color: white;
  font-family: "Poppins", sans-serif;
  border: 1px solid #8a6c00;
  padding: 8px 77px;
  cursor: pointer;
  font-size: 12px;
  transition: transform 0.3s;

  &:hover {
    background-color: #8a6c00;
    color: #fff;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 8px 40px;
  }
`;

const ProfileImageWrapper = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 65px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 2s ease-in;

  @media (max-width: 1024px) {
    margin-top: 20px;
    margin-left: 10px;
    width: 100%;
    order: 2;
  }
  
  @media (max-width: 500px) {
    margin-top: 20px;
    margin-left: 10px;
    width: 100%;
    flex-direction: column; 
    flex: 1; 
  }
`;

const ProfileImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;

  @media (min-width: 768px) {
    object-fit: cover; 
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px;
  text-align: left;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateX(${(props) => (props.isVisible ? "0" : "100%")});
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
    margin-left: 10px;
    margin-top:0px;
  }
`;

const Title = styled.h2`
  color: #ffc700;
  font-size: 20px;
  font-family: "Poppins", sans-serif;
`;

const Subtitle = styled.h3`
  font-size: 32px;
  font-family: "Poppins", sans-serif;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 14px;
  color: #9e9e9e;
  font-family: "Poppins", sans-serif;
  margin-bottom: 1rem;
  max-height: ${(props) => (props.showFull ? "none" : "100px")};
  overflow: hidden;
`;

const ToggleButton = styled.a`
  color: #b39630;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  margin-bottom: 20px;
  text-decoration: none;

  &:hover {
    color: white;
  }

  cursor: pointer;
`;

const DownloadCVButton = styled.button`
  background-color: transparent;
  color: white;
  font-family: "Poppins", sans-serif;
  border: 1px solid #8a6c00;
  padding: 8px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 20px;
  transition: transform 0.3s;

  &:hover {
    background-color: #8a6c00;
    color: #fff;
    transform: scale(1.05);
  }
`;

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownloadCV = () => {
    fetch(pdfFile)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "CV_Hafizh_Syahputra.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error("Error fetching CV:", error));
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div>
      <Container>
        <LeftSection isVisible={isVisible}>
          <Name>
            <span>Hafizh <br />
            Syahputra</span>
            <span className="highlight">.</span>
          </Name>
          <SocialLinks>
            <SocialLink href="https://www.instagram.com/hafiz.sn/">
              Instagram
            </SocialLink>
            <SocialLink href="#">Email</SocialLink>
            <SocialLink href="https://www.linkedin.com/in/hafizh-syahputra-6b0255294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              LinkedIn
            </SocialLink>
            <SocialLink href="https://wa.me/6287770853577?text=Hello%20Putra,%20I%20would%20like%20to%20get%20in%20touch%20with%20you.">
              WhatsApp
            </SocialLink>
          </SocialLinks>
          <ContactButton onClick={() => scrollToSection("contact")}>
            Contact Me
          </ContactButton>
        </LeftSection>
        <ProfileImageWrapper isVisible={isVisible}>
          <ProfileImage src={profileImage} alt="Hafizh Syahputra" />
        </ProfileImageWrapper>
        <RightSection isVisible={isVisible}>
          <Title>About Me</Title>
          <Subtitle>Hello!</Subtitle>
          <Description showFull={showFullDescription}>
            I am Hafizh Syahputra, a bachelor student in Informatics Engineering
            from Malikussaleh University. My passion for computers and
            technology has led me to gain various skills and experiences
            throughout my academic and professional journey. I am skilled in web
            and mobile application development, programming, and digital design.
            Additionally, I have experience as a laboratory assistant and am
            committed to continual learning and self-improvement. I am excited
            to bring my skills and dedication to new challenges and
            opportunities.
          </Description>
          <ToggleButton onClick={toggleDescription}>
            {showFullDescription ? "Read Less" : "More"}
          </ToggleButton>
          <DownloadCVButton onClick={handleDownloadCV}>
            Download CV
          </DownloadCVButton>
        </RightSection>
      </Container>
      <Portfolio />
      <Contact />
    </div>
  );
};

export default App;