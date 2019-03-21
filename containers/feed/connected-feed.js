import React from 'react';
import { Query } from 'react-apollo';
import { FEED_QUERY } from '../../data/queries';
import Feed from './feed';

const ConnectedFeed = () => (
  <Query query={FEED_QUERY} variables={{ first: 1, skip: 0 }}>
    {({ loading, error, data, fetchMore }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      return (
        <Feed
          sections={data.sections}
          onLoadMore={() => {
            console.log(data.sections.length);
            fetchMore({
              variables: {
                skip: data.sections.length,
                first: 1
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  sections: [...prev.sections, ...fetchMoreResult.sections]
                });
              }
            });
          }}
        />
      );
    }}
  </Query>
);

export default ConnectedFeed;
