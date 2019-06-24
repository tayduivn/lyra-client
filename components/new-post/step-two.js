/** @jsx jsx */ import { jsx } from '@emotion/core';
import React, { useContext } from 'react';
import { DispatchContext, StateContext } from './state/provider';

import Topics from './components/topics';
import DownloadLink from './components/download-link';
import UploadThumbnail from './components/upload-thumbnail';
import Gallery from './components/gallery';

import { renderField } from './utils';

import {
  StyledContainer,
  StyledTitle,
  StyledPanel,
  Content,
  Preview,
  NextButton,
  Actions,
  StyledCircleDot,
  StepsContainer
} from './components';

import { Field } from '../../shared/library/components/inputs';

import { NAME, TAGLINE, DESCRIPTION } from './constants';
import { SET_STEP } from './state/actions';

const STEPS = 2;

const StepTwo = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { step, nameIsValid, taglineIsValid, thumbnail } = state;

  const stepButtons = [];
  for (let i = 0; i < STEPS; i++) {
    const isDisabled = i + 2 > step;
    stepButtons.push(
      <StyledCircleDot
        onClick={() => {
          if (!isDisabled) {
            dispatch({ type: SET_STEP, value: i + 1 });
          }
        }}
        disabled={isDisabled}
      />
    );
  }

  const stepOneIsValid = nameIsValid && taglineIsValid && thumbnail != null;

  return (
    <StyledContainer>
      {step === 1 && <StyledTitle>Tell us more about this post 😃</StyledTitle>}
      {step === 2 && (
        <StyledTitle>✨ Let’s make this product look nice</StyledTitle>
      )}
      <Content>
        <StyledPanel>
          <div css={{ display: step === 1 ? 'block' : 'none' }}>
            {renderField(NAME)}
            {renderField(TAGLINE)}
            <Topics />
            <DownloadLink />
            <UploadThumbnail />
            <Field>
              <Actions>
                <NextButton
                  disabled={!stepOneIsValid}
                  onClick={() => dispatch({ type: SET_STEP, value: 2 })}
                >
                  Next
                </NextButton>
              </Actions>
            </Field>
          </div>
          <div css={{ display: step === 2 ? 'block' : 'none' }}>
            <Gallery />
            {renderField(DESCRIPTION)}
            <Field>
              <Actions>
                <NextButton
                  disabled={false}
                  onClick={() => console.log('submitting!!!')}
                >
                  Submit!
                </NextButton>
              </Actions>
            </Field>
          </div>
          <StepsContainer>{stepButtons}</StepsContainer>
        </StyledPanel>
        <Preview>Cool Bro</Preview>
      </Content>
    </StyledContainer>
  );
};

export default StepTwo;
