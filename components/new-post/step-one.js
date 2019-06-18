import React, { useContext } from 'react';
import { DispatchContext, StateContext } from './state/provider';
import { SET_LINK } from './state/actions';
import styled from '@emotion/styled';
import StyledButton from '../../shared/library/components/buttons/styled';
import { BASE_TEXT, TITLE_TEXT } from '../../shared/style/typography';
import { Router } from '../../routes';
import { Container } from '../../shared/library/components/layout';
import { Title } from '../../shared/library/components/typography';
import { NEW_POST_STEP_TWO } from '../../shared/constants/routes';
import Panel from '../../shared/library/containers/panel';

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

const Label = styled('div')({
  ...TITLE_TEXT,
  marginBottom: 10
});

const Input = styled('input')({
  ...BASE_TEXT,
  width: '100%',
  boxSizing: 'border-box',
  padding: 10,
  outline: 'none',
  borderRadius: 3,
  border: '1px solid #e8e8e8'
});

const SubmitButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const StepOne = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { link } = state;
  return (
    <StyledContainer>
      <Title>
        Submit a post!<CowboyEmoji>🤠</CowboyEmoji>
      </Title>
      <StyledPanel>
        <Label>Link</Label>
        <Input
          type="text"
          value={link}
          onInput={e => dispatch({ type: SET_LINK, value: e.target.value })}
        />
        <SubmitButtonWrapper>
          <StyledButton
            onClick={() => {
              Router.pushRoute(NEW_POST_STEP_TWO);
            }}
          >
            Next
          </StyledButton>
        </SubmitButtonWrapper>
      </StyledPanel>
    </StyledContainer>
  );
};

export default StepOne;
