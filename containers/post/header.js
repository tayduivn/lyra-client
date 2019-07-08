import React from 'react';
import styled from '@emotion/styled';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import { Thumbnail } from '../../components/post';

const Container = styled('div')({
  display: 'flex',
  padding: '0 15px 0 15px'
});
const Link = styled('a')({
  ...BASE_TEXT,
  fontSize: 20,
  fontWeight: WEIGHT.BOLD
});
const Title = styled('h1')({});
const Info = styled('div')({});

const Header = ({ thumbnail, name, link }) => {
  return (
    <Container>
      <Thumbnail src={thumbnail} />
      <Info>
        <Title>
          <Link href={link}>{name}</Link>
        </Title>
      </Info>
    </Container>
  );
};

export default Header;
