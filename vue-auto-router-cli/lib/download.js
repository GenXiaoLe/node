const { promisify } = require('util');

// 克隆方法 接收两个参数 第一个是下载地址 第二是个下载到的本地目录
module.exports.clone = async (repo, desc) => {
    // 获取到下载方法
    const download = promisify(require('download-git-repo'))

    // 获取到进度条方法
    const ora = require('ora')
    // 构建下载时候的提示文字
    const progress = ora(`🚀正在从github下载中.......${repo}`)

    // 下载开始
    progress.start();
    // 调用方法 异步下载文件
    await download(repo, desc);
    // 下载结束
    progress.succeed();
}