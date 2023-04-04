<template>
  <div id="tag-manage">
    <div class="left">
      <el-tag v-for="tag in tags" :key="tag.name" closable @close="handleClose(tag)">
        {{tag.name}}
      </el-tag>
    </div>
    <el-divider direction="vertical"></el-divider>
    <div class="right">
      <el-form label-width="80px">
        <el-form-item label="标签名称">
          <el-input v-model="tagName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTag">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TagManage',
  created() {
    this.getAllTags()
  },
  data() {
    return {
      tagName: "",
      loading: null,
      tags: []
    }
  },
  methods: {
    getAllTags() {
      this.openLoading("数据加载中...")
      this.$axios.get("/api/goods/type")
        .then(res => {
          this.closeLoading()
          console.log(res.data.data.data)
          if (res.data.code == 200) {
            this.tags = res.data.data.data
          } else {
            this.$message.error("数据加载失败")

          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("数据加载失败")
        })
    },
    handleClose(tag) {
      this.openLoading("标签删除中...")
      this.$axios.delete("/api/goods/type/delete", {
          data: {
            id: tag._id
          }
        })
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.tags.splice(this.tags.indexOf(tag), 1);

          } else {
            this.$message.error("删除标签失败")

          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("删除标签失败")

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
    addTag() {
      if (this.tagName.length == 0) {
        this.$message({
          message: "标签不能为空",
          type: "warning"
        })
        return
      }
      this.openLoading("添加中...")
      this.$axios.post("/api/goods/type/add", {
          name: this.tagName
        })
        .then(res => {
          this.closeLoading()
          console.log(res)
          if (res.data.code == 200) {
            console.log(this.form)
            this.tags.unshift({
              name: this.tagName,
            })
            this.tagName = ""
          } else {
            this.$message.error(res.data.data.info)
          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("添加标签失败")
          console.log(err)
        })
    }
  }
}

</script>
<style scoped="">
#tag-manage {
  width: 100%;
  display: flex;
  justify-items: center;
  height: 100%;
}

#tag-manage .left {
  width: 50%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}

#tag-manage .left span {
  margin: 5px 5px;
}

#tag-manage .right {
  width: 50%;
  padding: 10px;
  height: 100%;
}

</style>
