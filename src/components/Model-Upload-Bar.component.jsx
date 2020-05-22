import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/my-button/My-button.component';
import url from '../ui/url';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '../ui/modal/modal.component';
import Checkbox from '@material-ui/core/Checkbox';

const ModelSelector = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  background: #373e4f;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  :hover {
    border: 2px solid #ffb700;
  }
`;
const ModelInfoContainer = styled.div`
  width: 100%;
  display: flex;
`;
const ErrorContainer = styled.div`
  display: flex;
`;
const ErrorServerName = styled.p`
  color: ${({ success }) => (success ? '#19A974' : 'red')};
  font-size: 0.6rem;
  margin: 3px 5px 2px;
`;
const ModelNameContainer = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
`;
const ValueName = styled.div`
  margin-left: 1rem;
  color: #fbf1a9;
`;
const SideContainer = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
`;

const BtnCollection = styled.div`
  width: ${({ w }) => (w ? w : '33%')};
  display: flex;
  justify-content: flex-end;
`;
const BtnCollectionColumn = styled.div`
  width: ${({ w }) => (w ? w : '33%')};
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;
const UploadInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 4px 0;
`;
const ServerSelectorContainer = styled.div`
  min-width: 20rem;
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  color: #fff;
  border-radius: 5px;
  background: #383e4d;
`;
const ServerContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  padding: 0 10px;
  border-radius: 5px;
  border-bottom: 1px solid #555555;
`;
const ServerNameContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;
const CheckboxContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;
const Title = styled.div`
  width: 100%;
  font-size: 1.3rem;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #555555;
`;

const ModelUploadBar = ({ name, sendToUrls, setNotes, setNoteOpen }) => {
  const [selectedToSendToUrls, setSelectedToSendToUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState([]);
  const [isError, setIsError] = useState([]);
  const handleButtonOnClick = () => {
    const addUploadCheckToSelectedToSendToUrls = sendToUrls.map((item) => {
      return {
        ...item,
        checked: true,
      };
    });
    setSelectedToSendToUrls(addUploadCheckToSelectedToSendToUrls);
    setIsModalOpen(true);
  };
  const handleUploadBtnOnClick = async () => {
    const fileUrl = `${url}/upload-model/${name}.h5`;
    let updatedIsUploading = [];
    let updatedIsError = [];
    const filteredUrl = selectedToSendToUrls.filter(({ checked }) => checked);
    if (!filteredUrl.length) {
      setNotes('請選擇至少一個伺服器');
      setNoteOpen(true);
      return;
    }
    setIsModalOpen(false);
    filteredUrl.forEach(async ({ serverUrl, serverName }) => {
      updatedIsUploading.push(serverName);
      setIsUploading(updatedIsUploading);
      setIsError(updatedIsError);
      try {
        const resJson = await fetch(`http://${serverUrl}/api/refresh_model`, {
          method: 'POST',
          body: JSON.stringify({
            dataUrl: fileUrl,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        });
        const dataRespon = await resJson.json();
        updatedIsUploading = updatedIsUploading.filter(
          (name) => name !== serverName
        );
        if (dataRespon.isError) {
          updatedIsError.push({ serverName, success: false });
        } else {
          updatedIsError.push({ serverName, success: true });
        }
        setIsUploading(updatedIsUploading);
        setIsError(updatedIsError);
      } catch (err) {
        updatedIsUploading = updatedIsUploading.filter(
          (name) => name !== serverName
        );
        if (err) {
          updatedIsError.push({ serverName, success: false });
        }
        setIsUploading(updatedIsUploading);
        setIsError(updatedIsError);
      }
    });
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleCheckboxOnClick = (name) => {
    const updatedSelectedToSendToUrls = selectedToSendToUrls.map((urlObj) => {
      if (urlObj.serverName === name) {
        return { ...urlObj, checked: !urlObj.checked };
      }
      return urlObj;
    });
    setSelectedToSendToUrls(updatedSelectedToSendToUrls);
  };
  return (
    <ModelSelector>
      <ModelInfoContainer>
        <ModelNameContainer>
          模型名稱:<ValueName>{name.split('_')[0]}</ValueName>
        </ModelNameContainer>
        <SideContainer>
          正面背面:
          <ValueName>
            {name.split('_')[1] === 'front' ? '正面' : '背面'}
          </ValueName>
        </SideContainer>
        <BtnCollection>
          <Button w="20%" mr="5px" onClick={handleButtonOnClick}>
            {isUploading.length ? (
              <UploadInnerContainer>
                <CircularProgress size="1rem" color="secondary" />
              </UploadInnerContainer>
            ) : (
              '上傳'
            )}
          </Button>
        </BtnCollection>
      </ModelInfoContainer>
      {isError.length ? (
        <ErrorContainer>
          {isError.map(({ serverName, success }) => (
            <ErrorServerName success={success}>
              {serverName}
              {success ? '上傳成功' : '上傳失敗'}
            </ErrorServerName>
          ))}
        </ErrorContainer>
      ) : null}
      <Modal open={isModalOpen} handleClose={handleModalClose}>
        <ServerSelectorContainer>
          <Title>選擇上傳目標伺服器</Title>
          {selectedToSendToUrls.map(({ serverUrl, serverName, checked }) => {
            return (
              <ServerContainer>
                <ServerNameContainer>{serverName}</ServerNameContainer>
                <CheckboxContainer>
                  <Checkbox
                    onClick={() => handleCheckboxOnClick(serverName)}
                    checked={checked}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </CheckboxContainer>
              </ServerContainer>
            );
          })}
          <BtnCollectionColumn w="100%">
            <Button onClick={handleUploadBtnOnClick}>確定上傳</Button>
            <Button onClick={handleModalClose}>取消</Button>
          </BtnCollectionColumn>
        </ServerSelectorContainer>
      </Modal>
    </ModelSelector>
  );
};

export default ModelUploadBar;
