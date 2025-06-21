import React, { useEffect, useState, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    cursor: none !important;
  }
  
  /* 特别处理下拉菜单和选择框 */
  .MuiSelect-select,
  .MuiMenuItem-root,
  .MuiAutocomplete-input,
  .MuiInputBase-input,
  button,
  a,
  [role="button"],
  [role="option"],
  [role="menuitem"] {
    cursor: none !important;
  }

  @keyframes offerTwinkle {
    0% { 
      transform: scale(1) translate(-50%, -50%); 
      opacity: 1; 
      filter: brightness(1) drop-shadow(0 0 5px #00bfff);
    }
    25% { 
      transform: scale(1.2) translate(-50%, -50%); 
      opacity: 0.8; 
      filter: brightness(3) drop-shadow(0 0 20px #00bfff);
    }
    50% { 
      transform: scale(0.8) translate(-50%, -50%); 
      opacity: 0.5; 
      filter: brightness(2) drop-shadow(0 0 15px #00bfff);
    }
    75% { 
      transform: scale(1.1) translate(-50%, -50%); 
      opacity: 0.7; 
      filter: brightness(2.5) drop-shadow(0 0 18px #00bfff);
    }
    100% { 
      transform: scale(1) translate(-50%, -50%); 
      opacity: 1; 
      filter: brightness(1) drop-shadow(0 0 5px #00bfff);
    }
  }

  .offer-cursor {
    position: absolute !important;
    width: 20px !important;
    height: 20px !important;
    background-image: url('/images/offer.svg') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    box-shadow: 0 0 10px #00bfff !important;
    animation: offerTwinkle 1.5s infinite !important;
    pointer-events: none !important;
    z-index: 99999 !important;
  }
`;

const CursorWrapper = styled.div`
  position: fixed !important;
  width: 100vw !important;
  height: 100vh !important;
  top: 0 !important;
  left: 0 !important;
  pointer-events: none !important;
  z-index: 99999 !important;
`;

const StarCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const audioContextRef = useRef(null);

  const playClickSound = () => {
    if (!audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContextRef.current.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.1);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.error('Web Audio API not supported:', error);
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      playClickSound();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <CursorWrapper>
        <div 
          className="offer-cursor" 
          style={{ 
            left: position.x, 
            top: position.y 
          }} 
        />
      </CursorWrapper>
    </>
  );
};

export default StarCursor; 