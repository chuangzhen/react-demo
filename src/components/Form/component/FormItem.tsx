import React, { ChangeEvent, useLayoutEffect, useReducer } from "react";
import { IFormInstance } from "..";
import { useFormContext } from './useFormItemsContext'
import styles from '../index.scss'
import classNames from "classnames";

const Item: React.FC<any> = (props) => {
    const { children, name, label = '', rules = {}, ...rest } = props
    //获取context中form的实例对象的方法
    const { getFieldValue, setFieldsValue, registerItemInfos }: IFormInstance = useFormContext()
    //定义 强制 Item 组件更新的方法，将这个更新方法透传给实例对象注册
    const [_, forceUpdate] = useReducer(x => x + 1, 0)
    console.log(111, getFieldValue(name));


    //页面渲染之前先注册对应的表单项的props和update函数，有name的注册
    useLayoutEffect(() => {
        if (!!name) {
            registerItemInfos({
                props: { name, rules },
                onStoreChange: forceUpdate
            })
        }
    }, [])

    return <div className={styles.item_container} >
        <div className={styles.item_content}>
            <span className={classNames(styles.item_label, {
                [styles.item_hidden]: !label,
                [styles.item_required]: rules?.required,
                [styles.item_not_required]: !rules?.required
            })}>
                {label}:
            </span>
            <div className={styles.item_wrapper}>
                {React.cloneElement(children, {
                    value: getFieldValue(name)?.value || '',
                    onChange: (e: ChangeEvent<HTMLFormElement>) => {
                        //给Item 包裹的子组件 Child 注入value和onChange 同时更新form实例对象的store
                        const newValue = e.target.value
                        //实例对象中的store更新的时候，要触发Item更新注入给子组件 Child 的 value
                        setFieldsValue({
                            [name]: newValue
                        })
                    }

                })}
                <div className={classNames(styles.item_err, {
                    [styles.item_hidden]: !getFieldValue(name)?.err
                }
                )}>{getFieldValue(name)?.err || ''}</div>
            </div>
        </div>



    </div>
}
Item.displayName = 'formItem'


export default Item