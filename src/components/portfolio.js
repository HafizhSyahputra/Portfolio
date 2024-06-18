import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./portfolio.css";
import eccomerceIMG from "../assets/img/portfolio/Cover.webp";
import digoda from "../assets/img/portfolio/digoda.webp";
import realestate from "../assets/img/portfolio/realestate.webp";
import makan from "../assets/img/portfolio/makan.webp";
import hospital from "../assets/img/portfolio/hospital.webp";
import inventory from "../assets/img/portfolio/inventory.webp";
import { lazyload } from "react-lazyload";

const images = [
  {
    src: eccomerceIMG,
    category: "app",
    link: "https://github.com/HafizhSyahputra"
  },
  {
    src: digoda,
    category: "UI/UX",
    link: "https://www.figma.com/proto/eeRvBInwZKV8SHDsceesz8/DIGODA?page-id=0%3A1&node-id=2-34&viewport=308%2C343%2C0.09&t=79xMhcarzwuGzxiX-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2&show-proto-sidebar=1"
  },
  {
    src: makan,
    category: "web",
    link: "https://github.com/HafizhSyahputra"
  },
  {
    src: realestate,
    category: "web",
    link: "https://github.com/greyseth/realestate-site/tree/updated"
  },
  {
    src: hospital,
    category: "UI/UX",
    link: "https://www.figma.com/proto/gDm3sPq1vCi8S29iv5PO09/UI%2FUX-Hospital?page-id=0%3A1&node-id=240-64&starting-point-node-id=240%3A64&t=KNwgne9l30tiG5Qw-1"
  },
  {
    src: inventory,
    category: "web",
    link: "https://github.com/HafizhSyahputra/uaspemweb"
  }
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
  const [navigationUrl, setNavigationUrl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  

  const filteredImages = filter === "all" ? images : images.filter(image => image.category === filter);

  const handleCardClick = (url) => {
    setShowModal(true);
    setTimeout(() => {
      window.location.href = url;
    }, 1500);
  
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };
  

  return (
    <Section className={`py-10 lg:py-20 ${isAnimated ? 'animated' : ''}`}>
      <Container id="portfolio"  className="container mx-auto px-4">
        <Name><pre>MY</pre><pre className="highlight"> PORTFOLIO</pre></Name>
        <FilterWrapper className="pl-20 pr-20">
          <FilterButton onClick={() => setFilter("all")}>All</FilterButton>
          <FilterButton onClick={() => setFilter("app")}>App</FilterButton>
          <FilterButton onClick={() => setFilter("UI/UX")}>UI/UX</FilterButton>
          <FilterButton onClick={() => setFilter("web")}>Web</FilterButton>
        </FilterWrapper>
        <div className="flex flex-wrap -m-12 lg:-m-3">
          <TransitionGroup component={null}>
            {filteredImages.map((image, index) => (
              <CSSTransition
                key={index}
                timeout={500}
                classNames="fade"
              >
                <ImageWrapper className="w-full lg:w-1/3 lg:p-3" onClick={() => handleCardClick(image.link)}>
                  <LazyImage src={image.src} alt="" style={lazyload} />
                </ImageWrapper>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </Container>
      {showModal && (
        <Modal>
          <ModalContent>
            <Loader />
            <ModalText>Please wait, you are being redirected...</ModalText>
          </ModalContent>
        </Modal>
      )}
    </Section>
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
    font-family:poppins, sans-serif;
  }
  
  .highlight {
    color: #FFC700;
  }
`;

const Section = styled.section`
  padding: 100px;
  margin-left:12px; 
  margin-top: 15px;
  display:flex;
  justify-content:center;
  align-items:center
  @media (min-width: 1024px) {
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
  padding-left:76.5px;
  @media (max-width: 768px) {
    margin-bottom: 75px;
    display: flex;
  }

  @media (max-width: 400px) {
    padding: 8px 17px;
      padding-left:15px;
    font-size: 14px; 
  }

  @media (min-width: 770px) {
    margin-bottom: 60px;
  }
`;

const FilterButton = styled.button`
  background-color: #1F2121;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 15px;
  cursor: pointer;
  border-radius: 5px;
  
  &:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    padding: 8px 17px;
    margin: 0 10px;
    font-size: 14px; 
  }

  @media (max-width: 768px) {
     display:flex;
    justify-content:center;
    align-items:center;
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

  
  &:hover {
    transform: scale(1.05);  
    transition: transform 0.3s ease;
  }

  .fade-enter {
    opacity: 0;
    transform: scale(0.95);
  }
  
  .fade-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.8s, transform 0.8s ease;  
  }
  
  .fade-exit {
    opacity: 1;
  }
  
  .fade-exit-active {
    opacity: 0;
    transition: opacity 0.5s;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%; 
  max-width: 100%; 
  object-fit: cover; 
  border-radius: 8px;
`;

const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ImageContainer>
      {!loaded && <LoaderContainer><Loader /></LoaderContainer>}
      <Image 
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </ImageContainer>
  );
};


const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:poppins, sans-serif;
  width: 100%;
  height: 100%;
`;

const Loader = styled.div`
  border: 4px solid #FFC700;
  width: 10vw; 
  height: 10vw; 
  font-family:poppins, sans-serif;
  max-width: 40px; 
  max-height: 40px; 
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;


const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  font-family:poppins, sans-serif;
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
  padding: 20px;
  background: white;
  border-radius: 8px;
  display: flex;
  font-family:poppins, sans-serif;
  flex-direction: column;
  align-items: center;
`;

const ModalText = styled.div`
  font-size: 15px;
  font-weight: 600;
  font-family:poppins, sans-serif;
  text-align: center;
  margin-top: 20px;
`;

export default Portfolio;
