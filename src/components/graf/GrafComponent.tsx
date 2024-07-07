import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Регистрация компонентов
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Интерфейс для данных
interface SalesData {
  day: string;
  sales_count: number;
}

interface SalesChartProps {
  data: SalesData[];
}

const ChartContainer = styled.div`
  width: 80%;
  height: 400px;
  margin: 0 auto;
`;

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const labels = data.map(item => item.day);
  const salesCounts = data.map(item => item.sales_count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Количество продаж',
        data: salesCounts,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: '#007bff',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top', // допустимые значения: 'top', 'left', 'bottom', 'right'
      },
      title: {
        display: true,
        text: 'Продажи за последние дни',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Дата',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Количество продаж',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <ChartContainer>
      <Bar data={chartData} options={options} />
    </ChartContainer>
  );
};

export default SalesChart;
