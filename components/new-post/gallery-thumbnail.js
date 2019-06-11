import React, { Component } from 'react';
import styled from '@emotion/styled';
import { StyledCircleCloseIcon } from './components';
import { GALLERY_THUMBNAIL_SIZE } from './step-two';

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

export default class GalleryThumbComponent extends Component {
  render() {
    const { url, index, onRemove } = this.props;
    return (
      <GalleryThumbnailWrapper>
        <StyledCircleCloseIcon onClick={() => onRemove(index)} />
        <GalleryThumbnail src={url} />
      </GalleryThumbnailWrapper>
    );
  }
}
