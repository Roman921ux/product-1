import styled from 'styled-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
//
import axios from '../utils/axios'

async function registerFetch(body: any) {
  const res = await axios.post('auth/registration', body);
  const data = await res.data
  return data;
}

function RegisterPage() {
  const navigate = useNavigate();

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
  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    console.log('Запрос!');
    event.preventDefault();

    await registerFetch(value).then(data => {
      console.log('DataRegister', data)
      navigate('/login')
    })

    setValue({
      username: '',
      password: ''
    })
  }


  return (
    <Container>
      {/* <LeftBlock src={regist} /> */}
      <RightBlock>
        {/* <ToastContainer /> */}
        <Title>SIGN UP</Title>
        <Form onSubmit={onSubmitForm}>
          <Input placeholder='Name:' name='username' type='text' value={value.username} onChange={onChangeValue} />
          <Input placeholder='Password:' name='password' type='password' value={value.password} onChange={onChangeValue} />
          <Button type='submit'>Регистрация</Button>
        </Form>
        <Block>
          <Text>Уже зарегестрированы?</Text>
          <NavLink to='/login' style={{ "color": "inherit" }}>Войти</NavLink>
        </Block>
      </RightBlock>
      {/* <ToastContainer /> */}
    </Container>
  );
}

export default RegisterPage;

const Container = styled.div`
  height: 400px;
  width: 400px;
  margin: 0 auto;
  margin-top: 25px;
  //
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(1,1,1, 0.2);
  border-radius: 5px;
`;
const RightBlock = styled.div`
  width: 50%;
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
  font-weight: 900;
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