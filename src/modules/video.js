//module/auth
//사가 생성
//액션 정의
//2021-11-15

import { createAction,handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as videoAPI from '../lib/api/videoRecord';
import { takeLatest } from 'redux-saga/effects';
import produce from "immer";



//사가 액션 타입 
const CHANGE ="CHANGE"



const [VIDEO, VIDEO_SUCCESS, VIDEO_FAILURE] =
  createRequestActionTypes("video/VIDEO");
// input change 값 
export const change = createAction(CHANGE,({name, value}) =>({
    name,
    value
}))

//비디오 액션정의
export const videocheck = createAction(VIDEO,({v_code, v_name,c_code,v_descript}) =>
    {                 
        return {
            v_code, 
            v_name,
            c_code,
            v_descript
        

    }} 
)




const init = 
{                    
    v_code:"",
    v_name:"",
    c_code:"",
    v_descript:"",
    error:null,
    video:null
}

//loginsaga 생성
export const videosaga =  createRequestSaga(VIDEO, videoAPI.videoupdate);




//제네레이터 함수 
export function* authSaga() {
    yield takeLatest(VIDEO, videosaga);
}



const auth = handleActions(    
    {                        
        [CHANGE]: (state, { payload : { name , value }}) =>                        
            produce(state,(draft)=>{
                console.log(state + "2");
                draft[name] =value;
            }),    
          //로그인 실패
          [VIDEO_FAILURE] : (state,{ payload:error }) =>{
            alert("로그인 실패");
            return{                
                ...state,
                videoError:error,                              
            };
        },
        //로그인 성공
        [VIDEO_SUCCESS] : (state,{payload: video}) =>{
            console.log('여기는 성공'); 
                   
            return{
                ...state,
                authError:null,
                video,
            };
        }                              
     },
 init     
)
export default auth;