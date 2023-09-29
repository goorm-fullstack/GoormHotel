import React from 'react';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { commonContainerStyle, PageTitle } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import AgreementContents from '../../components/Agreement/AgreementCon';

const Container = styled(commonContainerStyle)``;

const Section = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  background: ${(props) => props.theme.colors.graybg};
  padding: 40px;
`;

const OuterDiv = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  padding: 40px;
  line-height: 1.8;
`;

const Agreement = () => {
  return (
    <>
      <SubHeader kind="agreement" />
      <Container>
        <PageTitle>이용약관</PageTitle>
        <Section>
          <OuterDiv>
            <p style={{ padding: '1em' }}>
              <AgreementContents />
            </p>
          </OuterDiv>
        </Section>
      </Container>
    </>
  );
};

export default Agreement;
