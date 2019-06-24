import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DispatchContext, StateContext } from '../state/provider';
import { SET_THUMBNAIL, UPLOADING_THUMBNAIL } from '../state/actions';
import { useDropzone } from 'react-dropzone';
import { withApollo } from 'react-apollo';
import { uploadImage } from '../../../shared/utils';

import Spinner from '../../../shared/library/components/progress-indicators/spinner';

import {
  ThumbnailDropTargetContainer,
  ThumbnailPlaceholder,
  StyledThumbnailPlaceholderIcon,
  StyledCircleCloseIcon,
  ThumbnailContainer,
  Thumbnail,
  UploadWrapper,
  LoadingOverlay,
  TextButton,
  UploadDetails,
  UploadActions,
  ActionDivider,
  UploadCriteria
} from '../components';

import {
  Label,
  LabelName,
  LabelQualifier,
  LabelDetail,
  Field
} from '../../../shared/library/components/inputs';

const UploadThumbnail = ({ client }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { uploadingThumbnail, thumbnail } = state;

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
      dispatch({ type: UPLOADING_THUMBNAIL, value: true });
      uploadImage(client, file, result => {
        dispatch({ type: UPLOADING_THUMBNAIL, value: false });
        dispatch({ type: SET_THUMBNAIL, value: file });
        console.log('Response from s3', result);
      });
    }
  });

  return (
    <Field>
      <Label>
        <LabelName>
          Thumbnail
          <LabelQualifier> - Required</LabelQualifier>
        </LabelName>
        <LabelDetail>Make it look nice and professional.</LabelDetail>
      </Label>
      <UploadWrapper>
        {uploadingThumbnail && (
          <LoadingOverlay>
            <Spinner />
          </LoadingOverlay>
        )}
        <ThumbnailDropTargetContainer uploading={uploadingThumbnail}>
          {!thumbnail && (
            <ThumbnailPlaceholder>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <StyledThumbnailPlaceholderIcon />
              </div>
            </ThumbnailPlaceholder>
          )}
          {thumbnail && !uploadingThumbnail && (
            <ThumbnailContainer>
              <StyledCircleCloseIcon
                onClick={() => dispatch({ type: SET_THUMBNAIL, value: null })}
              />
              <Thumbnail src={thumbnail.preview} />
            </ThumbnailContainer>
          )}
          <UploadDetails>
            <UploadActions>
              <TextButton {...getRootProps({ className: 'dropzone' })}>
                Upload Image
              </TextButton>
              <ActionDivider>or</ActionDivider>
              <TextButton>paste URL</TextButton>
            </UploadActions>
            <UploadCriteria>
              Recommended size: 240x240
              <br />
              JPG, PNG, GIF. Max weight: 2MB
            </UploadCriteria>
          </UploadDetails>
        </ThumbnailDropTargetContainer>
      </UploadWrapper>
    </Field>
  );
};

UploadThumbnail.propTypes = {
  client: PropTypes.any
};

export default withApollo(UploadThumbnail);
