import styled from '@emotion/styled';

const MAX_WIDTH = 1100;
const MIN_WIDTH = 320;

export const Container = styled('div')({
  margin: 'auto',
  maxWidth: MAX_WIDTH,
  minWidth: MIN_WIDTH,
  display: 'flex'
});

export const Section = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
});

export const Main = styled('main')({
  flex: 1,
  padding: 15
});

export const Aside = styled('aside')({
  [`@media only screen and (max-width: ${MAX_WIDTH}px)`]: {
    display: 'none'
  },
  width: 330
});
