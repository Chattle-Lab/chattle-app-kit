//获得路径分割符号
const pathSep = require('path').sep;
//创建模块
function createModuleIdFactory() {
    //获取命令行执行的目录，__dirname是nodejs提供的变量
    const projectRootPath = __dirname;
    console.info("======== platform bundle ========");
    //过滤路径
    return path => {
        let name = '';
        //检查是否是内置库
        if(path.indexOf('node_modules'+pathSep+'react-native'+pathSep+'Libraries'+pathSep)>0){
            //这里是去除路径中的'node_modules/react-native/Libraries/‘之前（包括）的字符串，可以减少包大小，可有可无
            name = path.substr(path.lastIndexOf(pathSep)+1);
        }else if(path.indexOf(projectRootPath)==0){
            //这里是取相对路径，不这么弄的话就会打出_user_smallnew_works_....这么长的路径，还会把计算机名打进去
            name = path.substr(projectRootPath.length+1);
        }
        name = name.replace('.js','');//js png字符串没必要打进去
        name = name.replace('.png','');
        let regExp = pathSep=='\\'?new RegExp('\\\\',"gm"):new RegExp(pathSep,"gm");
        name = name.replace(regExp,'_');//把path中的/换成下划线
        return name;
    };
}

module.exports = {
    serializer: {
        createModuleIdFactory:createModuleIdFactory
    }
};
