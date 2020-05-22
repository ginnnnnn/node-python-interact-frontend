import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
  border-radius: 5px;
  background: #383e4d;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  position: relative;
`;
const TitleContainer = styled.div`
  padding: 0.5rem 30px 20px 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const Title = styled.div`
  width: 100%;
  font-size: 1.2rem;
  padding-bottom: 0.3rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  border-bottom: 1px solid #555555;
`;

const XUnit = styled.p`
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  color: lightgreen;
`;

const TrainLineChart = ({
  title,
  toShow,
  containerWidth,
  containerHeight,
  chartData,
}) => {
  if (containerWidth === 0) {
    return <CircularProgress />;
  }
  let dataKeyArr = [];
  if (chartData.length) {
    dataKeyArr = Object.keys(chartData[0]);
  }
  return (
    <ChartContainer>
      <TitleContainer>
        <Title>
          {title}({toShow.name}/{toShow.side === 'front' ? '正面' : '背面'})
        </Title>
      </TitleContainer>
      {chartData.length ? (
        <React.Fragment>
          <LineChart
            width={containerWidth * 0.85}
            height={containerHeight * 0.4}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKeyArr[1]}
              stroke="#8884d8"
              activeDot={false}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey={dataKeyArr[2]}
              stroke="#82ca9d"
              activeDot={false}
              dot={false}
            />
          </LineChart>
          <XUnit>epoch</XUnit>
        </React.Fragment>
      ) : (
        <CircularProgress />
      )}
    </ChartContainer>
  );
};

export default TrainLineChart;
