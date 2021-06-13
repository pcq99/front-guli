import request from '@/utils/request'
export default {
  // 添加课程信息
  getSubjectList(courseInfo) {
    return request({
      url: '/eduservice/edu-course/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  // 查询所有讲师
  getListTeacher() {
    return request({
      url: '/eduservice/edu-teacher/findAll',
      method: 'get'
    })
  }
}
