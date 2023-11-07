import styled from 'styled-components';

export const ChatWindow = styled.div`
  position: fixed;
  float: right;
  bottom: 40px;
  right: 140px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  z-index: 50;
  overflow: hidden;
  width: 380px;
  height: 460px;
  background: white;
  padding: 0 7px;

  .chatheader {
    // 채팅 타이틀
    color: ${(props) => props.theme.colors.charcoal};
    height: 80px;
    line-height: 80px;
    text-align: center;
    position: relative;
    font-weight: bold;
    font-size: ${(props) => props.theme.font.sizem};

    button {
      position: absolute;
      right: 10px;
      top: 10px;
      background: transparent;
      width: 16px;
      height: 16px;
      line-height: 16px;
      color: ${(props) => props.theme.colors.grayborder};

      &:hover {
        color: ${(props) => props.theme.colors.graylight};
      }
    }
  }

  .chatwrite {
    // 채팅 입력 폼
    input {
      padding: 0 80px 0 12px;
      border: 1px solid ${(props) => props.theme.colors.grayborder};
      border-radius: 20px;
      flex: 1;
      height: 50px;
      width: 100%;
      font-size: ${(props) => props.theme.font.sizes};
    }

    form {
      display: flex;
      height: 60px;
      width: 100%;
      align-items: center;
      padding: 0 3px;
      position: relative;
    }

    button {
      width: 80px;
      height: 34px;
      line-height: 34px;
      position: absolute;
      right: 10px;
      color: #fff;
      background-color: ${(props) => props.theme.colors.navy};
      border-radius: 15px;
      font-size: ${(props) => props.theme.font.sizes};

      &:hover {
        background-color: ${(props) => props.theme.colors.navyhover};
      }
    }
  }

  .chatcontainer {
    // 채팅 메시지 영역 컨테이너
    overflow-y: auto;
    height: 315px;
    padding: 0 13px 10px;

    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: white;
      border-radius: 4px;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.colors.graylight};
    }

    &::-webkit-scrollbar-track {
      background-color: white;
    }
  }

  .messagewrap {
    // 각 메시지 영역
    max-width: 240px;
    border-radius: 10px;
    padding: 10px 15px;
    align-self: flex-end;
    background-color: #21201e;
    margin-top: 10px;
    color: #fff;
    font-size: ${(props) => props.theme.font.sizes};
    line-height: 1.4;
    word-break: break-all;

    &[data-isuser='false'] {
      align-self: flex-start;
      background-color: #f0f0f0;
      color: #21201e;
    }
  }

  .csicon {
    // 헤드셋 아이콘
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.gold};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
  }

  .chatwrap {
    display: flex;
    justify-content: flex-end;

    &[data-isuser='false'] {
      justify-content: flex-start;
    }
  }
`;
