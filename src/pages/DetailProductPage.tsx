import { Button, Label, Loader, Text } from '@gravity-ui/uikit';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Block } from '../components/shared';
import { useEffect, useState } from 'react';
import { IProduct } from '../types/product';
//
import axios from '../utils/axios'


// /api/product
function DetailProductPage() {
  const [data, setDate] = useState<IProduct | null>(null)
  const { id } = useParams<{ id: string }>(); // Получаем id из параметров URL
  const productId = parseInt(id as string, 10); // Преобразуем id в число

  const [priseDiscount, setPriseDiscount] = useState<number>(0)

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProduct(id: number): Promise<IProduct> {
      const res = await axios.get(`https://vol.hivee.tech/api/product`, {
        params: { id }
      });
      console.log('DetailProduct', res.data)

      return res.data;
    }
    fetchProduct(productId).then(res => setDate(res))
  }, [])



  function addToBasketProduct() {
    // запрос на создания продукта в корзине
    // используй axios, создай инстанс с базовой ссылкой 
    // там-же можно вшить заголовок с token(ом)
  }

  useEffect(() => {
    function CalcDiscount() {
      if (data) {
        const discount = (data?.price * data?.discount) / 100;
        const newCount = data?.price - discount
        setPriseDiscount(parseFloat(newCount.toFixed(2)))
      }
    }

    CalcDiscount()
  }, [data])


  if (!data) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader size="s" /></div>
  }

  return (
    <Container>
      <LBlock>
        <ImgBlock>
          <Img src={data?.img} />
        </ImgBlock>
      </LBlock>
      <RBlock>
        <Block gap='5px'>
          <Button onClick={() => navigate('/')}>Назад</Button>
          <Button selected view='action' onClick={addToBasketProduct}>В корзину</Button>
        </Block>
        <Block flexD gap='30px' padd='15px 30px'>
          <Block flexD gap='15px'>
            <Text variant='display-3'>{data?.name}</Text>
            <Text variant='caption-2' color='secondary'>{data?.description}</Text>
          </Block>
          <Block gap='5px' flexD>
            <Label theme="normal" value={`${priseDiscount} рублей`}>
              <Text variant='code-2' color='secondary'>Цена</Text>
            </Label>
            <Label theme="normal" value={`${data?.discount} %`}>
              <Text variant='code-2' color='secondary'>Скидка</Text>
            </Label>
            <Label theme="normal" value={`${data?.count} едениц`}>
              <Text variant='code-2' color='secondary'>Колличество</Text>
            </Label>
            <Label theme="normal" value={`${data?.rating}`}>
              <Text variant='code-2' color='secondary'>Рейтинг</Text>
            </Label>
          </Block>
        </Block>
      </RBlock>
    </Container>
  );
}

export default DetailProductPage;

const Container = styled.div`
  /* border: 1px solid blue; */
  height: calc(100vh - 100px);
  width: 100%;
  display: flex;
`;


const LBlock = styled.div`
  height: 100%;
  width: 70%;
  /* border: 1px solid red; */

`;

const RBlock = styled.div`
  width: 30%;
  /* border: 1px solid red; */
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  gap: 15px;
`;

export const ImgBlock = styled.div`
  height: 100%; 
	width: 100%; 
	border-radius: 5px; 
	/* border: 1px solid red;  */
	/* position: relative;  */
	overflow: hidden; 
`;
export const Img = styled.img`
  object-fit: cover; 
	/* position: absolute;  */
		/* left: 50%; 
		top: 60%;  */
	width: 100%; 
	height: 100%; 
		/* transform: translate(-50%, -50%);  */
`;
