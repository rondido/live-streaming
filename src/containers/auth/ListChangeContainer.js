//2021-11-26
// 비디오 업로드 수정
//박진현

import React, { useEffect, useState } from 'react';

import {
    Button,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  Typography,
  } from "@mui/material";
import { useParams } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {videocheck} from '../../modules/video'
import { change } from '../../modules/video';
const ListChangeContainer = () => {
    const dispatch = useDispatch();
    const [selectList, setSelectList] = useState([]);
    const [selectCategory, setSelectCategory] = useState(""); // 카테고리
    const { v_code } = useParams();

    const [v_name, setV_name] = useState("");
    const [c_code, setC_code] = useState("");
    const [v_descript, setV_descript] = useState("");
    const [c_name, setC_name] = useState("");
    
    // 바꾸는 부분
    const onChange = (e) =>{
     const {name,value} = e.target;
     dispatch(change(
       name,
       value
     ))
     //setV_name({[e.target.name] : e.target.value})
     console.log(setV_name);
     
    //  setC_code(value);
    //  setV_descript(value);
    //  setC_name(value);
    }
    
    //수정 버튼
    const onUpdate = (e) =>{
       dispatch(videocheck(
        v_code,
        v_name,
        c_code,
        v_descript

       ))
    };
    
    // 카테고리 선택
  const selectChange = (e) => {
    setSelectCategory(e.target.value);
    console.log(e.target.value);
  };

  useEffect(()=>{
    myVideoListchange();
    console.log(selectList);
  },[selectList]);

  const myVideoListchange = () =>{
    axios.get(`/api/videochangeserch/${v_code}`)
    .then((response) =>{      
      setV_name(response.data[0].v_name);      
      setC_code(response.data[0].c_code);      
      setV_descript(response.data[0].v_descript);   
      setC_name(response.data[0].c_name);
    })
    .catch((error) =>{
      alert('실패');
      console.log(error);      
    });
  };

    return (
      <>

         <Grid container style={{ marginTop: 65 }}>

        {/* 제목 입력 */}
        <Grid item xs={12} align="left">
          <Typography variant="h4">제목</Typography>
          <Input
            style={{ width: 1200, height: 80 }}
            required
            type="text"
            onChange={onChange}
            name="title"
            value={v_name}
        >             
        </Input>
        </Grid>
        {/* 내용 입력 */}
        <Grid item xs={12} align="left">
          <Typography variant="h4">내용</Typography>
          <Input
            style={{ width: 1200, height: 200 }}
            required
            type="text"
            placeholder="내용을 입력하세요."
            name="descript"
            onChange={onChange}

            value={v_descript}
          />
        </Grid>
      {/* 카테고리 선택 */}
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select onChange={selectChange} value={selectCategory}>
              <MenuItem value="NT001">자연</MenuItem>
              <MenuItem value="VL001">브이로그</MenuItem>
              <MenuItem value="GM001">게임</MenuItem>
              <MenuItem value="SP001">스포츠</MenuItem>
              <MenuItem value="MC001">음악</MenuItem>
              <MenuItem value="AM001">동물</MenuItem>
              <MenuItem value="HH001">운동</MenuItem>
              <MenuItem value="CK001">요리</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* 수정 버튼 */}
        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={onUpdate}>
            수정
          </Button>
          
        </Grid>
      </Grid>      
    
       </>
    );
};

export default ListChangeContainer;

