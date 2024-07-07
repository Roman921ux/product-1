import styled from 'styled-components';
import ProductItem from '../components/product/ProductItem';
import { IProduct } from '../types/product';
import { useQuery } from 'react-query';
import { Loader } from '@gravity-ui/uikit';

async function fethcProduct(): Promise<IProduct[]> {
  const res = await fetch(`https://vol.hivee.tech/api/products`);
  const data = await res.json();
  return data
}

function ProductPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: fethcProduct
  });

  if (isLoading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader size="s" /></div>
  }
  return (
    <Container>
      <FlexBlock>
        {data?.map(product => <ProductItem product={product} />)}
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
  /* display: grid;
  grid-auto-flow: flow;
  gap: 15px; */
`;