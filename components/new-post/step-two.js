import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Container } from '../../shared/library/components/layout';
import { Title } from '../../shared/library/components/typography';
import Panel from '../../shared/library/containers/panel';

const StyledContainer = styled(Container)({
  flexDirection: 'column'
});

const StyledPanel = styled(Panel)({
  flex: 1
});

const Content = styled('div')({
  display: 'flex'
});

const Preview = styled('div')({
  flex: 1
});

const StepTwo = ({ link }) => {
  return (
    <StyledContainer>
      <Title>Tell us more about this post 😃</Title>
      <Content>
        <StyledPanel>{link}</StyledPanel>
        <Preview>Cool Bro</Preview>
      </Content>
    </StyledContainer>
  );
};

StepTwo.propTypes = {
  link: PropTypes.string
};

export default StepTwo;
