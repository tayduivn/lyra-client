import styled from '@emotion/styled';
import { spin } from '../../../style/animations';
import { WHITE, DETROIT, DETROIT_RGBA } from '../../../style/colors';

const SPINNER_SIZE = 25;
const SPINNER_COLOR = DETROIT;
const SPINNER_COLOR_RGBA = DETROIT_RGBA;

const Spinner = styled('div')({
  fontSize: 10,
  margin: 0,
  textIndent: '-9999em',
  width: SPINNER_SIZE,
  height: SPINNER_SIZE,
  borderRadius: '50%',
  background: DETROIT,
  background: `-moz-linear-gradient(left, ${SPINNER_COLOR} 10%, ${SPINNER_COLOR_RGBA} 42%)`,
  background: `-webkit-linear-gradient(left, ${SPINNER_COLOR} 10%, ${SPINNER_COLOR_RGBA} 42%)`,
  background: `-o-linear-gradient(left, ${SPINNER_COLOR} 10%, ${SPINNER_COLOR_RGBA} 42%)`,
  background: `-ms-linear-gradient(left, ${SPINNER_COLOR} 10%, ${SPINNER_COLOR_RGBA} 42%)`,
  background: `linear-gradient(to right, ${SPINNER_COLOR} 10%, ${SPINNER_COLOR_RGBA} 42%)`,
  position: 'relative',
  WebkitAnimation: `${spin()} 1.4s infinite linear`,
  animation: `${spin()} 1.4s infinite linear`,
  WebkitTransform: 'translateZ(0)',
  msTransform: 'translateZ(0)',
  transform: 'translateZ(0)',
  '&::before': {
    width: '50%',
    height: '50%',
    background: `${WHITE}`,
    borderRadius: '100% 0 0 0',
    position: 'absolute',
    top: 0,
    left: 0,
    content: '""'
  },
  '&::after': {
    background: `${WHITE}`,
    width: '75%',
    height: '75%',
    borderRadius: '50%',
    content: '""',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default Spinner;
