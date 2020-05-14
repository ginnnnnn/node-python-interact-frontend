import React from 'react';
import styled from 'styled-components';
import Button from '../ui/my-button/My-button.component';
import url from '../ui/url';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
  padding: 1rem 1.5rem;
`;
const ResultContainer = styled.div``;
const ResultTitle = styled.p``;
const ResultFolder = styled.div``;

const FolderImgCheckingChild = ({
  result,
  setFolderCheckingResult,
  handleClose,
  setIsFolderChecking,
  dataToSend,
  setNotes,
  setNoteOpen,
  setToShow,
  setTaskInProcess,
}) => {
  const isExist = result['isExist'];
  const resultTitle = isExist
    ? '圖片準備就緒,可以執行'
    : '資料夾中無圖片,請將圖片置入至以下資料夾';
  const NGFolder = result['NG'];
  const OKFolder = result['OK'];
  let NGFolderString;
  let OKFolderString;
  if (NGFolder) {
    NGFolderString = <ResultFolder>NG:{NGFolder}</ResultFolder>;
  }
  if (OKFolder) {
    OKFolderString = <ResultFolder>OK:{OKFolder}</ResultFolder>;
  }
  const handleOnExecute = async () => {
    setIsFolderChecking(true);
    const resJson = await fetch(`${url}/api/check-folder-img-exist`, {
      method: 'Post',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await resJson.json();
    if (data['isExist']) {
      const resJson = await fetch(`${url}/api/run-training`, {
        method: 'Post',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const resData = await resJson.json();
      //run model,close model
      if (resData.success) {
        setToShow(dataToSend.recipeName);
        setTaskInProcess(resData.onGoing);
        return handleClose();
      } else {
        setToShow(dataToSend.recipeName);
        setNotes(resData.msg);
        setNoteOpen(true);
        return handleClose();
      }
    } else {
      setFolderCheckingResult(data);
    }
    setIsFolderChecking(false);
  };
  const handleOnCancel = async () => {
    ///delete-target-folder
    // const resJson = await fetch(`${url}/api/delete-target-folder`, {
    //   method: 'Post',
    //   body: JSON.stringify(dataToSend),
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    // });
    // console.log(resJson);
    //do something here like delete folder api
    handleClose();
  };
  return (
    <Container>
      <ResultContainer>
        <ResultTitle>{resultTitle}</ResultTitle>
        {OKFolderString}
        {NGFolderString}
      </ResultContainer>
      <Button onClick={handleOnExecute}>執行</Button>
      <Button onClick={handleOnCancel}>取消</Button>
    </Container>
  );
};

export default FolderImgCheckingChild;
