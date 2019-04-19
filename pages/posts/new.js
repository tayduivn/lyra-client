import React, { Fragment, useState } from 'react';
import { Container } from '../../shared/library/components/layout';
import {
  NEW_POST_STEP_ONE,
  NEW_POST_STEP_TWO
} from '../../shared/constants/routes';
import StepOne from '../../components/new-post/step-one';
import StepTwo from '../../components/new-post/step-two';

const NewPost = ({ router }) => {
  const route = router.asPath;
  const [link, setLink] = useState(null);
  return (
    <Fragment>
      {route === NEW_POST_STEP_ONE && <StepOne setLinkCallback={setLink} />}
      {route === NEW_POST_STEP_TWO && <StepTwo link={link} />}
    </Fragment>
  );
};

export default NewPost;
