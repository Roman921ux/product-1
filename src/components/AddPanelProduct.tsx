import { Button, Text, TextInput } from '@gravity-ui/uikit';
import styled from 'styled-components'
import { CircleXmarkFill } from '@gravity-ui/icons';
import { useState } from 'react';
import { Block } from './shared/index';
// yup
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import axios from 'axios';


type Type = "number" | "text" | "search" | "tel" | "url" | "email" | "password";

type InputName = 'name' | 'description' | 'price' | 'rating' | 'discount' | 'count' | 'img';

interface IInputItem {
  type: Type;
  placeholder: string;
  name: InputName
}

export interface IStepInput {
  nameStep: string;
  arrayInput: IInputItem[]
}

interface Props {
  show: boolean;
  onClose: () => void;
  arrayInputData: IStepInput[]
}

interface IBody {
  count: string;
  description: string;
  discount: string;
  img: string;
  name: string;
  price: string;
  rating: string;
}

// https://torange.biz/photo/15/HD/trade-torn-shoes-cheap-sneakers-15442.jpg
async function createProduct(body: IBody) {
  const token = window.localStorage.getItem('token');
  const finalBody = {
    count: parseInt(body.count),
    description: body.description,
    discount: parseInt(body.discount),
    img: body.img,
    name: body.name,
    price: parseInt(body.price),
    rating: parseInt(body.rating)
  }
  if (token) {
    console.log('token', token)
    console.log('body', finalBody)
    const res = await axios.post('https://vol.hivee.tech/api/product', finalBody, {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.data;
    return data;
  } else {
    console.error('Token is missing');
  }
}

function AddPanelProduct({ show, onClose, arrayInputData }: Props) {
  const [indexStep, setIndexStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver<any>(getCurrentSchema()),
    mode: "onSubmit",
  })


  // перемещение назад
  const handleBack = () => {
    setIndexStep(prev => prev - 1)
  }
  // закыть окно
  const handleOnClose = () => {
    setIndexStep(0)
    onClose()
  }
  if (!show) {
    return null
  }

  // функция динамической генерации валидации
  function getCurrentSchema() {
    const schemaFields = arrayInputData[indexStep].arrayInput.reduce((acc, input) => {
      let fieldSchema;
      switch (input.type) {
        case 'text':
          fieldSchema = yup.string().required(`${input.placeholder} обязателен`);
          break;
        case 'number':
          fieldSchema = yup.number().typeError(`${input.placeholder} должно быть числом`).required(`${input.placeholder} обязателен`);
          break;
        // case 'file':
        //   fieldSchema = yup
        //     .mixed()
        //     .test('fileRequired', `${input.placeholder} обязателен`, (value) => {
        //       return value instanceof File;
        //     })
        //     .required(`${input.placeholder} обязателен`);
        //   break

        // case 'date':
        //   fieldSchema = yup.date().typeError(`${input.placeholder} должна быть датой`).required(`${input.placeholder} обязательна`);
        //   break;
        default:
          fieldSchema = yup.string();
      }
      return {
        ...acc,
        [input.name]: fieldSchema,
      };
    }, {});

    return yup.object().shape(schemaFields);
  };
  async function submitDataForm(data: any) {
    if (!arrayInputData[indexStep + 1]) {
      alert('Форма подошла к концу');
      console.log('dataFrom сверху', data);
      console.log('dataFrom сверху', formData);
      // setFormData(prev => ({ ...prev, ...data }));
      // console.log('Данные всей формы', formData);
      await createProduct(data)
        .then(res => console.log('createProductResult', res))
        .catch(err => console.log('createProductRrror', err))
      setFormData({});
      setIndexStep(0);
      onClose();
      reset();
      return
    }
    setFormData(prev => ({ ...prev, ...data }));
    console.log('Formdata снизу', data);
    setIndexStep(prev => prev + 1)
  }

  return (
    <ModalBlock>
      <Content>
        <Text variant='header-2'>Создание товара</Text>
        <WarnMessage>
          Будте аккуратны при заполнение данных карточки товара, если вы допустите ошибку,
          вам придется удалить эту карточку
        </WarnMessage>
        <Form onSubmit={handleSubmit(submitDataForm)}>
          <TitleStep>{arrayInputData[indexStep].nameStep}</TitleStep>
          {/* здесь мапяться инпуты */}
          {arrayInputData[indexStep].arrayInput.map(input => {
            // if (input.type === "file") {
            //   return <input
            //     type={input.type}
            //     key={input.name}
            //     placeholder={input.placeholder}
            //     {...register(`${input.name}`)}
            //   // errorMessage={errors[input.name as InputName]?.message as React.ReactNode}
            //   // validationState={errors[input.name] && 'invalid'}
            //   />
            // }
            return <TextInput
              type={input.type}
              key={input.name}
              placeholder={input.placeholder}
              {...register(`${input.name}`)}
              errorMessage={errors[input.name as InputName]?.message as React.ReactNode}
              validationState={errors[input.name] && 'invalid'}
            />
          }

          )
          }
          {!arrayInputData[indexStep + 1] &&
            <WarnMessageEnd>
              Внимательно проверьте все данные перед создание product
            </WarnMessageEnd>}
          <Block justifyC style={{ marginTop: '15px' }}>
            {indexStep === 0 ?
              (<Button onClick={onClose} view='outlined' size='m'>Отмена</Button>) :
              (<Button onClick={handleBack} view='outlined' size='m'>Назад</Button>)
            }
            {arrayInputData[indexStep + 1] ?
              (<Button type='submit' view='action' size='m'>Далее</Button>) :
              (<Button type='submit' view='action' size='m'>Сохранить</Button>)
            }
          </Block>
        </Form>

        <ModalBtn>
          <CircleXmarkFill onClick={handleOnClose} />
        </ModalBtn>
      </Content>
    </ModalBlock>
  );
}

export default AddPanelProduct;


const ModalBlock = styled.div`
  position: fixed;
  z-index: 1000;
top: 0;
left: 0;
background-color: rgba(1, 1, 1, 0.3);
height: 100%;
width: 100%;
display: flex;
justify-content: center;
 align-items: center;
 gap: 10px;
`

const Content = styled.div`
/* border: 1px solid #000; */
background-color: #fff;
width: 500px;
color: #000;
padding: 15px;
border-radius: 5px;
position: relative;
display: flex;
flex-direction: column;
gap: 20px;
`

const ModalBtn = styled.div`
position: absolute;
top: 5px;
right: -30px;
cursor: pointer;
`
const Form = styled.form`
display: flex;
flex-direction: column;
gap: 5px;
`

const WarnMessage = styled.div`
background-color: #f5f5f5;
color: #939292;
padding: 10px 15px;
border-radius: 5px;
font-size: 14px;
line-height: 25px;
`

const WarnMessageEnd = styled.div`
/* background-color: #f5f5f5; */
color: #e72222;
padding: 5px 5px;
padding-bottom: 0;
border-radius: 5px;
font-size: 10px;
`

const TitleStep = styled.div`
color: #939292;
border-radius: 5px;
font-size: 16px;
margin-bottom: 10px;
`