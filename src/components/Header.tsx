import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Block } from './shared';
import { showPanelAtom } from '../atoms/product';
import { useAtom } from 'jotai';
import { Button, Text } from '@gravity-ui/uikit';
import AddPanelProduct, { IStepInput } from './AddPanelProduct';
import { isAuthUserAtom } from '../atoms/auth';
import axios from 'axios';




function Header() {
  const [show, setShow] = useAtom(showPanelAtom);
  const [iaAuth, setIsAuth] = useAtom(isAuthUserAtom);
  const navigate = useNavigate()

  const handleCloseMadel = () => {
    setShow(false)
  }
  const logOut = () => {
    setIsAuth(false)
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  function handleDownload() {
    window.open('https://vol.hivee.tech/api/data', '_blank');
    // try {
    //   const response = await axios.get('https://vol.hivee.tech/api/data', {
    //     responseType: 'blob', // Это важно для обработки бинарных данных
    //   });

    //   // Создаем URL для скачивания файла
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', 'data.json'); // Вы можете задать любое имя файла
    //   document.body.appendChild(link);
    //   link.click();
    //   link.parentNode?.removeChild(link);
    // } catch (error) {
    //   console.error('Error downloading the file', error);
    // }
  };

  const prevData: IStepInput[] = [
    {
      nameStep: 'Шаг 1 - Название и описание книжки',
      arrayInput: [
        {
          type: 'text',
          placeholder: 'Название книжки',
          name: 'name'
        },
        {
          type: 'text',
          placeholder: 'Название книжки',
          name: 'description'
        }
      ]
    },
    {
      nameStep: 'Шаг 2 - Цена, колличесвто, скидка и рейтинг книжки',
      arrayInput: [
        {
          type: 'number',
          placeholder: 'Ценна',
          name: 'price'
        },
        {
          type: 'number',
          placeholder: 'Колличество',
          name: 'count'
        },
        {
          type: 'number',
          placeholder: 'Скидка',
          name: 'discount'
        },
        {
          type: 'number',
          placeholder: 'Рейтинг',
          name: 'rating'
        }
      ]
    },
    {
      nameStep: 'Шаг 3 - Изображение книжки',
      arrayInput: [
        {
          type: 'url',
          placeholder: 'Ссылка url',
          name: 'img'
        }
      ]
    },
  ]

  return (
    <Container>
      <Block flexD gap='30px'>
        <Text variant='header-2'>BOOKSHOP</Text>

        {/* {iaAuth ? 'true' : 'false'} */}
        <Block flexD gap='15px'>
          <StyledNavLink to='/'>Книги</StyledNavLink>
          {iaAuth ? (
            <>
              <StyledNavLink to='/grafic'>График</StyledNavLink>
              <StyledNavLink to='/basket'>Корзина</StyledNavLink>
              <LinkBtn onClick={() => setShow(true)}>Написать книжку</LinkBtn>
              <LinkBtn onClick={logOut}>Выйти</LinkBtn>
              <LinkBtn onClick={handleDownload}>Загрузить</LinkBtn>
            </>
          ) :
            (
              <>
                <LinkBtn onClick={() => navigate('/login')}>Войти</LinkBtn>
              </>
            )
          }
        </Block>
      </Block>
      <AddPanelProduct show={show} onClose={handleCloseMadel} arrayInputData={prevData} />
    </Container>
  );
}

export default Header;

const Container = styled.div`
/* border: 1px solid red; */
width: 15%;
display: flex;
height: 100vh;
  padding: 30px; 
  background-color: #0f1b2d;
  color: #fff;
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
  transition: all 300ms ease-in;
  
 &:active {
   /* color: #a572f3;  */
  }
  &:hover {
    color: #fff;

   /* color: #a572f3; */
   padding-left: 5px;
 }
`

const LinkBtn = styled.span`
  color: #fff;
  cursor: pointer;
  transition: all 300ms ease-in;

  
 &:active {
   /* color: #a572f3;  */
  }
  &:hover {
   /* color: #a572f3; */
   cursor: pointer;
   padding-left: 5px;
 }
`