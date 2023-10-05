import styled from 'styled-components';

export const ChatWrapper = styled.td`
  padding: 0;
  background: ${(props) => props.theme.colors.graybg};

  .chatLog {
    max-height: 380px;
    overflow-y: scroll;
    padding: 40px 0;
    line-height: 1.7;
    background: white;
    border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
  }

  .chatLog li {
    max-width: 734px;
    margin: 0 auto;
  }

  .chatLog storng {
    font-weight: 500;
    color: ${(props) => props.theme.colors.black};
  }

  .chatLog span {
    color: ${(props) => props.theme.colors.blacklight};
  }

  .chatLog storng.manager {
    color: ${(props) => props.theme.colors.goldhover};
  }

  .writeWrapper {
    display: flex;
    max-width: 750px;
    margin: 0 auto;
    padding: 20px 0;
    gap: 0 10px;
  }

  textarea {
    border: 1px solid ${(props) => props.theme.colors.grayborder};
    width: 100%;
    max-width: 640px;
    resize: none;
    height: 80px;
    border-radius: 3px;
    padding: 10px;
  }

  button[type='submit'] {
    width: 100px;
    border-radius: 3px;
    background: ${(props) => props.theme.colors.gold};
    color: white;
  }

  button[type='submit']:hover {
    background: ${(props) => props.theme.colors.goldhover};
  }
`;
