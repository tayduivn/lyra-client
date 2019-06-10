/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import React from 'react';

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span {...props} ref={ref} />
  )
);

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    css={{
      padding: '8px 7px 6px',
      position: 'absolute',
      zIndex: 1,
      top: -10000,
      left: -10000,
      marginTop: -6,
      opacity: 0,
      backgroundColor: '#e8e8e8',
      borderRadius: 4,
      transition: 'opacity 0.75s',
      '& > *': {
        display: 'inline-block'
      },
      '& > * + *': {
        marginLeft: 15
      }
    }}
  />
));
