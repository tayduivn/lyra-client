import React, { Component } from 'react';
import {
  GalleryThumbnailWrapper,
  GalleryThumbnail,
  StyledCircleCloseIcon
} from './step-two';

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
