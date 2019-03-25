/* eslint import/prefer-default-export: 0 */
import { keyframes } from '@emotion/core';

export const shine = (first, last, offset = 0) =>
  keyframes`
  0% {
    background-position: ${first + offset}px;
  }

  40%, 100% {
    background-position: ${last + offset}px;
  }
`;
