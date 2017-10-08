const mysql = require('mysql');

/**
 * 将整个方法全部暴漏出去
 * @param sql sql语句
 * @param arg 传递到sql语句中的参数，可以不写
 * @param callback 回调函数，可以不写
 */
module.exports = function (sql,arg,callback) {
    //1.创建连接(根据自己的数据库配置)
    let config = mysql.createConnection({
        host:'mysql.donkeytube.co', //数据库的地址
        user:"admin", //数据库用户名
        password:"firesoft7102", //数据库密码
        port:"3306", //mysql数据库的端口号
        database:"donkeytube" //使用那个数据库
    });
    //2.开始连接数据库
    config.connect();
    //3.对数据库的增删改查操作
    config.query(sql,arg,function(err,data){
        return callback && callback(err,data);
    })
    //4.关闭数据库
    config.end();
}