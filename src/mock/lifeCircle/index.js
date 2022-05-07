// var Mock = require('mock.js')
import Mock from 'mockjs'
import {sleep} from 'utils/util'


const MockGetLifeCicleData = Mock.mock(/\/books/, 'get', function (params) {
    // console.log(params, '<====mock---params');
    const total_page = 8
    let props = {
        page: 1,
        pageSize: 20
    }
    if (params?.type?.toLowerCase() === 'get' && params?.url?.split('?')?.length > 1) {
        let newProps = [...new URLSearchParams(params.url.split('?')[1])].reduce(
            (a, [k, v]) => {
                a[k] = v
                return a
            }, {})
        props = {
            ...props,
            ...newProps
        }
    }
    // //等待5秒
    // sleep(5000)
    
    if(props.page < total_page){
        return Mock.mock({
            'code': 0,
            'data': {
                'list|20': [{
                    'id|+1': 1 + ((props?.page || 1) - 1) * 20,
                    'title': Mock.Random.sentence(2, 5),
                    'cost': Mock.Random.integer(1, 50),
                    'cover': Mock.Random.image('80x160', '#ffcc33', '#FFF', 'png'),
                    'desc': Mock.Random.cparagraph(1, 4)
                }],
                'pagination':{
                    current_page:parseInt(props.page),
                    total_page:8,
                }
            }
        })
    }
    return Mock.mock({
        'code': 0,
        'data': {
            'list': [],
            'pagination':{
                current_page:parseInt(props.page),
                total_page:total_page,
            }
        }
    })
})


export default MockGetLifeCicleData