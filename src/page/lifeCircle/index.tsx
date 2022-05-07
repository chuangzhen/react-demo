import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import '../../mock'
import styles from './index.scss'
import ScrollVlew from 'components/ScrollView'



const Index: React.FC<any> = (props) => {
    const [list, setList] = useState<any[]>([])
    const [pagination, setPagination] = useState<{current_page:number,total_page:number}>({current_page:0,total_page:0})
    const [loading, setLoading] = useState<boolean>(false)
    const scrollRef = useRef<any>(null)

    useEffect(() => {
        document.body.setAttribute('style', 'overflow:hidden')
        getList(1)
    }, [])

    const getList = async (page = 1) => {
        setLoading(true)
        let result = await axios({
            url: '/books',
            method: 'get',
            params: {
                page: page,
            }
        })
        console.log("🚀 ~ file: index.tsx ~ line 23 ~ getList ~ result", result)
        if (result.data.code === 0) {
            setList([...list, ...result.data.data.list])
            setPagination(result.data.data.pagination)
        }
        setLoading(false)

    }
    const Row = ({ data }) => {
        return <div className={styles.row_container} key={data.id}>
            <div>id:{data.id}</div>
            <img src={data.url} alt="" className={styles.book_img} />
            <div className={styles.book_info}>
                <div>{data.title}</div>
                <div>{data.cost}</div>
                <div>{data.desc}</div>
            </div>
        </div>
    }


    const onScrollToBottom = () => {
        console.log('onScrollToBottom');
        if (pagination.current_page < pagination.total_page) {
            getList(pagination.current_page + 1)
        }else{
            console.log('到底了');
            
        }

    }
    const onScrollToTop = () => {
        console.log('onScrollToTop---要刷新还是加载上一页看需要');


    }
    // style={{display:'flex',flexDirection:'column',height:'100vh'}}
    return <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <h4>mock-scrollview容器</h4>
        <div>这是scrollview</div>
        {/* style={{flex:1,overflow:'auto'}} */}
        <div id='scroll_div' ref={scrollRef} style={{ flex: 1, overflow: 'auto' }} >
            {/* scrollContinerId={'scroll_div'} */}
            <ScrollVlew Component={Row}
                dataList={list}
                // hasMore={pagination.current_page ==}
                distance={100}
                loading={loading}
                scrollContinerId={'scroll_div'}
                onScrollToTop={onScrollToTop}
                onScrollToBottom={onScrollToBottom} />
        </div>

    </div>
}

export default Index