import React from 'react';
import styled from 'styled-components';
import Button from '../ui/my-button/My-button.component';
import TasksInProcess from './Tasks-In-Process.component';
const Container = styled.div`
  padding: 1rem 0 0;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ModelBtnCollectionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 100%;
  margin-top: 1rem;
  border: 3px solid #ff6300;
  border-radius: 8px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.2rem;
  padding-bottom: 0.3rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  border-bottom: 1px solid #555555;
`;

const ControlPannel = ({ toShow, handleSetToShow, taskInProcess }) => {
  return (
    <Container>
      <SettingContainer>
        <Title>控制面板</Title>
        <ModelBtnCollectionContainer>
          <Button
            onClick={() => handleSetToShow('create model')}
            bg={toShow === 'create model' ? 'red' : ''}
            w="45%"
          >
            新建模型
          </Button>
          <Button
            onClick={() => handleSetToShow('import model')}
            bg={toShow === 'import model' ? 'red' : ''}
            w="45%"
          >
            匯入模型
          </Button>
        </ModelBtnCollectionContainer>
      </SettingContainer>
      <TasksInProcess taskInProcess={taskInProcess} />
    </Container>
  );
};

export default ControlPannel;
