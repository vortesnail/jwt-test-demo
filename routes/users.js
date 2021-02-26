const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
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

// 获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
  console.log(ctx.header)
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (error) {
    ctx.body = {
      errno: -1,
      mag: 'verify token failed'
    }
  }
})

module.exports = router
