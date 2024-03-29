<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择一级分类"
          @change="levelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          v-model="courseInfo.lessonNum"
          :min="0"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <tinymce v-model="courseInfo.description" :height="300" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :limit="1"
          :action="BASE_API + '/eduoss/fileoss/uploadAvatar'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          v-model="courseInfo.price"
          :min="0"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
        >保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' // 引入组件
export default {
  // 声明组件
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {
        title: '',
        subjectId: '', // 课程一级分类id
        subjectParentId: '', // 课程一级分类id
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover:
          'https://guli-pengchuqing.oss-cn-hangzhou.aliyuncs.com/2021/03/20054330e0f149426c8ebc1100338a8176file.png',
        price: 0,
        courseId: ''
      },
      BASE_API: process.env.VUE_APP_BASE_API,
      teacherList: [],
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      subjectOneList: [], // 所有一级分类
      subjectTwoList: [] // 所有二级分类
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      // 修改页面
      this.courseId = this.$route.params.id
      this.getCourseInfo()
    } else {
      // 添加页面
      this.getTeacherList()
      this.getOneSubject()
    }
  },

  methods: {
    // 根据课程id查询课程信息
    getCourseInfo() {
      course.getCourseInfoId(this.courseId).then(res => {
        this.courseInfo = res.data.courseInfoVo
        // 1. 查询所有的课程分类，包括一级分类和二级分类
        subject.getSubjectList().then(res => {
          this.subjectOneList = res.data.list
          // 2. 遍历所有一级分类
          for (let i = 0; i < this.subjectOneList.length; i++) {
            const oneSubject = this.subjectOneList[i]
            // 3. 比较当前courseInfo里面的一级分类和所有的一级分类id
            if (this.courseInfo.subjectParentId === oneSubject.id) {
              this.subjectTwoList = oneSubject.children
            }
          }
        })
        this.getTeacherList()
      })
    },
    // 图片上传成功后事件
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 选中一级菜单下拉框的事件
    levelOneChanged(val) {
      for (let i = 0; i < this.subjectOneList.length; i++) {
        if (val === this.subjectOneList[i].id) {
          this.subjectTwoList = this.subjectOneList[i].children
          // 重新选择一级分类后清空二级分类
          this.courseInfo.subjectId = ''
        }
      }
    },
    // 查询所有一级分类
    getOneSubject() {
      subject.getSubjectList().then((res) => {
        this.subjectOneList = res.data.list
      })
    },
    // 查询所有讲师
    getTeacherList() {
      course.getListTeacher().then((res) => {
        this.teacherList = res.data.items
      })
    },
    // 添加课程
    addCourse() {
      course.getSubjectList(this.courseInfo).then((res) => {
        this.$message({
          type: 'success',
          message: '添加课程信息成功'
        })
        this.$router.push({ path: '/course/chapter/' + res.data.courseId })
      })
    },
    updateCourse() {
      course.updateCourseInfoId(this.courseInfo).then((res) => {
        this.$message({
          type: 'success',
          message: '修改课程信息成功'
        })
        this.$router.push({ path: '/course/chapter/' + this.courseId })
      })
    },
    // 添加或者修改
    saveOrUpdate() {
      if (!this.courseInfo.id) {
        // 添加
        this.addCourse()
      } else {
        // 修改
        this.updateCourse()
      }
    }
  }
}
</script>
