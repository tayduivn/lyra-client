import React from 'react';
import { Query } from 'react-apollo';
import { POST_QUERY } from '../../data/queries';

import Post from '../../containers/post';

const PostPage = ({
  router,
  client,
  router: {
    query: { slug }
  }
}) => {
  console.log('client', client);
  return (
    <Query query={POST_QUERY} variables={{ slug }}>
      {({ loading, error, data: { post }, fetchMore }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return <Post post={post} />;
      }}
    </Query>
  );
};

export default PostPage;
