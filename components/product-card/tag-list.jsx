import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { BASE_TEXT } from "../../shared/style/typography";
import { GUNSMOKE, LILAC, WHITE } from "../../shared/style/colors";
// import {Manager, Target, Popper, Arrow} from 'react-popper';
import { Manager, Reference, Popper } from "react-popper";
import Tag from "./tag";

const Container = styled("div")({
  display: "flex",
  flexDirection: "row"
});

const Count = styled("a")({
  ...BASE_TEXT,
  display: "flex",
  alignItems: "center",
  marginLeft: 4,
  fontSize: 11,
  lineHeight: "16px",
  color: GUNSMOKE,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline"
  }
});

const Tags = styled("ul")({
  margin: 15,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  "> div": {
    marginTop: 15
  },
  "> div:first-child": {
    marginTop: 0
  }
});

const Content = styled("div")({
  border: `1px solid ${LILAC}`,
  backgroundColor: WHITE,
  // marginTop: 15,
  "&::before": {
    borderWidth: 11,
    content: '""',
    position: "absolute",
    left: "50%",
    marginLeft: -11,
    width: 0,
    height: 0,
    border: "solid transparent"
  },
  "&::after": {
    borderWidth: 10,
    content: '""',
    position: "absolute",
    marginLeft: -10,
    left: "50%",
    width: 0,
    height: 0,
    border: "solid transparent"
  },
  "&[data-placement*='bottom']": {
    marginTop: 15,
    "&::before": {
      top: -6,
      borderWidth: 11,
      borderColor: `transparent transparent ${LILAC} transparent`
    },
    "&::after": {
      top: -3,
      borderWidth: 10,
      borderColor: `transparent transparent ${WHITE} transparent`
    }
  },
  "&[data-placement*='top']": {
    marginTop: -15,
    "&::before": {
      bottom: -21,
      borderWidth: 11,
      borderColor: `${LILAC} transparent transparent transparent`
    },
    "&::after": {
      bottom: -18,
      borderWidth: 10,
      borderColor: `${WHITE} transparent transparent transparent`
    }
  }
});

const Arrow = styled("div")`
  position: absolute;
  width: 3em;
  height: 3em;
  &[data-placement*="bottom"] {
    top: 0;
    left: 0;
    margin-top: -0.9em;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 11px;
      border-color: transparent transparent #e8e8e8 transparent;
    }
    &::after {
      border-width: 10px;
      border-color: transparent transparent #fff transparent;
    }
  }
  &[data-placement*="top"] {
    top: 0;
    left: 0;
    margin-bottom: -0.9em;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 11px;
      border-color: transparent transparent #e8e8e8 transparent;
    }
    &::after {
      border-width: 10px;
      border-color: transparent transparent #fff transparent;
    }
  }
  ${"" /* &[data-placement*='top'] {
    bottom: 0;
    left: 0;
    margin-bottom: -0.9em;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 1em 1.5em 0 1.5em;
      border-color: #232323 transparent transparent transparent;
    }
  } */} &[data-placement*='right'] {
    left: 0;
    margin-left: -0.9em;
    height: 3em;
    width: 1em;
    &::before {
      border-width: 1.5em 1em 1.5em 0;
      border-color: transparent #232323 transparent transparent;
    }
  }
  &[data-placement*="left"] {
    right: 0;
    margin-right: -0.9em;
    height: 3em;
    width: 1em;
    &::before {
      border-width: 1.5em 0 1.5em 1em;
      border-color: transparent transparent transparent#232323;
    }
  }
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    margin-left: -11px;
    width: 0;
    height: 0;
    border: solid transparent;
  }
  &::after {
    content: "";
    position: absolute;
    margin-left: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border: solid transparent;
  }
`;

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

  render() {
    const { tags } = this.props;
    console.log(tags);
    const items = tags.map(tag => <Tag name={tag.name} url={tag.url} />);
    return (
      <Container>
        <Tag name={tags[0].name} />
        <Manager>
          <Count>
            <Reference>
              {({ ref }) => (
                <div ref={ref} onClick={this.handleClick}>
                  + {tags.length - 1}
                </div>
              )}
            </Reference>
          </Count>
          {this.state.isOpen && (
            <Popper placement="top">
              {({ ref, style, placement, arrowProps }) => (
                <div ref={ref} style={style} data-placement={placement}>
                  {/* <Arrow
                    innerRef={arrowProps.ref}
                    data-placement={placement}
                    style={arrowProps.style}
                  /> */}
                  {/* <Content data-placement={placement}> */}
                  <Content data-placement={placement}>
                    <Tags>{items}</Tags>
                  </Content>

                  {/* <div ref={arrowProps.ref} style={arrowProps.style} /> */}
                </div>
              )}
            </Popper>
          )}
        </Manager>
      </Container>
    );
  }
}
