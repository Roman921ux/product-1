import styled from 'styled-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import { isAuthUserAtom } from '../atoms/auth';
import { useAtom } from 'jotai';

async function loginFetch(body: any) {
  console.log('DataLogin', body)
  try {
    const res = await axios.post('/auth/login', body);
    return res.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

function LoginPage() {
  const navigate = useNavigate();
  const [iaAuth, setIsAuth] = useAtom(isAuthUserAtom);
  // const { _id } = useAppSelector(state => state.user.userInfo)
  // const dispatch = useAppDispatch()
  const [value, setValue] = useState({
    username: '',
    password: ''
  })

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue(prev => {
      return { ...prev, [name]: value }
    })
  }
  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await loginFetch(value).then(data => {
      localStorage.setItem('token', data.token);
      setIsAuth(true);
      navigate('/')
      console.log('iaAuth', iaAuth);
    })
    console.log(value);
    setValue({
      username: '',
      password: ''
    })
  }
  return (
    <Container>
      {/* <LeftBlock src={regist} /> */}
      {/* <ToastContainer /> */}
      <RightBlock>
        <Title>LOG IN</Title>
        <Form onSubmit={onSubmitForm}>
          <Input placeholder='Name:' name='username' type='text' value={value.username} onChange={onChangeValue} />
          <Input placeholder='Password:' name='password' type='password' value={value.password} onChange={onChangeValue} />
          <Button type='submit'>Войти</Button>
        </Form>
        <Block>
          <Text>Еще не зарегистрированы?</Text>
          <NavLink to='/register' style={{ "color": "inherit" }}>Регистрация</NavLink>
        </Block>
      </RightBlock>
    </Container>
  );
}

export default LoginPage;

const Container = styled.div`
/* border: 1px solid red; */
  height: 400px;
  width: 400px;
  margin: 0 auto;
  margin-top: 25px;
  border: 1px solid rgba(1,1,1, 0.2);

  //
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;
// const LeftBlock = styled.img`
//   width: 50%;
// `;
const RightBlock = styled.div`
/* border: 1px solid red; */

  /* width: 50%; */
  border-radius: 0 5px 5px 0;
  background-color: #fff;
  //
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;
const Title = styled.span`
  font-size: 25px;
  font-weight: 800;
`;
const Text = styled.span`
  font-size: 12px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Input = styled.input`
  font-size: 12px;
  width: 290px;
`;
const Button = styled.button`
  font-size: 12px;
  margin-top: 25px;
  width: 290px;
  padding: 10px 0;
`;