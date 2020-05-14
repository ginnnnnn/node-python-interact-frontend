import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ControlPannel from '../components/ControlPannel.component';
import CreateModel from '../components/Create-Model.component';
import Spinner from '../ui/spinner/spinner.component';
import url from '../ui/url';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #fbf1a9;
  border-radius: 5px;
`;
const ControlContainer = styled.div`
  width: 38%;
  min-width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ResultContainer = styled.div`
  width: 62%;
`;

const FirstPage = () => {
  const [toShow, setToShow] = useState('create model');
  const [isLoading, setIsloading] = useState(true);
  const [taskInProcess, setTaskInProcess] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [taskFetching, setTaskFetching] = useState(false);
  useEffect(() => {
    fetch(`${url}/api/get-recipes`)
      .then((res) => res.json())
      .then((arr) => {
        setModelList(arr);
        setIsloading(false);
      });
  }, []);
  useEffect(() => {
    console.log('!!!!!!');
    fetch(`${url}/api/get-process-in-memory`)
      .then((res) => res.json())
      .then((arr) => {
        setTaskFetching(false);
        setTaskInProcess(arr);
      });
  }, []);
  useEffect(() => {
    if (!taskFetching) {
      setTaskFetching(true);
      console.log('!!');
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

  let elementToshow;
  switch (toShow) {
    case 'create model':
      elementToshow = (
        <CreateModel
          isNew={true}
          modelList={modelList}
          setToShow={setToShow}
          setTaskInProcess={setTaskInProcess}
        />
      );
      break;
    case 'import model':
      elementToshow = (
        <CreateModel
          isNew={false}
          modelList={modelList}
          setToShow={setToShow}
          setTaskInProcess={setTaskInProcess}
        />
      );
      break;
    default:
      elementToshow = <h1>{toShow}</h1>;
  }
  const handleSetToShow = (name) => {
    setIsloading(true);
    setToShow(name);
    fetch(`${url}/api/get-recipes`)
      .then((res) => res.json())
      .then((arr) => {
        setModelList(arr);
        setIsloading(false);
      });
  };
  return (
    <Container>
      <ControlContainer>
        <ControlPannel
          toShow={toShow}
          handleSetToShow={handleSetToShow}
          taskInProcess={taskInProcess}
        />
      </ControlContainer>
      <ResultContainer>
        {isLoading ? <Spinner /> : elementToshow}
      </ResultContainer>
    </Container>
  );
};

export default FirstPage;
