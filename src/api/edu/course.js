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
  },
  // 根据课程id查询课程信息
  getCourseInfoId(id) {
    return request({
      url: `/eduservice/edu-course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  // 修改课程信息
  updateCourseInfoId(courseInfo) {
    return request({
      url: '/eduservice/edu-coursefindAll/updateCourseInfo',
      method: 'post',
      data: courseInfo
    })
  }
}
