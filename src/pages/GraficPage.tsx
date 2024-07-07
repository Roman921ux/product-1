import { Loader } from '@gravity-ui/uikit';
import axios from 'axios';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import SalesChart from '../components/graf/GrafComponent';


export interface IGraf {
  day: string;
  sales_count: number;
}

async function fetchData(): Promise<IGraf[]> {
  const res = await axios.get('https://vol.hivee.tech/api/graf');
  const data = await res.data
  return data
}

function GraficPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['grafic'],
    queryFn: fetchData
  })

  const salesData = [
    {
      "day": "2023-07-01",
      "sales_count": 150
    },
    {
      "day": "2023-07-02",
      "sales_count": 200
    },
    {
      "day": "2023-07-03",
      "sales_count": 175
    }
  ];

  if (isLoading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader size="s" /></div>
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>День</Th>
            <Th>Заказы</Th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <Td>{item.day}</Td>
              <Td>{item.sales_count}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data && <SalesChart data={data} />}
    </Container>
  );
}

export default GraficPage;

const Container = styled.div`
/* border: 1px solid red; */
  width: 100%; 
  /* height: 100vh; */
display: flex;
gap: 15px;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Table = styled.table`
  width: 50%;
  /* border-collapse: collapse; */
  margin: 20px 0;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  text-align: left;
  border: 1px solid #ddd;
  padding: 8px;
  
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 5px; 
`;