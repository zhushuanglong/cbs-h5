/**
 * 请求地址API
 */
const methodMap = {
    /** 注册 **/
    UsersRegister: {url: '/users/register', method: 'post'},
    /** 登录 **/
    UsersLogin: {url: '/users/login', method: 'post'},
    /** 用户中心 **/
    PersonalIndex: {url: '/personal/index', method: 'post'},
    /** 积分详情 **/
    PersonalIntegral: {url: ' /personal/integral', method: 'post'},

};

export default methodMap;
