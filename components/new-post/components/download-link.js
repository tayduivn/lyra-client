import React, { useContext } from 'react';

import { StateContext } from '../state/provider';

import {
  Input,
  InputWrapper,
  Label,
  LabelName,
  LabelQualifier,
  Field
} from '../../../shared/library/components/inputs';

const DownloadLink = () => {
  const state = useContext(StateContext);
  const { link } = state;
  return (
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
  );
};

export default DownloadLink;
