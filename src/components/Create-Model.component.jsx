import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '../ui/my-button/My-button.component';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '../ui/modal/modal.component';
import url from '../ui/url';
import Spinner from '../ui/spinner/spinner.component';
import FolderImgCheckingChild from './Folder-Img-Checking-Child.component';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    '& > *': {
      color: '#CCCCCC',
    },

    '&  fieldset': {
      borderColor: '#cccccc',
    },
  },
}));
const Container = styled.div`
  width: 95%;
  padding: 1rem 1.5rem;
  color: #fff;
  border-radius: 5px;
  background: #383e4d;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
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
  border: 1px solid #cccccc;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 8px;
`;

const SelectorLabol = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(14px, -6px) scale(0.75);
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transform-origin: top left;
  color: #cccccc;
  padding: 0 5px;
  font-size: 1rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
  background: #383e4d;
`;
const BtnCollection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.3rem;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #555555;
`;
const CreateModel = ({
  isNew,
  modelList,
  setToShow,
  setNotes,
  setNoteOpen,
}) => {
  const classes = useStyles();
  const [modelName, setModelName] = useState('');
  const [testOrTrain, setTestOrTrain] = useState('train');
  const [frontOrBack, setFrontOrBack] = useState('back');
  const [isModelNameExist, setIsModelNameExist] = useState(false);
  const [modelNameExistMsg, setModelNameExistMsg] = useState('');
  const [epochValue, setEpochValue] = useState(1);
  const [isSavingBestModel, setIsSavingBestModel] = useState('false');
  const [earlyStopValue, setEarlyStopValue] = useState(0.5);
  const [isDataBalance, setIsDataBalance] = useState('false');
  const [isEpochValueError, setIsEpochValueError] = useState(false);
  const [isEarlyStopValueError, setIsEarlyStopValueError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolderChecking, setIsFolderChecking] = useState(true);
  const [folderCheckingResult, setFolderCheckingResult] = useState('');

  useEffect(() => {
    if (!isNew) {
      //xxx_front or xxx_back
      const defaultModel = modelList[0];
      const defaultModelSide = defaultModel.split('_')[1];
      setModelName(defaultModel);
      setFrontOrBack(defaultModelSide);
    } else {
      setModelName('');
      setFrontOrBack('back');
    }
    setTestOrTrain('train');
    setIsModelNameExist(false);
    setIsModalOpen(false);
    setFolderCheckingResult('');
    setEpochValue(1);
    setIsSavingBestModel('false');
    setEarlyStopValue(0.5);
    setIsDataBalance('false');
    setIsEpochValueError(false);
    setIsEarlyStopValueError(false);
  }, [isNew, modelList]);
  const handleOnReset = (e) => {
    e.preventDefault();
    if (!isNew) {
      const defaultModel = modelList[0];
      const defaultModelSide = defaultModel.split('_')[1];
      setModelName(defaultModel);
      setFrontOrBack(defaultModelSide);
    } else {
      setModelName('');
      setFrontOrBack('back');
    }
    setTestOrTrain('train');
    setIsModelNameExist(false);
    setIsModalOpen(false);
    setFolderCheckingResult('');
    setEpochValue(1);
    setIsSavingBestModel('false');
    setEarlyStopValue(0.5);
    setIsDataBalance('false');
    setIsEpochValueError(false);
    setIsEarlyStopValueError(false);
  };
  const handleModelNameOnChange = (e) => {
    let inpurErr = false;
    let inpurErrMsg = '';

    const matchModel = modelList.find(
      (name) =>
        name.split('_')[0].toLowerCase() === e.target.value.toLowerCase()
    );
    if (matchModel) {
      if (matchModel.split('_')[1] === frontOrBack) {
        inpurErrMsg = `該名稱${
          frontOrBack === 'front' ? '正面' : '背面'
        }訓練模組已存在,請選擇${
          frontOrBack === 'front' ? '背面' : '正面'
        },或更改名稱`;
        inpurErr = true;
      } else {
        inpurErr = false;
      }
    } else {
      inpurErr = false;
    }
    const pattern = /^[a-zA-Z0-9]{1,12}/gm;
    let inputMatch = '';
    if (e.target.value.match(pattern)) {
      inputMatch = e.target.value.match(pattern)[0];
    }
    if (e.target.value !== inputMatch) {
      inpurErr = true;
      inpurErrMsg = '模型名稱須為不含符號並長度短於15個字元';
    }
    setModelNameExistMsg(inpurErrMsg);
    setIsModelNameExist(inpurErr);
    setModelName(e.target.value);
  };

  const handleModelNameOnSelectChange = (e) => {
    setModelName(e.target.value);
    setFrontOrBack(e.target.value.split('_')[1]);
  };
  const handleBtnOnSwitch = (e, selector, name) => {
    e.preventDefault();

    if (selector === 'testOrTrain') {
      if (name === 'test') {
        handleOnReset(e);
        setModelName(modelName);
        setFrontOrBack(frontOrBack);
      }
      setTestOrTrain(name);
    }
    if (selector === 'frontOrBack') {
      if (!isNew) {
        if (frontOrBack !== name) {
          setNotes(
            `模型已綁定訓練${frontOrBack === 'front' ? '正面' : '背面'},欲訓練${
              name === 'front' ? '正面' : '背面'
            }請新建模型`
          );
          setNoteOpen(true);
        }
        return;
      } else {
        const combinedName = `${modelName}_${name}`;
        const matchModel = modelList.find(
          (name) => name.toLowerCase() === combinedName.toLowerCase()
        );
        if (matchModel) {
          setModelNameExistMsg(
            `該名稱${name === 'front' ? '正面' : '背面'}訓練模組已存在,請選擇${
              name === 'front' ? '背面' : '正面'
            },或更改名稱`
          );
          setIsModelNameExist(true);
        } else {
          setModelNameExistMsg('');
          setIsModelNameExist(false);
        }
        setFrontOrBack(name);
      }
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (isNew && isModelNameExist) {
      return;
    }
    setIsFolderChecking(true);
    setIsModalOpen(true);
    let dynamicModelName = modelName;
    if (!isNew) {
      dynamicModelName = modelName.split('_')[0];
    }
    const resJson = await fetch(`${url}/api/check-folder-img-exist`, {
      method: 'Post',
      body: JSON.stringify({
        recipeName: dynamicModelName,
        testOrTrain,
        frontOrBack,
        isRebuild: isNew,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await resJson.json();
    setFolderCheckingResult(data);
    setIsFolderChecking(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  let dynamicModelName = modelName;
  if (!isNew) {
    dynamicModelName = modelName.split('_')[0];
  }
  const handleEpochValueOnChange = (e) => {
    setEpochValue(e.target.value);
    const isInteger = Number.isInteger(+e.target.value);
    if (!isInteger || +e.target.value < 1 || +e.target.value > 1000) {
      setIsEpochValueError(true);
    } else {
      setIsEpochValueError(false);
    }
  };
  const handleIsSavingBestModelOnChange = (e) => {
    setIsSavingBestModel(e.target.value);
  };
  const handleEarlyStopValueOnChange = (e) => {
    setEarlyStopValue(e.target.value);
    if (+e.target.value < 0.5 || +e.target.value > 1) {
      setIsEarlyStopValueError(true);
    } else {
      setIsEarlyStopValueError(false);
    }
  };
  const handleIsDataBalanceOnChange = (e) => {
    setIsDataBalance(e.target.value);
  };
  return (
    <Container>
      <Title>{isNew ? '新建模型' : '匯入模型'}</Title>
      <FormContainer onSubmit={handleOnSubmit}>
        {isNew ? (
          <TextField
            className={classes.textField}
            autoComplete="off"
            id="outlined-full-width"
            label="模型名稱"
            style={{ margin: 0 }}
            placeholder="請輸入新建模型名稱"
            helperText={isModelNameExist ? modelNameExistMsg : ''}
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
            className={classes.textField}
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
                {name.split('_')[0]}(
                {name.split('_')[1] === 'back' ? '背面' : '正面'})
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
            {isNew ? null : (
              <Button
                onClick={(e) => handleBtnOnSwitch(e, 'testOrTrain', 'test')}
                bg={testOrTrain === 'test' ? 'red' : ''}
                w="35%"
              >
                測試
              </Button>
            )}
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
          className={classes.textField}
          id="outlined-full-width"
          label="epoch"
          helperText={
            isEpochValueError
              ? 'epoch輸入值須為整數且最小值為1,最大值為1000'
              : ''
          }
          error={isEpochValueError}
          autoComplete="off"
          style={{ marginTop: 8 }}
          placeholder="請輸入參數"
          type="number"
          onChange={handleEpochValueOnChange}
          inputProps={{
            min: 1,
            max: 1000,
          }}
          value={epochValue}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required
          disabled={testOrTrain === 'test' ? true : false}
        />
        <TextField
          className={classes.textField}
          id="outlined-full-width"
          label="儲存最佳模型"
          autoComplete="off"
          style={{ marginTop: 8 }}
          placeholder="請輸入參數"
          helperText=""
          type="number1"
          margin="normal"
          select
          onChange={handleIsSavingBestModelOnChange}
          value={isSavingBestModel}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required
          disabled={testOrTrain === 'test' ? true : false}
        >
          <MenuItem value="true">是</MenuItem>
          <MenuItem value="false">否</MenuItem>
        </TextField>
        <TextField
          className={classes.textField}
          id="outlined-full-width"
          label="early stop 精確度"
          helperText={
            isEarlyStopValueError ? '精確度輸入值最小為0.5最大為1' : ''
          }
          error={isEarlyStopValueError}
          autoComplete="off"
          style={{ marginTop: 8 }}
          placeholder="請輸入參數"
          type="number"
          onChange={handleEarlyStopValueOnChange}
          value={earlyStopValue}
          inputProps={{
            min: 0.5,
            max: 1,
            step: 0.01,
          }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required
          disabled={testOrTrain === 'test' ? true : false}
        />
        <TextField
          className={classes.textField}
          id="outlined-full-width"
          label="資料平衡"
          autoComplete="off"
          style={{ marginTop: 8 }}
          placeholder="請輸入參數"
          helperText=""
          onChange={handleIsDataBalanceOnChange}
          margin="normal"
          value={isDataBalance}
          select
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required
          disabled={testOrTrain === 'test' ? true : false}
        >
          <MenuItem value="true">是</MenuItem>
          <MenuItem value="false">否</MenuItem>
        </TextField>

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
            dataToSend={{
              recipeName: dynamicModelName,
              testOrTrain,
              frontOrBack,
              isRebuild: isNew,
              otherArgumeents: [
                epochValue,
                isSavingBestModel,
                earlyStopValue,
                isDataBalance,
              ],
            }}
            setNotes={setNotes}
            setNoteOpen={setNoteOpen}
            setToShow={setToShow}
          />
        )}
      </Modal>
    </Container>
  );
};

export default CreateModel;
