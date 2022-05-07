import React, { ReactElement, forwardRef, useImperativeHandle, RefObject, PropsWithChildren, ForwardedRef } from "react";
import { FormProvider } from './useFormItemsContext'
import {IFormInstance,useForm} from '..'

interface IFormProps {
    children:ReactElement | Array<ReactElement>
    /**Form接收onFinish回调 提交表单数据 */
    onFinish: (data: any) => void
    onFinishFailed: (err: string, values: any) => void
    //【函数组件】使用Form时，useForm()+ 传递form实例对象  |    【类组件】使用Form组件时传递ref获取Form实例对象
    form?: IFormInstance 
    [key:string]:any
}



const Form = (props:PropsWithChildren<IFormProps>,ref:any) => {
    const { children, form, onFinish, onFinishFailed } = props

    const [formInstance] = useForm(form)
    console.log(ref,"🚀 ~ file: Form.tsx ~ line 20 ~ Form ~ formInstance", formInstance)

    /**将实例对象暴露给Form 的父组件传递给Form的ref变量 */
    useImperativeHandle(ref, () => formInstance)

    //将Form的父组件传递的提交函数透传给实例对象
    //@ts-ignore
    formInstance.setCallback({ onFinish, onFinishFailed })

    return <form className="zane_form" 
    onSubmit={(e) => {
        e.preventDefault()
        console.log('触发form的onSubmit');

        formInstance?.submit()
    }}
    onReset={(e) => {
        e.preventDefault()
        console.log('reset')
        formInstance?.reset()
    }}
    >
        <FormProvider value={formInstance}>{ children }</FormProvider>
    </form>

}


type Forms = React.ForwardRefExoticComponent<React.PropsWithoutRef<IFormProps> & React.RefAttributes<any>>
const ForWardForm = forwardRef(Form)  as Forms;



export default ForWardForm