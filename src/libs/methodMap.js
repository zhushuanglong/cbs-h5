/**
 * 请求地址API
 */
const methodMap = {
    /** 注册 **/
    UsersRegister: {url: '/users/register', method: 'post'},
    /** 登录 **/
    UsersLogin: {url: '/users/login', method: 'post'},
    /** 密码重置 */
    PwdReset: {url: '/users/pwreset', method: 'post'},
    /** 用户中心 **/
    PersonalIndex: {url: '/personal/index', method: 'post'},
    /** 积分详情 **/
    PersonalIntegral: {url: ' /personal/integral', method: 'post'},
    /** 优惠券列表 **/
    CouponList: {url: '/coupon/list', method: 'post'},
    /** 交易流水 **/
    PersonalFinance: {url: '/personal/finance', method: 'post'},

};

export default methodMap;
