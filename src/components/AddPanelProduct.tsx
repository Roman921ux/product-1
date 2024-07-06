import { Button, Text, TextInput } from '@gravity-ui/uikit';
import styled from 'styled-components'
import { CircleXmarkFill } from '@gravity-ui/icons';
import { useState } from 'react';
import { Block } from './shared/index';
// yup
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'


type Type = "number" | "text" | "search" | "tel" | "url" | "email" | "password" | "file";

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
        case 'url':
          fieldSchema = yup
            .string()
            .url(`${input.placeholder} должно быть корректным URL`)
            .required(`${input.placeholder} обязателен`);
          break;
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
  function submitDataForm(data: any) {
    if (!arrayInputData[indexStep + 1]) {
      alert('Форма подошла к концу');
      console.log('dataFrom', data);
      // setFormData(prev => ({ ...prev, ...data }));
      // console.log('Данные всей формы', formData);
      setFormData({});
      setIndexStep(0);
      onClose();
      reset();
      return
    }
    setFormData(prev => ({ ...prev, ...data }));
    console.log('data', data);
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
            if (input.type === "file") {
              return <input
                type={input.type}
                key={input.name}
                placeholder={input.placeholder}
                {...register(`${input.name}`)}
              // errorMessage={errors[input.name as InputName]?.message as React.ReactNode}
              // validationState={errors[input.name] && 'invalid'}
              />
            }
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
              Чтобы заполнить это поле, скопируйте url ссылку нужной вам картинки
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