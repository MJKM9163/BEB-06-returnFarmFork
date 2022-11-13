import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";

const StatusBox = styled(BasicBox)`
  left: 50px;
  background-color: #c4f3ff;

  .statusBody {
    display: flex;
    justify-content: space-between;
    width: 98%;
    height: 92%;
    margin: auto;
    transform: translateY(-5px);

    .statusUserBox {
      width: 150px;
      height: 100%;

      .statusImgBox {
        width: 100%;
        height: 180px;
        background-color: rgb(37, 37, 37);
        border-radius: 10px;
        color: #d1d1d1;
        font-size: 100px;
      }
      .statusUserProfile {
        text-align: center;
      }
    }
    .statusUserEtc {
      width: 330px;
      height: 220px;
      margin: auto;
      //background-color: aliceblue;
    }
  }
`;

const Status = () => {
  const [x, y, bindDivPos] = useDivMove();

  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      <StatusBox>
        <div className="header" {...bindDivPos()}>
          Status
        </div>
        <div className="statusBody">
          <div className="statusUserBox">
            <div className="statusImgBox cc">
              <FontAwesomeIcon icon="fa-solid fa-address-card" />
              {/* <img src="" alt="프로필 사진" /> */}
            </div>
            <div className="statusUserProfile">
              <div className="userNickName">kkm</div>
              <div className="userTimeData">2001.11.28</div>
            </div>
          </div>
          <div className="statusUserEtc">
            <div className="totalHarvest">총 수확 횟수: 0</div>
            <div className="harvestPercentage">수확률: 0%</div>
            <div className="playTime">플레이 타임: 10분</div>
          </div>
        </div>
      </StatusBox>
    </animated.div>
  );
};

export default Status;