import React, { useEffect, useState } from 'react';
import url from '../ui/url';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import PredictAccurenecy from './Predict-Accurency.component';
import Modal from '../ui/modal/modal.component';
import VisibilityIcon from '@material-ui/icons/Visibility';

const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
const ResultByResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 47%;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
const EyeIcon = styled(VisibilityIcon)`
  font-size: 5rem;
  width: 3rem;
  height: 3rem;
`;
const ImgContainer = styled.div`
  width: 95%;
  position: relative;
`;
const MyImg = styled.img`
  width: 100%;
  border-radius: 5px;
`;
const IconContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
    transition: opacity 0.15s ease-in;
  }
`;
const ProcessBarContainer = styled.div`
  width: 95%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TestResultContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
  border-radius: 5px;
  background: #383e4d;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
`;
const TitleContainer = styled.div`
  padding: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const TitleAndBtn = styled.div`
  width: 100%;
  font-size: ${(fs) => (fs ? fs : '1.2rem')};
  color: ${({ color }) => (color ? color : '')};
  padding-bottom: 0.3rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  border-bottom: 1px solid #555555;
  display: flex;
  align-items: center;
`;
const TitleBox = styled.div`
  display: flex;
  width: 40%;
`;
const MyDisplayPara = styled.p`
  font-size: 0.9rem;
  margin: 0 1rem 0 0;
  color: ${({ selected }) => (selected ? '#ffb700' : '#AAAAAA')};
  cursor: pointer;
`;
const BtnCollection = styled.div`
  width: 60%;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
`;
const Title = styled.div`
  width: 100%;
  font-size: ${(fs) => (fs ? fs : '1.2rem')};
  color: ${({ color }) => (color ? color : '')};
  padding-bottom: 0.3rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  border-bottom: 1px solid #555555;
  display: flex;
  align-items: center;
`;
const NGOrOK = styled.p`
  padding: 0;
  margin: 0;
  margin-left: 1rem;
  color: ${({ color }) => (color ? color : '')};
`;

// imgUrls.map((imgUrl) => <ImgContainer src={imgUrl} alt="xxx" />)
const TestResult = ({
  toShow,
  testChartData,
  setTestChartData,
  isFetching,
  setIsFetching,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayUrl, setDisplayUrl] = useState('');
  const [imgUrls, setImgUrls] = useState([]);
  const [OK_0, setOK_0] = useState(0);
  const [OK_1, setOK_1] = useState(0);
  const [NG_0, setNG_0] = useState(0);
  const [NG_1, setNG_1] = useState(0);
  const [imgFilter, setImgFilter] = useState('all');

  // {
  //   isKilled: true,
  //   data: imgFiles,
  //   msg: recipeName, //'xxx_back_train'
  // };
  useEffect(() => {
    const currentTestName = `${toShow.name}_${toShow.side}_${toShow.type}`;
    let timeout;
    if (
      !isFetching &&
      !testChartData.isKilled &&
      currentTestName === testChartData.msg
    ) {
      timeout = setTimeout(() => {
        setIsFetching(true);
        fetch(`${url}/api/get-testing-log`, {
          method: 'POST',
          body: JSON.stringify({ recipeName: testChartData.msg }),
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setTestChartData(data);
            setIsFetching(false);
          });
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [setTestChartData, toShow, isFetching, testChartData, setIsFetching]);
  useEffect(() => {
    let OK0 = 0;
    let OK1 = 0;
    let NG0 = 0;
    let NG1 = 0;
    if (testChartData && testChartData.isKilled) {
      const updatedimgUrls = testChartData['data'].map((dataName) => {
        const labelName = dataName.split('_')[1];
        const testName = dataName[0] === '0' ? 'NG' : 'OK';
        if (labelName === 'OK' && testName === 'NG') {
          OK0++;
        }
        if (labelName === 'OK' && testName === 'OK') {
          OK1++;
        }
        if (labelName === 'NG' && testName === 'NG') {
          NG0++;
        }
        if (labelName === 'NG' && testName === 'OK') {
          NG1++;
        }
        return {
          result: testName,
          imgUrl: `${url}/img/${toShow.name}/test_result_${toShow.side}/${dataName}`,
          labelName: labelName,
        };
      });
      setOK_0(OK0);
      setOK_1(OK1);
      setNG_0(NG0);
      setNG_1(NG1);
      setImgUrls(updatedimgUrls);
    } else {
      if (testChartData) {
        // {
        //   isKilled: false,
        //   data: {
        //     OK: OKFiles,
        //     NG: NGFiles,
        //   },
        //   msg: recipeName,
        // };
        const NGUrls = testChartData['data']['NG'];
        const OKUrls = testChartData['data']['OK'];
        const imgQuantity = NGUrls.concat(OKUrls);
        const updatedimgUrls = imgQuantity.map(() => {
          return { result: '測試中', imgUrl: '', fileName: '' };
        });
        setImgUrls(updatedimgUrls);
      }
    }
  }, [testChartData, toShow]);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleEyeIconOnClick = (imgUrl) => {
    setIsModalOpen(true);
    setDisplayUrl(imgUrl);
  };
  let imgUrlsObj;
  switch (imgFilter) {
    case 'all':
      imgUrlsObj = imgUrls;
      break;
    case 'onlyMatch':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => labelName === result
      );
      break;
    case 'onlyNotMatch':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => labelName !== result
      );
      break;
    case 'onlyOK_OK':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => labelName === 'OK' && result === 'OK'
      );
      break;
    case 'onlyNG_OK':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => labelName === 'NG' && result === 'OK'
      );
      break;
    case 'onlyOK_NG':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => labelName === 'OK' && result === 'NG'
      );
      break;
    case 'onlyNG_NG':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => labelName === 'NG' && result === 'NG'
      );
      break;
    case 'onlyOK_':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => labelName === 'OK'
      );
      break;
    case 'onlyNG_':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => labelName === 'NG'
      );
      break;
    case 'only_OK':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => result === 'OK'
      );
      break;
    case 'only_NG':
      imgUrlsObj = imgUrls.filter(
        ({ result, imgUrl, labelName }) => result === 'NG'
      );
      break;

    default:
      imgUrlsObj = imgUrls;
  }
  const handleSetFilter = (name) => {
    setImgFilter(name);
  };
  return (
    <TestResultContainer>
      <TitleContainer>
        <TitleAndBtn>
          <TitleBox>測試結果 ({toShow.name}) </TitleBox>
          <BtnCollection>
            <MyDisplayPara
              selected={imgFilter === 'all'}
              onClick={() => handleSetFilter('all')}
            >
              顯示全部
            </MyDisplayPara>
            <MyDisplayPara
              selected={imgFilter === 'onlyMatch'}
              onClick={() => handleSetFilter('onlyMatch')}
            >
              只顯示正確
            </MyDisplayPara>
            <MyDisplayPara
              selected={imgFilter === 'onlyNotMatch'}
              onClick={() => handleSetFilter('onlyNotMatch')}
            >
              只顯示錯誤
            </MyDisplayPara>
          </BtnCollection>
        </TitleAndBtn>
      </TitleContainer>
      <ResultContainer>
        <PredictAccurenecy
          OK_0={OK_0}
          OK_1={OK_1}
          NG_0={NG_0}
          NG_1={NG_1}
          handleSetFilter={handleSetFilter}
          imgFilter={imgFilter}
        />
        {imgUrlsObj.map(({ result, imgUrl, labelName }, i) => {
          return (
            <ResultByResultContainer key={imgUrl + i}>
              <Title color={labelName !== result ? 'red' : ''}>
                測試結果{imgUrl ? `(原${labelName})` : ''}:
                <NGOrOK color={result === 'NG' ? 'red' : 'green'}>
                  {result}
                </NGOrOK>
              </Title>
              {imgUrl ? (
                <ImgContainer>
                  <IconContainer>
                    <EyeIcon
                      fontSize="large"
                      onClick={() => handleEyeIconOnClick(imgUrl)}
                    />
                  </IconContainer>
                  <MyImg src={imgUrl} alt="xxx" />
                </ImgContainer>
              ) : (
                <ProcessBarContainer>
                  <CircularProgress />
                </ProcessBarContainer>
              )}
            </ResultByResultContainer>
          );
        })}
      </ResultContainer>
      <Modal open={isModalOpen} handleClose={handleModalClose}>
        <MyImg src={displayUrl} alt="imgPreview" />
      </Modal>
    </TestResultContainer>
  );
};

export default TestResult;
