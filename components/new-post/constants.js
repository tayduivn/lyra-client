export const NAME = 'name';
export const TAGLINE = 'tagline';
export const DESCRIPTION = 'description';

import { Input, Textarea } from '../../shared/library/components/inputs';

import { SET_NAME, SET_TAGLINE, SET_DESCRIPTION } from './reducer';

export const FIELDS = {
  [NAME]: {
    maxChars: 40,
    label: 'Name of the product',
    required: true,
    placeholder: 'Simply the name of the product',
    action: SET_NAME,
    InputComponent: Input
  },
  [TAGLINE]: {
    maxChars: 60,
    label: 'Tagline',
    required: true,
    placeholder: 'Concise and descriptive tagline for the product',
    action: SET_TAGLINE,
    InputComponent: Input
  },
  [DESCRIPTION]: {
    maxChars: 260,
    label: 'Description',
    required: true,
    placeholder: 'Enter a brief description here...',
    action: SET_DESCRIPTION,
    InputComponent: Textarea,
    styles: {
      ' > div:last-of-type > span ': {
        bottom: 4,
        right: 2
      }
    }
  }
};
