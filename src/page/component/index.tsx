import React from "react"


//组件分为类组件和函数组件，本质就是类class和函数function

//1.类组件在初始化时new创建了一个实例，底层只实例化一次，之后setState或者forceUpdate时只是调用了更新函数去更新state
//2.函数组件在发生更新时，每次都是一次新的函数执行，里边的变量都会重新声明

class Component extends React.Component<any,any> {

    constructor(props){
        //类组件在初始化的时候，props是在Component的构造函数中绑定的，
        //不执行super(props)，在当前实例的constructor上下文中找不到props的参数
        super(props)

        this.state = {
            name:'cz'
        }
    }
    componentDidMount(){
        console.log(1)
    }
    handleCB(){
        console.log(999)
        this.setState({
            name:'xc'
        })
    }
    componentDidUpdate(){
        console.log(22);
        
    }
    handleForceUpdate(){
        //setState   forceUpdate方法是在Component构造函数的原型链上的方法
        this.forceUpdate(this.handleCB) 
    }

    render(){

        return <div>
            <h2>component--{this.state.name}</h2>
            <button onClick={this.handleForceUpdate}>forceUpdate</button>
        </div>
    }

}

export default Component