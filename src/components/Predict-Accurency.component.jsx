import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const ResultByResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 47%;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
const ResultSheetContainer = styled.div`
  width: 95%;
  height: 80%;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #cdecff;
  border-left: 1px solid #cdecff;
`;
const ResultLineContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #cdecff;
`;
const ResultCube = styled.div`
  width: ${({ w }) => (w ? w : '100%')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #cdecff;
  color: ${({ color }) => (color ? color : '#F4F4F4')};
  position: relative;
`;
const CubeFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: ${({ selected }) => (selected ? '2px solid #ffb700' : '')};
  cursor: pointer;
`;
const Diagonal = styled.div`
  width: 100%;
  position: relative;
  border-right: 1px solid #cdecff;
  background: linear-gradient(
    to top right,
    #383e4d calc(50% - 1px),
    #cdecff,
    #383e4d calc(50% + 1px)
  );
`;
const CatelogTitleRight = styled.div`
  position: absolute;
  top: 15%;
  right: 10%;
  color: #f4f4f4;
  font-size: 0.8rem;
`;
const CatelogTitleLeft = styled.div`
  position: absolute;
  bottom: 15%;
  left: 10%;
  color: #f4f4f4;
  font-size: 0.8rem;
`;

const ProcessBarContainer = styled.div`
  width: 95%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  font-size: ${(fs) => (fs ? fs : '1.2rem')};
  color: ${({ color }) => (color ? color : '')};
  padding-bottom: 0.3rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  border-bottom: 1px solid #555555;
  display: flex;
  align-items: center;
`;
const TopicContainer = styled.p`
  padding: 0;
  margin: ${({ mr }) => (mr ? mr : 0)};
  color: ${({ color }) => (color ? color : '')};
`;
const ValueContainer = styled.p`
  padding: 0;
  margin: 0;
  margin-left: 0.6rem;
  color: ${({ color }) => (color ? color : '')};
`;

const PrediceAccurency = ({
  OK_0,
  OK_1,
  NG_0,
  NG_1,
  handleSetFilter,
  imgFilter,
}) => {
  let accurencyRate = 0;
  const totalSamples = OK_0 + OK_1 + NG_0 + NG_1;
  if (totalSamples > 0) {
    accurencyRate = (((OK_1 + NG_0) / totalSamples) * 100).toFixed(2);
  }
  return (
    <ResultByResultContainer>
      <Title>
        <TopicContainer>準確率:</TopicContainer>
        <ValueContainer color={+accurencyRate >= 80 ? 'green' : 'red'}>
          {accurencyRate}%
        </ValueContainer>
        <TopicContainer mr="0 1rem 0">樣本數:</TopicContainer>
        <ValueContainer color="green">{totalSamples}</ValueContainer>
      </Title>
      {totalSamples ? (
        <ResultSheetContainer>
          <ResultLineContainer>
            <Diagonal>
              <CatelogTitleRight>預估</CatelogTitleRight>
              <CatelogTitleLeft>實際</CatelogTitleLeft>
            </Diagonal>
            <ResultCube onClick={() => handleSetFilter('only_OK')}>
              OK
              <CubeFrame selected={imgFilter === 'only_OK'} />
            </ResultCube>
            <ResultCube onClick={() => handleSetFilter('only_NG')}>
              NG
              <CubeFrame selected={imgFilter === 'only_NG'} />
            </ResultCube>
          </ResultLineContainer>
          <ResultLineContainer>
            <ResultCube onClick={() => handleSetFilter('onlyOK_')}>
              OK
              <CubeFrame selected={imgFilter === 'onlyOK_'} />
            </ResultCube>
            <ResultCube
              onClick={() => handleSetFilter('onlyOK_OK')}
              color="green"
            >
              {OK_1}
              <CubeFrame selected={imgFilter === 'onlyOK_OK'} />
            </ResultCube>
            <ResultCube
              onClick={() => handleSetFilter('onlyOK_NG')}
              color="red"
            >
              {OK_0}
              <CubeFrame selected={imgFilter === 'onlyOK_NG'} />
            </ResultCube>
          </ResultLineContainer>
          <ResultLineContainer>
            <ResultCube onClick={() => handleSetFilter('onlyNG_')}>
              NG
              <CubeFrame selected={imgFilter === 'onlyNG_'} />
            </ResultCube>
            <ResultCube
              onClick={() => handleSetFilter('onlyNG_OK')}
              color="red"
            >
              {NG_1}
              <CubeFrame selected={imgFilter === 'onlyNG_OK'} />
            </ResultCube>
            <ResultCube
              onClick={() => handleSetFilter('onlyNG_NG')}
              color="green"
            >
              {NG_0}
              <CubeFrame selected={imgFilter === 'onlyNG_NG'} />
            </ResultCube>
          </ResultLineContainer>
        </ResultSheetContainer>
      ) : (
        <ProcessBarContainer>
          <CircularProgress />
        </ProcessBarContainer>
      )}
    </ResultByResultContainer>
  );
};

export default PrediceAccurency;
