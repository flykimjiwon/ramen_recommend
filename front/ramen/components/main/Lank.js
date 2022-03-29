import * as React from 'react';
import { Container,Row,Col,ListGroup} from 'react-bootstrap';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Lankdetail from './Lankdetail'

export default function Lank(props) {


  let [rank1,setRank1] = useState(false)
  let [rank2,setRank2] = useState(false)
  let [rank3,setRank3] = useState(false)
  let [rank4,setRank4] = useState(false)
  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: `http://j6c104.p.ssafy.io:8080/v1/ramen/detail/${}`,
  //   })
  //     .then((result) => {
  //       console.log('리스트요청성공')
  //       console.log(result)
  //       console.log(result.data)
  //     })
  //     .catch((error) => {
  //       console.log('리스트요청실패')
  //       console.log(error)
  //     })
  // }, [])
  
  return <>

    
    <div className='list'>
    <ListGroup>
      <h3><img src="icon/ranking.png" width={50}></img> 라면랭킹</h3>
{/* 여기부터 하나하나 4개를 만들자 on/off로 ㅇㅇ 성공하면 추가 안하면 off */}
{
  props.ramen[0]
  ?(
    <ListGroup.Item><R1 id={props.ramen[0].ramenId} index='1'></R1>
    {/* {props.ramen[0].ramenId}/ */}
    </ListGroup.Item>
  )
  :null
}
{
  props.ramen[1]
  ?(
    <ListGroup.Item><R1 id={props.ramen[1].ramenId} index='2'></R1></ListGroup.Item>
  )
  :null
}
{
  props.ramen[2]
  ?(
    <ListGroup.Item><R1 id={props.ramen[2].ramenId} index='3'></R1></ListGroup.Item>
  )
  :null
}
{
  props.ramen[3]
  ?(
    <ListGroup.Item><R1 id={props.ramen[3].ramenId} index='4'></R1></ListGroup.Item>
  )
  :null
}
    {/* <ListGroup.Item>1위 신라면 (농심)</ListGroup.Item>
    <ListGroup.Item>2위 진라면 매운맛(오뚜기)</ListGroup.Item>
    <ListGroup.Item>3위 열라면 (오뚜기)</ListGroup.Item>
    <ListGroup.Item>4위 팔도비빔면 (팔도)</ListGroup.Item>
    <ListGroup.Item>5위 틈새라면 (팔도)</ListGroup.Item> */}
  </ListGroup>
    </div>
    
  <style jsx>{`
       .list{
         margin:20px;
       }
        
      `}</style>
  </>
}

function R1(props){
  let [name,setName] = useState('')
  let [brand,setBrand] = useState('')
  useEffect(()=>{
    axios({
      method: 'get',
      url: `http://j6c104.p.ssafy.io:8080/v1/ramen/detail/${props.id}`,
    })
      .then((result) => {
        console.log('랭킹요청성공 R1프롭스')
        console.log(result.data)
        console.log(result.data.name)
        console.log(result.data.brand)
        setName(result.data.name)
        setBrand(result.data.brand)
        // console.log(ramen)
  
      })
      .catch((error) => {
        console.log('요청실패')
        console.log(error)
      })
  },[])
  return(
    <div>{props.index}위 : {name} ({brand})</div>
  )

}