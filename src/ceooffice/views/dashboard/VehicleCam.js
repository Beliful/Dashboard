import React from 'react';
import { useParams } from 'react-router-dom';

// Import your images
import f1Image from '../../assets/images/cam/f1.png';
import f2Image from '../../assets/images/cam/f2.png';
import f3Image from '../../assets/images/cam/f3.png';
import f4Image from '../../assets/images/cam/f4.png';

const ImageWithPlayIcon = () => {
  const { vehicleId } = useParams();

  // Function to select image based on vehicleId
  const selectImage = (vehicleId) => {
    switch (vehicleId) {
      case '1':
        return f1Image;
      case '2':
        return f2Image;
      case '3':
        return f3Image;
      default:
        return f4Image;
    }
  };

  const playIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '72px',
    height: '72px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const svgStyle = {
    fill: '#fff',
    width: '40px',
    height: '40px',
  };

  const playIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={svgStyle}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img src={selectImage(vehicleId)} alt="Thumbnail" style={{ display: 'block', width: '800px', height: 'auto' }} />
      <div style={playIconStyle}>{playIcon}</div>
    </div>
  );
};

export default ImageWithPlayIcon;
