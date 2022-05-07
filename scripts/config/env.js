//环境变量控制
const isDevelopment = process.env.NODE_ENV === 'dev'
const isProduction = process.env.NODE_ENV === 'prod'

module.exports = {
    isDevelopment,
    isProduction,
}