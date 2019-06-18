import React from 'react';
import {
  NEW_POST_STEP_ONE,
  NEW_POST_STEP_TWO
} from '../../shared/constants/routes';
import StepOne from '../../components/new-post/step-one';
import NewPostProvider from '../../components/new-post/state/provider';
import StepTwo from '../../components/new-post/step-two';
import reducer from '../../components/new-post/state/reducer';
import initialState from '../../components/new-post/state/state';

const NewPost = ({ router }) => {
  const route = router.asPath;
  return (
    <NewPostProvider reducer={reducer} initialState={initialState}>
      {route === NEW_POST_STEP_ONE && <StepOne />}
      {route === NEW_POST_STEP_TWO && <StepTwo />}
    </NewPostProvider>
  );
};

export default NewPost;
