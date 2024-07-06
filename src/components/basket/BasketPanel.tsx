import { Button } from '@gravity-ui/uikit';
import styled from 'styled-components';

function BasketPanel() {
  return (
    <Container>
      <Button selected view='action'>Офромить заказ</Button>
    </Container>
  );
}

export default BasketPanel;

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(1,1,1, 0.2);
  border-radius: 5px;
  width: 90%;

  height: 50px;
  padding: 0px 15px;

`;