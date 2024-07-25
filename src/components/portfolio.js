import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./portfolio.css";

const images = [
  {
    src: "https://cdn.dribbble.com/userupload/15206420/file/original-8a512a7af090e5ffbbfaa9b8e685d960.webp?resize=1200x723",
    category: "app",
    link: "https://github.com/HafizhSyahputra",
    desc: "Create an e-commerce application with Android Studio and Java language, and create an admin website with Code Igniter 3 which is interconnected with the Android application.",
  },
  {
    src: "https://cdn.dribbble.com/userupload/15206441/file/original-ef6acdb7dd1efe000905da52a779d633.webp?resize=1200x800",
    category: "UI/UX",
    link: "https://www.figma.com/design/eeRvBInwZKV8SHDsceesz8/DIGODA?node-id=0-1&t=3PNDcIZ7Q2V9E6K5-1",
    desc: "Creating a UI UX design for a hotel website aimed at completing the final semester 1 project assignment in class 11. Equipped with website design, mobile design and design for the admin page.",
  },
  {
    src: "https://cdn.dribbble.com/userupload/15206505/file/original-23221832c9f1c7380a420b7e37198b9a.webp?resize=1200x800",
    category: "web",
    link: "https://github.com/HafizhSyahputra/MakanAssyik",
    desc: "This is a website that I created to sell frozen food, which can make it easier for users to buy it through the website, this website has a display for users and also admins. And it has also been integrated with midtrans payment. Build With React js & Node Js.",
  },
  {
    src: "https://cdn.dribbble.com/userupload/15206519/file/original-38ead0b6a39dd1dd17f33f4b1c3d84ef.webp?resize=1200x780",
    category: "web",
    link: "https://github.com/greyseth/realestate-site/tree/updated",
    desc: "a real estate website created to buy or rent a house. Created with user friendly features and has complete features, Build with Next Js.",
  },
  {
    src: "https://cdn.dribbble.com/userupload/15206464/file/original-559fec5871c5ac12d9ebdd7498dcd539.webp?resize=1200x800",
    category: "UI/UX",
    link: "https://www.figma.com/proto/gDm3sPq1vCi8S29iv5PO09/UI%2FUX-Hospital?page-id=0%3A1&node-id=240-64&starting-point-node-id=240%3A64&t=KNwgne9l30tiG5Qw-1",
    desc: "This is one of my project teams, here we create a UI UX design with a health theme, where in this application you can consult with a doctor and also buy fruit or medicine.",
  },
  {
    src: "https://cdn.dribbble.com/userupload/15206490/file/original-301a3bed43ede2d4cc1062e4bcade76c.webp?resize=1200x682",
    category: "web",
    link: "https://github.com/HafizhSyahputra/uaspemweb",
    desc: "This website was created to purchase goods data, where on this website we have 5 actors, namely admin, warehouse, supplier, user, and cashier, this website was created with the React js framework and was created with state management.",
  },
];

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const portfolioElement = document.getElementById("portfolio");
      if (portfolioElement) {
        const scrollPosition = window.scrollY + window.innerHeight;
        const portfolioOffset = portfolioElement.offsetTop;

        if (scrollPosition > portfolioOffset && !isAnimated) {
          setIsAnimated(true);
        }
      }
    };

    const handleModalClose = () => {
      setShowModal(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("focus", handleModalClose);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("focus", handleModalClose);
    };
  }, [isAnimated]);

  const filteredImages =
    filter === "all"
      ? images
      : images.filter((image) => image.category === filter);

  const handleCardClick = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  const handleLinkClick = () => {
    if (currentProject) {
      window.location.href = currentProject.link;
    }
  };

  return (
    <div>
      <Section
        id="portfolio"
        className={`py-10 lg:py-20 ${isAnimated ? "animated" : ""}`}
      >
        <Container className="container mx-auto px-4">
          <Name>
            <pre>MY</pre>
            <pre className="highlight"> PORTFOLIO</pre>
          </Name>
          <FilterWrapper className="pl-20 pr-20">
            <FilterButton onClick={() => setFilter("all")}>All</FilterButton>
            <FilterButton onClick={() => setFilter("app")}>App</FilterButton>
            <FilterButton onClick={() => setFilter("UI/UX")}>
              UI/UX
            </FilterButton>
            <FilterButton onClick={() => setFilter("web")}>Web</FilterButton>
          </FilterWrapper>
          <div className="flex flex-wrap -m-12 lg:-m-3">
            <TransitionGroup component={null}>
              {filteredImages.map((image, index) => (
                <CSSTransition key={index} timeout={500} classNames="fade">
                  <ImageWrapper
                    className="w-full lg:w-1/3 lg:p-3"
                    onClick={() => handleCardClick(image)}
                  >
                    <Image src={image.src} alt="" />
                  </ImageWrapper>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </Container>
        {showModal && currentProject && (
          <Modal>
            <ModalContent>
              <ModalImage src={currentProject.src} alt="Project image" />
              <ModalText>{currentProject.desc}</ModalText> {/* Tampilkan deskripsi di sini */}
              <ModalButton onClick={handleLinkClick}>View Project</ModalButton>
              <CloseButton onClick={() => setShowModal(false)}>
                Close
              </CloseButton>
            </ModalContent>
          </Modal>
        )}
      </Section>
      <div id="contact" className="s">
        s
      </div>
    </div>
  );
}

const Name = styled.h1`
  display: flex;
  font-family: poppins, sans-serif;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 32px;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-top: -30px;
  }

  pre {
    color: white;
    font-family: poppins, sans-serif;
  }

  .highlight {
    color: #ffc700;
  }
`;

const Section = styled.section`
  padding: 100px;
  margin-left: 12px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 60px;
  }

  &.animated {
    animation: ${fadeIn} 1.3s ease-in;
  }
`;

const Container = styled.div`
  max-width: 100%;
  padding-left: 4px;
  padding-right: 4px;
  margin: 0 auto;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  padding-left: 76.5px;

  @media (max-width: 768px) {
    margin-bottom: 75px;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 400px) {
    padding: 8px 17px;
    padding-left: 4px;
    font-size: 14px;
  }

  @media (min-width: 770px) {
    margin-bottom: 60px;
  }
`;

const FilterButton = styled.button`
  background-color: #1f2121;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fff;
    color: black;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 8px 17px;
    margin: 0 10px;
    font-size: 14px;
  }

  @media (max-width: 400px) {
    padding: 8px 10px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding: 4px;
  cursor: pointer;
  animation: ${fadeIn} 1s ease-in;

  @media (min-width: 1024px) {
    width: 33.3333%;
    padding: 16px;
  }

  @media (max-width: 1024px) {
    margin-right: 12px;
  }

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  animation: fadeInModal 0.5s ease-in-out;

  @keyframes fadeInModal {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  max-width: 40vw;
  max-height: auto;
  padding: 32px;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ModalText = styled.div`
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  background-color: #1f2121;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fff;
    color: black;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #1f2121;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 14px;

  &:hover {
  color:red;
  }
`;

export default Portfolio;
