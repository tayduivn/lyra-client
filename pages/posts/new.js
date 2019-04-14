import React from 'react';
import styled from '@emotion/styled';

import { Container } from '../../shared/library/components/layout';
import { PHONE } from '../../shared/style/breakpoints';
import SimpleButton from '../../shared/library/components/buttons/simple';
import { BASE_TEXT, TITLE_TEXT } from '../../shared/style/typography';
import Panel from '../../shared/library/containers/panel';

const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: 10
});

const StyledPanel = styled(Panel)({
  width: 510,
  boxSizing: 'border-box'
});

const Title = styled('h1')({
  ...TITLE_TEXT,
  fontSize: 26,
  margin: '30px 0 30px 0',
  display: 'flex'
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

const CowboyEmoji = styled('div')({
  marginLeft: 5,
  '&::after': {
    content: ''
  }
});

const NewPost = () => (
  <StyledContainer>
    <Title>
      Submit a post!<CowboyEmoji>🤠</CowboyEmoji>
    </Title>
    <StyledPanel>
      <Label>Link</Label>
      <Input type="text" />
      <SimpleButton>Next</SimpleButton>
    </StyledPanel>
  </StyledContainer>
);

export default NewPost;
