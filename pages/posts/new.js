import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { Router } from '../../routes';
import { Container } from '../../shared/library/components/layout';
import { LAVENDER, FOCUS_LAVENDER, WHITE } from '../../shared/style/colors';
import SimpleButton from '../../shared/library/components/buttons/simple';
import { BASE_TEXT, TITLE_TEXT, WEIGHT } from '../../shared/style/typography';
import Panel from '../../shared/library/containers/panel';
import { NEW_POST, NEW_POST_SUBMISSION } from '../../shared/constants/routes';

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

const NewPost = () => {
  const { router } = Router;
  const route = router.asPath;

  return (
    <StyledContainer>
      <Title>
        {route === NEW_POST ? (
          <Fragment>
            Submit a post!<CowboyEmoji>🤠</CowboyEmoji>
          </Fragment>
        ) : (
          'cool boys'
        )}
      </Title>
      <StyledPanel>
        <Label>Link</Label>
        <Input type="text" />
        <SubmitButtonWrapper>
          <SubmitButton
            onClick={() => {
              Router.pushRoute('/posts/new/submission');
            }}
          >
            Next
          </SubmitButton>
        </SubmitButtonWrapper>
      </StyledPanel>
    </StyledContainer>
  );
};

export default NewPost;
