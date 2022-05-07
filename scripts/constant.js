//统一管理公共常量

const path = require('path')

//公共项目根路径
const PROJECT_PATH = path.resolve(__dirname, "../")

//启动端口和IP
const SERVER_HOST = 'localhost'
const SERVER_PORT = 3003

module.exports = {
    PROJECT_PATH,
    SERVER_HOST,
    SERVER_PORT
}