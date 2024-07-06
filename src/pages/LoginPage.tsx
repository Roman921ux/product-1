import styled from 'styled-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../feature/redux-hook';
// import { loginThunk } from '../feature/user/user-slice';
// toast
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function LoginPage() {
  const navigate = useNavigate()
  // const { _id } = useAppSelector(state => state.user.userInfo)
  // const dispatch = useAppDispatch()
  const [value, setValue] = useState({
    email: '',
    password: ''
  })

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue(prev => {
      return { ...prev, [name]: value }
    })
  }
  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Обработка отправки формы
    console.log(value);
    setValue({
      email: '',
      password: ''
    })
    // dispatch(loginThunk(value))
    //   .then((response) => {
    //     if (response.meta.requestStatus === 'rejected') {
    //       toast.error('Ошибка при авторизации!', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       throw new Error('Ошибка при регистрации пользователя');
    //     } else {
    //       toast.success('Вы авторизованы!', {
    //         position: "top-right",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       setTimeout(() => {
    //         navigate(`/profile`)
    //       }, 2000);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Ошибка при регистрации пользователя:', error.message);
    //   });
  }
  return (
    <Container>
      {/* <LeftBlock src={regist} /> */}
      {/* <ToastContainer /> */}
      <RightBlock>
        <Title>LOG IN</Title>
        <Form onSubmit={onSubmitForm}>
          <Input placeholder='Email:' name='email' type='email' value={value.email} onChange={onChangeValue} />
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