import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Redux 관련 불러오기
import { createStore } from 'redux';
import reducers from './reducers';
// Provider 는 react-redux 라이브러리에 내장되어있는, 리액트 앱에 store 를 손쉽게 연동 할 수 있도록 도와주는 컴포넌트입니다.
import { Provider } from 'react-redux';

// 스토어 생성
const store = createStore(reducers);


// 이 컴포넌트를 불러온다음에, 연동 할 컴포넌트를 감싸준다음에 Provider 컴포넌트의 props로 store 값을 설정해주면 됩니다.
// 우리의 App 컴포넌트가 store 에 연동되었습니다.
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
