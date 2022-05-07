import React, { createRef } from "react"
import Form, { FormItem } from "src/components/Form"
import Input from 'src/components/Input'


/* children 组件 */
function ChidrenComponent() {
    return <div> In this chapter, let's learn about react props ! </div>
}
/* props 接受处理 */
class PropsComponent extends React.Component<any, any>{
    formRef = React.createRef();
    static getDerivedStateFromProps(preProps,preState){
        console.log(preProps,preState,'----');
        return {age:99}
    }
    shouldComponentUpdate(props, state ,derivedValue) {
        console.log(props, state,derivedValue, 'shouldComponentUpdate');

        return true
    }
    getSnapshotBeforeUpdate(preProps, preState) {
        console.log(preProps, preState, 'getSnapshotBeforeUpdate');

    }
    // 有getDerivedStateFromProps getSnapshotBeforeUpdate初始化时不会更新componentWillMount
    componentWillMount() {
        console.log('-----------');

    }
    componentDidMount() {
        console.log(this, '_this')
    }
    render() {
        const { children, mes, renderName, say, Component } = this.props
        //@ts-ignore
        const renderFunction = children[0]
        //@ts-ignore
        const renderComponent = children[1]
        /* 对于子组件，不同的props是怎么被处理 */
        return <div>
            {renderFunction()}
            {mes}
            {renderName()}
            {renderComponent}
            <Component />
            <button onClick={() => say()} > change content </button>
        </div>
    }
}
/* props 定义绑定 */

class Index extends React.Component {
    formRef: any
    formRefObj: React.RefObject<unknown> | any
    // formRefObj = React.createRef()
    constructor(props) {
        super(props)
        this.formRef = {}
        this.formRefObj = React.createRef()
    }

    state = {
        mes: "hello,React",
    }
    node = null

    say = () => this.setState({ mes: 'let us learn React!' })
    handleSubmit(values) {
        console.log("🚀 🚀 🚀 🚀 🚀  values", values)

    }
    handleSubmitFiled(err, value) {
        console.log(value, "🚀 ~ file: indeled ~ err", err)

    }

    handleBtn() {
        //@ts-ignore
        const { form } = this.props
        // const values = form.getFieldsValue()
        // console.log(this.formRefObj.current, '-----------',);
        this.setState({ mes: 'hello,React Update' })
    }

    componentDidMount() {
        // console.log(this.formRef.current,'------',this.formRef.current);
        console.log(this.formRefObj.current);

    }

    render() {
        return <div>
            <PropsComponent
                mes={this.state.mes}  // ① props 作为一个渲染数据源
                say={this.say}     // ② props 作为一个回调函数 callback
                Component={ChidrenComponent} // ③ props 作为一个组件
                renderName={() => <div> my name is alien </div>} // ④ props 作为渲染函数
            >
                {() => <div>hello,world</div>} { /* ⑤render props */}
                <ChidrenComponent />             { /* ⑥render component */}
            </PropsComponent>

            <button onClick={this.handleBtn.bind(this)}>点击获取表单域</button>

            {/* getForm={(formInstance) => this.formRef = formInstance} */}
            <Form onFinish={this.handleSubmit} onFinishFailed={this.handleSubmitFiled} ref={this.formRefObj} >
                <FormItem name='age' label='年龄' rules={{ required: true }}><Input type='number' placeholder='请输入年龄' /></FormItem>
                <FormItem name='name' label='姓名'><Input placeholder='请输入姓名' /></FormItem>
                <button type="submit">提交表单</button>
                <button type="reset">重置表单</button>
            </Form>

        </div>
    }
}


export default Index