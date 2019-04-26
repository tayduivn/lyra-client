import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Select from 'react-select';
import { Query } from 'react-apollo';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import {
  DETROIT,
  WHITE,
  ALABASTER,
  LILAC,
  POWDER_BLUE,
  BLUSH
} from '../../shared/style/colors';
import { Container } from '../../shared/library/components/layout';
import { Title } from '../../shared/library/components/typography';
import Panel from '../../shared/library/containers/panel';

import { TOPICS_QUERY } from '../../data/queries';

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

const StepTwo = ({ link }) => {
  const nameMaxCharacters = 40;
  const descriptionMaxCharacters = 60;
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);

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
        </StyledPanel>
        {/* <Preview>Cool Bro</Preview> */}
      </Content>
    </StyledContainer>
  );
};

StepTwo.propTypes = {
  link: PropTypes.string
};

export default StepTwo;
