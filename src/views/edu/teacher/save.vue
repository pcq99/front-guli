<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item>
        <pan-thumb :image="teacher.avatar" />

        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
        >
          Change Avatar
        </el-button>

        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="BASE_API+'/eduoss/fileoss/uploadAvatar'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {},
      // 讲师头像
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.VUE_APP_BASE_API,
      saveBtnDisabled: false

    }
  },
  watch: {
    $route(to, from) {
      // 监听路由是否发生变化
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 判断是添加还是修改（通过判断页面的路由中是否含有id值）
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getTeacherInfo(id)
      } else {
        // 清空表单
        this.teacher = {}
      }
    },
    saveOrUpdate() {
      // 判断修改还是添加
      // 根据teacher是否有id
      if (!this.teacher.id) {
        // 添加
        this.saveTeacher()
      } else {
        // 修改
        this.updateTeacher()
      }
    },
    // 添加讲师的方法
    saveTeacher() {
      teacherApi.addTeacher(this.teacher).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.$router.push({ path: '/teacher/list' })
      })
    },
    // 修改讲师的方法
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher).then((res) => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/teacher/list' })
      })
    },
    // 根据讲师id查询讲师信息
    getTeacherInfo(id) {
      teacherApi.getTeacherInfo(id).then((res) => {
        this.teacher = res.data.teacher
      })
    },
    // 讲师头像弹窗关闭
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1 // 避免第一次上传成功后一直显示“上传成功”四个字，以至于无法修改
    },
    // 头像上传成功的回调
    cropSuccess(data) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.teacher.avatar = data.url
    }
  }
}
</script>
<style scoped>
</style>
