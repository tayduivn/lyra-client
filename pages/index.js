import App from '../components/App';
import Header from '../components/Header';
import Submit from '../components/Submit';
import PostList from '../components/PostList';
import ProductCard from '../components/product-card';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const productsQuery = gql`
  query products($first: Int!) {
    products(first: $first) {
      id
      name
      slug
      description
      imageUrl
      topics {
        id
        name
        slug
      }
    }
  }
`;

export const productsQueryVars = {
  first: 5
};

export default () => (
  <App>
    {/* <Header />
    <Submit />
    <PostList /> */}
    <Query query={productsQuery} variables={productsQueryVars}>
      {({loading, error, data: {products, _productsMeta}, fetchMore}) => {
        if (loading) return <div>Loading</div>;
        // console.log(error);
        const product = products[0];
        console.log('products', products);
        return (
          <div>
            <pre>{products.toString()}</pre>
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              imageUrl={product.imageUrl}
              tags={product.topics}
            />
          </div>
        );
        // return <pre>{products.toString()}</pre>;
      }}
    </Query>
  </App>
);
