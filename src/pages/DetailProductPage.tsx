import { Button, Label, Text } from '@gravity-ui/uikit';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Block } from '../components/shared';
import { useEffect, useState } from 'react';
import { Prise } from '../components/product/ProductItem';

function DetailProductPage() {
  const [priseDiscount, setPriseDiscount] = useState<number>(0)
  const { id } = useParams()
  const navigate = useNavigate()
  const product = {
    id: 1,
    name: 'Product 1',
    description: 'Description for prcript  or prcript scription fo or prcript scription fo  or prcript scription fo or prcript scription fo or prcript scription fo or prcript scription foscription fo or product sr',
    price: 29.99,
    rating: 4.5,
    discount: 10,
    count: 100,
    img: 'https://via.placeholder.com/150',
  }

  function addToBasketProduct() {
    // запрос на создания продукта в корзине
    // используй axios, создай инстанс с базовой ссылкой 
    // там-же можно вшить заголовок с token(ом)
  }

  useEffect(() => {
    function CalcDiscount() {
      const discount = (product.price * product.discount) / 100;
      const newCount = product.price - discount
      setPriseDiscount(parseFloat(newCount.toFixed(2)))
    }

    CalcDiscount()
  }, [product])


  return (
    <Container>
      <LBlock>
        <ImgBlock>
          <Img src={product.img} />
        </ImgBlock>
      </LBlock>
      <RBlock>
        <Block gap='5px'>
          <Button onClick={() => navigate('/')}>Назад</Button>
          <Button selected view='action' onClick={addToBasketProduct}>В корзину</Button>
        </Block>
        <Block flexD gap='30px' padd='15px 30px'>
          <Block flexD gap='15px'>
            <Text variant='display-3'>{product.name}</Text>
            <Text variant='caption-2' color='secondary'>{product.description}</Text>
          </Block>
          <Block gap='5px' flexD>
            <Label theme="normal" value={`${priseDiscount} рублей`}>
              <Text variant='code-2' color='secondary'>Цена</Text>
            </Label>
            <Label theme="normal" value={`${product.discount} %`}>
              <Text variant='code-2' color='secondary'>Скидка</Text>
            </Label>
            <Label theme="normal" value={`${product.count} едениц`}>
              <Text variant='code-2' color='secondary'>Колличество</Text>
            </Label>
            <Label theme="normal" value={`${product.rating}`}>
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
