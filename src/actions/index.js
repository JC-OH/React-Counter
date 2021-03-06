/*
    action 객체를 만드는 액션 생성자들을 선언합니다. (action creators)
    여기서 () => ({}) 은, function() { return { } } 와 동일한 의미입니다.
    scope 이슈와 관계 없이 편의상 사용되었습니다.
*/

/*
 앞에 export 를 붙임으로서, 나중에 이것들을 불러올 때,
 import * as types from './ActionTypes' 를 할 수 있어요.
*/

import * as types from './ActionTypes';

export const create = (color) => ({
    type: types.CREATE,
    color: color
})

export const remove = () => ({
    type: types.REMOVE
})

export const increment = (index) => ({
    type: types.INCREMENT,
    index: index
});

export const decrement = (index) => ({
    type: types.DECREMENT,
    index: index
});

// 다른 액션 생성자들과 달리, 파라미터를 갖고있습니다
export const setColor = (index,color) => ({
    type: types.SET_COLOR,
    index: index,
    color: color
});

// export const incrementAsync = function (index) {
//     return dispatch => { // dispatch 를 파라미터로 가지는 함수를 리턴합니다.
//         setTimeout(() => {
//             // 1 초뒤 dispatch 합니다
//             dispatch(increment(index));
//         }, 1000);
//     }
// }

export const incrementAsync = (index) => dispatch => {
    // 1초 뒤 액션 디스패치
    setTimeout(
        () => { dispatch(increment(index)) },
        1000
    );
}

export const decrementAsync = (index) => dispatch => {
    // 1초 뒤 액션 디스패치
    setTimeout(
        () => { dispatch(decrement(index)) },
        1000
    );
}


// function incrementIfOdd() {
//     return (dispatch, getState) => {
//         const { counter } = getState();
//
//         if (counter % 2 === 0) {
//             return;
//         }
//
//         dispatch(increment());
//     };
// }

