import styled from 'styled-components';
import Header from './components/Header';
import Main from './components/Main';
import { Outlet } from 'react-router-dom';

function Lauout() {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default Lauout;

const Container = styled.div`
  display: flex;
`;