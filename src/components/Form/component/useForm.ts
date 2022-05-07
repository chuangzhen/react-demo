import { useRef } from "react"
import {IFormInstance,IItemUpdateInfo,IValidateErrObj,IItemProps} from '..'


class FormStore {
    /**表单域数据对象 */
    store: Object
    callbcaks: any
    itemsInfo: Array<IItemUpdateInfo>
    /**校验错误数据对象 */
    errorStore: {[key:string]:string}
    constructor() {
        this.store = { }
        this.callbcaks = {}
        this.itemsInfo = []
        this.errorStore = {}
    }
    /**获取全部表单数据 */
    getFieldsValue = () => {
        return this.store
    }
    /**获取单个表单项数据 */
    getFieldValue = (name) => {
        let fieldValueObj = {
            value:this.store[name] || undefined
        }
        if (!!this.errorStore[name]) {
            fieldValueObj['err'] = this.errorStore[name]
        }
        return fieldValueObj
    }
    /**设置（更新）表单域的值 */
    setFieldsValue =  (newStore) =>{
        //更新store
        this.store = {
            ...this.store,
            ...newStore
        }
        
        //通知更新了的name-对应的组件触发更新渲染
        const keys = Object.keys(newStore)

        keys.forEach((key:string) => {
           let err =  this.validate(false,key)
           if (err.length  === 1) {
               this.errorStore = {
                   ...this.errorStore,
                   [key] : err[0][key]
               }
               
           }else{
               delete this.errorStore[key]
           }
        })
        this.itemsInfo.forEach((item,index) => {
            if (keys.includes(item.props.name)) {
                item.onStoreChange()
            }
        })

    }
    /**接收Form组件的onFinish onFinishFailed函数，表单提交时，，实例对象触发该props的函数 */
    setCallback = (cbs:Object) => {
        this.callbcaks = {
            ...this.callbcaks,
            ...cbs
        }
    }

    /**注册、取消注册Item组件实例的相关更新方法和属性 */
    registerItemInfos = (itemInfo:IItemUpdateInfo) => {
            //注册该表单项的信息
             this.itemsInfo.push(itemInfo)

             itemInfo?.props?.name && (this.store[itemInfo?.props?.name] = undefined)
             return () => {
                this.itemsInfo = this.itemsInfo.filter((i:IItemUpdateInfo) => i !== itemInfo )
                delete this.store[itemInfo.props.name]
             }
    }

    /**检验方法 */
    validate = (isSubmit?:boolean,name?:string) => {
        let err : Array<IValidateErrObj> = []
        let itemsArr = this.itemsInfo
        // console.log("🚀 ~ file: useForm.ts ~ line 84 ~ FormStore ~ itemsArr", itemsArr)
        //表单项触发onChange时-单独校验
        if (!isSubmit && !!name) {
            itemsArr = itemsArr.filter(i => i.props.name === name)
        }


        //提交表单时-递归遍历校验
        itemsArr.forEach((item:IItemUpdateInfo) => {
            const {rules,name} = item.props
            
            let value = this.getFieldValue(name)?.value
            //需要 required-true 校验
            if ((rules?.required&&!value) || (!!value && !!rules?.validator && !rules?.validator(value))) {
                this.errorStore = {
                    ...this.errorStore,
                    [name]:rules?.message || `${name} is required.`
                }
                err.push({
                    value:value,
                    [name]:rules?.message || `${name} is required.`
                })

                
                //触发对应FormItem组件更新
                console.log(item,'99999');
                
                item.onStoreChange()

            }
        })

        return err
    }

/**提交表单 */
    submit = () => {
        //todo 这里要校验
        const err = this.validate()
        // console.log("🚀 ~ file: useForm.ts ~ line 111 ~ FormStore ~ err", err)
        const {onFinish,onFinishFailed} = this.callbcaks
        // todo 判断校验的结果
        if (err?.length === 0) {
            //校验通过
            onFinish(this.getFieldsValue())
        }else{
            onFinishFailed(err, this.getFieldsValue())
        }
    }

    reset = () => {
        console.log('reset 表单');
        let keys = Object.keys(this.store)
        keys.forEach((i) => {
            this.store = {
                ...this.store,
                [i]:undefined
            }
        })
        this.itemsInfo?.forEach(item => {
            item?.onStoreChange()
        })
        
    }

    getFormInstance = () => {
        return {
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            setCallback:this.setCallback,
            submit: this.submit,
            reset:this.reset,
            registerItemInfos:this.registerItemInfos,

        }
    }
}


//函数组件使用此获取表单实例-返回表单实例数组
const useForm = (form:any) => {
    //创建一个独立的实例对象Ref,同一个，可变值
    const formRef  = useRef<IFormInstance>()
    if (!formRef.current) {
        if (!!form?.current) {
            formRef.current = form?.current
        }else{
            //创建一个表单实例对象
            const formInstance = new FormStore()
            formRef.current  = formInstance.getFormInstance()
        }
    }
    return [formRef.current]

}

export default useForm