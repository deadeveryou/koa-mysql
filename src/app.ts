import koa from "koa";
import routerLoader from "./common/RouterLoader";
import globalException from "./common/GlobalException";
import cors from "koa2-cors";
import 'module-alias/register';
import ('./alias/index')


const app = new koa();

app.use(
  cors({
    origin: function (ctx) {
      return "*"; // 允许来自所有域名请求
      //设置允许来自指定域名请求
      // if (ctx.url === "/test") {
      //   return "*"; // 允许来自所有域名请求
      // }
      // return "http://localhost:8080"; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
    // exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
  })
);
// 注册全局异常中间件
app.use(globalException);

// 调用动态加载路由
routerLoader.init(app);

console.log('程序运行在3002端口');
