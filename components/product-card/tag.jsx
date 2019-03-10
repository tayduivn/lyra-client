import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Mutation } from 'react-apollo';
import User from '../user';
import { BASE_TEXT } from '../../shared/style/typography';
import { ALABASTER, LILAC, GUNSMOKE } from '../../shared/style/colors';
import { UPDATE_FOLLOWED_TOPIC } from '../../data/mutations';
import { CURRENT_USER_QUERY } from '../../data/queries';
import { show } from '../../lib/utils/lock';

const HEIGHT = 24;

const Action = styled('span')({
  display: 'inline-flex',
  height: HEIGHT,
  width: 0,
  lineHeight: '21px',
  color: GUNSMOKE,
  borderLeft: `0 solid ${LILAC}`,
  justifyContent: 'center',
  transition: 'width .1s ease-out',
  '&:hover': {
    backgroundColor: LILAC,
    cursor: 'pointer'
  }
});

const Container = styled('div')(
  {
    ...BASE_TEXT,
    border: `1px solid ${LILAC}`,
    backgroundColor: ALABASTER,
    borderRadius: 3,
    display: 'inline-flex',
    alignItems: 'center',
    height: HEIGHT
  },
  ({ following }) => ({
    '&:hover': {
      [Action]: {
        borderLeftWidth: 1,
        width: 24,
        '&::after': {
          content: following ? `'-'` : `'+'`
        }
      }
    }
  })
);

const Link = styled('a')({
  padding: '0 8px',
  color: GUNSMOKE,
  display: 'inline-flex',
  lineHeight: '24px',
  fontSize: 11,
  textTransform: 'uppercase',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: LILAC,
    cursor: 'pointer'
  }
});

export default class Tag extends Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    slug: PropTypes.string
  };

  render() {
    const { id, name, slug } = this.props;
    return (
      <User>
        {({ data: { me } }) => {
          const following = me
            ? me.followedTopics.map(topic => topic.id).includes(id)
            : false;
          return (
            <Mutation
              mutation={UPDATE_FOLLOWED_TOPIC}
              update={(cache, { data: { updateFollowedTopic } }) => {
                const user = cache.readQuery({ query: CURRENT_USER_QUERY });
                const { followedTopics } = user.me;
                let updatedTopics;
                if (following) {
                  updatedTopics = followedTopics.filter(
                    topic => topic.id !== id
                  );
                } else {
                  followedTopics.push(updateFollowedTopic);
                  updatedTopics = followedTopics;
                }
                user.me.followedTopics = updatedTopics;
                cache.writeQuery({ query: CURRENT_USER_QUERY, data: user });
              }}
            >
              {updateFollowedTopic => (
                <Container following={following}>
                  <Link href={slug}>{name}</Link>
                  <Action
                    onClick={() => {
                      if (me) {
                        updateFollowedTopic({
                          variables: {
                            userId: me.id,
                            topicId: id,
                            following: !following
                          }
                        });
                      } else {
                        show();
                      }
                    }}
                  />
                </Container>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}
