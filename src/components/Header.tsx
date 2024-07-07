import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Block } from './shared';
import { showPanelAtom } from '../atoms/product';
import { useAtom } from 'jotai';
import { Button, Text } from '@gravity-ui/uikit';
import AddPanelProduct, { IStepInput } from './AddPanelProduct';
import { isAuthUserAtom } from '../atoms/auth';
import axios from 'axios';


async function handleDownload() {
  try {
    const response = await axios.get('https://vol.hivee.tech/api/data', {
      responseType: 'blob', // Это важно для обработки бинарных данных
    });

    // Создаем URL для скачивания файла
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.json'); // Вы можете задать любое имя файла
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  } catch (error) {
    console.error('Error downloading the file', error);
  }
};

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

  const prevData: IStepInput[] = [
    {
      nameStep: 'Шаг 1 - Название и описание товара',
      arrayInput: [
        {
          type: 'text',
          placeholder: 'Название товара',
          name: 'name'
        },
        {
          type: 'text',
          placeholder: 'Название товара',
          name: 'description'
        }
      ]
    },
    {
      nameStep: 'Шаг 2 - Цена, колличесвто, скидка и рейтинг товара',
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
      nameStep: 'Шаг 3 - Изображение товара',
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
      <Block justifyC alignI='center'>
        <Text variant='header-1'>SNEAKERS</Text>

        {/* {iaAuth ? 'true' : 'false'} */}
        <Block gap='15px' alignI='center'>
          <StyledNavLink to='/'>Products</StyledNavLink>
          {iaAuth ? (
            <>
              <StyledNavLink to='/grafic'>График</StyledNavLink>
              <StyledNavLink to='/basket'>Basket</StyledNavLink>
              <Button view='raised' onClick={() => setShow(true)}>Создать товар</Button>
              <Button view='raised' onClick={logOut}>Выйти</Button>
              <Button selected view='raised' onClick={handleDownload}>Скачать данные</Button>
            </>
          ) :
            (
              <>
                <Button view='raised' onClick={() => navigate('/login')}>Войти</Button>
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

  padding: 15px 30px; 
  background-color: #000;
  color: #fff;
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
  
 &:active {
   color: #a572f3; 
  }
  &:hover {
   color: #a572f3;
 }
`