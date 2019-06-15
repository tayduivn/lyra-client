import {
  NAME_MAX_CHARS,
  TAGLINE_MAX_CHARS,
  DESCRIPTION_MAX_CHARS
} from './constants';

export const SET_NAME = 'set-name';
export const SET_TAGLINE = 'set-tagline';
export const SET_DESCRIPTION = 'set-description';
export const SET_SELECTED_TOPICS = 'set-selected-topics';
export const SET_STEP = 'set-step';
export const SET_GALLERY_THUMBS = 'set-gallery-thumbs';
export const SET_THUMBNAIL = 'set-thumbnail';

export const initialState = {
  name: '',
  nameIsValid: true,
  tagline: '',
  taglineIsValid: true,
  description: '',
  descriptionIsValid: true,
  selectedTopics: [],
  step: 1,
  galleryThumbs: [],
  thumbnail: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_NAME: {
      let { value } = action;
      return {
        ...state,
        name: value,
        nameIsValid: value.length <= NAME_MAX_CHARS
      };
    }
    case SET_TAGLINE: {
      let { value } = action;
      return {
        ...state,
        tagline: value,
        taglineIsValid: value.length <= TAGLINE_MAX_CHARS
      };
    }
    case SET_DESCRIPTION: {
      let { value } = action;
      return {
        ...state,
        description: value,
        descriptionIsValid: value.length <= DESCRIPTION_MAX_CHARS
      };
    }
    case SET_STEP: {
      return {
        ...state,
        step: action.value
      };
    }
    case SET_GALLERY_THUMBS: {
      return {
        ...state
      };
    }
    case SET_THUMBNAIL: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};
