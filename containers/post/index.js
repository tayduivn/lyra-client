import React from 'react';
import styled from '@emotion/styled';
import Header from './header';
import {
  Container,
  Section,
  Main,
  Aside
} from '../../shared/library/components/layout';

const Body = styled('div')({
  display: 'flex'
});

const Post = ({
  post: {
    id,
    tagline,
    slug,
    name,
    link,
    description,
    thumbnail,
    votesCount,
    topics
  }
}) => (
  <Container>
    <Section>
      <Header
        thumbnail={thumbnail}
        name={name}
        link={link}
        tagline={tagline}
        topics={topics}
      />
      <Body>
        <Main>Main</Main>
        <Aside>Side Panel</Aside>
      </Body>
    </Section>
  </Container>
);

export default Post;
