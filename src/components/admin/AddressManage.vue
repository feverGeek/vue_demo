<template>
  <div id="address-manage">
    <div class="left">
      <!-- 地址展示开始 -->
      <el-table :data="tableData" style="width: 100%" max-height="500">
        <el-table-column prop="province" label="省份" width="120">
        </el-table-column>
        <el-table-column prop="town" label="市区" width="120">
        </el-table-column>
        <el-table-column prop="county" label="乡镇街道" width="120">
        </el-table-column>
        <el-table-column prop="detail" label="详细地址" width="300">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 地址展示结束 -->
    </div>
    <div class="right">
      <span>请选择地址：</span>
      <Address @getAddressFromChild="setAddress"></Address>
      <span>
        <el-input v-model="addressFrom.detail" placeholder="详细地址"></el-input>
      </span>
      <span>
        <el-button type="primary" @click="addAddress">添加地址</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import Address from "../utils/Address.vue"
export default {
  name: 'AddressManage',
  data() {
    return {
      addressFrom: {
        province: '',
        town: '',
        county: '',
        detail: ''
      },
      loading: null,
      tableData: [{
        province: '河南省',
        town: '郑州市',
        county: '二七区',
        detail: "xx街道xxx小区"
      }]
    }
  },
  created() {
    this.getAllAddress()
  },
  components: { Address },
  methods: {
    setAddress(address) {
      this.addressFrom["province"] = address[0]
      this.addressFrom["town"] = address[1]
      this.addressFrom["county"] = address[2]
    },
    addAddress() {
      if (this.addressFrom.detail.length == 0 || this.addressFrom.province.length == 0) {
        this.$message({
          message: "请将信息补充完整",
          type: "warning",
        })
        return
      }
      this.openLoading("地址添加中...")
      this.$axios.post("/api/address/add", this.addressFrom)
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.tableData.unshift(this.addressFrom)
            this.addressFrom = {
              province: '',
              town: '',
              county: '',
              detail: ''
            }
          } else {
            this.$message.error(res.data.data.info)

          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("添加失败")
        })
    },
    deleteRow(index, rows) {
      var id = rows[index]._id
      this.openLoading("删除中...")
      this.$axios.delete("/api/address/delete", {
          data: {
            id: id
          }
        })
        .then(res => {
        	this.closeLoading()
          if (res.data.code == 200) {
            rows.splice(index, 1);

          }else{
          	this.$message.error("删除失败")
          }
        })
        .catch(err=>{
        	this.closeLoading()
        	this.$message.error("删除失败")
        })
    },
    getAllAddress() {
      this.openLoading("地址信息加载中...")
      this.$axios.get("/api/address")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.tableData = res.data.data.data
          } else {
            this.$message.error("获取失败")

          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("获取失败")
        })
    },
    openLoading(text = "加载...") {
      this.loading = this.$loading({
        lock: true,
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    closeLoading() {
      if (this.loading) {
        this.loading.close()
      }
    },
  }
}

</script>
<style scoped="">
#address-manage {
  width: 100%;
  display: flex;
  justify-items: center;
}

#address-manage .left {
  width: 70%;
  margin: 10px;
}

#address-manage .right {
  width: 30%;
  margin: 10px;
}

#address-manage .right span {
  font-size: 18px;
  color: gray;
}

</style>
