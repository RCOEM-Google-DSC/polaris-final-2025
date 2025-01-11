"use client";

import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import Image from "next/image";
import BackgroundLines from "../components/BackgroundLines";
import BackgroundVideo from "../components/BackgroundVideo";
import Header from "../components/Header";
import Loading from "../components/Loading";
import SpidermanHero from "@/assets/spider-man.png";
import Spidercraft from "@/assets/spidercraft.png";
import Link from "next/link";
import {
  Container,
  WrapperContent,
  WrapperImage,
  Logo,
  Description,
  WrapperButtons,
  PreOrderButton,
  WatchTeaserButton,
  Spiderman,
  WatchTeaserButtons,
  PreOrderButtons,
} from "./styles/styles";

// Add Modal Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const RBUButton = styled(ModalButton)`
  background: #ff0000;
  color: white;
`;

const OtherButton = styled(ModalButton)`
  background: #333;
  color: white;
`;

// Add Modal Props Interface
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRBUClick: () => void;
  onOtherClick: () => void;
}

// Add Modal Component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onRBUClick, onOtherClick }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Choose Your College</h2>
        <ButtonGroup>
          <PreOrderButtons 
            as="a" 
            href="https://forms.gle/R8XeNCTw8JcmV5Wx6" // Replace with actual RBU URL
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              onRBUClick();
              window.open('https://forms.gle/R8XeNCTw8JcmV5Wx6', '_blank'); // Replace with actual RBU URL
            }}
          >
            RBU
          </PreOrderButtons>
          
          <WatchTeaserButtons
            as="a"
            href="https://forms.gle/78e64zW9bjt8D1az6" // Replace with actual other college URL
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              onOtherClick();
              window.open('https://forms.gle/78e64zW9bjt8D1az6', '_blank'); // Replace with actual other college URL
            }}
            className="text-black"
          >
            Other College
          </WatchTeaserButtons>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
);
};

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div<{ $isLoading: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  animation: ${(props) => (props.$isLoading ? "none" : fadeOut)} 0.8s
    ease-in-out forwards;
`;

const MainContentContainer = styled.div<{ $isLoading: boolean }>`
  opacity: 0;
  animation: ${(props) => (!props.$isLoading ? fadeIn : "none")} 0.8s
    ease-in-out 0.3s forwards;
  width: 100%;
  height: 100%;
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  // Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  // Add Modal Handlers
  const handleRBUClick = () => {
    console.log('RBU selected');
    setIsModalOpen(false);
  };

  const handleOtherClick = () => {
    console.log('Other College selected');
    setIsModalOpen(false);
  };

  if (!isMounted) {
    return (
      <LoadingContainer $isLoading={true}>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <>
      <LoadingContainer $isLoading={isLoading}>
        <Loading />
      </LoadingContainer>

      <MainContentContainer $isLoading={isLoading}>
        <Header />
        <BackgroundVideo />
        <BackgroundLines />
        <Container>
          <WrapperContent>
            <Logo className="item-1">
              <Image src={Spidercraft} alt="Spider-Man Miles Morales" />
            </Logo>

            <Description className="item-2">
              Gear up for POLARIS, the ultimate tech showdown by GDG! Code,
              quiz, and play your way through thrilling challenges. Test your
              skills, compete for amazing prizes, and have a blast with fellow
              tech lovers. Ready to shine? Join the adventure! 
            </Description>

            <WrapperButtons className="item-3">
              <PreOrderButton>Explore  →</PreOrderButton>
              <WatchTeaserButton onClick={() => setIsModalOpen(true)}>
                Register Now
              </WatchTeaserButton>
            </WrapperButtons>
          </WrapperContent>

          <WrapperImage className="item-5">
            <Spiderman src={SpidermanHero.src} alt="Spider-Man Miles Morales" />
          </WrapperImage>
        </Container>

        {/* Add Modal Component */}
        <Modal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRBUClick={handleRBUClick}
          onOtherClick={handleOtherClick}
        />
      </MainContentContainer>
    </>
  );
}