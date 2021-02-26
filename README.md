## 流程

- 1. 用户认证成功之后，server 端返回一个加密的 token 给客户端
- 2. 客户端后续每次请求都带上这个 token，以示当前的用户身份
  - 每次请求前设置 Headers
  - Authorization: Bearer [[token]]
- 3. 服务端拿到 token 通过 `const util = require('util').promisify(jwt.verify)` 解析 token
- 4. 服务端做后续处理，验证等。
