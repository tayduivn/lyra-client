import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Manager, Reference, Popper } from 'react-popper';
import { BASE_TEXT } from '../../shared/style/typography';
import { GUNSMOKE, LILAC, WHITE } from '../../shared/style/colors';
import Tag from './tag.jsx';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  zIndex: 99
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
  '> div:first-of-type': {
    marginTop: 0
  }
});

const Content = styled('div')({
  border: `1px solid ${LILAC}`,
  backgroundColor: WHITE
});

const Arrow = styled('div')`
  position: absolute;
  width: 3em;
  height: 3em;
  &[data-placement*='bottom'] {
    top: 0;
    left: 0;
    margin-top: -9px;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent ${LILAC} transparent;
    }
    &::after {
      border-width: 0 9px 9px 9px;
      border-color: transparent transparent ${WHITE} transparent;
    }
  }
  &[data-placement*='top'] {
    bottom: 0;
    left: 0;
    margin-bottom: -15px;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 10px 10px 0 10px;
      border-color: ${LILAC} transparent transparent transparent;
    }
    &::after {
      margin-top: -1px;
      border-width: 9px 9px 0 9px;
      border-color: ${WHITE} transparent transparent transparent;
    }
  }
  &[data-placement*='right'] {
    left: 0;
    margin-left: -9px;
    height: 1.5em;
    width: 0.5em;
    &::before {
      border-width: 10px 10px 10px 0;
      border-color: transparent ${LILAC} transparent transparent;
    }
    &::after {
      border-width: 9px 9px 9px 0;
      border-color: transparent ${WHITE} transparent transparent;
    }
  }
  &[data-placement*='left'] {
    right: 0;
    margin-right: -15px;
    height: 3em;
    width: 1em;
    &::before {
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent ${LILAC};
    }
    &::after {
      margin-left: 0;
      border-width: 9px 0 9px 9px;
      border-color: transparent transparent transparent ${WHITE};
    }
  }
  &::before {
    content: '';
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
  }
  &::after {
    content: '';
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin-left: 1px;
    margin-top: 1px;
  }
`;

const TOP = 'top';
const RIGHT = 'right';
const BOTTOM = 'bottom';
const LEFT = 'left';
const OFFSET = 15;
const ARROW_OFFSET = 10;

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
  };

  handleOutsideClick = event => {
    if (this.container && !this.container.contains(event.target)) {
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
    const items = tags.map(({ id, name, slug }) => (
      <Tag key={id} id={id} name={name} slug={slug} />
    ));
    const firstTag = tags[0];
    const { id, name, slug } = firstTag;
    return (
      <Container ref={this.assignContainer}>
        <Tag key={id} id={id} name={name} slug={slug} />
        {tags.length > 1 && (
          <Manager>
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
                      switch (placement) {
                        case TOP:
                          popper[TOP] -= OFFSET;
                          break;
                        case RIGHT:
                          popper[LEFT] += OFFSET;
                          break;
                        case BOTTOM:
                          popper[TOP] += OFFSET;
                          break;
                        case LEFT:
                          popper[LEFT] -= OFFSET;
                          break;
                        default:
                          break;
                      }
                      data.offsets.popper = popper;
                      return data;
                    }
                  }
                }}
              >
                {({ ref, style, placement, arrowProps }) => {
                  if ([TOP, BOTTOM].includes(placement)) {
                    arrowProps.style.left += ARROW_OFFSET;
                  } else if (placement === LEFT) {
                    arrowProps.style.top += ARROW_OFFSET;
                  }
                  return (
                    <div ref={ref} style={style} data-placement={placement}>
                      <Arrow
                        ref={arrowProps.ref}
                        data-placement={placement}
                        style={arrowProps.style}
                      />
                      <Content>
                        <Tags>{items.slice(1, items.length)}</Tags>
                      </Content>
                    </div>
                  );
                }}
              </Popper>
            )}
          </Manager>
        )}
      </Container>
    );
  }
}
