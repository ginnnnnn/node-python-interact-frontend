import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import TrainLineChart from './Line-Chart-Result.component';
import url from '../ui/url';

const TrainResultContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrainResult = ({
  toShow,
  trainChartData,
  setTrainChartData,
  isFetching,
  setIsFetching,
}) => {
  // toShow={
  //     type:"train",
  //     name:"xxx",
  //     side:"back"
  //   }
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);
  useEffect(() => {
    // { data: dataArr, isKilled: isKilled, msg: recipeName }
    const currentTrainName = `${toShow.name}_${toShow.side}_${toShow.type}`;
    let timeout;
    if (
      !isFetching &&
      !trainChartData.isKilled &&
      currentTrainName === trainChartData.msg
    ) {
      timeout = setTimeout(() => {
        console.log('train');

        setIsFetching(true);
        fetch(`${url}/api/get-training-log`, {
          method: 'POST',
          body: JSON.stringify({ recipeName: trainChartData.msg }),
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setTrainChartData(data);
            setIsFetching(false);
          });
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [setTrainChartData, toShow, isFetching, trainChartData, setIsFetching]);
  const {
    train_acc,
    train_loss,
    validation_acc,
    validation_loss,
  } = trainChartData.data;
  const accurencyChartData = train_acc.map((y, i) => {
    return {
      name: i,
      train_acc: y,
      validation_acc: validation_acc[i],
    };
  });
  const lossChartData = train_loss.map((y, i) => {
    return {
      name: i,
      train_loss: y,
      validation_loss: validation_loss[i],
    };
  });
  return (
    <TrainResultContainer ref={targetRef}>
      <TrainLineChart
        title="Accurency"
        toShow={toShow}
        chartData={accurencyChartData}
        containerWidth={dimensions.width}
        containerHeight={dimensions.height}
      />
      <TrainLineChart
        title="Loss"
        toShow={toShow}
        chartData={lossChartData}
        containerWidth={dimensions.width}
        containerHeight={dimensions.height}
      />
    </TrainResultContainer>
  );
};

export default TrainResult;
