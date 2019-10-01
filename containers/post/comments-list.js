import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Thread from './thread';

const CommentsList = ({ comments }) => {
  return (
    <Fragment>
      {comments.map(comment => (
        <Thread comment={comment} />
      ))}
    </Fragment>
  );
};

export default CommentsList;
