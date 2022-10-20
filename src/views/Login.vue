<template xmlns:inkscape="">
  <div id="body">
    <div class="container">
      <div class="left">
        <h1>login</h1>
        <p>欢迎光临, 请输入您的账号和密码进行登录!</p>
      </div>
      <div class="right">
        <div class="form">
          <label for="account">账号</label>
          <input @click="toggle('name')" v-model="username" :class="inputActiveOne?'input-active':''"
                 type="text" id="account" autocomplete="off">
          <label for="password">密码</label>
          <input @click="toggle('pwd')" v-model="pwd" :class="inputActiveTwo?'input-active':''"
                 type="password" id="password">
          <button id="submit" class="btn" @click="submit">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      inputActiveOne: true,
      inputActiveTwo: false,
      btnActive: false,
      username: '',
      pwd: '',

    }
  },
  methods: {
    toggle(str) {
      if (str === 'pwd') {
        this.inputActiveTwo = true
        this.inputActiveOne = false
      } else {
        this.inputActiveTwo = false
        this.inputActiveOne = true
      }
    },
    submit() {
      let userList = JSON.parse(localStorage.getItem('userList'))
      userList.map(item => {
        if (item.uid === this.username && item.pwd === this.pwd) {
          let user = []
          user.push(item)
          localStorage.setItem('user', JSON.stringify(user))
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  /* 初始化 */
  margin: 0;
  padding: 0;
}

#body {
  /* 初始化 */
  margin: 0;
  padding: 0;
  height: 100vh;
  /* 弹性布局 居中显示 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e5;
}

.container {
  width: 640px;
  height: 320px;
  display: flex;
}

.left {
  width: 50%;
  height: calc(100% - 40px);
  background-color: #fff;
  position: relative;
  top: 20px;
}

.left h1 {
  color: #222;
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin: 55px 40px 40px 40px;
}

.left p {
  color: #999;
  font-size: 14px;
  margin: 40px;
  line-height: 22px;
}

.right {
  width: 50%;
  height: 100%;
  background-color: #474a59;
  color: #f1f1f1;
  position: relative;
  box-shadow: 0 0 40px 16px rgba(0, 0, 0, 0.2);
}

.right svg {
  position: absolute;
  width: 320px;
}

.right path {
  /* 取消填充 */
  fill: none;
  /* 定义一条线,引用定义好的线性渐变 */
  stroke: url(#linearGradient1);
  /* 线的厚度 */
  stroke-width: 4;
  /* 设置虚线:虚线长度 间距 */
  stroke-dasharray: 240 1386;
}

.form {
  margin: 40px;
  position: absolute;
}

.form label {
  color: #c2c2c2;
  display: block;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 5px;
}

.form input {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  color: #f2f2f2;
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 2px solid transparent;
  text-indent: 2px;
}

.form button {
  width: 100%;
  height: 50px;
  color: #d0d0d0;
  font-size: 18px;
  background-color: transparent;
  //border: none;
  border: 2px solid transparent;
  margin-top: 20px;
  cursor: pointer;
  //outline: none;
}

#body {
  .container {
    .right {
      .form {
        .input-active {
          /*首先我们设置边框只显示底部，宽度为2px的实线。*/
          //border-bottom: 2px solid;
          /*设置线性渐变*/
          //animation: display 1s ease;
          border-image: linear-gradient(90deg, #00FFFFFF 0%, #FF00FFFF 100%) 2 2 2 2;
        }

        .btn:hover {
          background-color: #e2e2e5;
          color: #474a59;
          border-radius: 20px;
          /*首先我们设置边框只显示底部，宽度为2px的实线。*/
          //border: 2px solid transparent;
          /*设置线性渐变*/
          //border-image: linear-gradient(90deg, #00FFFFFF 0%, #FF00FFFF 100%) 2 2 2 2;
        }

        @keyframes display {
          from {
          }
          to {
            border-image: linear-gradient(90deg, #00FFFFFF 0%, #FF00FFFF 100%) 2 2 2 2;
          }
        }
      }
    }
  }
}

</style>