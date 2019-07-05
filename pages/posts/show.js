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

const Post = ({
  router,
  client,
  router: {
    query: { slug }
  }
}) => {
  console.log('router', router);
  console.log('client', client);
  console.log('slug', slug);
  //   const route = router.asPath;
  return <div>Cool!</div>;
};

export default Post;
