import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100%;
  min-height: 60vh;
`;

export const FloatingWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 99;

  button {
    display: block;
  }
`;

export const FloatingBtn = styled.button<{ $show: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.charcoal};
  transition: transform 0.2s;

  svg {
    fill: white;
    width: 20px;
    height: 20px;
  }

  &.chatBtn {
    background-color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    margin-bottom: 16px;
    transform: ${(props) => (props.$show ? 'translate(0, 0)' : 'translate(0, 16px)')};
  }

  &.chatBtn svg {
    fill: ${(props) => props.theme.colors.charcoal};
    width: 22px;
    height: 18px;
  }

  &:hover {
    transform: ${(props) => (props.$show ? 'scale(1.1)' : 'translate(0, 16px) scale(1.1)')};
  }

  &.scrolltop {
    display: ${(props) => (props.$show ? 'block' : 'none')};
  }
`;
