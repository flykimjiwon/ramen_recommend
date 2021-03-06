/* eslint-disable react/prop-types */
import * as React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Suggestion(props) {
  let [ramen, setRamen] = useState([]);
  let [sugSwitch, setSugSwitch] = useState(false)
  let titleString = {
    "IBCF추천": "내가 좋아하는 라면과 비슷한",
    "UBCF추천": "같은 취향의 사용자가 좋아하는",
    "DBRC추천": "AI가 추천해주는"
  }
  let textString = {
    "IBCF추천": "로그인 후 이용해 주세요",
    "UBCF추천": "로그인 후 이용해 주세요",
    "DBRC추천": "로그인 후 이용해 주세요"
  }

  const default_img = "ramen/default.png";
  const handleImage = (e) => {
    e.target.src = default_img;
  };
  useEffect(() => {
    if (props.sug === "ubcf" && props.id !== undefined) {
      axios
        .get(`http://j6c104.p.ssafy.io:8888/v1/recommend/ubcf/${props.id}`)
        .then((result) => {
          setRamen(result.data);
        })
    }
  }, []);
  useEffect(() => {
    if (props.sug === "dbrc" && props.id !== undefined) {
      axios
        .get(`http://j6c104.p.ssafy.io:8888/v1/recommend/dbrc/${props.id}`)
        .then((result) => {
          setRamen(result.data);
          // setAi(true)
          // setSugSwitch(true)
          // 이걸로테스트가능 3항연산자
          // setSugSwitch(true)
        })
        .catch((error) => {
          setSugSwitch(true)
          console.log("ai 학습중");
        });
    }
  }, []);
  useEffect(() => {
    if (props.sug === "ibcf" && props.id !== undefined) {
      axios
        .get(`http://j6c104.p.ssafy.io:8888/v1/recommend/ibcf/${props.id}`)
        .then((result) => {
          setRamen(result.data);
        })
    }
  }, []);
  return (
    <>



      {/* {props.title} */}
      <hr></hr>
      <img src={`icon/${props.title}.png`} width={50}></img>
      <h3>{titleString[props.title]}</h3>
      <ListGroup>
        {/* {ramen.length !==0
    ? <p>{ramen.length}</p>
    : <p>0이 아닙니다.{ramen.length}</p>
    } */}
        {ramen.length !== 0 ? (
          <>
            <ListGroup.Item>
              <img src="icon/1.png" width={25}></img>

              <Link href={`/ramen/${Object.keys(ramen)[0]}`}>

                <a><img
                  src={`ramen/${Object.values(ramen)[0]}.png`}
                  width={45}
                  onError={handleImage}
                ></img>
                  {Object.values(ramen)[0]}</a>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <img src="icon/2.png" width={25}></img>

              <Link href={`/ramen/${Object.keys(ramen)[1]}`}>
                <a><img
                  src={`ramen/${Object.values(ramen)[1]}.png`}
                  width={45}
                  onError={handleImage}
                ></img>
                  {Object.values(ramen)[1]}</a>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <img src="icon/3.png" width={25}></img>

              <Link href={`/ramen/${Object.keys(ramen)[2]}`}>
                <a><img
                  src={`ramen/${Object.values(ramen)[2]}.png`}
                  width={45}
                  onError={handleImage}
                ></img>
                  {Object.values(ramen)[2]}</a>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <img src="icon/4.png" width={25}></img>

              <Link href={`/ramen/${Object.keys(ramen)[3]}`}>
                <a><img
                  src={`ramen/${Object.values(ramen)[3]}.png`}
                  width={45}
                  onError={handleImage}
                ></img>
                  {Object.values(ramen)[3]}</a>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <img src="icon/5.png" width={25}></img>

              <Link href={`/ramen/${Object.keys(ramen)[4]}`}>
                <a><img
                  src={`ramen/${Object.values(ramen)[4]}.png`}
                  width={45}
                  onError={handleImage}
                ></img>
                  {Object.values(ramen)[4]}</a>
              </Link>
            </ListGroup.Item>
          </>
        ) :
          (sugSwitch === true
            ? <><ListGroup.Item>AI가 학습중입니다.</ListGroup.Item></>
            : <><ListGroup.Item>{textString[props.title]}</ListGroup.Item></>

            // <>
            //   <ListGroup.Item>
            //     {textString[props.title]}
            //   </ListGroup.Item>

            // </>
          )
        }
      </ListGroup>
      {/* {
        titleString[props.title] ==="AI가 추천해주는"
        ?(<ListGroup.Item>
          2분마다 AI가 분석합니다.
        </ListGroup.Item>)
        :(<ListGroup.Item>
          로그인 후 이용해 주세요
        </ListGroup.Item>)
      } */}

      <style jsx>{`
        a {
          color: black;
          text-decoration-line: none;
        }
        img{
          margin-left:10px;
        }
        

      `}</style>
    </>
  );
}
