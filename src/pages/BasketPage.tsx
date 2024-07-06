import styled from 'styled-components';
import { IProduct } from '../types/product';
import ProductItem from '../components/product/ProductItem';
import BasketPanel from '../components/basket/BasketPanel';

function BasketPage() {
  const productsBasket: IProduct[] = [
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
    }
  ];
  return (
    <Container>
      <BasketPanel />
      <FlexBlock>
        {productsBasket.map(product => <ProductItem product={product} />)}
      </FlexBlock>
    </Container>
  );
}

export default BasketPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const FlexBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 100px;
`;