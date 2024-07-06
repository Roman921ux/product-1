import styled from 'styled-components';
import ProductItem from '../components/product/ProductItem';
import { IProduct } from '../types/product';

function ProductPage() {

  const products: IProduct[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      price: 29.99,
      rating: 4.5,
      discount: 10,
      count: 100,
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      price: 49.99,
      rating: 4.0,
      discount: 5,
      count: 200,
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for product 3',
      price: 19.99,
      rating: 3.5,
      discount: 15,
      count: 300,
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for product 4',
      price: 39.99,
      rating: 4.8,
      discount: 20,
      count: 150,
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description for product 5',
      price: 24.99,
      rating: 4.3,
      discount: 8,
      count: 180,
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description for product 6',
      price: 59.99,
      rating: 4.7,
      discount: 12,
      count: 220,
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 7,
      name: 'Product 7',
      description: 'Description for product 7',
      price: 34.99,
      rating: 4.1,
      discount: 18,
      count: 170,
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 8,
      name: 'Product 8',
      description: 'Description for product 8',
      price: 44.99,
      rating: 4.6,
      discount: 9,
      count: 140,
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 9,
      name: 'Product 9',
      description: 'Description for product 9',
      price: 54.99,
      rating: 4.4,
      discount: 11,
      count: 210,
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 10,
      name: 'Product 10',
      description: 'Description for product 10',
      price: 39.99,
      rating: 4.9,
      discount: 5,
      count: 160,
      img: 'https://via.placeholder.com/150',
    },
  ];
  return (
    <Container>
      <FlexBlock>
        {products.map(product => <ProductItem product={product} />)}
      </FlexBlock>
    </Container>
  );
}

export default ProductPage;

const Container = styled.div`
  width: 100%; 
  align-items: center;
`;

const FlexBlock = styled.div` 
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px; 
`;