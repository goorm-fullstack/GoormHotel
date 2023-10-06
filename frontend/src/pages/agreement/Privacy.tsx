import React from 'react';
import * as S from './Style';
import { PageTitle } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import PrivacyContents from '../../components/Agreement/PrivacyCon';

const Privacy = () => {
  return (
    <>
      <SubHeader kind="agreement" />
      <S.Container>
        <PageTitle>개인정보처리방침</PageTitle>
        <S.Section>
          <S.OuterDiv>
            <div style={{ padding: '1em' }}>
              <PrivacyContents />
            </div>
          </S.OuterDiv>
        </S.Section>
      </S.Container>
    </>
  );
};

export default Privacy;
