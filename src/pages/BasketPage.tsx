import styled from 'styled-components';
import ProductItem from '../components/product/ProductItem';
import BasketPanel from '../components/basket/BasketPanel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '../types/product'
import { useQuery } from 'react-query';

// interface IApiResponse {
//   id: number;
//   user_id: number;
//   User: {
//     id: number;
//     username: string;
//     password: string;
//     token: string;
//   };
//   products: IProduct[] | null; // здесь any[] можно заменить на конкретный тип продуктов, если они известны
// }

async function fethcProduct(): Promise<IProduct[]> {
  const token = window.localStorage.getItem('token');
  const res = await axios.get('https://vol.hivee.tech/api/basket', {
    headers: {
      'Authorization': `${token}`,
    }
  });
  const data = await res.data;
  console.log('BasketPageData', data);
  return data
}

function BasketPage() {
  // const [productsBasket, setProductsBasket] = useState<IApiResponse>()
  const { data } = useQuery({
    queryKey: ['basket'],
    queryFn: fethcProduct
  })

  // useEffect(() => {
  //   fethcProduct().then(res => {
  //     console.log('BasketPageData', res);
  //     setProductsBasket(res)
  //   })
  // }, [])

  return (
    <Container>
      <BasketPanel />
      <FlexBlock>
        {data?.map(product => <ProductItem key={product.id} product={product} />)}
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