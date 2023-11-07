import styled from 'styled-components';
import { commonAdminContents, commonTable } from '../../Style/commonStyles';

export const Section = styled.section`
  margin-bottom: 60px;
`;

export const InputWrapper = styled.div`
  width: 100%;

  form {
    display: flex;
    column-gap: 10px;

    input {
      padding: 0 12px;
    }

    input,
    button {
      width: 17%;
    }
  }

  &.giftcard {
    form input {
      width: calc((100% - 17%) / 3);
    }
  }
`;

export const Container = styled(commonAdminContents)``;

export const Table = styled(commonTable)``;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-top: -14px;

  strong {
    color: ${(props) => props.theme.colors.goldhover};
  }

  &.detail {
    margin-top: -56px;
  }

  &.right {
    justify-content: flex-end;
  }
`;
