import React, { Component } from 'react';

class Counter extends Component {
    // 컴포넌트의 state 를 정의할 때는 class fields 문법을 사용해서 정의합니다.
    state = {
        number: 0
    }

    // 아예 화살표 함수 형태로 하면 this 가 풀리는 것에 대해서 걱정하실 필요 없습니다.
    handleIncrase = () => {
        // 각 메소드에 들어있는 this.setState 에 대해서 알아봅시다.
        // state 에 있는 값을 바꾸기 위해서는, this.setState 를 무조건 거쳐야합니다.
        // 리액트에서는, 이 함수가 호출되면 컴포넌트가 리렌더링 되도록 설계되어있습니다.
        // this.setState({
        //     number: this.state.number + 1
        // })

        // 굳이 또 this.state 를 조회해야 하는데요, 이렇게 하면 조금 더 멋진 문법으로 작성 할 수 있습니다.
        // this.setState(
        //     (state) => ({
        //         number: state.number
        //     })
        // );

        // 보면 (state) 가 ({ number }) 가 됐죠? 이건 비구조화 할당 이라는 문법입니다.
        // this.setState(
        //     ({ number }) => ({
        //         number: number + 1
        //     })
        // );

        // 결국 코드를 조금 덜 작성하고 싶다면 이렇게도 할 수 있답니다.
        const { number } = this.state;
        this.setState({
            number: number + 1
        })
    }

    handleDecrease = () => {
        this.setState({
            number: this.state.number - 1
        })
    }

    render() {
        return (

            <div>
                <h1>카운터 <small>컴포넌트의 state 를 정의할 때는 class fields 문법을 사용해서 정의</small></h1>
                <div>값: {this.state.number}</div>
                <button onClick={this.handleIncrase}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>
        )
    }
}
export default Counter;