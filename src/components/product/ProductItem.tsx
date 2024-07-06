import styled from 'styled-components';
import { IProduct } from '../../types/product';
import { Block } from '../shared';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: IProduct
}

function ProductItem({ product }: Props) {
  const navigate = useNavigate()
  return (
    <Container onClick={() => navigate(`/${product.id}`)}>
      <ImgBlock>
        <Img src={product.img} />
      </ImgBlock>
      <Block justifyC padd='10px 15px'>
        <Title>{product.name}</Title>
        <Title>{product.price}</Title>
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

const Text = styled.div`

`;