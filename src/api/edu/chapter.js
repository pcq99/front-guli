import request from '@/utils/request'
export default {
  // 根据课程id获取章节和小节数据列表
  getAllChapterVedio(courseId) {
    return request({
      url: `/serviceedu/edu-chapter/getChapterVedio/${courseId}`,
      method: 'get'
    })
  }
}
