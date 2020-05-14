import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '../ui/my-button/My-button.component';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '../ui/modal/modal.component';
import url from '../ui/url';
import Spinner from '../ui/spinner/spinner.component';
import FolderImgCheckingChild from './Folder-Img-Checking-Child.component';
import Notification from '../ui/notification/notification.component';

const Container = styled.div`
  padding: 1rem 3rem;
  width: 95%;
`;
const FormContainer = styled.form`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`;
const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const SelectorContainer = styled.div`
  margin-top: 1rem;
  width: 48%;
  height: 3.5rem;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SelectorLabol = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(14px, -6px) scale(0.75);
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transform-origin: top left;
  color: rgba(0, 0, 0, 0.54);
  padding: 0 5px;
  font-size: 1rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
  background: #fbf1a9;
`;
const BtnCollection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;
const CreateModel = ({ isNew, modelList, setToShow, setTaskInProcess }) => {
  const [modelName, setModelName] = useState('');
  const [testOrTrain, setTestOrTrain] = useState('train');
  const [frontOrBack, setFrontOrBack] = useState('front');
  const [isModelNameExist, setIsModelNameExist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolderChecking, setIsFolderChecking] = useState(true);
  const [folderCheckingResult, setFolderCheckingResult] = useState('');
  const [notes, setNotes] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);

  useEffect(() => {
    if (!isNew) {
      setModelName(modelList[0]);
    } else {
      setModelName('');
    }
    setTestOrTrain('train');
    setFrontOrBack('front');
    setIsModelNameExist(false);
    setIsModalOpen(false);
    setFolderCheckingResult('');
  }, [isNew, modelList]);
  const handleModelNameOnChange = (e) => {
    setModelName(e.target.value);
    if (
      modelList.findIndex(
        (name) => name.toLowerCase() === e.target.value.toLowerCase()
      ) >= 0
    ) {
      setIsModelNameExist(true);
    } else {
      setIsModelNameExist(false);
    }
  };
  const handleModelNameOnSelectChange = (e) => {
    setModelName(e.target.value);
  };
  const handleBtnOnSwitch = (e, selector, name) => {
    e.preventDefault();

    if (selector === 'testOrTrain') {
      setTestOrTrain(name);
    }
    if (selector === 'frontOrBack') {
      setFrontOrBack(name);
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (isNew && isModelNameExist) {
      return;
    }
    setIsFolderChecking(true);
    setIsModalOpen(true);
    const resJson = await fetch(`${url}/api/check-folder-img-exist`, {
      method: 'Post',
      body: JSON.stringify({ recipeName: modelName, testOrTrain, frontOrBack }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await resJson.json();
    setFolderCheckingResult(data);
    setIsFolderChecking(false);
  };
  const handleOnReset = (e) => {
    e.preventDefault();
    if (!isNew) {
      setModelName(modelList[0]);
    } else {
      setModelName('');
    }
    setTestOrTrain('train');
    setFrontOrBack('front');
    setIsModelNameExist(false);
    setIsModalOpen(false);
    setFolderCheckingResult('');
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        {isNew ? '新建模型' : '匯入模型'}
      </Typography>
      <FormContainer onSubmit={handleOnSubmit}>
        {isNew ? (
          <TextField
            autoComplete="off"
            id="outlined-full-width"
            label="模型名稱"
            style={{ margin: 0 }}
            placeholder="請輸入新建模型名稱"
            helperText={isModelNameExist ? '名稱重複' : ''}
            error={isModelNameExist}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleModelNameOnChange}
            value={modelName}
            variant="outlined"
            required
          />
        ) : (
          <TextField
            id="outlined-full-width"
            select
            label="模型名稱"
            style={{ margin: 0 }}
            placeholder="請選擇匯入模型"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleModelNameOnSelectChange}
            value={modelName}
            variant="outlined"
            required
          >
            {modelList.map((name, i) => (
              <MenuItem key={name + i} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <OptionContainer>
          <SelectorContainer>
            <SelectorLabol>測試或訓練</SelectorLabol>
            <Button
              onClick={(e) => handleBtnOnSwitch(e, 'testOrTrain', 'train')}
              bg={testOrTrain === 'train' ? 'red' : ''}
              w="35%"
            >
              訓練
            </Button>
            <Button
              onClick={(e) => handleBtnOnSwitch(e, 'testOrTrain', 'test')}
              bg={testOrTrain === 'test' ? 'red' : ''}
              w="35%"
            >
              測試
            </Button>
          </SelectorContainer>
          <SelectorContainer>
            <SelectorLabol>正面或背面</SelectorLabol>
            <Button
              onClick={(e) => handleBtnOnSwitch(e, 'frontOrBack', 'front')}
              bg={frontOrBack === 'front' ? 'red' : ''}
              w="35%"
            >
              正面
            </Button>
            <Button
              onClick={(e) => handleBtnOnSwitch(e, 'frontOrBack', 'back')}
              bg={frontOrBack === 'back' ? 'red' : ''}
              w="35%"
            >
              背面
            </Button>
          </SelectorContainer>
        </OptionContainer>
        <TextField
          id="outlined-full-width"
          label="參數(1)"
          autoComplete="off"
          style={{ marginTop: 15 }}
          placeholder="請輸入新建模型名稱"
          helperText=""
          type="number1"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-full-width"
          label="參數(2)"
          autoComplete="off"
          style={{ marginTop: 15 }}
          placeholder="請輸入新建模型名稱"
          helperText=""
          type="number1"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-full-width"
          label="參數(3)"
          autoComplete="off"
          style={{ marginTop: 15 }}
          placeholder="請輸入新建模型名稱"
          helperText=""
          type="number1"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-full-width"
          label="參數(4)"
          autoComplete="off"
          style={{ marginTop: 15 }}
          placeholder="請輸入新建模型名稱"
          helperText=""
          type="number1"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-full-width"
          label="參數(5)"
          autoComplete="off"
          style={{ marginTop: 15 }}
          placeholder="請輸入新建模型名稱"
          helperText=""
          type="number1"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required
        />
        <BtnCollection>
          <Button type="submit" w="20%" mr="5px">
            確定
          </Button>
          <Button onClick={handleOnReset} w="20%">
            重設
          </Button>
        </BtnCollection>
      </FormContainer>
      <Modal open={isModalOpen} handleClose={handleModalClose}>
        {isFolderChecking ? (
          <Spinner />
        ) : (
          <FolderImgCheckingChild
            setFolderCheckingResult={setFolderCheckingResult}
            result={folderCheckingResult}
            handleClose={handleModalClose}
            setIsFolderChecking={setIsFolderChecking}
            dataToSend={{ recipeName: modelName, testOrTrain, frontOrBack }}
            setNotes={setNotes}
            setNoteOpen={setNoteOpen}
            setToShow={setToShow}
            setTaskInProcess={setTaskInProcess}
          />
        )}
      </Modal>
      <Notification notes={notes} open={noteOpen} setOpen={setNoteOpen} />
    </Container>
  );
};

export default CreateModel;
