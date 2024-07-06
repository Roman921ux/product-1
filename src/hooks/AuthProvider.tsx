import { ReactNode } from '@tanstack/react-router';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  children: ReactNode
}

function AuthProvider({ children }: Props) {
  const token = window.localStorage.getItem('token');
  // const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <Container>
      {children}
    </Container>
  );
}

export default AuthProvider;

const Container = styled.div`
`;