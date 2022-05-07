import React, { Component } from "react";
import ReactDOM from 'react-dom'



class ClassIndex extends Component<any, any>{
    nativeBtnRef: React.RefObject<any>;
    
    constructor(props) {
        super(props)
        this.state = {
            number: 0,
        }
        this.nativeBtnRef = React.createRef()
        // this.nativeBtnRef = 
    }

    /**
     * 【setState更新任务跟更新渲染】：
     * 总结：合成事件中，react更新函数this.setState在合成事件上下文中表现为批量更新（异步形式）
     *                              this.setState在异步函数上下文中表现为跳出批量更新机制（同步更新机制）
     *                              this.setState在ReactDOM.unstable_batchUpdates函数的cb上下文中,重新开启react的批量更新机制
     * 
     *       原生事件中，react更新函数this.setState不走合成事件逻辑，走普通的eventLoop机制
     *                              this.setState在ReactDOM.unstable_batchUpdates函数的cb的直接上下文中时，开启react的批量更新机制
     */


    /**
     * 1.【批量更新】：合成事件中，多次同步的setState操作及上下文操 【先批量执行】，react底层会合并成一次更新渲染，取【最后一个】setState的函数执行
     * 2.setTimeout等异步操作会打破react底层的批量更新机制，使得多次setState多次触发更新
     * 3.ReactDOM.unstable_batchUpdates(() => {...在这setState...})接收一个函数，函数体中执行的多次setState会开启正常的批量更新机制
     */


    /**
     * 1.【提高更新任务（setState | useState）的优先级】：ReactDOM.flushSync(cb) ：提高cb内部的setState等react更新任务的优先级，
     * 2.flushSync函数cb内部的更新任务是同步任务时，flushSync上边的所有同步的更新任务（setState | useState）都被批量更新到flushSync中，flushSync下边的同步更新任务走另外的批量更新逻辑
     * 3.             cb内部的更新任务是异步时，flushSync打破了跟它之上的同步更新任务合并批量更新的机制，flushSync变成异步任务，打破批量更新机制，
     *                                        flushSync上边的同步任务合并走批量更新，flushSync走异步更新，flushSync下的同步任务也走一个新的批量更新机制
     *  【总结】：flushSync中的同步 setState > 正常执行上下文中的setState > flushSync中的 异步setState 、 setTimeout中的setState、Promise中的setState(顺序排列)
     */
    handleClick = () => {     
        // setTimeout(() => {
        //    ReactDOM.unstable_batchedUpdates(() => {
        this.setState({ number: this.state.number + 1 }, () => { console.log('callback1', this.state.number) })
        console.log(this.state.number, 'a1')
        this.setState(() => ({number: this.state.number + 100}),() => {console.log('cb-a11',this.state.number)})
        console.log(this.state.number, 'a11')
        

        setTimeout(() => {
            this.setState({ number: this.state.number + 4 }, () => { console.log('callbackA4', this.state.number) })
            console.log(this.state.number, 'a4')
        },1000)
       
        //flyshSync中的异步更新与普通的setTimeout异步更新，同等条件下谁在前面谁先执行
        ReactDOM.flushSync(() => {
            //setTimeout使得flushSync提升了的优先级的更新任务打破了批量更新机制，变成异步更新任务单独更新了
            setTimeout(() => {
                this.setState({ number: this.state.number + 3 }, () => { console.log('callback3', this.state.number) })
                console.log(this.state.number, 'c')
            }, 100);
        })
        

        this.setState({ number: this.state.number + 2 }, () => { console.log('callback2', this.state.number) })
        console.log(this.state.number, 'b')

        //    })
        // },0)
    }
    nativeEventHandler = () => {
        // ReactDOM.unstable_batchedUpdates(() => {
        setTimeout(() => {
            this.setState({ number: this.state.number + 1 }, () => { console.log('cbA', this.state.number) })
            console.log(this.state.number, 'A')
        })
        this.setState({ number: this.state.number + 2 }, () => { console.log('cbB', this.state.number) })
        console.log(this.state.number, 'B')

        this.setState({ number: this.state.number + 3 }, () => { console.log('cbB', this.state.number) })
        console.log(this.state.number, 'C')

        // })
    }
    static getDerivedStateFromProps(preProps,preState){
        console.log(preProps,preState);
        
    }
    componentDidMount() {
        

        /**
         * 【原生事件中一般情况下疲劳了更新机制不生效】
         * 1.原生事件中-react的事件批量更新机制不生效
         * 2.原生事件中-ReactDOM.unsrable_batchUpdates(callbcak) 函数使得callback函数体中更新内容开启正常的react批量更新机制
         */
        //@ts-ignore
        document.querySelector('#nativeEvent').addEventListener('click', this.nativeEventHandler)

    }

    getSnapshotBeforeUpdate(preProps,preState){
        console.log(this.state.number,'getSnapshotBeforeUpdate');
        
    }
    
    componentWillUnmount() {
        document.querySelector('#nativeEvent')?.removeEventListener('click', this.nativeEventHandler)
    }
    /**
     * 【this.setState()的过程】：
     * 1.执行this。setState更新函数，合并新旧state的值，更新state的值，
     * 2.组件重新render渲染，渲染完，
     * 3.this.setState有callback的话再执行callback，新的state作为参数传给callback
     * 4.在非pureComponent组件模式下，this.setState不会浅比较两次state的值，调用就会触发更新任务，pureComponent内的setState会浅比较前后连词state的值来判断是否更新，不一致就更新state
     * 
     */
    
    
    render() {
        console.log(this.state.number, '渲染之前');
        return <div>
            <button onClick={this.handleClick}>点击</button>

            <button id='nativeEvent' ref={this.nativeBtnRef}>原生事件</button>
        </div>
    }


}

// export default ClassIndex




import Form from "src/components/Form";


const FunctionIndex:React.FC<any> = (rrops) => {
    const nativeBtnRef = React.useRef<HTMLButtonElement | null>(null)
    const  formRef =  React.useRef<React.RefObject<any> | any>(null) ;
    // [state,dispatch] = useState(initData)
    const [number,setNumber] = React.useState<Number>(1)
    const [obj,setObj] = React.useState<any>({name:'cz'})

    /**
     * 【useState】：
     * 1.函数组件的触发useState中的dispatch更新任务时，批量更新机制的逻辑和提升更新优先级的逻辑与类组件一致
     * 2.函数组件的合成事件内部的dispatch更新任务上下文中，直接获取state都是初始化的值，这是因为每一次触发dispatch，函数组件的底层都是【重新声明state变量】，
     * 重新赋值更新，在更新完成之前获取state拿不到新的值，只能拿到初始化的值；
     * 要获取新的值，可以在useEffect中监听对应的state变化来获取最新的state
     * 
     */
    const handleClick = () => {
        
        ReactDOM.flushSync(() => {
            setNumber(2)
            console.log(number,'22');
        })
        console.log(number,'3333');
        setNumber(3)
        console.log(number,'33');
        ReactDOM.flushSync(() => {
            setNumber(5)
            console.log(number,'55');
        })
        setTimeout(() => {
            setNumber(4)
            console.log(number,'44');
        },0)
        
    }
    // useState的dispatchAction更新处理逻辑中，会先浅比较前后两次的state,发现state相同，则不会开启更新调度任务
    /**
     *  【es6 拓展运算符 ... 】 : 复制可迭代对象，如数组 对象 String Map Set  DOM节点等到当前元素中
     *   如果被复制的可迭代对象内的元素是简单类型数据，则相当于是深拷贝
     *   如果被复制的可迭代对象内的元素是复杂类型数据，则...的效果是浅拷贝
     *  */ 
    const handleObj = () => {
        // obj.name = 'cz'
        // setObj(obj)
        // setObj({...obj,name:'cz'})

        console.log(formRef.current,formRef.current.getFieldsValue());
        
    }
    const handleSubmit = (values) => {
    console.log("🚀 ~ file: index.tsx ~ line 186 ~ handleSubmit ~ values", values)
        
    }

    console.log(number);

    React.useEffect(() => {
        console.log(`useEffect监听number的变化 = ${number}`);
    },[number])
    return <div>
        <h6>函数组件</h6>
    <button onClick={handleClick}>点击</button>

    <button id='nativeEvent' ref={nativeBtnRef}>原生事件</button>
    <button onClick={handleObj}>原生事件==Obj++</button>

    {/* <Form onFinish={handleSubmit} ref={formRef} initailValues={{age:28,name:'wcz'}}>
        <Form.FormItem ></Form.FormItem>
    </Form> */}
</div>
} 

export default FunctionIndex