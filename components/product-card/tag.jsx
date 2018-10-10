import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { BASE_TEXT } from "../../shared/style/typography";
import { ALABASTER, LILAC, GUNSMOKE } from "../../shared/style/colors";

const HEIGHT = 24;

const Action = styled("span")({
  display: "inline-flex",
  height: HEIGHT,
  width: 0,
  lineHeight: "21px",
  color: GUNSMOKE,
  borderLeft: `0 solid ${LILAC}`,
  justifyContent: "center",
  transition: "width .1s ease-out",
  "&:hover": {
    backgroundColor: LILAC,
    cursor: "pointer"
  }
});

const Container = styled("div")({
  ...BASE_TEXT,
  border: `1px solid ${LILAC}`,
  backgroundColor: ALABASTER,
  borderRadius: 3,
  display: "inline-flex",
  alignItems: "center",
  height: HEIGHT,
  "&:hover": {
    [Action]: {
      borderLeftWidth: 1,
      width: 24,
      "&::after": {
        content: `'+'`
      }
    }
  },
  [Action]: {}
});

const Link = styled("a")({
  padding: "0 8px",
  color: GUNSMOKE,
  display: "inline-flex",
  lineHeight: "24px",
  fontSize: 11,
  textTransform: "uppercase",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: LILAC,
    cursor: "pointer"
  }
});

export default class Tag extends Component {
  static propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    onClick: PropTypes.func
  };
  render() {
    const { name, url, onClick } = this.props;
    return (
      <Container>
        <Link href={url}>{name}</Link>
        <Action onClick={onClick} />
      </Container>
    );
  }
}
