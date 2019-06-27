This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
# Reference.

## Install Dependencies
```angular2
yarn add redux react-redux
yarn add redux-thunk
```

## Directories
> - **actions**: 액션타입, 액션생성자 파일이 저장됩니다
> - **components**: 뷰만을 담당하는 presentational 컴포넌트들이 저장됩니다
> - **containers**: store 에 접근이 닿는 container 컴포넌트들이 저장됩니다
> - **reducers**: 스토어의 기본상태와, 상태의 업데이트를 담당하는 리듀서 파일들이 저장됩니다
> - **utils**: 일부 컴포넌트들에서 공용되는 파일이 저장됩니다.

### Presentational 컴포넌트와 Container 컴포넌트
프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트는, 리덕스를 사용하는 프로젝트에서 자주 사용되는 구조입니다. Dumb 컴포넌트와 Smart 컴포넌트로도 알려져있지요

#### 프리젠테이셔널 컴포넌트 (Dumb 컴포넌트)
프리젠테이셔널 컴포넌트는 오직 뷰만을 담당하는 컴포넌트입니다. 이 안에는 DOM 엘리먼트, 그리고 스타일을 갖고 있으며, 프리젠테이셔널 컴포넌트나 컨테이너 컴포넌트를 가지고 있을 수도 있습니다. 하지만, 리덕스의 스토어에는 직접적인 접근 권한이 없으며 오직 props 로만 데이터를 가져올수 있습니다. 또한, 대부분의 경우 state 를 갖고있지 않으며, 갖고있을 경우엔 데이터에 관련된것이 아니라 UI 에 관련된것이어야 합니다.

주로 함수형 컴포넌트로 작성되며, state 를 갖고있어야하거나, 최적화를 위해 LifeCycle 이 필요해질때 클래스형 컴포넌트로 작성됩니다.

#### 컨테이너 컴포넌트 (Smart 컴포넌트)
이 컴포넌트는 프리젠테이셔널 컴포넌트들과 컨테이너 컴포넌트들을 관리하는것을 담당합니다. 주로 내부에 DOM 엘리먼트가 직접적으로 사용되는 경우는 없습니다. 사용되는 경우는 감싸는 용도일때만 사용 됩니다. 또한, 스타일을 가지고있지 않아야합니다. 스타일들은 모두 프리젠테이셔널 컴포넌트에서 정의되어야 합니다. 상태를 가지고 있을 때가 많으며, 리덕스에 직접적으로 접근 할 수 있습니다.

## Action Types (src/actions/ActionTypes.js)
> - INCREMENT
> - DECREMENT
> - SET_COLOR

```angular2
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_COLOR = 'SET_COLOR';
```

```angular2
import * as types from './ActionTypes'
```

### Action Creators (src/actions/index.js)
```angular2
import * as types from './ActionTypes';

export const increment = () => ({
    type: types.INCREMENT
});

export const decrement = () => ({
    type: types.DECREMENT
});

// 다른 액션 생성자들과 달리, 파라미터를 갖고있습니다
export const setColor = (color) => ({
    type: types.SET_COLOR,
    color
});

```

## Reducer (src/reducers/index.js)
```angular2
import * as types from '../actions/ActionTypes';

// 초기 상태를 정의합니다
const initialState = {
    color: 'black',
    number: 0
};

/* 
    리듀서 함수를 정의합니다. 리듀서는 state 와 action 을 파라미터로 받습니다.
    state 가 undefined 일때 (스토어가 생성될때) state 의 기본값을 initialState 로 사용합니다.
    action.type 에 따라 다른 작업을 하고, 새 상태를 만들어서 반환합니다.
    이 때 주의 할 점은 state 를 직접 수정하면 안되고,
    기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환해야합니다.
*/

function counter(state = initialState, action) {
    switch (action.type) {
        case types.INCREMENT: 
            return {
                ...state,
                number: state.number + 1
            };
        case types.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        case types.SET_COLOR:
            return {
                ...state,
                color: action.color
            };
        default:
            return state;
    }
};

export default counter;
```

## Store (src/index.js)
```angular2
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';

// Redux 관련 불러오기
import { createStore } from 'redux'
import reducers from './reducers';

// 스토어 생성
const store = createStore(reducers);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## Provider (src/index.js)
Provider 는 react-redux 라이브러리에 내장되어있는, 리액트 앱에 store 를 손쉽게 연동 할 수 있도록 도와주는 컴포넌트입니다.
```angular2
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';

// Redux 관련 불러오기
import { createStore } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux';

// 스토어 생성
const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

## Connect (src/containers/CounterContainer.js)
```angular2
import Counter from '../components/Counter';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { getRandomColor } from '../utils';

// store 안의 state 값을 props 로 연결해줍니다.
const mapStateToProps = (state) => ({
    color: state.color,
    number: state.number
});


/* 
    액션 생성자를 사용하여 액션을 생성하고,
    해당 액션을 dispatch 하는 함수를 만들은 후, 이를 props 로 연결해줍니다.
*/
const mapDispatchToProps = (dispatch) => ({
    onIncrement: () => dispatch(actions.increment()),
    onDecrement: () => dispatch(actions.decrement()),
    onSetColor: () => {
        const color = getRandomColor();
        dispatch(actions.setColor(color));
    }
});

// Counter 컴포넌트의 Container 컴포넌트
// Counter 컴포넌트를 어플리케이션의 데이터 레이어와 묶는 역할을 합니다.
const CounterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);


export default CounterContainer;
```
# Manual

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
