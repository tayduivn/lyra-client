import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Section from '../../components/section';

const Container = styled('div')({});

const Feed = ({ sections, onLoadMore }) => (
  <Container>
    {sections.map(({ id, date, posts }) => (
      <Section key={id} date={date} posts={posts} />
    ))}
    <button onClick={onLoadMore}>Load More</button>
  </Container>
);

Feed.propTypes = {
  sections: PropTypes.array,
  onLoadMore: PropTypes.func
};

export default Feed;
