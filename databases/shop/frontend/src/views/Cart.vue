<template>
    <div>
        <el-row>
            <el-button type="primary" style="margin: 20px 0;" @click="addOrder">添加至订单</el-button>
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="deleteGoods(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="名称"
                    width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.title}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="价格"
                    width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.price}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="数量"
                    width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.cartItem.quantity }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="描述">
                    <template slot-scope="scope">
                        <p>{{ scope.row.description}}</p>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            async addOrder() {
                const res = await this.$http.post('api/add/order');
                if (res.data && res.data.success) {
                    this.$message('已添加到订单');
                    this.getList();
                }
            },
            async getList() {
                const res = await this.$http.get('api/cart/list');
                if (res.data && res.data.items) {
                    this.tableData = res.data.items;
                }
            },
            async deleteGoods(row) {
                const res = await this.$http.delete('api/cart/' + row.id);
                if (res.data && res.data.success) {
                    this.$message('删除成功');
                    this.getList();
                }
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>