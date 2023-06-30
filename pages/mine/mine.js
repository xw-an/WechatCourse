Page({
  data: {
    isLogged: false,
    userInfo: {},
    collectList: [],
    isShowModal: false,
    avatarUrl:'/images/默认头像.png',
    nickName: ''
  },

  onLoad() {
    // 从本地存储中获取用户信息
    const userInfo = wx.getStorageSync('userInfo');
    // console.log('获取userInfo',userInfo)
    if (userInfo) {
      this.setData({
        isLogged: true,
        userInfo,
        nickName: this.data.userInfo.nickName,
        avatarUrl: this.data.userInfo.avatarUrl
      });
      // 获取收藏列表数据
      this.getCollectList();
    }
  },
  // 监听页面显示事件
  onShow() {
    // 从本地存储中获取用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        isLogged: true,
        userInfo,
        nickName: this.data.userInfo.nickName,
        avatarUrl: this.data.userInfo.avatarUrl
      });
      // 获取收藏列表数据
      this.getCollectList();
    }
  },
  // 点击课程，跳转到课程详情页
  gotoDetail(event) {
    const index = event.currentTarget.dataset.index;
    const courseId = this.data.collectList[index].id;
    wx.navigateTo({
      url: '/pages/detail/detail?courseId=' + courseId,
    });
  },
  // 点击首页，跳转到首页
  goHome () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  // 从storage中获取收藏列表数据
  getCollectList() {
    if(this.data.userInfo.nickName) {
      // 假设从服务器获取的收藏列表数据
      const likeCourses = wx.getStorageSync('likeCourses')||[];
      // 从likeCourses中，根据nickName获取用户收藏的courseIds信息
      if(likeCourses){
        likeCourses.forEach(element => {
          if(element.nickName === this.data.userInfo.nickName){
            this.setData({ collectList: element.collectList });
            return;
          }
        });
      }
    }
  },

  // 点击登录按钮，显示弹窗
  showLoginModal() {
    this.setData({
      isShowModal: true,
    });
  },
  // 点击 modal 背景时关闭弹层
  handleModalTap(e) {
    if (e.target.dataset.modal === 'background') {
      this.setData({
        isShowModal: false,
      });
    }
  },
  // 微信获取头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  // 微信登录获取头像和昵称
  login() {
    const nickName = this.data.nickName
    const avatarUrl= this.data.avatarUrl
    if (nickName) {
      // 从cos中获取所有注册用户数据
      const cosJsonUrl = '自己cos的服务域名地址/jsonData/loginUser.json';
      wx.request({
          url: cosJsonUrl,
          method: 'GET',
          success: (res) => {
            const userList = res.data; // 从响应中获取 JSON 数据
              // 根据昵称判断用户是否存在
            const user = userList.find(user => user.nickName === nickName);
            if (user) {
              // 用户已存在，更新用户信息
              this.setData({
                avatarUrl: user.avatarUrl,
                userInfo: user,
                isShowModal: false,
                isLogged: true,
              });
              // 保存用户信息到 Storage 中
              wx.setStorageSync('userInfo', user);
              console.log('登录成功')
              this.getCollectList()
              wx.showToast({
                title: '登录成功',
                icon: 'success',
              });
            } else {
              // 请求这个URL获取图片，上传到cos中
              console.log('头像的url',avatarUrl)
              this.uploadImageToCos(avatarUrl).then((cosFileUrl) => {
                  // 文件上传成功，可以进行后续操作，如保存到用户信息中
                  // 用户不存在，需要插入新的用户信息
                  const newUser = { nickName, avatarUrl: cosFileUrl};
                  userList.push(newUser);
                  // 更新 COS 的 JSON 文件
                  wx.request({
                    url: cosJsonUrl, // 替换为 COS 的 JSON 文件的访问链接
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json', // 设置请求头中的 Content-Type
                    },
                    data: JSON.stringify(userList),
                    success: (res) => {
                      // 更新用户信息
                      this.setData({
                        avatarUrl: cosFileUrl,
                        userInfo: newUser,
                        isShowModal: false,
                        isLogged: true,
                      });
                      // 保存用户信息到 Storage 中
                      wx.setStorageSync('userInfo', newUser); 
                      console.log('注册成功')
                      wx.showToast({
                          title: '注册成功',
                          icon: 'success',
                      });
                      this.getCollectList()
                    },
                    fail: (error) => {
                      console.error('注册失败', error);
                    }
                  });
              })
              .catch((error) => {
                // 文件上传失败，处理错误情况
                console.log('文件上传失败', error);
              });
            }     
          },
          fail: (error) => {
          console.log('获取数据失败', error);
          }
      });
    }else{
      wx.showToast({
        title: '请输入昵称',
        icon: 'error',
      });
    }
  },

  uploadImageToCos(filePath) {
    return new Promise((resolve, reject) => {
      const fileName = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      const cosFilePath = `/images/userAvatar/${fileName}.png`; // 设置图片的存储路径和文件名，这里假设上传的是 PNG 格式的图片
      wx.uploadFile({
        url: '自己cos的服务域名地址', // 替换为您的上传接口 URL
        filePath: filePath,
        name: 'file',
        formData: {
          key: cosFilePath, // 上传到 COS 的文件路径
        },
        success: (res) => {
          console.log(res)
          if (res.statusCode === 204) {
            const cosFileUrl = res.header.Location; // 上传成功后返回的 COS 文件 URL
            resolve(cosFileUrl);
          } else {
            reject(new Error('图片上传失败'));
          }
        },
        fail: (error) => {
          reject(error);
        },
      });
    });
  },

  // 退出登录
  logout() {
    // 清除本地存储的用户信息
    wx.removeStorageSync('userInfo');
    this.setData({
      isLogged: false,
      userInfo: {},
      collectList: [],
      avatarUrl:'/images/默认头像.png',
      nickName: ''
    });
  },

  // uploadAvatarToCos(tempUrl) {
  //   return new Promise((resolve, reject) => {
  //     wx.downloadFile({
  //       url: tempUrl,
  //       success: (res) => {
  //         console.log('下载到本地临时文件',res)
  //         if (res.statusCode === 200) {
  //           const tempFilePath = res.tempFilePath;
  //           console.log('本地临时文件地址',tempFilePath)
  //           this.uploadImageToCos(tempFilePath)
  //             .then((cosFileUrl) => {
  //               resolve(cosFileUrl);
  //             })
  //             .catch((error) => {
  //               reject(error);
  //             });
  //         } else {
  //           reject(new Error('头像下载失败'));
  //         }
  //       },
  //       fail: (error) => {
  //         reject(error);
  //       }
  //     });
  //   });
  // },
});