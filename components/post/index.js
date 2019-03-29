import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Mutation } from 'react-apollo';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import {
  BLACK,
  GUNSMOKE,
  LILAC,
  WHITE,
  ALABASTER
} from '../../shared/style/colors';
import TagList from '../product-card/tag-list.jsx';
import User from '../user';
import ChevronUp from '../../shared/style/icons/chevron-up.svg';
import { VOTE } from '../../data/mutations';
import { show } from '../../lib/utils/lock';

export const Container = styled('li')(
  {
    position: 'relative',
    listStyleType: 'none'
  },
  ({ visible }) => ({
    display: visible ? 'block' : 'none'
  })
);

export const Link = styled('div')({
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

const Thumbnail = styled('img')({
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

const Description = styled('div')({
  ...BASE_TEXT,
  color: GUNSMOKE,
  lineHeight: '20px',
  marginBottom: 12
});

const Footer = styled('div')({
  display: 'flex'
});

const VotesWrapper = styled('div')({
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
});

const Votes = styled('div')({
  ...BASE_TEXT,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 74,
  width: 64,
  fontWeight: WEIGHT.BOLD,
  ' > svg': {
    width: 16,
    height: 11,
    marginBottom: 3,
    ' > path': {
      fill: 'BLACK'
    }
  }
});

const Post = ({
  id,
  name,
  description,
  thumbnail,
  tags,
  visible,
  votesCount
}) => (
  <Container visible={visible}>
    <Link>
      <Thumbnail src={thumbnail} />
      <Content>
        <Name>{name}</Name>
        <Description>{description}</Description>
        <Footer>{tags.length > 0 && <TagList tags={tags} />}</Footer>
      </Content>
    </Link>
    <User>
      {({ data: { me } }) => (
        <Mutation variables={{ postId: id }} mutation={VOTE}>
          {vote => (
            <VotesWrapper>
              <Votes
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
  visible: PropTypes.bool
};

export default Post;
