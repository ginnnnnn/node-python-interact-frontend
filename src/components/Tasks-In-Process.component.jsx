import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskDetail from './Task-detail.component';
import url from '../ui/url';
import Notification from '../ui/notification/notification.component';

const InProcessingTaskCollectionContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  min-height: 380px;
  max-height: 65%;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  color: #fff;
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
const ProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1px;
  overflow-y: scroll;
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #555555;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #333333;
  }
`;
const TasksInProcess = ({ handleSetToShowChart, toShow, setToShow }) => {
  const [taskFetching, setTaskFetching] = useState(false);
  const [taskInProcess, setTaskInProcess] = useState([]);
  const [notes, setNotes] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);
  useEffect(() => {
    fetch(`${url}/api/get-process-in-memory`)
      .then((res) => res.json())
      .then((arr) => {
        setTaskFetching(false);
        setTaskInProcess(arr);
      });
  }, [toShow]);
  useEffect(() => {
    if (!taskFetching) {
      setTaskFetching(true);
      setTimeout(() => {
        fetch(`${url}/api/get-process-in-memory`)
          .then((res) => res.json())
          .then((arr) => {
            setTaskFetching(false);
            setTaskInProcess(arr);
          });
      }, 3000);
    }
  }, [taskFetching]);
  // [ {
  //     isKilled: true;
  //     modelName: '2_back_test';
  //   }]
  return (
    <InProcessingTaskCollectionContainer>
      <Title>執行中程序</Title>
      <ProcessContainer>
        {taskInProcess.length <= 0
          ? '尚無進行中的任務'
          : taskInProcess.map(
              ({ modelName, isKilled, testOrTrain, frontOrBack }) => (
                <TaskDetail
                  key={modelName}
                  toShow={toShow}
                  modelName={modelName}
                  isKilled={isKilled}
                  handleSetToShowChart={handleSetToShowChart}
                  setTaskInProcess={setTaskInProcess}
                  setToShow={setToShow}
                  setNoteOpen={setNoteOpen}
                  setNotes={setNotes}
                />
              )
            )}
      </ProcessContainer>
      <Notification notes={notes} open={noteOpen} setOpen={setNoteOpen} />
    </InProcessingTaskCollectionContainer>
  );
};

export default TasksInProcess;
