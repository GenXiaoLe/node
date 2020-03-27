<template>
    <div>
        <el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
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
                        <p>{{ scope.row.orderItem.quantity }}</p>
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
                tableData: [],
                order: {}
            }
        },
        methods: {
            async getList() {
                const res = await this.$http.get('api/order/getList');
                if (res.data && res.data.items) {
                    this.order = res.data.items[0];
                    this.tableData = this.order.products;
                }
            },
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style lang="scss" scoped>

</style>