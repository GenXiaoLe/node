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
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addCart(scope.row)">加入购物车</el-button>
                        <el-button type="text" size="small" @click="deleteGoods(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
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
                const res = await this.$http.get('api/products/getList');
                if (res.data && res.data.items) {
                    this.tableData = res.data.items;
                }
            },
            async goodsChange(form) {
                let params = { ...form };
                params.price = params.price === '' ? 0 : Number(params.price);

                const res = await this.$http.post('api/products/add', form);

                if (res.data && res.data.success) {
                    this.getList();
                }
            },
            async deleteGoods(row) {
                const res = await this.$http.delete('api/products/' + row.id);
                if (res.data && res.data.success) {
                    this.$message('删除成功');
                    this.getList();
                }
            },
            async addCart(row) {
                const res = await this.$http.post('api/add/cart', { id: row.id });
                if (res.data && res.data.success) {
                    this.$message('已添加至购物车');
                    this.getList();
                }
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style lang="scss" scoped>
    
</style>