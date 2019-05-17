import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withApollo } from 'react-apollo';
import styled from '@emotion/styled';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { Query } from 'react-apollo';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import { TABLET } from '../../shared/style/breakpoints';
import ThumbnailPlaceholderIcon from '../../shared/style/icons/thumbnail-placeholder.svg';
import {
  DETROIT,
  WHITE,
  ALABASTER,
  LILAC,
  POWDER_BLUE,
  BLUSH
} from '../../shared/style/colors';
import { SIGN_UPLOAD } from '../../data/mutations';
import { Container } from '../../shared/library/components/layout';
import { Title } from '../../shared/library/components/typography';
import Panel from '../../shared/library/containers/panel';
import StyledButton from '../../shared/library/components/buttons/styled';

import { TOPICS_QUERY } from '../../data/queries';

const THUMBNAIL_SIZE = 80;

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

const ThumbnailDropTargetContainer = styled('div')({
  height: THUMBNAIL_SIZE,
  width: THUMBNAIL_SIZE,
  borderRadius: 3,
  ' > div': {
    '&:focus': {
      outline: 'none'
    }
  }
});

const ThumbnailPlaceholder = styled('div')({
  height: THUMBNAIL_SIZE,
  width: THUMBNAIL_SIZE,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px dashed ${LILAC}`,
  ' > div': {
    '&:focus': {
      outline: 'none'
    }
  }
});

const StyledThumbnailPlaceholderIcon = styled(ThumbnailPlaceholderIcon)({
  cursor: 'pointer',
  '&:focus': {
    outline: 'none'
  },
  '&:hover': {
    opacity: 0.5
  }
});

const ThumbnailContainer = styled('div')({
  height: THUMBNAIL_SIZE,
  width: THUMBNAIL_SIZE
});

const Thumbnail = styled('img')({
  maxWidth: THUMBNAIL_SIZE,
  maxHeight: THUMBNAIL_SIZE
});

const Actions = styled('div')({
  display: 'flex'
});

const NextButton = styled(StyledButton)({
  marginLeft: 'auto'
});

const uploadImage = (client, file) => {};

const StepTwo = ({ link, client }) => {
  const nameMaxCharacters = 40;
  const descriptionMaxCharacters = 60;
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [screen, setScreen] = useState(1);

  const [files, setFiles] = useState([]);

  const [thumbnail, setThumbnail] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
      setThumbnail(file);
      client
        .mutate({
          mutation: SIGN_UPLOAD,
          variables: { fileName: file.name, fileType: file.type }
        })
        .then(({ data: { signUpload } }) => {
          // url
          // const { signedRequest } = signUpload;
          const options = {
            headers: {
              'Content-Type': file.type,
              'x-amz-acl': 'public-read'
            }
          };
          console.log('cool test test', signUpload);
          console.log('access url', signUpload.url);
          axios
            .put(signUpload.signedRequest, file, options)
            .then(result => {
              console.log('Response from s3', result);
              // this.setState({ success: true });
            })
            .catch(error => {
              alert('ERROR ' + JSON.stringify(error));
            });
          // console.log('data from signed upload', data);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          console.log('ERR', err);
        });
    }
  });

  return (
    <StyledContainer>
      {screen === 1 && (
        <Fragment>
          <StyledTitle>Tell us more about this post 😃</StyledTitle>
          <Content>
            <StyledPanel>
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
                      setDescription(value);
                      if (value.length > descriptionMaxCharacters) {
                        setDescriptionIsValid(false);
                      } else {
                        setDescriptionIsValid(true);
                      }
                    }}
                    type="text"
                    valid={descriptionIsValid}
                    placeholder="Concise and descriptive tagline for the product"
                  />
                  <CharacterCounter>{`${
                    description.length
                  }/${descriptionMaxCharacters}`}</CharacterCounter>
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
                </Label>

                <ThumbnailDropTargetContainer>
                  {!thumbnail && (
                    <ThumbnailPlaceholder>
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <StyledThumbnailPlaceholderIcon />
                      </div>
                    </ThumbnailPlaceholder>
                  )}
                  {thumbnail && (
                    <ThumbnailContainer>
                      <Thumbnail src={thumbnail.preview} />
                    </ThumbnailContainer>
                  )}
                </ThumbnailDropTargetContainer>
              </Field>
              <Field>
                <Actions>
                  <NextButton onClick={() => setScreen(2)}>Next</NextButton>
                </Actions>
              </Field>
            </StyledPanel>
            <Preview>Cool Bro</Preview>
          </Content>
        </Fragment>
      )}
      {screen === 2 && (
        <Fragment>
          <StyledTitle>✨ Let’s make this product look nice</StyledTitle>
          <Content>
            <StyledPanel>
              <Field>
                <Label>
                  <LabelName>Gallery</LabelName>
                </Label>
                <ThumbnailDropTargetContainer>
                  {!thumbnail && (
                    <ThumbnailPlaceholder>
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <StyledThumbnailPlaceholderIcon />
                      </div>
                    </ThumbnailPlaceholder>
                  )}
                  {thumbnail && (
                    <ThumbnailContainer>
                      <Thumbnail src={thumbnail.preview} />
                    </ThumbnailContainer>
                  )}
                </ThumbnailDropTargetContainer>
              </Field>
            </StyledPanel>
            <Preview>Cool Bro</Preview>
          </Content>
        </Fragment>
      )}
    </StyledContainer>
  );
};

StepTwo.propTypes = {
  link: PropTypes.string
};

export default withApollo(StepTwo);
