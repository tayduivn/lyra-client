import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Section from '../../components/section';
import useInfiniteScroll from '../../shared/hooks/infinite-scroll';

const Container = styled('div')({});

const Feed = ({ sections, onLoadMore }) => {
  const [isLoading, setIsLoading] = useInfiniteScroll(() => {
    onLoadMore(() => setIsLoading(false));
  });
  return (
    <Container>
      {sections.map(({ id, date, posts }) => (
        <Section key={id} date={date} posts={posts} />
      ))}
      {isLoading && 'Show Skeleton List....'}
    </Container>
  );
};

Feed.propTypes = {
  sections: PropTypes.array,
  onLoadMore: PropTypes.func
};

export default Feed;
