/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import React from 'react';
import ReactDOM from 'react-dom';
import Plain from 'slate-plain-serializer';
import initialValue from './value.json';
import styled from '@emotion/styled';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';

import { Button, Menu } from './components';

const emptyState =
  '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"line","data":{},"nodes":[{"object":"text","text":"","marks":[]}]}]}}';

const StyledButton = styled('span')({
  ...BASE_TEXT,
  cursor: 'pointer'
});

const EditorWrapper = styled('div')({
  position: 'relative'
});

const Placeholder = styled('span')({
  ...BASE_TEXT
});

const MarkButton = ({ editor, type, children }) => {
  const { value } = editor;
  const isActive = value.activeMarks.some(mark => mark.type === type);
  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={event => {
        event.preventDefault();
        editor.toggleMark(type);
      }}
    >
      {children}
    </Button>
  );
};

const HoverMenu = React.forwardRef(({ editor }, ref) => {
  return (
    <Menu ref={ref}>
      <MarkButton editor={editor} type="bold">
        <StyledButton css={{ fontWeight: WEIGHT.BOLD }}>B</StyledButton>
      </MarkButton>
      <MarkButton editor={editor} type="italic">
        <StyledButton css={{ fontStyle: 'italic' }}>I</StyledButton>
      </MarkButton>
      <MarkButton editor={editor} type="underlined">
        <StyledButton css={{ textDecoration: 'underline' }}>U</StyledButton>
      </MarkButton>
    </Menu>
  );
});

class HoveringMenu extends React.Component {
  state = {
    value: Value.fromJSON(initialValue)
    // showPlaceholder: JSON.stringify(Value.fromJSON(initialValue)) === emptyState
  };

  menuRef = React.createRef();

  componentDidMount = () => {
    this.updateMenu();
  };

  componentDidUpdate = () => {
    this.updateMenu();
  };

  updateMenu = () => {
    const menu = this.menuRef.current;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style');
      return;
    }
    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    // menu.style.top = `0px`;

    // menu.style.left = `0px`;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`;
  };

  render() {
    return (
      <Editor
        value={this.state.value}
        onChange={this.onChange}
        renderEditor={this.renderEditor}
        renderMark={this.renderMark}
      />
    );
  }

  renderEditor = (props, editor, next) => {
    const children = next();
    return (
      <React.Fragment>
        {children}
        {/* {this.state.showPlaceholder ? (
          <Placeholder>Enter a description here...</Placeholder>
        ) : (
          ''
        )} */}
        <HoverMenu ref={this.menuRef} editor={editor} />
      </React.Fragment>
    );
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  onChange = ({ value }) => {
    const { setDescription } = this.props;
    setDescription(JSON.stringify(value));
    // let showPlaceholder = this.state.showPlaceholder;
    // if (JSON.stringify(value) === emptyState) {
    //   showPlaceholder = true;
    //   console.log('empty editor');
    // } else {
    //   showPlaceholder = false;
    //   console.log('There is content NOT EMPTY');
    // }
    this.setState({ value });
  };
}

export default HoveringMenu;
