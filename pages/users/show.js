import React from 'react';
import { Query } from 'react-apollo';

const UserPage = ({
  router,
  client,
  router: {
    query: { slug }
  }
}) => {
  return <div>{slug}</div>;
};

export default UserPage;
