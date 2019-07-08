import React from 'react';
import gql from 'graphql-tag';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Mutation } from 'react-apollo';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import {
  BLACK,
  GUNSMOKE,
  LILAC,
  WHITE,
  RUBY,
  BLUSH,
  ALABASTER
} from '../../shared/style/colors';
import TagList from '../product-card/tag-list.jsx';
import User from '../user';
import ChevronUp from '../../shared/style/icons/chevron-up.svg';
import { VOTE } from '../../data/mutations';
import { show } from '../../lib/utils/lock';

const ACCENT = BLUSH;

export const Container = styled('li')(
  {
    position: 'relative',
    listStyleType: 'none'
  },
  ({ visible }) => ({
    display: visible ? 'block' : 'none'
  })
);

export const Body = styled('div')({
  backgroundColor: WHITE,
  '&:hover': {
    backgroundColor: ALABASTER
  },
  padding: 20,
  display: 'flex',
  flexDirection: 'row',
  borderTop: `1px solid ${LILAC}`,
  cursor: 'pointer'
});

const Wrapper = styled('div')({});

const Link = styled('a')({
  textDecoration: 'none'
});

export const Thumbnail = styled('img')({
  width: 80,
  height: 80,
  marginRight: 10
});

export const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
});

const Name = styled('div')({
  ...BASE_TEXT,
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: WEIGHT.BOLD,
  color: BLACK
});

const Tagline = styled('div')({
  ...BASE_TEXT,
  color: GUNSMOKE,
  lineHeight: '20px',
  marginBottom: 12
});

const Footer = styled('div')({
  display: 'flex'
});

const VotesWrapper = styled('div')(
  {
    position: 'absolute',
    top: '50%',
    right: 20,
    transform: 'translateY(-50%)',
    backgroundColor: WHITE,
    '&:hover': {
      backgroundColor: ALABASTER
    },
    border: `1px solid ${LILAC}`,
    borderRadius: 3
  },
  ({ upvoted }) => ({
    borderColor: upvoted ? RUBY : LILAC
  })
);

const Votes = styled('div')(
  {
    ...BASE_TEXT,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 74,
    width: 64,
    fontWeight: WEIGHT.BOLD
  },
  ({ upvoted }) => ({
    color: upvoted ? ACCENT : BLACK,
    ' > svg': {
      width: 16,
      height: 11,
      marginBottom: 3,
      ' > path': {
        fill: upvoted ? ACCENT : BLACK
      }
    }
  })
);

const Post = ({
  id,
  slug,
  name,
  tagline,
  description,
  thumbnail,
  tags,
  visible,
  votesCount,
  upvoted
}) => (
  <Container visible={visible}>
    <Wrapper>
      <Link href={`/posts/${slug}`}>
        <Body>
          <Thumbnail src={thumbnail} />
          <Content>
            <Name>{name}</Name>
            <Tagline>{tagline}</Tagline>
            <Footer>{tags.length > 0 && <TagList tags={tags} />}</Footer>
          </Content>
        </Body>
      </Link>
    </Wrapper>
    <User>
      {({ data: { me } }) => (
        <Mutation
          variables={{ postId: id }}
          update={(cache, { data: { vote } }) => {
            const postId = defaultDataIdFromObject({ id, __typename: 'Post' });
            cache.writeFragment({
              id: postId,
              fragment: gql`
                fragment myPost on Post {
                  upvoted
                  votesCount
                }
              `,
              data: {
                upvoted: !upvoted,
                votesCount: upvoted ? votesCount - 1 : votesCount + 1
              }
            });
          }}
          mutation={VOTE}
        >
          {vote => (
            <VotesWrapper upvoted={upvoted}>
              <Votes
                upvoted={upvoted}
                onClick={() => {
                  if (me) {
                    vote();
                  } else {
                    show();
                  }
                }}
              >
                <ChevronUp />
                {votesCount}
              </Votes>
            </VotesWrapper>
          )}
        </Mutation>
      )}
    </User>
  </Container>
);

Post.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  votesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  tags: PropTypes.array,
  visible: PropTypes.bool,
  upvoted: PropTypes.bool
};

export default Post;
