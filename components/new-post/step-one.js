import React, { useContext } from 'react';
import { StateContext } from './state/provider';
import styled from '@emotion/styled';
import { Router } from '../../routes';
import { Container } from '../../shared/library/components/layout';
import { Title } from '../../shared/library/components/typography';
import { NEW_POST_STEP_TWO } from '../../shared/constants/routes';
import Panel from '../../shared/library/containers/panel';
import { LINK } from './constants';

import { ActionButton } from './components';

import { renderField } from './utils';

const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: 10
});

const StyledPanel = styled(Panel)({
  maxWidth: 510,
  width: '100%',
  boxSizing: 'border-box'
});

const CowboyEmoji = styled('div')({
  marginLeft: 5,
  '&::after': {
    content: ''
  }
});

const SubmitButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const StepOne = () => {
  const state = useContext(StateContext);
  const { link, linkIsValid } = state;
  const isDisabled = link.length === 0 || !linkIsValid;
  return (
    <StyledContainer>
      <Title>
        Submit a post!<CowboyEmoji>🤠</CowboyEmoji>
      </Title>
      <StyledPanel>
        {renderField(LINK)}
        <SubmitButtonWrapper>
          <ActionButton
            disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) {
                Router.pushRoute(NEW_POST_STEP_TWO);
              }
            }}
          >
            Next
          </ActionButton>
        </SubmitButtonWrapper>
      </StyledPanel>
    </StyledContainer>
  );
};

export default StepOne;
