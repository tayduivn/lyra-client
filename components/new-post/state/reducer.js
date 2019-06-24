import { FIELDS } from '../constants';

import { isValidUrl } from '../../../shared/utils';

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
        nameIsValid: value.length <= FIELDS.name.maxChars
      };
    }
    case SET_TAGLINE: {
      let { value } = action;
      return {
        ...state,
        tagline: value,
        taglineIsValid: value.length <= FIELDS.tagline.maxChars
      };
    }
    case SET_DESCRIPTION: {
      let { value } = action;
      return {
        ...state,
        description: value,
        descriptionIsValid: value.length <= FIELDS.description.maxChars
      };
    }
    case SET_STEP: {
      return {
        ...state,
        step: action.value
      };
    }
    case SET_LINK: {
      let { value } = action;
      return {
        ...state,
        link: value,
        linkIsValid: value.length === 0 ? true : isValidUrl(value)
      };
    }
    case SET_SELECTED_TOPICS: {
      return {
        ...state,
        selectedTopics: action.value
      };
    }
    case SET_GALLERY_THUMBS: {
      return {
        ...state,
        galleryThumbs: action.value
      };
    }
    case SET_THUMBNAIL: {
      return {
        ...state,
        thumbnail: action.value
      };
    }
    case UPLOADING_THUMBNAIL: {
      return {
        ...state,
        uploadingThumbnail: action.value
      };
    }
    case UPLOADING_GALLERY_THUMB: {
      return {
        ...state,
        uploadingGalleryThumb: action.value
      };
    }
    default:
      return state;
  }
};

export default reducer;
