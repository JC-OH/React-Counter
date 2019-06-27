// import React from 'react';
// import Counter from './components/Counter'
// import CounterOld from './components/CounterOld'
// import CounterContainer from './containers/CounterContainer'
// function App() {
//   return (
//     <div className="App">
//       <Counter/>
//       <CounterContainer/>
//       <CounterOld/>
//     </div>
//   );
// }
//
// export default App;
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Buttons from './components/Buttons';
import CounterListContainer from './containers/CounterListContainer';

import { connect } from 'react-redux';
import * as actions from './actions';
import * as postActions from './reducers/post';


import { getRandomColor } from './utils';

class App extends Component {
    componentDidMount() {
        const { PostActions } = this.props;
        PostActions.getPost(1);
    }
    render() {
        const { post, error, loading, onCreate, onRemove } = this.props;
        return (
            <div className="App">
                <Buttons
                    onCreate={onCreate}
                    onRemove={onRemove}
                />
                <CounterListContainer/>
                 { error
                    ? <h1>에러발생!</h1>
                    : (
                        <div>
                            <h1>{post.title}</h1>
                            <p>{post.title}</p>
                        </div>
                     )
                 }
            </div>
        );
    }
}

// 액션함수 준비
const mapToDispatch = (dispatch) => ({
    onCreate: () => dispatch(actions.create(getRandomColor())),
    onRemove: (index) => dispatch(actions.remove(index)),
    PostActions: bindActionCreators(postActions, dispatch)
});

// 리덕스에 연결을 시키고 내보낸다
export default connect(
    (state) => ({
        post: state.post.data,
        loading: state.post.pending,
        error: state.post.error
    }), mapToDispatch)(App);