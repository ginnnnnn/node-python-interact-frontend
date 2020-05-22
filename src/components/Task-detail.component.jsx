import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/my-button/My-button.component';
import url from '../ui/url';
import CircularProgress from '@material-ui/core/CircularProgress';

const TaskDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #373e4f;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 10px;
  border-radius: 5px;
  border: ${({ selected }) => (selected ? '2px solid #ffb700' : '')};
  color: ${({ bg }) => (bg ? '#fff' : '')};
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  :hover {
    box-shadow: 4px 2px 10px 2px rgba(0, 0, 0, 0.4);
  }
`;
const TaskWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 45%;
`;
const TaskStatus = styled.p`
  color: ${({ isKilled }) => (isKilled ? '#999999' : '#fbf1a9')};
`;
const TaskName = styled.p`
  font-weight: bold;
`;
const BtnCollection = styled.div`
  display: flex;
  align-items: center;
  width: 55%;
`;
const TaskDetail = ({
  modelName,
  isKilled,
  handleSetToShowChart,
  toShow,
  setTaskInProcess,
  setToShow,
  setNotes,
  setNoteOpen,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  // modelName: '2_back_test';
  const frontOrBack = modelName.split('_')[1];
  const modelNameName = modelName.split('_')[0];
  const testOrTrain = modelName.split('_')[2];
  const handleTitleonClick = (e) => {
    if (e.target.nodeName === 'BUTTON') {
      return;
    }
    handleSetToShowChart(modelName);
  };
  const handleStopProcessing = async () => {
    const resJson = await fetch(url + '/api/kill-the-process', {
      method: 'POST',
      body: JSON.stringify({ recipeName: modelName }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await resJson.json();
    setTaskInProcess(data['processList']);
  };
  const handleDeleteProcessing = async () => {
    const resJson = await fetch(url + '/api/delete-the-process', {
      method: 'POST',
      body: JSON.stringify({ recipeName: modelName }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await resJson.json();
    setTaskInProcess(data['processList']);
    setToShow({ type: 'create model' });
  };
  const handleSavingModel = async () => {
    if (testOrTrain === 'test') {
      setNotes('測試程序無法匯出模型');
      setNoteOpen(true);
      return;
    }
    if (!isKilled) {
      setNotes('程序未完成,請等待停止或手動終止後再匯出');
      setNoteOpen(true);
      return;
    }
    setIsSaving(true);
    const resJson = await fetch(url + '/api/save-model', {
      method: 'POST',
      body: JSON.stringify({ recipeName: modelName }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await resJson.json();
    if (data.success) {
      setIsSaving(false);
      setNotes(data.msg);
      setNoteOpen(true);
      setToShow({ type: 'create model' });
      return;
    } else {
      setIsSaving(false);
      setNotes(data.msg);
      setNoteOpen(true);
      return;
    }
  };

  const checkSelected = () => {
    if (
      toShow.name === modelNameName &&
      toShow.side === frontOrBack &&
      toShow.type === testOrTrain
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <TaskDetailContainer
      selected={checkSelected()}
      onClick={handleTitleonClick}
    >
      <TaskWrapper>
        <TaskName>
          {modelNameName}({frontOrBack === 'front' ? '正面' : '背面'}):
        </TaskName>
        <TaskStatus isKilled={isKilled}>
          {isKilled ? '已停止' : testOrTrain === 'test' ? '測試中' : '訓練中'}
        </TaskStatus>
      </TaskWrapper>
      <BtnCollection>
        <Button
          onClick={handleStopProcessing}
          w="33%"
          mr="3px"
          pd="3px 8px"
          fs="0.8rem"
          h="1.8rem"
          disabled={isKilled}
        >
          終止
        </Button>
        <Button
          onClick={handleDeleteProcessing}
          w="33%"
          mr="3px"
          pd="3px 8px"
          fs="0.8rem"
          h="1.8rem"
        >
          清空
        </Button>
        <Button
          onClick={handleSavingModel}
          w="33%"
          mr="3px"
          pd="3px 8px"
          fs="0.8rem"
          h="1.8rem"
          disabled={testOrTrain === 'test' ? true : false}
        >
          {isSaving ? <CircularProgress /> : '匯出'}
        </Button>
      </BtnCollection>
    </TaskDetailContainer>
  );
};

export default TaskDetail;
