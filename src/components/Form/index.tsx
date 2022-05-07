import Form from "./component/Form";
import FormItem from "./component/FormItem";
import useForm from './component/useForm'


type TValues = {
    [key: string]: any
}
/**表单实例对象 */
export interface IFormInstance {
    setFieldsValue: (values: TValues) => void
    setCallback: (callbacks: Object) => void
    getFieldsValue: () => {[key:string]:any}
    getFieldValue: (name: string) => {value:any,err?:string}
    submit: () => void
    reset: () => void
    registerItemInfos:(IItemUpdateInfo) =>void
    [key: string]: any
}
/**表单实例的校验错误信息对象 */
export interface IValidateErrObj{
    /**name对应校验不通过的表单项的name，value对应rules的message */
    [name:string]:string
    /**表单项的真实值 */
    value:any
}

/**表单项的更新信息对象 */
export interface IItemUpdateInfo{
    props:{
        name:string
        //表单项的规则待完善
        rules?:IItemRulesProps
    }
    onStoreChange:() => void
}
/**校验规则 */
interface IItemRulesProps{
    required?:boolean
    message?:string
    /**字段校验函数validator的触发时机 */
    validatorTrigger?:'onSubmit' | 'onChange'
    validator?:(value:any) => boolean
}
/**表单项的props */
export interface IItemProps {
    name:string
    label?:string
    rules:IItemRulesProps
}


/**
 * 函数组件使用Form  使用useForm创建表单实例，form传递
 * 类组件使用Form   使用ref传递获取表单实例对象
 */
export {FormItem,useForm}
export default Form