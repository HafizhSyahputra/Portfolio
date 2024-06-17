import React from "react";

const LazyImage = ({ src, alt, onLoad }) => {
    const [loaded, setLoaded] = useState(false);
  
    const handleLoad = () => {
      setLoaded(true);
      onLoad && onLoad(); // Call the provided onLoad function if exists
    };
  
    return (
      <ImageContainer>
        {!loaded && <LoaderContainer><Loader /></LoaderContainer>}
        <Image
          src={loaded ? src : ''}
          alt={alt}
          onLoad={handleLoad}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      </ImageContainer>
    );
  };
  