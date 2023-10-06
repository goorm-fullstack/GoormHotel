import React from 'react';
import * as S from './Style';
import { PageTitle } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import AgreementContents from '../../components/Agreement/AgreementCon';

const Agreement = () => {
  return (
    <>
      <SubHeader kind="agreement" />
      <S.Container>
        <PageTitle>이용약관</PageTitle>
        <S.Section>
          <S.OuterDiv>
            <div style={{ padding: '1em' }}>
              <AgreementContents />
            </div>
          </S.OuterDiv>
        </S.Section>
      </S.Container>
    </>
  );
};

export default Agreement;
