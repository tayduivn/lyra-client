import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { LILAC, ALABASTER, WHITE } from '../../shared/style/colors';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import Post from '../post';
import { formatDate } from '../../shared/utils';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  marginBottom: 30
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 20px 0 20px',
  padding: '20px 0 15px 0'
});

const Day = styled('div')({
  ...BASE_TEXT,
  fontSize: 20,
  fontWeight: WEIGHT.BOLD
});

const List = styled('ul')({
  backgroundColor: WHITE,
  padding: 0,
  margin: 0,
  ' > li': {
    '&:hover': {
      backgroundColor: ALABASTER
    }
  }
});

const Navigation = styled('div')({
  ...BASE_TEXT,
  fontSize: 11,
  textTransform: 'uppercase',
  ' > a:first-child': {
    borderRight: `1px solid ${LILAC}`
  }
});

const Filter = styled('a')({
  padding: '0 .5em',
  cursor: 'pointer'
});

const PostList = ({ date, posts }) => (
  <Container>
    <Header>
      <Day>{formatDate(date)}</Day>
      <Navigation>
        <Filter>Popular</Filter>
        <Filter>Newest</Filter>
      </Navigation>
    </Header>
    <List>
      {posts.map(post => (
        <Post
          key={post.id}
          name={post.name}
          description={post.description}
          thumbnail={post.thumbnail}
          tags={post.topics}
        />
      ))}
    </List>
  </Container>
);

PostList.propTypes = {
  date: PropTypes.string,
  posts: PropTypes.array
};

export default PostList;
