<template>
    <div>
        <el-row>
            <el-button type="primary" style="margin: 20px 0;" @click="dialogVisible = true">新增货品</el-button>
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="描述">
                </el-table-column>
            </el-table>
        </el-row>
        <AddGoods
            :visible.sync="dialogVisible"
            @onChange="goodsChange"
        />
    </div>
</template>

<script>
    import AddGoods from '../components/addGoods.vue';
    export default {
        components: { AddGoods },
        data() {
            return {
                tableData: [],
                dialogVisible: false
            }
        },
        methods: {
            async getList() {
                const res = await this.$http.get('api/goods/getList');
                console.log(res);
            },
            goodsChange(form) {
                console.log(form)
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style lang="scss" scoped>
    
</style>