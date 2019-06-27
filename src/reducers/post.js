// redux-actions 패키지에는 리덕스의 액션들을 관리하기 위한 유용한
// createAction 과 handleActions 가 있습니다.
// 이번 섹션에서는 이 함수들이 어떤 기능을하는지 알아보도록 하겠습니다.

import { handleActions } from 'redux-actions';
import axios from 'axios';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';


export const getPost = (postId) => dispatch => {
    console.log("getPost");
    // 먼저, 요청이 시작했다는것을 알립니다
    dispatch({type: GET_POST_PENDING});

    // 요청을 시작합니다
    // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
    return getPostAPI(postId).then(
        (response) => {
            // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
            dispatch({
                type: GET_POST_SUCCESS,
                payload: response
            })
        }
    ).catch(error => {
        // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
        dispatch({
            type: GET_POST_FAILURE,
            payload: error
        });
    })

}

const initialState = {
    pending: false,
    error: false,
    data: {
        title: '',
        body: ''
    }
}

// switch 문 대신 handleActions 사용하기
// 리듀서에서 액션의 type 에 따라 다른 작업을 하기 위해서 우리는 switch문을 사용했지요.
// 하지만 이 방식엔 아주 중요한 결점이 한가지 있습니다. 바로, scope가 리듀서 함수로 설정되어있다는것이지요.

// 이 문제를 해결해주는것이 바로 handleActions 입니다. 이 함수를 사용하면 다음과 같은 방식으로 해결 할 수 있습니다.
// 첫번째 파라미터로는 액션에 따라 실행 할 함수들을 가지고있는 객체, 두번째 파라미터로는 상태의 기본 값 (initialState) 를 넣어주면 됩니다.
export default handleActions({
    [GET_POST_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_POST_SUCCESS]: (state, action) => {
        const { title, body } = action.payload.data;

        return {
            ...state,
            pending: false,
            data: {
                title, body
            }
        };
    },
    [GET_POST_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);
