import styled from 'styled-components';

const ButtonStyled = styled.button`
  background-color: ${({ variant }) =>
    variant === 'contained' ? 'rgb(74, 153, 187)' : 'transparent'};
  border: ${({ variant }) =>
    variant === 'text' ? 'none' : `1px solid rgb(74, 153, 187)`};
  border-radius: 10px;
  font-family: 'VAG Rounded Std', 'Varela Round', sans-serif;
  font-size: ${({ size }) =>
    size === 'xl' ? '1.2rem' : size === 'lg' ? '0.8rem' : size === 'md' && '0.60rem'};
  font-weight: 900;
  color: ${({ variant }) =>
    variant === 'contained' ? 'whitesmoke' : 'rgb(74, 153, 187)'};
  outline: none;
  padding: ${({ padding }) =>
    padding === 'xl' ? `1rem 2rem` : padding === 'lg' && `0.5rem 1rem`};
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: ${({ variant }) =>
      variant === 'contained' ? 'whitesmoke' : 'rgb(74, 153, 187)'};
    color: ${({ variant }) =>
      variant === 'contained' ? 'rgb(74, 153, 187)' : 'whitesmoke'};
    border: ${({ variant }) => (variant === 'text' ? 'none' : `1px solid whitesmoke`)};
  }
`;

const Button = ({ padding, size, text, action, variant }) => {
  return (
    <ButtonStyled onClick={action} variant={variant} size={size} padding={padding}>
      {text}
    </ButtonStyled>
  );
};

export default Button;
