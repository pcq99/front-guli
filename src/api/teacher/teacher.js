import request from '@/utils/request'

export default {
  getList(current, limit, teacherQuery) {
    return request({
      url: `/serviceedu/edu-teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  deleteTeacherById(id) {
    return request({
      url: `/serviceedu/edu-teacher/${id}`,
      method: 'delete'
    })
  }
}

