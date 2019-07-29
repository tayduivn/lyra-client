import React, { Fragment, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import Header from './header';
import Creators from './creators';
import {
  Container,
  Section,
  Main,
  Aside,
  Panel,
  Divider
} from '../../shared/library/components/layout';
import BigButton from '../../shared/library/components/buttons/big';

const MAX_HEIGHT = 500;

const Thumbnails = styled('div')({
  display: 'flex',
  marginTop: 10
});

const StyledPanel = styled(Panel)({
  overflow: 'hidden'
});

const Body = styled('div')({
  display: 'flex'
});

const HeaderWrapper = styled('div')({
  padding: '30px 0px'
});

const GalleryWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const Gallery = styled('div')(
  {
    overflow: 'hidden'
  },
  ({ height = MAX_HEIGHT, width }) => ({
    width,
    height
  })
);

const List = styled('ol')({
  width: '100%',
  height: 'inherit',
  display: 'flex',
  listStyle: 'none',
  overflowX: 'scroll',
  overflowY: 'hidden',
  padding: 0,
  '::-webkit-scrollbar': {
    width: 0,
    background: 'transparent'
  },
  margin: 0,
  ' > li:first-of-type > img': {
    height: 'auto'
  },
  ' > li:last-of-type > img': {
    height: 'auto'
  }
});

const Item = styled('li')({}, ({}) => ({
  height: '100%',
  width: '100%'
}));

const Image = styled('img')({}, ({ maxWidth }) => ({
  width: 'auto',
  height: '100%',
  maxHeight: MAX_HEIGHT,
  maxWidth
}));

const Thumbnail = styled('div')({
  marginRight: 10,
  cursor: 'pointer',
  '> img ': {
    height: 40,
    width: 40
  }
});

const Description = styled('div')({
  ...BASE_TEXT,
  marginTop: 20
});

const StyledDivider = styled(Divider)({
  marginTop: 20,
  marginBottom: 20
});

const Upvotes = styled('div')({});

const Post = ({
  post: {
    tagline,
    submitter,
    creators,
    slug,
    name,
    link,
    galleryThumbs,
    description,
    thumbnail,
    votesCount,
    topics
  }
}) => {
  const el = useRef(null);

  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(MAX_HEIGHT);

  const imageRefs = {};

  console.log('description', description);

  const setDimensions = () => {
    setImageWidth(el.current.clientWidth);
    setImageHeight(Object.values(imageRefs)[0].current.clientHeight);
  };

  useEffect(
    () => {
      setDimensions();
    },
    [el.current]
  );

  useEffect(() => {
    window.addEventListener('resize', setDimensions);
    return () => {
      window.removeEventListener('resize', setDimensions);
    };
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <Container>
          <Section>
            <Header
              thumbnail={thumbnail}
              name={name}
              link={link}
              tagline={tagline}
              topics={topics}
            />
          </Section>
        </Container>
      </HeaderWrapper>
      <Container>
        <Section>
          <Body>
            <Main>
              <StyledPanel>
                {galleryThumbs.length > 0 && (
                  <GalleryWrapper ref={el}>
                    <Gallery width={imageWidth} height={imageHeight}>
                      <List>
                        {galleryThumbs.map((image, index) => {
                          imageRefs[index] = useRef(null);
                          return (
                            <Item>
                              <Image
                                ref={imageRefs[index]}
                                src={image}
                                maxWidth={imageWidth}
                              />
                            </Item>
                          );
                        })}
                      </List>
                    </Gallery>
                    <Thumbnails>
                      {galleryThumbs.map((image, index) => (
                        <Thumbnail
                          onClick={() =>
                            imageRefs[index].current.scrollIntoView()
                          }
                        >
                          <img src={image} />
                        </Thumbnail>
                      ))}
                    </Thumbnails>
                  </GalleryWrapper>
                )}
                <StyledDivider />
                <Description>{description}</Description>
              </StyledPanel>
            </Main>
            <Aside>
              <Upvotes>
                <BigButton>Upvote!</BigButton>
              </Upvotes>
              <StyledDivider />
              <Creators submitter={submitter} creators={creators} />
            </Aside>
          </Body>
        </Section>
      </Container>
    </Fragment>
  );
};

export default Post;
