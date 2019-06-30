import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../state/provider';
import { SET_GALLERY_THUMBS, UPLOADING_GALLERY_THUMB } from '../state/actions';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { withApollo } from 'react-apollo';
import { uploadImage, uploadUrl } from '../../../shared/utils';
import arrayMove from 'array-move';

import Spinner from '../../../shared/library/components/progress-indicators/spinner';

import {
  ThumbnailDropTargetContainer,
  ThumbnailPlaceholder,
  StyledThumbnailPlaceholderIcon,
  UploadWrapper,
  LoadingOverlay,
  GalleryThumbnailContainer,
  SortableList,
  GALLERY_THUMBNAIL_SIZE
} from '../components';

import {
  Label,
  LabelName,
  LabelDetail,
  Field
} from '../../../shared/library/components/inputs';

const DEFAULT_GALLERY_THUMB_PLACEHOLDERS = 3;

const Gallery = ({ client }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { uploadingGalleryThumb, galleryThumbs } = state;

  const galleryThumbPlaceholders = [];
  for (
    let j = 0;
    j <
    (galleryThumbs.length > DEFAULT_GALLERY_THUMB_PLACEHOLDERS
      ? 0
      : DEFAULT_GALLERY_THUMB_PLACEHOLDERS - galleryThumbs.length);
    j++
  ) {
    galleryThumbPlaceholders.push(
      <ThumbnailPlaceholder
        width={GALLERY_THUMBNAIL_SIZE}
        height={GALLERY_THUMBNAIL_SIZE}
      />
    );
  }

  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      dispatch({ type: UPLOADING_GALLERY_THUMB, value: true });
      uploadImage(client, file, (result, filename) => {
        let thumbs = galleryThumbs;
        file.preview = URL.createObjectURL(file);
        file.url = uploadUrl(filename);
        thumbs.push(file);
        dispatch({ type: SET_GALLERY_THUMBS, value: thumbs });
        dispatch({ type: UPLOADING_GALLERY_THUMB, value: false });
      });
    }
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch({
      type: SET_GALLERY_THUMBS,
      value: arrayMove(galleryThumbs, oldIndex, newIndex)
    });
  };

  return (
    <Field>
      <Label>
        <LabelName>Gallery</LabelName>
        <LabelDetail>Recommended size: 1270x760px.</LabelDetail>
      </Label>
      <UploadWrapper>
        {uploadingGalleryThumb && (
          <LoadingOverlay>
            <Spinner />
          </LoadingOverlay>
        )}

        <ThumbnailDropTargetContainer
          width="100%"
          uploading={uploadingGalleryThumb}
        >
          <ThumbnailPlaceholder maxWidth="100%" width="100%">
            <div {...getGalleryRootProps({ className: 'dropzone' })}>
              <input {...getGalleryInputProps()} />
              <StyledThumbnailPlaceholderIcon />
            </div>
          </ThumbnailPlaceholder>
        </ThumbnailDropTargetContainer>
      </UploadWrapper>
      <GalleryThumbnailContainer>
        <SortableList
          axis={'xy'}
          items={galleryThumbs.map(item => item.preview)}
          onSortEnd={onSortEnd}
          onRemove={index => {
            dispatch({
              type: SET_GALLERY_THUMBS,
              value: [
                ...galleryThumbs.slice(0, index),
                ...galleryThumbs.slice(index + 1, galleryThumbs.length)
              ]
            });
          }}
          distance={1}
        />
        {galleryThumbPlaceholders}
      </GalleryThumbnailContainer>
    </Field>
  );
};

Gallery.propTypes = {
  client: PropTypes.any
};

export default withApollo(Gallery);
