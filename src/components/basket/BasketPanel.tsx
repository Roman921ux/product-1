import { Button } from '@gravity-ui/uikit';
import axios from 'axios';
import styled from 'styled-components';

async function orderProduct() {
  const token = window.localStorage.getItem('token');
  const res = await axios.get('https://vol.hivee.tech/api/buy', {
    headers: {
      'Authorization': `${token}`,
    }
  });
  const data = await res.data;
  console.log('BasketPanel', data);
  return data
}

function BasketPanel() {
  return (
    <Container>
      <Button selected view='outlined-success' onClick={orderProduct}>Офромить заказ</Button>
    </Container>
  );
}

export default BasketPanel;

const Container = styled.div`
  /* position: fixed; */
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(1,1,1, 0.2);
  border-radius: 5px;
  width: 100%;

  height: 50px;
  padding: 0px 15px;
  margin-top: -20px;
`;