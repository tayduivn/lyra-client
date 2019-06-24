import React, { useContext } from 'react';
import { DispatchContext, StateContext } from './state/provider';

import {
  InputWrapper,
  CharacterCounter,
  Label,
  LabelName,
  LabelQualifier,
  Field
} from '../../shared/library/components/inputs';

import { FIELDS } from './constants';

export const renderField = slug => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
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
        {maxChars && (
          <CharacterCounter>{`${
            state[slug].length
          }/${maxChars}`}</CharacterCounter>
        )}
      </InputWrapper>
    </Field>
  );
};
