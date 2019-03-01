import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { BASE_TEXT } from '../../shared/style/typography';
import { GUNSMOKE, LILAC, WHITE } from '../../shared/style/colors';
// import {Manager, Target, Popper, Arrow} from 'react-popper';
import { Manager, Reference, Popper } from 'react-popper';
import Tag from './tag';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row'
});

const Count = styled('a')({
  ...BASE_TEXT,
  display: 'flex',
  alignItems: 'center',
  marginLeft: 4,
  fontSize: 11,
  lineHeight: '16px',
  color: GUNSMOKE,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  }
});

const Tags = styled('ul')({
  margin: 15,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  '> div': {
    marginTop: 15
  },
  '> div:first-child': {
    marginTop: 0
  }
});

const Content = styled('div')({
  border: `1px solid ${LILAC}`,
  backgroundColor: WHITE,
  "&[data-placement*='top']": {
    marginBottom: 10
  },
  "&[data-placement*='right']": {
    marginLeft: 10
  },
  "&[data-placement*='bottom']": {
    marginTop: 10
  },
  "&[data-placement*='left']": {
    marginRight: 10
  }
  // marginTop: 15,
  // '&::before': {
  //   borderWidth: 11,
  //   content: '""',
  //   position: 'absolute',
  //   left: '50%',
  //   marginLeft: -11,
  //   width: 0,
  //   height: 0,
  //   border: 'solid transparent'
  // },
  // '&::after': {
  //   borderWidth: 10,
  //   content: '""',
  //   position: 'absolute',
  //   marginLeft: -10,
  //   left: '50%',
  //   width: 0,
  //   height: 0,
  //   border: 'solid transparent'
  // },
  // "&[data-placement*='bottom']": {
  //   marginTop: 15,
  //   '&::before': {
  //     top: -6,
  //     borderWidth: 11,
  //     borderColor: `transparent transparent ${LILAC} transparent`
  //   },
  //   '&::after': {
  //     top: -3,
  //     borderWidth: 10,
  //     borderColor: `transparent transparent ${WHITE} transparent`
  //   }
  // },
  // "&[data-placement*='top']": {
  //   marginTop: -15,
  //   '&::before': {
  //     bottom: -21,
  //     borderWidth: 11,
  //     borderColor: `${LILAC} transparent transparent transparent`
  //   },
  //   '&::after': {
  //     bottom: -18,
  //     borderWidth: 10,
  //     borderColor: `${WHITE} transparent transparent transparent`
  //   }
  // }
});

const Arrow = styled('div')`
  position: absolute;
  width: 3em;
  height: 3em;
  &[data-placement*='bottom'] {
    top: 0;
    left: 0;
    margin-top: -0.9em;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent ${LILAC} transparent;
    }
  }
  &[data-placement*='top'] {
    bottom: 0;
    left: 0;
    margin-bottom: -0.9em;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 10px 10px 0 10px;
      border-color: ${LILAC} transparent transparent transparent;
    }
  }
  &[data-placement*='right'] {
    left: 0;
    margin-left: -0.9em;
    height: 1.5em;
    width: 0.5em;
    &::before {
      border-width: 10px 10px 10px 0;
      border-color: transparent ${LILAC} transparent transparent;
    }
  }
  &[data-placement*='left'] {
    right: 0;
    margin-right: -0.9em;
    height: 3em;
    width: 1em;
    &::before {
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent ${LILAC};
    }
  }
  &::before {
    content: '';
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
`;

const TOP = 'top';
const RIGHT = 'right';
const BOTTOM = 'bottom';
const LEFT = 'left';
const OFFSET = 20;
const OFFSETS = new Map();
OFFSETS.set(TOP, BOTTOM);
OFFSETS.set(RIGHT, LEFT);
OFFSETS.forEach((value, key) => {
  OFFSETS.set(value, key);
});

// const OFFSETS = { `${TOP}`: BOTTOM, RIGHT: LEFT, BOTTOM: TOP, LEFT: RIGHT };

export default class TagList extends Component {
  static propTypes = {
    tags: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.addOutsideClickHandler();
    // this.setState(prevState => ({
    //   isOpen: !prevState.isOpen
    // }));
  };

  // style={{
  //   opacity,
  //   top: 0,
  //   left: 0,
  //   position,
  //   padding: '1em',
  //   width: '10em',
  //   transform: `translate3d(${left}px, ${top +
  //     topOffset}px, 0) scale(${scale}) rotate(${rotation})`,
  //   transformOrigin: 'top center',
  // }}

  handleOutsideClick = event => {
    if (!this.container.contains(event.target)) {
      this.setState({ isOpen: false });
      this.removeOutsideClickHandler();
    }
  };

  addOutsideClickHandler = () => {
    document.addEventListener('click', this.handleOutsideClick);
  };

  removeOutsideClickHandler = () => {
    document.removeEventListener('click', this.handleOutsideClick);
  };

  container = null;

  assignContainer = el => (this.container = el);

  render() {
    const { tags } = this.props;
    const items = tags.map(tag => <Tag name={tag.name} url={tag.url} />);
    return (
      <Container ref={this.assignContainer}>
        <Manager>
          {/* <Reference>
            {({ ref }) => (
              <button type="button" ref={ref}>
                Reference element
              </button>
            )}
          </Reference> */}
          <Count>
            <Reference>
              {({ ref }) => (
                <div ref={ref} onClick={() => this.handleClick()}>
                  + {tags.length - 1}
                </div>
              )}
            </Reference>
          </Count>
          {this.state.isOpen && (
            <Popper
              placement="auto"
              modifiers={{
                addMargin: {
                  order: 1,
                  enabled: true,
                  function: data => {
                    const {
                      placement,
                      offsets: { popper }
                    } = data;
                    popper[OFFSETS.get(placement)] += OFFSET;

                    data.offsets.popper = popper;
                    return data;
                  }
                }
                // offset: { enabled: true, offset: '100%w' }
              }}
            >
              {({ ref, style, placement, arrowProps }) => {
                // console.log('cool guy', ref);
                return (
                  <div ref={ref} style={style} data-placement={placement}>
                    {/* Popper element */}
                    <Arrow
                      innerRef={arrowProps.ref}
                      data-placement={placement}
                      style={arrowProps.style}
                    />
                    <Content>
                      <Tags>{items}</Tags>
                    </Content>
                    {/* <div ref={arrowProps.ref} style={arrowProps.style} /> */}
                  </div>
                );
              }}
            </Popper>
          )}
        </Manager>
      </Container>
    );
  }

  // render() {
  //   const { tags } = this.props;
  //   // console.log(tags);
  //   const items = tags.map(tag => <Tag name={tag.name} url={tag.url} />);
  //   return (
  //     <Container>
  //       <Tag name={tags[0].name} />
  //       <Manager>

  //         {this.state.isOpen && (
  //           <Popper placement="top">
  //             {({ ref, style, placement, arrowProps }) => (
  //               <div ref={ref} style={style} data-placement={placement}>
  //                 {/* <Arrow
  //                   innerRef={arrowProps.ref}
  //                   data-placement={placement}
  //                   style={arrowProps.style}
  //                 /> */}
  //                 {/* <Content data-placement={placement}> */}
  //                 <Content data-placement={placement}>
  // <Tags>{items}</Tags>
  //                 </Content>

  //                 {/* <div ref={arrowProps.ref} style={arrowProps.style} /> */}
  //               </div>
  //             )}
  //           </Popper>
  //         )}
  //       </Manager>
  //     </Container>
  //   );
  // }
}
