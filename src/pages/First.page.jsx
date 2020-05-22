import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ControlPannel from '../components/ControlPannel.component';
import CreateModel from '../components/Create-Model.component';
import Spinner from '../ui/spinner/spinner.component';
import Notification from '../ui/notification/notification.component';
import url from '../ui/url';
import TrainResult from '../components/Train-result.component';
import TestResult from '../components/Test-Result.component';
import UploadModel from '../components/Upload-Model.component';

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 5px;
`;
const ControlContainer = styled.div`
  width: 45%;
  min-width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ResultContainer = styled.div`
  width: 55%;
`;

const FirstPage = () => {
  const [toShow, setToShow] = useState({ type: 'create model' });
  const [isLoading, setIsloading] = useState(true);
  const [modelList, setModelList] = useState([]);
  const [notes, setNotes] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);
  const [trainChartData, setTrainChartData] = useState(null);
  const [testChartData, setTestChartData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetch(`${url}/api/get-recipes`)
      .then((res) => res.json())
      .then((arr) => {
        setModelList(arr);
        setIsloading(false);
      });
  }, []);

  const handleSetToShow = (modelTast) => {
    //'create model' 'import model' 'upload model'
    if (modelTast === 'import model' && !modelList.length) {
      setNotes('目標資料夾Model中無已訓練完成的模型');
      setNoteOpen(true);
      return;
    }
    if (modelTast === 'upload model' && !modelList.length) {
      setNotes('目標資料夾Model中無已訓練完成的模型');
      setNoteOpen(true);
      return;
    }
    setIsloading(true);
    setToShow({ type: modelTast });
    fetch(`${url}/api/get-recipes`)
      .then((res) => res.json())
      .then((arr) => {
        setModelList(arr);
        setIsloading(false);
      });
  };
  const handleSetToShowChart = (modelName) => {
    //'xxx_back_train'
    const name = modelName.split('_')[0];
    const type = modelName.split('_')[2];
    const side = modelName.split('_')[1];

    const sendToShow = {
      type: type,
      name: name,
      side: side,
    };
    setIsloading(true);
    let appendUrl = type === 'train' ? '/get-training-log' : '/get-testing-log';
    fetch(`${url}/api${appendUrl}`, {
      method: 'POST',
      body: JSON.stringify({ recipeName: modelName }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // { data: dataArr, isKilled: isKilled, msg: recipeName }
        if (type === 'train') {
          if (data.data) {
            setTrainChartData(data);
            setToShow(sendToShow);
          } else {
            setNotes('資料異常,請聯絡系統管理員');
            setNoteOpen(true);
          }
        }
        if (type === 'test') {
          if (data.data) {
            setTestChartData(data);
            setToShow(sendToShow);
          } else {
            setNotes('資料異常,請聯絡系統管理員');
            setNoteOpen(true);
          }
        }
        setIsFetching(false);
        setIsloading(false);
      });
  };
  const getToShow = () => {
    return toShow;
  };
  let elementToshow;
  switch (toShow.type) {
    case 'create model':
      elementToshow = (
        <CreateModel
          isNew={true}
          modelList={modelList}
          setToShow={handleSetToShowChart}
          notes={notes}
          setNotes={setNotes}
          noteOpen={noteOpen}
          setNoteOpen={setNoteOpen}
        />
      );
      break;
    case 'import model':
      elementToshow = (
        <CreateModel
          isNew={false}
          modelList={modelList}
          setToShow={handleSetToShowChart}
          notes={notes}
          setNotes={setNotes}
          noteOpen={noteOpen}
          setNoteOpen={setNoteOpen}
        />
      );
      break;
    case 'upload model':
      elementToshow = (
        <UploadModel
          modelList={modelList}
          setNotes={setNotes}
          setNoteOpen={setNoteOpen}
        />
      );
      break;
    case 'train':
      elementToshow = (
        <TrainResult
          getToShow={getToShow}
          toShow={toShow}
          trainChartData={trainChartData}
          setTrainChartData={setTrainChartData}
          isFetching={isFetching}
          setIsFetching={setIsFetching}
        />
      );
      break;
    case 'test':
      elementToshow = (
        <TestResult
          toShow={toShow}
          testChartData={testChartData}
          setTestChartData={setTestChartData}
          isFetching={isFetching}
          setIsFetching={setIsFetching}
        />
      );
      break;
    default:
      elementToshow = null;
  }

  return (
    <Container>
      <ControlContainer>
        <ControlPannel
          toShow={toShow}
          setToShow={setToShow}
          handleSetToShow={handleSetToShow}
          handleSetToShowChart={handleSetToShowChart}
        />
      </ControlContainer>
      <ResultContainer>
        {isLoading ? <Spinner /> : elementToshow}
      </ResultContainer>
      <Notification notes={notes} open={noteOpen} setOpen={setNoteOpen} />
    </Container>
  );
};

export default FirstPage;
