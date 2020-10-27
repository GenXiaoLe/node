<template>
    <div>
        <div class="upload" ref="upload">
            <input type="file" @change="checkFile" />
        </div>
        <el-progress type="circle" :percentage="percentage"></el-progress>
        <div>
            <el-button @click="upload">上传</el-button>
        </div>
        <p v-if="fileUrl">文件地址 {{fileUrl}}</p>
    </div>
</template>

<script>
    import SparkMD5 from 'spark-md5'
    export default {
        data() {
            return {
                file: {},
                fileUrl: '',
                percentage: 0,
                status: '',
                size: 1024 * 1024 * 1 // 1M
            }
        },
        methods: {
            checkFile(event) {
                const [ file ] = event.target.files;
                this.file = file;
            },
            // 转化二进制流头文件
            async blobToString(blob) {
                return new Promise(resolve => {
                    // 创建文件流读取
                    var reader = new FileReader();

                    reader.onload = () => {
                        const result = reader.result;
                        // 首先将内容用''隔开转化为数组
                        const ret = result.split('')
                                            .map(i => i.charCodeAt()) // 将图片字母格式转化为编码格式
                                            .map(i => i.toString(16).toUpperCase()) // 将编码转化为16进制大写
                                            .join('') // 再将数组拼为字符串

                        resolve(ret);
                    }

                    reader.readAsBinaryString(blob);
                })
            },
            async isPng(file) {
                // 截取文件前八位传入
                const ret = await this.blobToString(file.slice(0, 8));
                // console.log(await this.blobToString(file.slice(0, 8)));
                // gif有两种格式
                return ret === '89504E47DA1AA';
            },
            async isGif(file) {
                // 截取文件前六位传入
                // console.log(file.slice(0, 6));
                const ret = await this.blobToString(file.slice(0, 6));
                // console.log(await this.blobToString(file.slice(0, 6)));
                // gif有两种格式
                return ret === '474946383961' || ret === '474946383761';
            },
            async isImage(file) {
                return await this.isGif(file) || await this.isPng(file);
            },
            // 分割文件chunks
            splitFileChunks (file) {
                const chunks = []
                const size = file.size
                let countSize = 0
                while (countSize < size) {
                    chunks.push(file.slice(countSize, countSize + this.size))
                    countSize += this.size
                }
                return chunks
            },
            // 抽样hash 第一块 最后一块取全量 区域取前中后各两个字符
            createFileHash (file) {
                return new Promise(resolve => {
                    const spark = new SparkMD5.ArrayBuffer()
                    const offset = 1 * 1024 * 1024
                    const size = file.size
                    let cur = 0
                    let fileChunks = [file.slice(0, offset)]
                    while (cur < size) {
                        // 如果是最后一块
                        if (cur + offset >= size) {
                            fileChunks.push(file.slice(cur, cur + offset))
                        } else {
                            const min = (cur + offset) / 2
                            const end = cur + offset

                            fileChunks.push(file.slice(cur, cur + 2))
                            fileChunks.push(file.slice(min, min + 2))
                            fileChunks.push(file.slice(end, end - 2))
                        }
                        cur += this.size
                    }
                    // 创建文件流读取
                    var reader = new FileReader()

                    reader.readAsArrayBuffer(new Blob(fileChunks))
                    reader.onload = (e) => {
                        spark.append(e.target.result)
                        resolve(spark.end());
                    }
                })
            },


            async upload() {
                // if (!await this.isImage(this.file)) {
                //     return this.$message({
                //         message: '请上传正确的图片格式文件',
                //         type: 'error'
                //     });
                // }
                // return;
                const chunks = this.splitFileChunks(this.file)
                const fileHash = await this.createFileHash(this.file)
                console.log(fileHash)

                await this.uploadFile(chunks, fileHash)
            },
            async uploadFile (chunks, fileHash) {
                const chunksAxios = chunks.map((item, index) => {
                    return {
                        index,
                        file: item,
                        fileHash,
                        name: `${fileHash}-${index}`
                    }
                }).map(item => {
                    let formDate = new FormData()
                    formDate.append('name', item.name)
                    formDate.append('file', item.file)
                    formDate.append('fileHash', item.fileHash)

                    return this.$http.post('/upload', formDate, {
                        onUploadProgress: progress => {
                            this.percentage = Number(Math.floor(progress.loaded / this.file.size).toFixed()) * 100
                        }
                    })
                })

                console.log(chunksAxios)

                // Promise.all(chunksAxios).then(resolve => {
                //     console.log(resolve)
                // })

                // let formDate = new FormData();
                
                // formDate.append('name', 'file');
                // formDate.append('files', this.file);

                // const ret = await this.$http.post(
                //     '/upload', 
                //     formDate,
                //     {
                //         onUploadProgress: progress => {
                //             this.percentage = Number(Math.floor(progress.loaded / this.file.size).toFixed()) * 100
                //         }
                //     }
                // );

                // if (ret.code === 1) {
                //     this.fileUrl = ret.data.url;
                //     this.$message({
                //         message: ret.data.message,
                //         type: 'success'
                //     });
                // }
            },
        },
        mounted() {
           this.$refs.upload.addEventListener('dragover', e => {
               this.$refs.upload.style.border = '1px dashed red'
               e.preventDefault();
           })
           this.$refs.upload.addEventListener('dragleave', e => {
               this.$refs.upload.style.border = '1px dashed #888'
               e.preventDefault();
           })
           this.$refs.upload.addEventListener('drop', e => {
               this.$refs.upload.style.border = '1px dashed #888'
               e.preventDefault();

               const [file] = e.dataTransfer.files;
               this.file = file;
           })
        }
    }
</script>

<style lang="scss" scoped>
    .upload {
        width: 100%;
        height: 100px;
        border: 1px dashed #888;
        text-align: center;
        line-height: 100px;
    }
</style>