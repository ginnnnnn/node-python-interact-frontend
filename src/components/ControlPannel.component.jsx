import React from 'react';
import styled from 'styled-components';
import Button from '../ui/my-button/My-button.component';
import TasksInProcess from './Tasks-In-Process.component';
const Container = styled.div`
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
  width: 100%;
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  background: #383e4d;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.2rem;
  padding-bottom: 0.3rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  border-bottom: 1px solid #555555;
`;

const ControlPannel = ({
  toShow,
  handleSetToShow,
  handleSetToShowChart,
  setToShow,
}) => {
  return (
    <Container>
      <SettingContainer>
        <Title>控制面板</Title>
        <ModelBtnCollectionContainer>
          <Button
            onClick={() => handleSetToShow('create model')}
            bg={toShow.type === 'create model' ? 'red' : ''}
            w="32%"
          >
            新建模型
          </Button>
          <Button
            onClick={() => handleSetToShow('import model')}
            bg={toShow.type === 'import model' ? 'red' : ''}
            w="32%"
          >
            匯入模型
          </Button>
          <Button
            onClick={() => handleSetToShow('upload model')}
            bg={toShow.type === 'upload model' ? 'red' : ''}
            w="32%"
          >
            上傳模型
          </Button>
        </ModelBtnCollectionContainer>
      </SettingContainer>
      <TasksInProcess
        handleSetToShowChart={handleSetToShowChart}
        toShow={toShow}
        setToShow={setToShow}
      />
    </Container>
  );
};

export default ControlPannel;
