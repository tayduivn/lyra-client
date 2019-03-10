import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { LILAC, ALABASTER } from '../../shared/style/colors';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import ProductCard from '../product-card';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${LILAC}`,
  padding: 0
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 20px 0 20px',
  padding: '20px 0 15px 0',
  borderBottom: `1px solid ${LILAC}`
});

const Day = styled('div')({
  ...BASE_TEXT,
  fontSize: 20,
  fontWeight: WEIGHT.LITE
});

const List = styled('ul')({
  padding: 0,
  margin: 0,
  ' > li': {
    '&:hover': {
      backgroundColor: ALABASTER
    }
  }
});

const Navigation = styled('div')({
  ...BASE_TEXT,
  fontSize: 11,
  textTransform: 'uppercase',
  ' > a:first-child': {
    borderRight: `1px solid ${LILAC}`
  }
});

const Filter = styled('a')({
  padding: '0 .5em',
  cursor: 'pointer'
});

export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array
  };

  render() {
    const { products } = this.props;
    return (
      <Container>
        <Header>
          <Day>Today</Day>
          <Navigation>
            <Filter>Popular</Filter>
            <Filter>Newest</Filter>
          </Navigation>
        </Header>
        <List>
          {products.map(product => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              imageUrl={product.imageUrl}
              tags={product.topics}
            />
          ))}
        </List>
      </Container>
    );
  }
}
