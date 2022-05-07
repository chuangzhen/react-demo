import React, { createRef, LegacyRef, ReactElement, ReactNode } from "react";
import { throttle } from 'src/utils/util'

interface IProps {
    /**单元项渲染组件 */
    Component: ({data}) => ReactElement | ReactElement
    /**滚动数据列表 */
    dataList: Array<any>
    /**加载状态-true-不再触发触顶触底加载操作，false-可以触发触底触顶加载操作  */
    loading:boolean
    /**true-还有更多的数据可加载，false-没有更多的了 */
    hasMore?:boolean
    /**距离多少的时候触发加载更多操作  */
    distance?:number
    /**滚动容器id -不传默认window滚动 |
     * 【注意：】scrollContinerId不能传节点，初始化时，子组件先执行render 
     * 父组件再执行渲染，所以父组件中的滚动容器节点在子组件componentDidmount中是取不到节点信息，
     * 等初始化完成后才拿得到*/
    scrollContinerId?: string

    //滚动事件
    onScroll?: (e: Event) => void

    onScrollToBottom?:() => void
    onScrollToTop?:() => void
}
class ScrllView extends React.Component<IProps, any>{


    constructor(props: IProps | Readonly<IProps>) {
        super(props)

        this.state = {
            list: [],
            scrollTop:0,
            bottomLock:false,
            topLock:false
        }
        this.handleScrollToBottom = this.handleScrollToBottom.bind(this)
        this.handleScrollToTop = throttle(this.handleScrollToTop.bind(this),500)
    }

    static getDerivedStateFromProps(newProps: { dataList: any; }) {
        const { dataList } = newProps
        return {
            list: dataList
        }

    }
    //性能优化-只有数据发生变化才更新滚动容器
    shouldComponentUpdate(newProps:Readonly<IProps>, newState: Readonly<IProps>) {
        return newProps.dataList !== this.state.list
    }

    // //更新前
    // getSnapshotBeforeUpdate() {
         
    // }



    // //更新后
    // componentDidUpdate(preProps: any, preState: any, snapshot: any) {
        
    // }
    //页面初次完成渲染挂载
    componentDidMount() {
        if (this.props?.scrollContinerId) {
            let scrollEle = document.querySelector(`#${this.props?.scrollContinerId}`)
            scrollEle?.addEventListener('scroll', this.handleScroll.bind(this))
        } else {
            window?.addEventListener('scroll', this.handleScroll.bind(this))
        }

    }

    //组件卸载前
    componentWillUnmount() {
        if (this.props?.scrollContinerId) {
            let scrollEle = document.querySelector(`#${this.props?.scrollContinerId}`)
            scrollEle?.removeEventListener('scroll', this.handleScroll)
        } else {
            window?.removeEventListener('scroll', this.handleScroll)
        }
    }


    //触底操作
    handleScrollToBottom() {
        let scrollEle:Element | HTMLElement | null = this.getScrollEle()
        if (scrollEle) {
            //@ts-ignore
            const {scrollHeight , scrollTop ,  offsetHeight} = scrollEle
            // console.log('handleScrollToBottom',scrollHeight , scrollTop ,  offsetHeight);
            const {distance, loading,onScrollToBottom} = this.props
            const {bottomLock} = this.state
            //lock是限制在使用scrollVlew的时候，没有正确传递loading时做的定时限制
            if ((scrollHeight <= scrollTop + offsetHeight + distance) && !loading && !bottomLock  ) {
                onScrollToBottom&&onScrollToBottom()
                this.setState({bottomLock:true},() => {
                    setTimeout(() => {
                        this.setState({bottomLock:false})
                    },500)
                })
            }
        }
     
    }
    //触顶操作
    handleScrollToTop() {
        let scrollEle:Element | HTMLElement | null = this.getScrollEle()
        if (scrollEle) {
            //@ts-ignore
            const {scrollHeight , scrollTop ,  offsetHeight} = scrollEle
            const {distance = 0, loading,onScrollToTop} = this.props
            const {topLock} = this.state
            if ((scrollTop <= distance) && !loading && !topLock  ) {
                onScrollToTop&&onScrollToTop()
                this.setState({topLock:true},() => {
                    setTimeout(() => {
                        this.setState({topLock:false})
                    },500)
                })
            }
        }
        
    }


    // 滚动操作
    handleScroll(e: Event) {
      
        this.props?.onScroll && this.props.onScroll(e)
        let scrollEle:Element | HTMLElement | null = this.getScrollEle()
        if (scrollEle) {
            // const {top=0,bottom=0} = scrollEle?.getBoundingClientRect()
            const innerHeight = window.innerHeight
            //@ts-ignore
            const {scrollHeight , scrollTop ,  offsetHeight} = scrollEle
            // console.log(scrollHeight , scrollTop ,  offsetHeight,innerHeight);
           
            if (this.state.scrollTop > scrollTop) {
                this.handleScrollToTop()
            }else{
                this.handleScrollToBottom()
            }
            this.setState({scrollTop:scrollTop})
        }
       

    }

    getScrollEle = () => {
        let scrollEle:Element | HTMLElement | null = null
        if (this.props?.scrollContinerId) {
             scrollEle = document.querySelector(`#${this.props?.scrollContinerId}`)
        } else {
             scrollEle = document?.body || document?.documentElement
        }
        return scrollEle
    }

    render() {
        const {list } = this.state
        const { Component } = this.props
        return <div id='scroll_view_container'>
            <div>{this.state.scrollTop}</div>
            {list.map((i: { id: any; }) =>  React.createElement(Component,{data:i,key:i?.id}))}
        </div>
    }
}

export default ScrllView