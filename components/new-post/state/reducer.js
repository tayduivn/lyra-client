import {
  NAME_MAX_CHARS,
  TAGLINE_MAX_CHARS,
  DESCRIPTION_MAX_CHARS
} from '../constants';

import {
  SET_NAME,
  SET_LINK,
  SET_TAGLINE,
  SET_DESCRIPTION,
  SET_SELECTED_TOPICS,
  SET_STEP,
  SET_GALLERY_THUMBS,
  SET_THUMBNAIL,
  UPLOADING_THUMBNAIL,
  UPLOADING_GALLERY_THUMB
} from './actions';

const reducer = (state, action) => {
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
    case SET_LINK: {
      return {
        ...state,
        link: action.value
      };
    }
    case SET_SELECTED_TOPICS: {
      return {
        ...state
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
    case UPLOADING_THUMBNAIL: {
      return {
        ...state
      };
    }
    case UPLOADING_GALLERY_THUMB: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default reducer;
