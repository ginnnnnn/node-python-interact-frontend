import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ModelUploadBar from './Model-Upload-Bar.component';
import url from '../ui/url';

const Container = styled.div`
  width: 95%;
  padding: 1rem 1.5rem;
  color: #fff;
  border-radius: 5px;
  background: #383e4d;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
`;
const ModelContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.3rem;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #555555;
`;
const UploadModel = ({ modelList, setNotes, setNoteOpen }) => {
  const [sendToUrls, setSendToUrls] = useState([]);
  useEffect(() => {
    fetch(`${url}/api/server-list`)
      .then((res) => res.json())
      .then((serverList) => {
        if (serverList.isError) {
          console.log(serverList.msg);
          setNotes('無可上傳的server資訊');
          setNoteOpen(true);
        }

        if (serverList.serverArr && serverList.serverArr.length > 0) {
          const serverNameAndUrl = serverList.serverArr;
          const urlObj = serverNameAndUrl.map((nameAndUrl) => {
            return {
              serverName: nameAndUrl.split('=')[0],
              serverUrl: nameAndUrl.split('=')[1],
            };
          });
          setSendToUrls(urlObj);
        } else {
          setNotes('無可上傳的server資訊');
          setNoteOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }, [setNotes, setNoteOpen]);
  //this code is for client download ,it might be useful in future
  // const handleuploadBtnOnClick = async (name) => {
  //   // const fileUrl = `${url}/upload-model/${name}.h5`;
  //   const resJson = await fetch(`${url}/api/download-model`, {
  //     method: 'Post',
  //     body: JSON.stringify({
  //       modelName: name,
  //     }),
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //   });
  //   resJson.blob().then((blob) => {
  //     console.log(blob);
  //     let url = window.URL.createObjectURL(blob);
  //     let a = document.createElement('a');
  //     a.href = url;
  //     a.download = `${name}.h5`;
  //     a.click();
  //   });
  // };
  return (
    <Container>
      <Title>上傳模型</Title>
      <ModelContainer>
        {modelList.map((name, i) => (
          <ModelUploadBar
            key={name + i}
            name={name}
            sendToUrls={sendToUrls}
            setSendToUrls={setSendToUrls}
            setNotes={setNotes}
            setNoteOpen={setNoteOpen}
          />
        ))}
      </ModelContainer>
    </Container>
  );
};

export default UploadModel;
