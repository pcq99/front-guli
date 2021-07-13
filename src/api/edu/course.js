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
      url: '/eduservice/edu-course/updateCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  //课程确认信息显示
  getPublihCourseInfo(id) {
      return request({
          url: '/eduservice/edu-course/getPublishCourseInfo/'+id,
          method: 'get'
        })
  },
  //课程最终发布
  publihCourse(id) {
      return request({
          url: '/eduservice/edu-course/publishCourse/'+id,
          method: 'post'
        })
  },
  //TODO 课程列表
  //课程最终发布
  getListCourse() {
      return request({
          url: '/eduservice/edu-course',
          method: 'get'
        })
  }
}
