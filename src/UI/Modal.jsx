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
  padding: 1rem;
  button {
    position: absolute;
    top: 1%;
    right: 1%;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
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
