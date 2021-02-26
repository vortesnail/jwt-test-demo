const router = require('koa-router')()

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

  if (!userInfo) {
    ctx.body = {
      errno: -1,
      msg: '登录失败'
    }
    return
  }

  ctx.body = {
    errno: 0,
    data: userInfo
  }
})

module.exports = router
