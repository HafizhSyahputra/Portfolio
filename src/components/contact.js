import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  margin-top: 20px;
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2e2f34;

  @media (max-width: 768px) {
    margin-top: 30px;
    padding-right: 10px;
  }
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
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(20px)"};
  transition: opacity 2s ease, transform 1s ease;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 20px;
    max-width: 90%;
  }

  @media (max-width: 400px) {
    max-width: 90%;
    padding: 1rem;
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

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Description = styled.p`
  font-size: 0.8rem;
  padding-right: 50px;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
  line-height: 1.5;
  color: #b0b0b0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Info = styled.div`
  margin-bottom: 1rem;
  margin-top: 23px;
  margin-left: 40px;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  @media (max-width: 768px) {
    margin-left: 20px;
    font-size: 0.8rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const InfoLabel = styled.span`
  color: #ffffff;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const InfoText = styled.span`
  color: #ffc700;
  font-family: "Poppins", sans-serif;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Form = styled.form`
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 70px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
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

  &:focus {
    outline: none;
    border: 1px solid #ffc700;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
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

  &:focus {
    outline: none;
    border: 1px solid #ffc700;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
    height: 150px;
    padding: 22px;
    font-size: 12px;
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

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
  
    const payload = {
      embeds: [
        {
          title: "New Contact Form Submission",
          color: 0x00ff00,
          fields: [
            {
              name: "Name",
              value: name,
              inline: true,
            },
            {
              name: "Email",
              value: email,
              inline: true,
            },
            {
              name: "Message",
              value: message,
            },
          ],
          footer: {
            text: "🚀 Contact Notification" 
          },
          timestamp: new Date(),
        },
      ],
    };
  
    fetch("https://discord.com/api/webhooks/1265232784373321728/2AYLqLtlNpTG_TtzebtuyqDhCu9Ux57HJ5nj3CS24ggS57OQ2dEnBKXOwt9qit0YJp2U", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Your message has been sent successfully!");
          form.reset();
        } else {
          toast.error("Failed to send your message. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to send your message. Please try again later.");
      });
  };
  

  return (
    <>
      <ContactContainer id="contact">
        <FormWrapper isVisible={isVisible}>
          <ContactDetails>
            <First>CONTACT</First>
            <Title>GET IN TOUCH</Title>
            <Description>
              Are you ready to elevate your digital presence? Connect with our
              skilled web developers to create a stunning and functional website
              tailored to your needs. If you're looking to build or enhance your
              Android app, our experienced Android developers are here to bring
              your vision to life with cutting-edge technology. For those
              seeking an intuitive and engaging user experience, our talented
              UI/UX designers will craft interfaces that captivate and delight
              your audience. Reach out to us today, and let's start turning your
              ideas into reality!
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
                <InfoText>Jln. Musyawarah</InfoText>
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
                <InfoText>ptr.putramail@gmail.com</InfoText>
              </InfoWrapper>
            </Info>
          </ContactDetails>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <TextArea
              name="message"
              placeholder="Message"
              required
            />
            <Button type="submit">Submit It</Button>
          </Form>
        </FormWrapper>
      </ContactContainer>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Contact;
