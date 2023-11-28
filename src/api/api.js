// 遵循restful风格
import request from './request';

// 获取文章列表
export function getArticleList(data) {
  return request({
    url: '/articles/',
    method: 'get',
    params: data,
  })
}
// 获取文章详情
export function getArticleDetail(id) {
  return request({
    url: `/articles/${id}`,
    method: 'get',
  })
}
// 获取分类列表
export function getCategoryList() {
  return request({
    url: '/categories/',
    method: 'get',
  })
}

// 登录
export function userLogin(data) {
  return request({
    url: '/users/login/',
    method: 'post',
    data,
  })
}

// 注册
export function userRegister(data) {
  return request({
    url: '/users/register/',
    method: 'post',
    data,
  })
}

// 新增文章
export function addArticle(data) {
  return request({
    url: '/articles/token/',
    method: 'post',
    data,
  })
}

// 根据id获取文章/articles/1
export function getArticleById(id) {
  return request({
    url: `/articles/${id}`,
    method: 'get',
  })
}

// 修改文章/articles/token/16
export function updateArticleById(id, data) {
  return request({
    url: `/articles/token/${id}`,
    method: 'put',
    data,
  })
}

// 删除文章/articles/token/2
export function deleteArticleById(id) {
  return request({
    url: `/articles/token/${id}`,
    method: 'delete',
  })
}

// // 根据id获取分类
// export function getCategoryById(id) {
//   return request({
//     url: `/categories/${id}`,
//     method: 'get',
//   })
// }

// 新增分类
export function addCategory(data) {
  return request({
    url: '/categories/token/',
    method: 'post',
    data,
  })
}

// 修改分类
export function updateCategoryById(id, data) {
  return request({
    url: `/categories/token/${id}`,
    method: 'put',
    data,
  })
}

// 删除分类
export function deleteCategoryById(id) {
  return request({
    url: `/categories/token/${id}`,
    method: 'delete',
  })
}

// 获取/otherswitch/
export function getOtherswitch() {
  return request({
    url: '/otherswitch/',
    method: 'get',
  })
}

// 修改/otherswitch/
export function updateOtherswitch(id,data) {
  return request({
    url: `/otherswitch/token/${id}`,
    method: 'put',
    data,
  })
}
// 获取所有用户
export function getAllUsers() {
  return request({
    url: '/users/token/',
    method: 'get',
  })
}

// 获取用户信息
export function getUserInfo(id) {
  return request({
    url: `/users/token/${id}`,
    method: 'get',
  })
}

//  修改用户信息
export function updateUserInfo(id, data) {
  return request({
    url: `/users/token/${id}`,
    method: 'put',
    data,
  })
}

// 修改用户密码
export function updateUserPassword(data) {
  return request({
    url: '/users/token/updatePassword',
    method: 'put',
    data,
  })
}

// 删除用户
export function deleteUserById(id) {
  return request({
    url: `/users/token/${id}`,
    method: 'delete',
  })
}

// 留言列表/messages/
export function getMessagesList() {
  return request({
    url: '/messages/',
    method: 'get',
  })
}

// 删除留言/messages/token/1
export function deleteMessageById(id) {
  return request({
    url: `/messages/token/${id}`,
    method: 'delete',
  })
}

// 新增留言/messages/token/
export function addMessage(data) {
  return request({
    url: '/messages/',
    method: 'post',
    data,
  })
}

// 修改留言/messages/token/1
export function updateMessageById(id, data) {
  return request({
    url: `/messages/token/${id}`,
    method: 'put',
    data,
  })
}

// 获取轮播图列表
export function getSwiperList() {
  return request({
    url: '/upload/imglist',
    method: 'get',
  })
}

// 删除轮播图delete方法
export function deleteSwiperById(image) {
  return request({
    url: `/upload/token/delimg`,
    method: 'delete',
    params: {
      image,
    },
  })
}