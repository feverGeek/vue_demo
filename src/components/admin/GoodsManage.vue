<template>
  <div id="goods-manage">
    <div class="left">
      <!-- 商品展示开始 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="库存">
                <span>{{ props.row.contains }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row._id }}</span>
              </el-form-item>
              <el-form-item label="购买次数">
                <span>{{ props.row.buyTimes }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.goodsType_id }}</span>
              </el-form-item>
              <el-form-item label="原价">
                <span>{{ props.row.originPrice }}</span>
              </el-form-item>
              <el-form-item label="售价">
                <span>{{ props.row.sellPrice }}</span>
              </el-form-item>
              <el-form-item label="生产地址">
                <span>{{ props.row.createAddress_id }}</span>
              </el-form-item>
              <el-form-item label="发货地址">
                <span>{{ props.row.sendAddress_id }}</span>
              </el-form-item>
              <el-form-item label="生产时间">
                <span>{{ props.row.produceTime }}</span>
              </el-form-item>
              <el-form-item label="过期时间">
                <span>{{ props.row.expireTime }}</span>
              </el-form-item>
              <el-form-item label="喜欢">
                <span>{{ props.row.likeTimes }}</span>
              </el-form-item>
              <el-form-item label="查看">
                <span>{{ props.row.lookTimes }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.intro }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="_id">
        </el-table-column>
        <el-table-column label="商品名称" prop="name">
        </el-table-column>
        <el-table-column label="描述" prop="intro">
        </el-table-column>
      </el-table>
      <!-- 商品展示结束 -->
      <!-- 分页开始 -->
      <el-pagination layout="prev, pager, next" @current-change="currentPageChange" :page-size="nums" :total="goodsTotal">
      </el-pagination>
      <span>一共{{goodsTotal}}条</span>
      <!-- 分页结束 -->
    </div>
    <el-divider direction="vertical"></el-divider>
    <div class="right">
      <!-- 添加商品表单开始 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :before-upload="handleBeforeUpload" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-form-item label="原价">
          <el-input v-model="form.originPrice"></el-input>
        </el-form-item>
        <el-form-item label="售价">
          <el-input v-model="form.sellPrice"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="contains" :rules="[
      { required: true, message: '库存不能为空'},
      { type: 'number', message: '库存必须为数字值'}
    ]">
          <el-input v-model.number="form.contains"></el-input>
        </el-form-item>
        <el-form-item label="商品标签">
          <el-select v-model="form.goodsType" placeholder="请选择商品标签">
            <el-option v-for="(tag,index) of tags" :key="index" :label="tag.name" :value="tag._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产地址">
          <el-select v-model="form.createAddress" placeholder="请选择生产地址">
            <el-option v-for="(address,index) of addresses" :key="index" :label="address.province+address.town+address.county+address.detail" :value="address._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货地址">
          <el-select v-model="form.sendAddress" placeholder="请选择发货地址">
            <el-option v-for="(address,index) of addresses" :key="index" :label="address.province+address.town+address.county+address.detail" :value="address._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="生产日期" v-model="form.produceTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="过期日期" v-model="form.expireTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="商品简介">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">立即创建</el-button>
        </el-form-item>
      </el-form>
      <!-- 添加商品表单结束 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsManage',
  created() {
    this.getAllTags()
    this.getAllAddress()
    this.getGoodsTotal()
    this.getPageData(1)

  },
  data() {
    return {
      addresses: [],
      tags: [],
      nums: 15,
      goodsTotal: 0,
      faceImage: null,
      form: {
        intro: '',
        sellPrice: null,
        originPrice: null,
        contains: null,
        expireTime: '',
        produceTime: '',
        sendAddress: null,
        createAddress: null,
        goodsType: null,
        name: '',

      },
      tableData: []
    }
  },
  methods: {
    // 获取商品总数
    getGoodsTotal() {
      this.$axios.get("/api/goods")
        .then(res => {
          if (res.data.code == 200) {
            this.goodsTotal = res.data.data.nums
          }
        })
        .catch(err => {

        })
    },
    // 获取某页的数据 @pageNum 第几页
    getPageData(pageNum) {
      console.log("zhongguo ")
      this.openLoading("数据加载中...")
      this.$axios.post("/api/goods", {
          start: (pageNum - 1) + 1,
          nums: this.nums
        })
        .then(res => {
          this.closeLoading()
          console.log(res.data.data)
          if (res.data.code == 200) {
            this.tableData = res.data.data.data
          }
        })
        .catch(err => {
          this.closeLoading()
          console.log(err)
        })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleBeforeUpload(file) {
      this.faceImage = file;
    },
    getAllTags() {
      this.openLoading("数据加载中...")
      this.$axios.get("/api/goods/type")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.tags = res.data.data.data
          }
        })
        .catch(err => {
          this.closeLoading()
        })
    },
    getAllAddress() {
      this.openLoading("地址信息加载中...")
      this.$axios.get("/api/address")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.addresses = res.data.data.data
          }
        })
        .catch(err => {
          this.closeLoading()
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
    currentPageChange(pageNum) {
      this.getPageData(pageNum)
    },
    formatDate(date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      return year + (month < 10 ? "-0" : "-") + month + (day < 10 ? "-0" : "-") + day
    },
    addGoods() {
      var formData = new FormData()
      for (var key in this.form) {
        if (key == "expireTime" || key == "produceTime") {
          this.form[key] = this.formatDate(this.form[key])
        }
        formData.append(key, this.form[key])
      }
      formData.append("image", this.faceImage)
      this.openLoading("商品添加中...")
      this.$axios.post("/api/goods/add", formData)
        .then(res => {
          this.closeLoading()
          console.log(res)
          if (res.data.code == 200) {
            this.form = {
              intro: '',
              sellPrice: null,
              originPrice: null,
              contains: null,
              expireTime: '',
              produceTime: '',
              sendAddress: null,
              createAddress: null,
              goodsType: null,
              name: '',

            }
          } else {
            this.form.expireTime = null
            this.form.produceTime = null
          }
        })
        .catch(err => {
          this.closeLoading()
          this.form.expireTime = null
          this.form.produceTime = null
          console.log(err)
        })
    }
  }
}

</script>
<style scoped>
#goods-manage {
  width: 100%;
  display: flex;
  justify-items: center;
}

#goods-manage .left {
  width: 50%;
  margin: 20px;
}

#goods-manage .right {
  width: 50%;
  margin: 20px;
}

#goods-manage .demo-table-expand {
  font-size: 0;
}

#goods-manage .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

#goods-manage .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
