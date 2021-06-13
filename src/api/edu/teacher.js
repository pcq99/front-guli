import request from '@/utils/request'

export default {
  getList(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  deleteTeacherById(id) {
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  // 添加讲师
  addTeacher(teacher) {
    return request({
      url: `/eduservice/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 修改讲师
  updateTeacherInfo(teacher) {
    return request({
      url: `/eduservice/edu-teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 获取讲师详情
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/edu-teacher/getTeacher/${id}`,
      method: 'get'
    })
  }
}

