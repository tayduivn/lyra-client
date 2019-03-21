import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import Section from '../section';
import { SECTIONS_QUERY } from '../../data/queries';

const Sections = () => (
  <Query query={SECTIONS_QUERY} variables={{ first: 5, skip: 0 }}>
    {({ sections, onLoadMore }) => {
      return (
        <Fragment>
          {data.sections.map(({ id, date, posts }) => (
            <Section key={id} date={date} posts={posts} />
          ))}
        </Fragment>
      );
    }}
  </Query>
);

export default Sections;
