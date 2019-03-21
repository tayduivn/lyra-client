import React from 'react';
import PropTypes from 'prop-types';
import PostList from '../post-list';

const Section = ({ date, posts }) => {
  return <PostList date={date} posts={posts} />;
};

Section.propTypes = {
  date: PropTypes.string,
  posts: PropTypes.array
};

export default Section;
