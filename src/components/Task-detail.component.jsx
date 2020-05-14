import React from 'react';
import styled from 'styled-components';
import Button from '../ui/my-button/My-button.component';

const TaskDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  padding: 0 5px;
  border-radius: 5px;
  :hover {
    border: 2px solid #ffb700;
  }
`;
const TaskWrapper = styled.div`
  display: flex;
`;
const TaskStatus = styled.p`
  color: ${({ isKilled }) => (isKilled ? '#999999' : 'red')};
`;
const TaskName = styled.p`
  font-weight: bold;
`;
const BtnCollection = styled.div`
  display: flex;
  align-items: center;
`;
const TaskDetail = ({ modelName, isKilled, testOrTrain, frontOrBack }) => {
  return (
    <TaskDetailContainer>
      <TaskWrapper>
        <TaskName>
          {modelName}({frontOrBack === 'front' ? '正面' : '背面'}):
        </TaskName>
        <TaskStatus isKilled={isKilled}>
          {isKilled ? '已停止' : testOrTrain === 'test' ? '測試中' : '訓練中'}
        </TaskStatus>
      </TaskWrapper>
      <BtnCollection>
        <Button w="33%" mr="3px" pd="3px 8px" fs="0.8rem" h="1.8rem">
          終止
        </Button>
        <Button w="33%" mr="3px" pd="3px 8px" fs="0.8rem" h="1.8rem">
          清空
        </Button>
        <Button w="33%" mr="3px" pd="3px 8px" fs="0.8rem" h="1.8rem">
          匯出
        </Button>
      </BtnCollection>
    </TaskDetailContainer>
  );
};

export default TaskDetail;
