import React, { Fragment, useContext, useState } from 'react';
import { DispatchContext, StateContext } from './state/provider';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { Query } from 'react-apollo';
import Spinner from '../../shared/library/components/progress-indicators/spinner';
import { uploadImage, normalizeTopics } from '../../shared/utils';
import arrayMove from 'array-move';
import { TOPICS_QUERY } from '../../data/queries';

import {
  StyledContainer,
  StyledTitle,
  StyledPanel,
  Content,
  Preview,
  selectStyles,
  ThumbnailDropTargetContainer,
  ThumbnailPlaceholder,
  StyledThumbnailPlaceholderIcon,
  StyledCircleCloseIcon,
  ThumbnailContainer,
  Thumbnail,
  NextButton,
  Actions,
  UploadWrapper,
  LoadingOverlay,
  TextButton,
  UploadDetails,
  StyledCircleDot,
  UploadActions,
  ActionDivider,
  UploadCriteria,
  GalleryThumbnailContainer,
  StepsContainer,
  SortableList
} from './components';

import {
  Input,
  InputWrapper,
  CharacterCounter,
  Label,
  LabelName,
  LabelQualifier,
  LabelDetail,
  Field
} from '../../shared/library/components/inputs';

import { NAME, TAGLINE, DESCRIPTION, FIELDS } from './constants';

import reducer from './state/reducer';
import initialState from './state/state';
import {
  SET_STEP,
  SET_GALLERY_THUMBS,
  SET_THUMBNAIL,
  UPLOADING_THUMBNAIL,
  UPLOADING_GALLERY_THUMB
} from './state/actions';

export const GALLERY_THUMBNAIL_SIZE = 50;
const DEFAULT_GALLERY_THUMB_PLACEHOLDERS = 3;
const STEPS = 3;

const renderField = (slug, dispatch, state) => {
  const {
    maxChars,
    label,
    required,
    placeholder,
    action,
    InputComponent,
    styles
  } = FIELDS[slug];
  return (
    <Field styles={styles}>
      <Label>
        <LabelName>
          {label}
          {required && <LabelQualifier> - Required</LabelQualifier>}
        </LabelName>
      </Label>
      <InputWrapper>
        <InputComponent
          onChange={e => dispatch({ type: action, value: e.target.value })}
          type="text"
          valid={state[`${slug}IsValid`]}
          placeholder={placeholder}
        />
        <CharacterCounter>{`${
          state[slug].length
        }/${maxChars}`}</CharacterCounter>
      </InputWrapper>
    </Field>
  );
};

const StepTwo = ({ client }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  console.log('state', state);
  console.log('dispatch', dispatch);
  const { step, link } = state;
  const [selectedTopics, setSelectedTopics] = useState([]);

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const [uploadingGalleryThumb, setUploadingGalleryThumb] = useState(false);

  const [galleryThumbs, setGalleryThumbs] = useState([]);

  const [thumbnail, setThumbnail] = useState(null);

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

  const galleryThumbPlaceholders = [];
  for (
    let j = 0;
    j <
    (galleryThumbs.length > DEFAULT_GALLERY_THUMB_PLACEHOLDERS
      ? 0
      : DEFAULT_GALLERY_THUMB_PLACEHOLDERS - galleryThumbs.length);
    j++
  ) {
    galleryThumbPlaceholders.push(
      <ThumbnailPlaceholder
        width={GALLERY_THUMBNAIL_SIZE}
        height={GALLERY_THUMBNAIL_SIZE}
      />
    );
  }

  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      setUploadingGalleryThumb(true);
      uploadImage(client, file, (result, filename) => {
        // const url = `https://s3.amazonaws.com/lyra-labs-development/${filename}`;
        let thumbs = galleryThumbs;
        thumbs.push(URL.createObjectURL(file));
        setGalleryThumbs(thumbs);
        setUploadingGalleryThumb(false);
      });
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
      setUploadingThumbnail(true);
      uploadImage(client, file, result => {
        setUploadingThumbnail(false);
        setThumbnail(file);
        console.log('Response from s3', result);
      });
    }
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setGalleryThumbs(arrayMove(galleryThumbs, oldIndex, newIndex));
  };

  return (
    <StyledContainer>
      {step === 1 && <StyledTitle>Tell us more about this post 😃</StyledTitle>}
      {step === 2 && (
        <StyledTitle>✨ Let’s make this product look nice</StyledTitle>
      )}
      <Content>
        <StyledPanel>
          {step === 1 && (
            <Fragment>
              {renderField(NAME, dispatch, state)}
              {renderField(TAGLINE, dispatch, state)}
              <Field>
                <Label>
                  <LabelName>Topics</LabelName>
                </Label>
                <Query query={TOPICS_QUERY}>
                  {({ loading, data: { topics } }) => (
                    <Fragment>
                      {!loading && (
                        <Select
                          styles={selectStyles}
                          value={selectedTopics}
                          openOnFocus={false}
                          isMulti={true}
                          noOptionsMessage={() => 'No topics found'}
                          onChange={selectedOption => {
                            setSelectedTopics(selectedOption);
                          }}
                          options={normalizeTopics(topics)}
                        />
                      )}
                    </Fragment>
                  )}
                </Query>
              </Field>
              <Field>
                <Label>
                  <LabelName>
                    Download link
                    <LabelQualifier> - App Store, Google Play…</LabelQualifier>
                  </LabelName>
                </Label>
                <InputWrapper>
                  <Input type="text" value={link} valid={true} disabled />
                </InputWrapper>
              </Field>
              <Field>
                <Label>
                  <LabelName>
                    Thumbnail
                    <LabelQualifier> - Required</LabelQualifier>
                  </LabelName>
                  <LabelDetail>Make it look nice and professional.</LabelDetail>
                </Label>
                <UploadWrapper>
                  {uploadingThumbnail && (
                    <LoadingOverlay>
                      <Spinner />
                    </LoadingOverlay>
                  )}
                  <ThumbnailDropTargetContainer uploading={uploadingThumbnail}>
                    {!thumbnail && (
                      <ThumbnailPlaceholder>
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <StyledThumbnailPlaceholderIcon />
                        </div>
                      </ThumbnailPlaceholder>
                    )}
                    {thumbnail && !uploadingThumbnail && (
                      <ThumbnailContainer>
                        <StyledCircleCloseIcon
                          onClick={() => setThumbnail(null)}
                        />
                        <Thumbnail src={thumbnail.preview} />
                      </ThumbnailContainer>
                    )}
                    <UploadDetails>
                      <UploadActions>
                        <TextButton
                          {...getRootProps({ className: 'dropzone' })}
                        >
                          Upload Image
                        </TextButton>
                        <ActionDivider>or</ActionDivider>
                        <TextButton>paste URL</TextButton>
                      </UploadActions>
                      <UploadCriteria>
                        Recommended size: 240x240
                        <br />
                        JPG, PNG, GIF. Max weight: 2MB
                      </UploadCriteria>
                    </UploadDetails>
                  </ThumbnailDropTargetContainer>
                </UploadWrapper>
              </Field>
              <Field>
                <Actions>
                  <NextButton
                    onClick={() => dispatch({ type: SET_STEP, value: 2 })}
                  >
                    Next
                  </NextButton>
                </Actions>
              </Field>
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
              <Field>
                <Label>
                  <LabelName>Gallery</LabelName>
                  <LabelDetail>Recommended size: 1270x760px.</LabelDetail>
                </Label>
                <UploadWrapper>
                  {uploadingGalleryThumb && (
                    <LoadingOverlay>
                      <Spinner />
                    </LoadingOverlay>
                  )}

                  <ThumbnailDropTargetContainer
                    width="100%"
                    uploading={uploadingGalleryThumb}
                  >
                    <ThumbnailPlaceholder maxWidth="100%" width="100%">
                      <div {...getGalleryRootProps({ className: 'dropzone' })}>
                        <input {...getGalleryInputProps()} />
                        <StyledThumbnailPlaceholderIcon />
                      </div>
                    </ThumbnailPlaceholder>
                  </ThumbnailDropTargetContainer>
                </UploadWrapper>
                <GalleryThumbnailContainer>
                  <SortableList
                    axis={'xy'}
                    items={galleryThumbs}
                    onSortEnd={onSortEnd}
                    onRemove={index => {
                      setGalleryThumbs([
                        ...galleryThumbs.slice(0, index),
                        ...galleryThumbs.slice(index + 1, galleryThumbs.length)
                      ]);
                    }}
                    distance={1}
                  />
                  {galleryThumbPlaceholders}
                </GalleryThumbnailContainer>
              </Field>
              {renderField(DESCRIPTION, dispatch, state)}
            </Fragment>
          )}
          <StepsContainer>{stepButtons}</StepsContainer>
        </StyledPanel>
        <Preview>Cool Bro</Preview>
      </Content>
    </StyledContainer>
  );
};

StepTwo.propTypes = {
  link: PropTypes.string
};

export default withApollo(StepTwo);
