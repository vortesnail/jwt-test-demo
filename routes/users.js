const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../conf/constants')

router.prefix('/users')

// 模拟登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body

  let userInfo
  if (userName === 'vortesnail' && password === '123') {
    // 登录成功，获取用户信息
    userInfo = {
      userId: 1,
      userName: '陈鑫',
      nickName: '阿鑫',
      gender: 1
    }
  }

  // 加密 userInfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, {
      expiresIn: '1h'
    })
  }

  if (!userInfo) {
    ctx.body = {
      errno: -1,
      msg: '登录失败'
    }
    return
  }

  ctx.body = {
    errno: 0,
    data: token
  }
})

module.exports = router
