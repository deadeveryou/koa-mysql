// src\common\RouterLoader.ts
import path from 'path';
import fs from 'fs';
import Router from 'koa-router';
import Koa from 'koa';
import json from 'koa-json';
import body from 'koa-body';
/**
 * @description: 动态加载路由
 */
class RouterLoader {
  app!: Koa;
  static routerLoader: RouterLoader = new RouterLoader();
  init(app: Koa) {
    this.app = app;
    const router = this.loadAllRouter();
    console.log("🚀 ~ RouterLoader ~ init ~ router:", router)
    
    this.app.use(router.routes());
    this.listen();
  }
  /**
   * @description: 动载加载路由模块
   * @return {*}
   */
  loadAllRouter() {
    // 获取一级路由
    const rootRouter = this.getRootRouter();
    // 获取所有路由文件的绝对路径
    const filePaths = this.getAbsoluteFilePaths();
    console.log("🚀 ~ RouterLoader ~ loadAllRouter ~ filePaths:", filePaths)
    // 加载所有的二级路由到一级路由
    filePaths.forEach((filePath) => {
      const module = require(filePath);
      console.log("🚀 ~ RouterLoader ~ filePaths.forEach ~ module:", module)
    //   if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods());
    //   }
    });
    return rootRouter;
  }
  /**
   * @description: 获取一级路由
   * @return {*}
   */
  getRootRouter() {
    const rootRouter = new Router();
    // 定义路由前缀 , 一级路径
    rootRouter.prefix('/dang');
    this.app.use(json());
    this.app.use(body());
    return rootRouter;
  }
  /**
   * @description: 判断引入的模块是否是路由模块
   */
  isRouter(data: any): data is Router {    
    return data instanceof Router;
  }
  /**
   * @description: 获取目录下所有的文件名称
   * @param {string} dir 文件目录
   * @return {string[]} 包含目录下所有文件的名称的数组
   */
  getFileNames(dir: string) {
    return fs.readdirSync(dir);
  }
  /**
   * @description: 获取所有文件的绝对路径
   * @return {string[]} 包含获取所有文件的绝对路径的数组
   */
  getAbsoluteFilePaths() {
    // 获取路由文件所在目录
    const dir = path.join(process.cwd(), '/src/router');
    // 获取所有的文件名称
    const allFiles = this.getFileNames(dir);
    // 拼接所有文件的绝对路径
    const allFullFilePaths: string[] = [];
    allFiles.forEach((file) => {
      allFullFilePaths.push(`${dir}${path.sep}${file}`);
    });
    return allFullFilePaths;
  }

  listen() {
    this.app.listen(3002);
    console.log('程序运行在3002端口');
  }
}

export default RouterLoader.routerLoader;
