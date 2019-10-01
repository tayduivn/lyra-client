import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { MentionsInput, Mention } from 'react-mentions';
import StyledButton from '../../shared/library/components/buttons/styled';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import {
  POWDER_BLUE,
  LAVENDER_RGBA,
  LILAC,
  BLUSH,
  WHITE,
  DETROIT
} from '../../shared/style/colors';
import { withApollo } from 'react-apollo';
import UserAvatar from '../../shared/library/components/avatars/user';
import User from '../../components/user';
import { USER_SEARCH } from '../../data/queries';
import { CREATE_COMMENT } from '../../data/mutations';
import { show } from '../../lib/utils/lock';

const AvatarWrapper = styled('div')({
  height: 34,
  display: 'flex',
  alignItems: 'center'
});

const Container = styled('div')(
  {
    display: 'flex'
  },
  ({ isReply = false }) => ({
    marginTop: isReply ? 20 : 0,
    marginBottom: isReply ? 20 : 0
  })
);

const Help = styled('div')({
  ...BASE_TEXT,
  display: 'flex',
  marginTop: 10,
  color: DETROIT
});

const style = {
  control: {
    backgroundColor: '#fff',
    fontSize: 14,
    fontWeight: 'normal'
  },

  highlighter: {
    overflow: 'hidden'
  },

  input: {
    margin: 0
  },

  '&multiLine': {
    control: {
      fontFamily: 'monospace'
    },

    highlighter: {
      padding: 9
    },

    input: {
      ...BASE_TEXT,

      padding: '5px 10px',
      minHeight: 34,
      outline: 0,
      border: 0
    }
  },

  suggestions: {
    list: {
      backgroundColor: WHITE,
      width: 190,
      borderRadius: 5,
      boxShadow: '0 1px 10px 1px rgba(0,0,0,.15)'
    },

    item: {
      ...BASE_TEXT,
      borderBottom: `1px solid ${LILAC}`,
      '&focused': {
        backgroundColor: LAVENDER_RGBA,
        color: BLUSH
      }
    }
  }
};

const StyledMentionsInput = styled(MentionsInput)({
  ' textarea': {
    border: '1px solid #e8e8e8 !important',
    borderRadius: 3,
    lineHeight: '24px !important',
    '&:focus': {
      border: `1px solid ${POWDER_BLUE} !important`
    }
  }
});

const SubmitButton = styled(StyledButton)({
  marginTop: 0
});

const InputWrapper = styled('div')(
  {
    flexGrow: 1,
    marginRight: 10
  },
  ({ isReply = false }) => ({
    marginLeft: isReply ? 0 : 10
  })
);

const Suggestion = styled('div')({
  padding: 10,
  display: 'flex',
  alignItems: 'center'
});

const Avatar = styled('img')({
  borderRadius: '50%',
  height: 30,
  width: 30
});

const Meta = styled('div')({
  ...BASE_TEXT,
  marginLeft: 10,
  lineHeight: '20px'
});

const Name = styled('div')({
  fontWeight: WEIGHT.BOLD
});

const Username = styled('div')({});

const CommentForm = ({
  client,
  postId = null,
  parentId = null,
  isReply = false,
  initialValue = ''
}) => {
  const fetchUsers = (keyword, callback) => {
    if (keyword && keyword.length > 0) {
      client
        .query({
          query: USER_SEARCH,
          variables: { keyword }
        })
        .then(result => {
          if (result.data && result.data.userSearch) {
            callback(
              result.data.userSearch.map(user => ({
                ...user,
                display: user.username
              }))
            );
          }
        });
    }
  };

  const handleSubmit = () => {
    client
      .mutate({
        mutation: CREATE_COMMENT,
        variables: { body: value, postId, parentId }
      })
      .then(({ data }) => {
        // const post = cache.readQuery();
        // const variables = { feedType, itemType, offset: 0, typeSlug: '' };
        // const data = store.readQuery({
        //   query: items,
        //   variables
        // });
        // const postId = defaultDataIdFromObject({ id, __typename: 'Post' });
        // cache.writeFragment({
        //   id: postId,
        //   fragment: gql`
        //     fragment myPost on Post {
        //       upvoted
        //       votesCount
        //     }
        //   `,
        //   data: {
        //     upvoted: !upvoted,
        //     votesCount: upvoted ? votesCount - 1 : votesCount + 1
        //   }
        // });
        console.log('data', data);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        console.log('ERR', err);
      });
  };

  const [value, setValue] = useState(initialValue);

  const inputEl = useRef();

  useEffect(() => {
    if (isReply) {
      const el = inputEl.current.children[0].children[0].children[1];
      el.focus();
      el.selectionStart = el.selectionEnd = el.value.length;
    }
  }, []);

  return (
    <User>
      {({ data: { me } }) => (
        <Container isReply={isReply}>
          {!isReply && (
            <AvatarWrapper>
              <UserAvatar user={me} />
            </AvatarWrapper>
          )}
          <InputWrapper isReply={isReply} ref={inputEl}>
            <StyledMentionsInput
              value={value}
              style={style}
              onChange={event => {
                setValue(event.target.value);
              }}
            >
              <Mention
                trigger="@"
                appendSpaceOnAdd={true}
                data={fetchUsers}
                displayTransform={(id, display) => `@${display}`}
                renderSuggestion={({ id, username, name, avatar }) => {
                  return (
                    <Suggestion>
                      <Avatar src={avatar} />
                      <Meta>
                        <Name>{name}</Name>
                        <Username>{username}</Username>
                      </Meta>
                    </Suggestion>
                  );
                }}
              />
            </StyledMentionsInput>
            {value.length > 0 && <Help>@user, :emoji</Help>}
          </InputWrapper>

          <SubmitButton onClick={me ? () => handleSubmit() : () => show()}>
            {isReply ? 'Reply' : 'Send'}
          </SubmitButton>
        </Container>
      )}
    </User>
  );
};

export default withApollo(CommentForm);
