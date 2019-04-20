import styled from '@emotion/styled';
import { TITLE_TEXT, WEIGHT } from '../../style/typography';

export const Title = styled('h1')({
  ...TITLE_TEXT,
  fontSize: 26,
  fontWeight: WEIGHT.ULTRA_BOLD,
  margin: '30px 0 30px 0',
  display: 'flex'
});
