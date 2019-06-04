import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import styled from '@emotion/styled';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { Query } from 'react-apollo';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import { TABLET } from '../../shared/style/breakpoints';
import ThumbnailPlaceholderIcon from '../../shared/style/icons/thumbnail-placeholder.svg';
import CircleCloseIcon from '../../shared/style/icons/circle-close.svg';
import CircleDot from '../../shared/style/icons/circle-dot.svg';
import {
  DETROIT,
  WHITE,
  ALABASTER,
  LILAC,
  POWDER_BLUE,
  BLUSH,
  LAVENDER,
  FOCUS_LAVENDER
} from '../../shared/style/colors';
import { Container } from '../../shared/library/components/layout';
import { Title } from '../../shared/library/components/typography';
import Panel from '../../shared/library/containers/panel';
import StyledButton from '../../shared/library/components/buttons/styled';
import Spinner from '../../shared/library/components/progress-indicators/spinner';
import { uploadImage } from '../../shared/utils';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import GalleryThumbComponent from './gallery-thumbnail';
import RichEditor from '../rich-editor';

import { TOPICS_QUERY } from '../../data/queries';

const THUMBNAIL_SIZE = 80;
const GALLERY_THUMBNAIL_SIZE = 50;
const DEFAULT_GALLERY_THUMB_PLACEHOLDERS = 3;
const STEPS = 3;

const StyledContainer = styled(Container)({
  flexDirection: 'column',
  [TABLET]: {
    padding: '0 10px 0 10px'
  }
});

const StyledTitle = styled(Title)({
  [TABLET]: {
    justifyContent: 'center'
  }
});

const StyledPanel = styled(Panel)({
  flex: 1
});

const Content = styled('div')({
  display: 'flex'
});

const Preview = styled('div')({
  flex: 1,
  [TABLET]: {
    display: 'none'
  }
});

const Field = styled('div')({
  marginBottom: 20
});

const InputWrapper = styled('div')({
  position: 'relative'
});

const Input = styled('input')(
  {
    ...BASE_TEXT,
    outline: 'none',
    padding: 10,
    paddingRight: 50,
    borderRadius: 3,
    boxSizing: 'border-box',
    border: '1px solid',
    height: 35,
    width: '100%',
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: ALABASTER
    }
  },
  ({ valid }) => ({
    borderColor: valid ? LILAC : BLUSH,
    '&:hover': {
      borderColor: valid ? POWDER_BLUE : BLUSH
    }
  })
);

const RichEditorWrapper = styled('div')(
  {
    ' > div': {
      border: '1px solid',
      padding: 10,
      minHeight: 93
    }
  },
  ({ valid }) => ({
    ' > div': {
      borderColor: valid ? LILAC : BLUSH,
      '&:hover': {
        borderColor: valid ? POWDER_BLUE : BLUSH
      }
    }
  })
);

const CharacterCounter = styled('span')({
  ...BASE_TEXT,
  fontSize: 11,
  color: DETROIT,
  position: 'absolute',
  bottom: 1,
  right: 2,
  padding: '0 2px',
  borderRadius: '3px 0 0 0',
  lineHeight: '16px'
});

const Label = styled('div')({
  marginBottom: 10,
  display: 'flex',
  flexDirection: 'column'
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

const INPUT_CHANGE = 'input-change';

const normalizeTopics = topics => {
  return topics.map(({ name, slug }) => ({
    value: slug,
    label: name
  }));
};

const selectStyles = {
  indicatorsContainer: provided => {
    return { display: 'none' };
  },
  placeholder: provided => ({
    ...provided,
    ...BASE_TEXT
  }),
  multiValue: provided => ({
    ...provided,
    ...BASE_TEXT
  }),
  option: provided => ({
    ...provided,
    ...BASE_TEXT,
    cursor: 'pointer',
    backgroundColor: WHITE,
    '&:hover': {
      backgroundColor: LILAC
    }
  }),
  menu: provided => ({
    ...provided,
    width: 'auto',
    ' > div': {
      padding: 0
    }
  }),
  control: provided => {
    return {
      ...provided,
      borderRadius: 3,
      borderColor: LILAC,
      boxShadow: 'none',
      '&:hover': {
        borderColor: POWDER_BLUE
      },
      ' > div:first-of-type': {}
    };
  }
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const ThumbnailDropTargetContainer = styled('div')(
  {
    display: 'flex',
    ' > div': {
      '&:focus': {
        outline: 'none'
      }
    }
  },
  ({ uploading = false }) => ({
    opacity: uploading ? 0.5 : 1
  })
);

const ThumbnailPlaceholder = styled('div')(
  {
    maxHeight: THUMBNAIL_SIZE,
    maxWidth: THUMBNAIL_SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px dashed ${LILAC}`,
    ' > div': {
      '&:focus': {
        outline: 'none'
      }
    }
  },
  ({
    width = THUMBNAIL_SIZE,
    height = THUMBNAIL_SIZE,
    maxWidth = THUMBNAIL_SIZE
  }) => ({
    width,
    height,
    maxWidth
  })
);

const StyledThumbnailPlaceholderIcon = styled(ThumbnailPlaceholderIcon)({
  cursor: 'pointer',
  '&:focus': {
    outline: 'none'
  },
  '&:hover': {
    opacity: 0.5
  }
});

export const StyledCircleCloseIcon = styled(CircleCloseIcon)({
  cursor: 'pointer',
  position: 'absolute',
  top: -7,
  right: -7
});

const ThumbnailContainer = styled('div')({
  position: 'relative',
  height: THUMBNAIL_SIZE,
  width: THUMBNAIL_SIZE,
  [StyledCircleCloseIcon]: {
    display: 'none'
  },
  '&:hover': {
    [StyledCircleCloseIcon]: {
      display: 'block'
    }
  }
});

const Thumbnail = styled('img')({
  borderRadius: 3,
  width: THUMBNAIL_SIZE,
  height: THUMBNAIL_SIZE
});

export const GalleryThumbnailWrapper = styled('div')({
  position: 'relative',
  marginTop: 10,
  marginRight: 10,
  [StyledCircleCloseIcon]: {
    display: 'none'
  },
  '&:hover': {
    [StyledCircleCloseIcon]: {
      display: 'block'
    }
  }
});

export const GalleryThumbnail = styled('img')({
  width: GALLERY_THUMBNAIL_SIZE,
  height: GALLERY_THUMBNAIL_SIZE,
  borderRadius: 3
});

const Actions = styled('div')({
  display: 'flex'
});

const NextButton = styled(StyledButton)({
  marginLeft: 'auto'
});

const UploadWrapper = styled('div')({
  position: 'relative'
});

const LoadingOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const TextButton = styled('button')({
  ...BASE_TEXT,
  fontWeight: WEIGHT.BOLD,
  color: FOCUS_LAVENDER,
  cursor: 'pointer',
  border: 'none',
  background: '0 0',
  padding: 0,
  '&:hover': {
    textDecoration: 'underline'
  }
});

const UploadDetails = styled('div')({
  marginLeft: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

const UploadActions = styled('div')({
  display: 'flex'
});

const ActionDivider = styled('div')({
  ...BASE_TEXT,
  color: DETROIT,
  marginLeft: 5,
  marginRight: 5
});

const UploadCriteria = styled('div')({
  ...BASE_TEXT,
  color: DETROIT
});

const StyledCircleDot = styled(CircleDot)(
  {
    marginRight: 10
  },
  ({ disabled = true }) => ({
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1
  })
);

const LabelDetail = styled('div')({
  ...BASE_TEXT,
  color: DETROIT
});

const GalleryThumbnailContainer = styled('div')({
  display: 'flex',
  marginTop: 10,
  ' > ul': {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap'
  },
  ' > div': {
    marginTop: 10,
    marginRight: 10
  }
});

const StepsContainer = styled('div')({});

const addGalleryThumb = url => {
  let thumbs = galleryThumbs;
  thumbs.push(url);
  setGalleryThumbs(thumbs);
};

const SortableItem = SortableElement(({ value, onRemove, index }) => (
  <GalleryThumbComponent url={value} index={index} onRemove={onRemove} />
));

const SortableList = SortableContainer(({ items, onRemove }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          onRemove={onRemove}
          index={index}
          value={value}
        />
      ))}
    </ul>
  );
});

const StepTwo = ({ link, client }) => {
  const nameMaxCharacters = 40;
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);

  const taglineMaxCharacters = 60;
  const [tagline, setTagline] = useState('');
  const [taglineIsValid, setTaglineIsValid] = useState(true);

  const descriptionMaxCharacters = 260;
  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);

  const [selectedTopics, setSelectedTopics] = useState([]);

  const [step, setStep] = useState(1);

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
            setStep(i + 1);
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
              <Field>
                <Label>
                  <LabelName>
                    Name of the product
                    <LabelQualifier> - Required</LabelQualifier>
                  </LabelName>
                </Label>
                <InputWrapper>
                  <Input
                    onChange={e => {
                      const { value } = e.target;
                      setName(value);
                      if (value.length > nameMaxCharacters) {
                        setNameIsValid(false);
                      } else {
                        setNameIsValid(true);
                      }
                    }}
                    type="text"
                    valid={nameIsValid}
                    placeholder="Simply the name of the product"
                  />
                  <CharacterCounter>{`${
                    name.length
                  }/${nameMaxCharacters}`}</CharacterCounter>
                </InputWrapper>
              </Field>
              <Field>
                <Label>
                  <LabelName>
                    Tagline<LabelQualifier> - Required</LabelQualifier>
                  </LabelName>
                </Label>
                <InputWrapper>
                  <Input
                    onChange={e => {
                      const { value } = e.target;
                      setTagline(value);
                      if (value.length > taglineMaxCharacters) {
                        setTaglineIsValid(false);
                      } else {
                        setTaglineIsValid(true);
                      }
                    }}
                    type="text"
                    valid={taglineIsValid}
                    placeholder="Concise and descriptive tagline for the product"
                  />
                  <CharacterCounter>{`${
                    tagline.length
                  }/${taglineMaxCharacters}`}</CharacterCounter>
                </InputWrapper>
              </Field>
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
                          // menuIsOpen={true}
                          noOptionsMessage={() => 'No topics found'}
                          // onBlur={() => setMenuOpen(false)}
                          onChange={selectedOption => {
                            setSelectedTopics(selectedOption);
                          }}
                          onInputChange={(query, { action }) => {
                            // if (action === INPUT_CHANGE) {
                            //   setMenuOpen(true);
                            // }
                          }}
                          // options={options}
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
                  <NextButton onClick={() => setStep(2)}>Next</NextButton>
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
              <Field>
                <Label>
                  <LabelName>
                    Description
                    <LabelQualifier> - Required</LabelQualifier>
                  </LabelName>
                </Label>
                <InputWrapper>
                  <RichEditorWrapper valid={true}>
                    <RichEditor placeholder={'COOL BRO PLACEHOLDA!!!'} />
                  </RichEditorWrapper>
                  <CharacterCounter>{`${
                    description.length
                  }/${descriptionMaxCharacters}`}</CharacterCounter>
                </InputWrapper>
              </Field>
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
