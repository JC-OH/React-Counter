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
    type: types.REMOVE,
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

