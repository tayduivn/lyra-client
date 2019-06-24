import React from 'react';
import styled from '@emotion/styled';
import { Container } from '../../shared/library/components/layout';
import { Title } from '../../shared/library/components/typography';
import Panel from '../../shared/library/containers/panel';
import ThumbnailPlaceholderIcon from '../../shared/style/icons/thumbnail-placeholder.svg';
import CircleCloseIcon from '../../shared/style/icons/circle-close.svg';
import CircleDot from '../../shared/style/icons/circle-dot.svg';
import StyledButton from '../../shared/library/components/buttons/styled';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import { TABLET } from '../../shared/style/breakpoints';
import {
  LILAC,
  WHITE,
  POWDER_BLUE,
  FOCUS_LAVENDER,
  LAVENDER,
  DETROIT
} from '../../shared/style/colors';

const THUMBNAIL_SIZE = 80;
export const GALLERY_THUMBNAIL_SIZE = 50;

export const StyledContainer = styled(Container)({
  flexDirection: 'column',
  [TABLET]: {
    padding: '0 10px 0 10px'
  }
});

export const StyledTitle = styled(Title)({
  [TABLET]: {
    justifyContent: 'center'
  }
});

export const StyledPanel = styled(Panel)({
  flex: 1
});

export const Content = styled('div')({
  display: 'flex'
});

export const Preview = styled('div')({
  flex: 1,
  [TABLET]: {
    display: 'none'
  }
});

export const selectStyles = {
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

export const ThumbnailDropTargetContainer = styled('div')(
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

export const ThumbnailPlaceholder = styled('div')(
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

export const StyledThumbnailPlaceholderIcon = styled(ThumbnailPlaceholderIcon)({
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

export const ThumbnailContainer = styled('div')({
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

export const Thumbnail = styled('img')({
  borderRadius: 3,
  width: THUMBNAIL_SIZE,
  height: THUMBNAIL_SIZE
});

export const ActionButton = styled(StyledButton)({
  marginLeft: 'auto',
  backgroundColor: FOCUS_LAVENDER,
  borderColor: FOCUS_LAVENDER,
  '&:disabled': {
    borderColor: LAVENDER,
    backgroundColor: LAVENDER
  }
});

export const NextButton = styled(StyledButton)({
  marginLeft: 'auto'
});

export const Actions = styled('div')({
  display: 'flex'
});

export const UploadWrapper = styled('div')({
  position: 'relative'
});

export const LoadingOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const TextButton = styled('button')({
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

export const UploadDetails = styled('div')({
  marginLeft: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export const StyledCircleDot = styled(CircleDot)(
  {
    marginRight: 10
  },
  ({ disabled = true }) => ({
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1
  })
);

export const UploadActions = styled('div')({
  display: 'flex'
});

export const ActionDivider = styled('div')({
  ...BASE_TEXT,
  color: DETROIT,
  marginLeft: 5,
  marginRight: 5
});

export const UploadCriteria = styled('div')({
  ...BASE_TEXT,
  color: DETROIT
});

export const GalleryThumbnailContainer = styled('div')({
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

export const StepsContainer = styled('div')({});

const GalleryThumbnail = styled('img')({
  width: GALLERY_THUMBNAIL_SIZE,
  height: GALLERY_THUMBNAIL_SIZE,
  borderRadius: 3
});

const GalleryThumbnailWrapper = styled('div')({
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

const GalleryThumbComponent = ({ url, index, onRemove }) => {
  return (
    <GalleryThumbnailWrapper>
      <StyledCircleCloseIcon onClick={() => onRemove(index)} />
      <GalleryThumbnail src={url} />
    </GalleryThumbnailWrapper>
  );
};

const SortableItem = SortableElement(({ value, onRemove, index }) => (
  <GalleryThumbComponent url={value} index={index} onRemove={onRemove} />
));

export const SortableList = SortableContainer(({ items, onRemove }) => {
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
