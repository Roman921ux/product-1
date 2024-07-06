import { Button, Text } from '@gravity-ui/uikit';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Block } from '../components/shared';

function DetailProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = {
    id: 1,
    name: 'Product 1',
    description: 'Description for product 1',
    price: 29.99,
    rating: 4.5,
    discount: 10,
    count: 100,
    img: 'https://via.placeholder.com/150',
  }
  return (
    <Container>
      <LBlock>
        <ImgBlock>
          <Img src={product.img} />
        </ImgBlock>
      </LBlock>
      <RBlock>
        <Button onClick={() => navigate('/')}>Назад</Button>
        <Block flexD gap='15px' padd='15px 30px'>
          <Text variant='body-3'>{product.name}</Text>
          <Text variant='caption-2' color='secondary'>{product.description}</Text>
          <Block gap='5px'>
            <Text variant='caption-2' color='secondary'>{product.count}</Text>
            <Text variant='caption-2' color='secondary'>{product.price}</Text>
            <Text variant='caption-2' color='secondary'>{product.rating}</Text>
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
