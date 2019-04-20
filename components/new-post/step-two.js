import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import { DETROIT } from '../../shared/style/colors';
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

const Field = styled('div')({
  marginBottom: 20
});

const Label = styled('div')({
  marginBotton: 10,
  display: 'flex'
});

const LabelName = styled('span')({
  ...BASE_TEXT,
  fontWeight: WEIGHT.ULTRA_BOLD,
  lineHeight: '20px'
});

const LabelQualifier = styled('span')({
  fontWeight: WEIGHT.NORMAL,
  color: DETROIT
});

const StepTwo = ({ link }) => {
  return (
    <StyledContainer>
      <Title>Tell us more about this post 😃</Title>
      <Content>
        <StyledPanel>
          <Field>
            <Label>
              <LabelName>
                Name of the product<LabelQualifier> - Required</LabelQualifier>
              </LabelName>
            </Label>
          </Field>
        </StyledPanel>
        <Preview>Cool Bro</Preview>
      </Content>
    </StyledContainer>
  );
};

StepTwo.propTypes = {
  link: PropTypes.string
};

export default StepTwo;
