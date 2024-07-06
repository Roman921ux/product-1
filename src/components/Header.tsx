import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Block } from './shared';
import { showPanelAtom } from '../atoms/product';
import { useAtom } from 'jotai';
import { Button, Text } from '@gravity-ui/uikit';
import AddPanelProduct, { IStepInput } from './AddPanelProduct';
import { isAuthUserAtom } from '../atoms/auth';

function Header() {
  const [show, setShow] = useAtom(showPanelAtom);
  const [iaAuth, setIsAuth] = useAtom(isAuthUserAtom);
  const navigate = useNavigate()

  const handleCloseMadel = () => {
    setShow(false)
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
          type: 'file',
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

        {iaAuth ? 'true' : 'false'}
        <Block gap='15px' alignI='center'>
          <StyledNavLink to='/'>Products</StyledNavLink>
          {iaAuth ? (
            <>
              <StyledNavLink to='/profile'>Profile</StyledNavLink>
              <StyledNavLink to='/basket'>Basket</StyledNavLink>
              <Button view='raised' onClick={() => setShow(true)}>Создать товар</Button>
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