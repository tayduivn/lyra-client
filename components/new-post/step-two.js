/** @jsx jsx */ import { jsx } from '@emotion/core';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withApollo } from 'react-apollo';
import { DispatchContext, StateContext } from './state/provider';

import { CREATE_POST } from '../../data/mutations';

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
  Actions,
  StyledCircleDot,
  StepsContainer,
  ActionButton
} from './components';

const StyledActionButton = styled(ActionButton)({
  marginLeft: 'auto'
});

import { Field } from '../../shared/library/components/inputs';

import { NAME, TAGLINE, DESCRIPTION } from './constants';
import { SET_STEP } from './state/actions';

const STEPS = 2;

const StepTwo = ({ client }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const {
    step,
    nameIsValid,
    taglineIsValid,
    descriptionIsValid,
    description,
    thumbnail
  } = state;

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
  const stepTwoIsValid = descriptionIsValid && description.length > 0;

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
                <StyledActionButton
                  disabled={!stepOneIsValid}
                  onClick={() => dispatch({ type: SET_STEP, value: 2 })}
                >
                  Next
                </StyledActionButton>
              </Actions>
            </Field>
          </div>
          <div css={{ display: step === 2 ? 'block' : 'none' }}>
            <Gallery />
            {renderField(DESCRIPTION)}
            <Field>
              <Actions>
                <StyledActionButton
                  disabled={!stepTwoIsValid}
                  onClick={() => {
                    console.log('submitting!!!', client);
                    client
                      .mutate({
                        mutation: CREATE_POST,
                        variables: {
                          link: 'lorem ipsum',
                          name: 'lorem ipsum',
                          tagline: 'lorem ipsum',
                          description: 'lorem ipsum',
                          thumbnail: 'lorem ipsum'
                        }
                      })
                      .then(({ data }) => {
                        console.log('data', data);
                      })
                      // eslint-disable-next-line no-unused-vars
                      .catch(err => {
                        console.log('ERR', err);
                      });
                  }}
                >
                  Submit!
                </StyledActionButton>
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

StepTwo.propTypes = {
  client: PropTypes.any
};

export default withApollo(StepTwo);
