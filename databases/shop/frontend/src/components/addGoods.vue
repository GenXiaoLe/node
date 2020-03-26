<template>
    <el-dialog
        title="新增货品"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form 
            ref="form" 
            :model="form" 
            label-width="80px" 
            label-position="left">
            <el-form-item label="名称:">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="价格:">
                <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="描述:">
                <el-input v-model="form.description" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            visible(val) {
                this.dialogVisible = val;
            },
            dialogVisible(val) {
                this.$emit('update:visible', val);
                if (!val) {
                    this.$emit('onChange', this.form);
                }
            },
        },
        data() {
            return {
                form: {
                    title: '',
                    price: '',
                    description: ''
                },
                dialogVisible: false
            }
        },
        methods: {
            handleClose() {
                this.dialogVisible = false;
            },
            onSubmit() {
                this.handleClose();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>