import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import addressIcon from "../assets/img/address.png";
import phoneIcon from "../assets/img/telp.png";
import mailIcon from "../assets/img/mail.png";

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

const ContactContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2e2f34;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #34353a;
  padding: 2rem;
  max-width: 1300px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 2s ease, transform 1s ease;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 5rem;
  }
`;

const ContactDetails = styled.div`
  color: #fff;
  flex: 1;
`;

const First = styled.p`
  margin-bottom: 1rem;
  font-size: 15px;
  color: #ffffff;
  font-weight: 300;
  display: inline-block;
  font-family: "Poppins", sans-serif;
  width: 165px;
  border-bottom: 1px solid #ffb400;
  padding-bottom: 5px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 0.9rem;
  padding-right: 50px;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
  line-height: 1.5;
  color: #b0b0b0;
`;

const Info = styled.div`
  margin-bottom: 1rem;
  margin-top: 23px;
  margin-left: 40px;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const InfoLabel = styled.span`
  color: #ffffff;
  font-size: 0.9rem;
`;

const InfoText = styled.span`
  color: #ffc700;
  font-family: "Poppins", sans-serif;
`;

const Form = styled.form`
  margin-left: 60px;
  margin-right: 40px;
  margin-top: 70px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    margin-left: auto;
    margin-right: 60px;
  }
`;

const Input = styled.input`
  padding: 1.5rem;
  height: 40px;
  width: 100%;
  border: 1px solid #ffc700;
  border-radius: 20px;
  font-size: 13px;
  background-color: #34353a;
  color: #fff;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ffc700;
  border-radius: 10px;
  font-size: 1rem;
  background-color: #34353a;
  color: #fff;
  height: 200px;
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const Button = styled.button`
  height: 33px;
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 12px;
  background-color: #ffb400;
  color: black;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6a700;
  }
`;

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const contactOffsetTop = document.getElementById("contact").offsetTop;
      const windowHeight = window.innerHeight;

      if (scrollY + windowHeight >= contactOffsetTop) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ContactContainer>
      <FormWrapper  id="contact" isVisible={isVisible}>
        <ContactDetails>
          <First>CONTACT</First>
          <Title>GET IN TOUCH</Title>
          <Description>
            From responsive UI designs to deep UX development, I am committed to
            delivering outcomes that not only meet expectations but also exceed
            client goals. My portfolio showcases my ability to adapt to diverse
            challenges and create measurable, impactful solutions. I am
            enthusiastic about collaborating and contributing to projects that
            make a significant impact for your team.
          </Description>
          <Info>
            <img
              className="mt-2"
              src={addressIcon}
              alt="Address Icon"
              width="17"
              height="24"
            />
            <InfoWrapper>
              <InfoLabel>Address</InfoLabel>
              <InfoText>Jl. Musyawarah</InfoText>
            </InfoWrapper>
          </Info>
          <Info>
            <img
              className="mt-2"
              src={phoneIcon}
              alt="Phone Icon"
              width="21"
              height="22"
            />
            <InfoWrapper>
              <InfoLabel>Call Us</InfoLabel>
              <InfoText>+62 877 7085 3577</InfoText>
            </InfoWrapper>
          </Info>
          <Info>
            <img
              className="mt-2"
              src={mailIcon}
              alt="Mail Icon"
              height="22"
              width="23"
            />
            <InfoWrapper>
              <InfoLabel>Mail Us</InfoLabel>
              <InfoText>hafizhsyaputra676@gmail.com</InfoText>
            </InfoWrapper>
          </Info>
        </ContactDetails>
        <Form>
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <TextArea placeholder="Message" required />
          <Button type="submit">Submit It</Button>
        </Form>
      </FormWrapper>
    </ContactContainer>
  );
};

export default Contact;
