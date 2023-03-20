import styled from 'styled-components';

import Button from './Button';

const Overlay = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(60, 55, 53, 45%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ModalContent = styled.div`
  width: 50%;
  height: auto;
  position: relative;
  background-color: #ffffff;
  border: 2px black solid;
  border: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;
  button {
    position: absolute;
    top: 1%;
    right: 0.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const Modal = ({ action, content, text, size, padding, variant }) => {
  return (
    <Overlay>
      <ModalContent>
        <Button
          text={text}
          variant={variant}
          action={action}
          size={size}
          padding={padding}
        />
        {content}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
