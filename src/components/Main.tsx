import { ReactNode } from '@tanstack/react-router';
import styled from 'styled-components';

interface Props {
  children: ReactNode
}

function Main({ children }: Props) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default Main;

const Container = styled.div`
width: 85%;
  padding: 15px 30px;
  margin-top: 20px;
`;