import styled from 'styled-components';
import { IProduct } from '../../types/product';
import { Block } from '../shared';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
//
import { Button, Icon, Progress } from '@gravity-ui/uikit';
import { Box } from '@gravity-ui/icons';
import { Star } from '@gravity-ui/icons';

interface Props {
  product: IProduct
}

function ProductItem({ product }: Props) {
  const navigate = useNavigate()
  const [priseDiscount, setPriseDiscount] = useState(0);
  const [rating, setRating] = useState(0)


  useEffect(() => {
    function CalcDiscount() {
      const discount = (product.price * product.discount) / 100;
      const newCount = product.price - discount
      const rating = (product.rating / 5) * 100;
      setRating(rating)

      setPriseDiscount(parseFloat(newCount.toFixed(2)))
    }

    CalcDiscount()
  }, [product])

  return (
    <Container onClick={() => navigate(`/${product.id}`)}>
      <ImgBlock>
        <Img src={product.img} />
      </ImgBlock>
      <Block flexD padd='10px 15px' gap='15px'>
        <Block style={{ width: '100%' }}>
          <Progress className='progressBar' text="rating" theme="info" value={rating} size='xs' />
        </Block>
        <Block justifyC style={{ width: '100%' }}>
          <Title>{product.name}</Title>
          <Block>
            <Prise>{product.price}</Prise>
            <Title>/{priseDiscount}</Title>
          </Block>
        </Block>
        <Block gap='5px'>
          <Button view="outlined" size="m">
            <Icon data={Box} size={18} />
            {product.count}
          </Button>
          <Button view="outlined" size="m">
            <Icon data={Star} size={18} />
            {product.rating}
          </Button>
        </Block>
      </Block>
    </Container>
  );
}

export default ProductItem;

const Container = styled.div`
  border: 1px solid rgba(1,1,1, 0.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const ImgBlock = styled.div`
  height: 300px; 
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
		/* height: 540px;  */
		/* transform: translate(-50%, -50%);  */
`;
const Title = styled.div`
`;
const Prise = styled.div`
  text-decoration: line-through;
`;
const Text = styled.div`

`;