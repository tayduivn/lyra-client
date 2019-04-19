import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SimpleButton from '../../shared/library/components/buttons/simple';
import { BASE_TEXT, TITLE_TEXT, WEIGHT } from '../../shared/style/typography';
import { LAVENDER, FOCUS_LAVENDER, WHITE } from '../../shared/style/colors';
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

const SubmitButton = styled(SimpleButton)({
  marginTop: 10,
  borderColor: LAVENDER,
  backgroundColor: LAVENDER,
  color: WHITE,
  fontWeight: WEIGHT.BOLD,
  '&:hover': {
    backgroundColor: FOCUS_LAVENDER,
    borderColor: FOCUS_LAVENDER
  }
});

const SubmitButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const StepOne = ({ setLinkCallback }) => {
  const [link, setLink] = useState(''); // '' is the initial state value
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
          onInput={e => setLink(e.target.value)}
        />
        <SubmitButtonWrapper>
          <SubmitButton
            onClick={() => {
              setLinkCallback(link);
              Router.pushRoute(NEW_POST_STEP_TWO);
            }}
          >
            Next
          </SubmitButton>
        </SubmitButtonWrapper>
      </StyledPanel>
    </StyledContainer>
  );
};

StepOne.propTypes = {
  setLinkCallback: PropTypes.func
};

export default StepOne;
