import React from 'react';
import styled from 'styled-components';
import TaskDetail from './Task-detail.component';

const InProcessingTaskCollectionContainer = styled.div`
  margin: 1rem 0;
  padding: 0.5rem;
  width: 100%;
  min-height: 60%;
  display: flex;
  flex-direction: column;
  border: 3px solid #a463f2;
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
const TasksInProcess = ({ taskInProcess }) => {
  console.log(taskInProcess);
  return (
    <InProcessingTaskCollectionContainer>
      <Title>執行中程序</Title>
      {taskInProcess.length <= 0
        ? '尚無進行中的任務'
        : taskInProcess.map(
            ({ modelName, isKilled, testOrTrain, frontOrBack }) => (
              <TaskDetail
                key={modelName}
                frontOrBack={frontOrBack}
                testOrTrain={testOrTrain}
                modelName={modelName}
                isKilled={isKilled}
              />
            )
          )}
    </InProcessingTaskCollectionContainer>
  );
};

export default TasksInProcess;
