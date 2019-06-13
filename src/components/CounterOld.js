import React, { Component } from 'react';

class CounterOld extends Component {
    // 만약에 class fields 를 사용하지 않는다면 다음과 같이 사용합니다.

    // class fields 도 사용하고 constructor 도 사용하게 된다면, 어떤 부분이 더욱 늦게 설정될까요?
    // class fields 가 먼저 실행되고, 그 다음에 constructor 에서 설정된 것이 나옵니다
    constructor(props) {
        // onstructor 에서 super(props) 를 호출 한 이유는, 우리가 컴포넌트를 만들게 되면서, Component 를 상속했으며,
        // 우리가 이렇게 constructor 를 작성하게 되면 기존의 클래스 생성자를 덮어쓰게 됩니다.
        // 그렇기에, 리액트 컴포넌트가 지니고있던 생성자를 super 를 통하여 미리 실행하고,
        // 그 다음에 우리가 할 작업 (state 설정) 을 해주는 것 입니다.
        super(props);

        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);

        this.state = {
            number: 0
        }
    }

    // handleIncrease = () => {
    //     this.setState({
    //         number: this.state.number + 1
    //     });
    // }
    //
    // handleDecrease = () => {
    //     this.setState({
    //         number: this.state.number - 1
    //     });
    // }
    // 이렇게 하면, 나중에 버튼에서 클릭이벤트가 발생 했을 때, this 가 undefined 로 나타나서 제대로 처리되지 않게 됩니다.
    // 이는 함수가 버튼의 클릭이벤트로 전달이 되는 과정에서 “this” 와의 연결이 끊겨버리기 때문인데요,
    // 이를 고쳐주려면 constructor 에서 bind을 해야 합니다.

    handleIncrease() {
        this.setState({
            number: this.state.number + 1
        });
    }

    handleDecrease() {
        this.setState({
            number: this.state.number - 1
        });
    }

    render() {
        return (
            <div>
                <h1>카운터 - <small>class fields 를 사용하지 않음</small></h1>
                <div>값: {this.state.number}</div>
                <button onClick={this.handleIncrease}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>
        );
    }
}
export default CounterOld;