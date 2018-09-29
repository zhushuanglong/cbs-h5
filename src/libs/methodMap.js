/**
 * 请求地址API
 */
const methodMap = {
    /** 注册 **/
    UsersRegister: {url: '/users/register', method: 'post'},
    /** 登录 **/
    UsersLogin: {url: '/users/login', method: 'post'},
    /** 用户中心 **/
    PersonalIndex: {url: '/personal/index', method: 'post'}

};

export default methodMap;
