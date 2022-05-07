import React from 'react';

const toLearn = ['react', 'vue', 'webpack', 'nodejs']

const TextComponent = () => <div> hello , i am function component </div>




//jsx基础 jsx编译后的结构React,createElement()创建的ReactElement,V17之后可以并不需要引入React就可以在浏览器使用jsx  对编译后的ReactElement进行修改 React.isValidElement   React.Children.toArray React.Children.forEach(children,(i) => {..})
// React.createElement(type,{...props},children)    React.cloneElement(type,{...props},children)
const JSX = () => {
    let status = false /* 状态 */
    const renderFoot = () => <div> i am foot</div>
    /* 控制渲染 */
    const controlRender = () => {
        const reactElement = (
            <div style={{ marginTop: '100px' }} className="container"  >
                { /* element 元素类型 */}
                <div>hello,world</div>
                { /* fragment 类型 */}
                <React.Fragment>
                    <div> 👽👽 </div>
                </React.Fragment>
                { /* text 文本类型 */}
                my name is alien
                { /* 数组节点类型 */}
                {toLearn.map(item => <div key={item} >let us learn {item} </div>)}
                { /* 组件类型 */}
                <TextComponent />
                { /* 三元运算 */}
                {status ? <TextComponent /> : <div>三元运算</div>}
                { /* 函数执行 */}
                {renderFoot()}
            </div>
        )
        console.log(reactElement)
        const { children } = reactElement.props
        /* 第1步 ： 扁平化 children  */
        const flatChildren = React.Children.toArray(children)
        console.log(flatChildren)
        /* 第2步 ： 除去文本节点 */
        const newChildren: any = []
       
        React.Children.forEach(flatChildren, (item) => {
            if (React.isValidElement(item)) newChildren.push(item)
        })
        /* 第3步，插入新的节点 */
        const lastChildren = React.createElement(`div`, { className: 'last' }, `say goodbye`)
        newChildren.push(lastChildren)

        /* 第4步：修改容器节点 */
        const newReactElement = React.cloneElement(reactElement, {}, ...newChildren)
        return newReactElement
    }

    return <>{controlRender()}</>

}



//！！！   jsx元素类型           =======> React.createElement()转化后的类型    =======>type属性
//element元素类型               ReactElement类型                            标签字符串  如'div'
//fragment类型                  ReactElement类型                           react.fragment
//文本类型                      字符串                                          无
//数组类型                      数组,子元素继续被React.createElement转化         无
//组件类型                      ReactElement类型                                组件类或者组件函数
//三元表达式                    看三元表达式的结果，再按规则判断                  看结果
//函数执行                      看函数的返回值，再按规则执行                      看返回值
//


// ！！！在react底层调和后，会将React.createElement转化的react element元素转化成fiber对象,
//不同的fiber对象有不同的tag,    tag和element的对应关系具体如下:
const FunctionComponent = 0 ; //函数组件
const ClassComponent = 1; //类组件
const IndeterminateComponent = 2; //初始化时不知道是函数还是类组件
const HostRoot = 3;  //Root Fiber 可以理解为根元素，通过reactDOM.render()产生
const HostPortal = 4;  //对应ReactDOM.createPortal产生的Portal
const HostComponent = 5; //对应dom元素的 例如<div></div>
const HostText = 6;  // 对应文本节点
const Fragment = 7;  // 对应<React.Fragment>
const Mode = 8;  // 对应<React.StrictMode>
const ContextConsumer = 9;  // 对应<Context.Consumer>
const ContextProvider = 10;  // 对应<Context.provider>
const Forwaref = 11;  // 对应React.forwardRef
const Profiler = 12;  // 对应<Profiler >
const SuspenseComponent  = 13;  // 对应<React.Suspense>
const MemoComponent  = 14;  // 对应 React.memo返回的组件
export default JSX;
