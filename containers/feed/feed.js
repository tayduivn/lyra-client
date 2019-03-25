import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Section from '../../components/section';
import SkeletonSection from '../../components/skeletons/section';
import useInfiniteScroll from '../../shared/hooks/infinite-scroll';

const Container = styled('div')({});

const Feed = ({ sections, onLoadMore }) => {
  const [isLoading, setIsLoading] = useInfiniteScroll(() => {
    setTimeout(() => {
      onLoadMore(() => setIsLoading(false));
    }, 2000);
  });
  return (
    <Container>
      {sections.map(({ id, date, posts }) => (
        <Section key={id} date={date} posts={posts} />
      ))}
      {isLoading && <SkeletonSection />}
    </Container>
  );
};

Feed.propTypes = {
  sections: PropTypes.array,
  onLoadMore: PropTypes.func
};

export default Feed;
