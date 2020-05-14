<template>
    <div>
        <div>
            <input type="file" @change="checkFile" />
        </div>
        <div>
            <el-button @click="upload">上传</el-button>
        </div>
        <p v-if="fileUrl">文件地址 {{fileUrl}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                file: {},
                fileUrl: ''
            }
        },
        methods: {
            checkFile(event) {
                const [ file ] = event.target.files;
                this.file = file;
            },
            async upload() {
                let formDate = new FormData();
                
                formDate.append('name', 'file');
                formDate.append('files', this.file);

                const ret = await this.$http.post('/upload', formDate);

                if (ret.code === 1) {
                    this.fileUrl = ret.data.url;
                    this.$message({
                        message: ret.data.message,
                        type: 'success'
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>