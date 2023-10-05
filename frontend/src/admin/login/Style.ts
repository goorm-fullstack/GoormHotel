import styled from 'styled-components';
import { AdminHeader } from '../common/Style';
import { commonAdminContainer } from '../../Style/commonStyles';

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.graybg};
  text-align: center;
`;

export const AdminContainer = styled(commonAdminContainer)`
  width: 400px;
  padding-top: calc(100px + 20vh);

  h2 {
    margin-bottom: 40px;
  }

  form {
    margin-bottom: 10px;

    input {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      padding-left: 12px;
    }
  }
`;

export const Header = styled(AdminHeader)``;

export const ShareID = styled.div`
  line-height: 1.6;
  padding: 20px;
  margin-top: 40px;
  color: ${(props) => props.theme.colors.graylight};
`;
