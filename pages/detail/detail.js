// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    courseId: 0,
    course: null, // 课程数据
    courseList: [],
    liked: false, // 是否已收藏
    isShowModal: false,
    avatarUrl:'/images/默认头像.png',
    nickName: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从全局课程列表中获取当前课程的数据
    const courseId = options.courseId;
    const courseList = wx.getStorageSync('courseList') || [];
    const course = courseList.find((item) => {
      return item.id === Number(courseId);
    });
    this.setData({
      course: course,
      courseList: courseList,
      courseId: Number(courseId),
      nickName: wx.getStorageSync('userInfo').nickName,
      avatarUrl: wx.getStorageSync('userInfo').avatarUrl
    });
    // 判断当前用户是否已经收藏过该课程
    const likeCourses = wx.getStorageSync('likeCourses') || [];
    if(this.data.nickName){
      if (likeCourses) {
        likeCourses.forEach(element => {
          if(element.nickName === this.data.nickName){
            element.collectList.forEach(item => {
              if(item.id === Number(this.data.courseId)){
                this.setData({liked:true})
                return
              }
            })
          }
        });
      }
    }else {
        // 未登录状态下，不展示收藏功能按钮
    }
  },
  // 点击立即报名按钮的事件处理函数
  handleSignup() {
    let that = this
    let courseId = this.data.courseId;
    let course = this.data.course;
    let courseList = this.data.courseList;
    if (course) {
       // 判断当前的userInfo中是否存在数据，如果有直接获取nickName
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo && userInfo.nickName) {
        this.setData({
          nickName: userInfo.nickName,
        })
        this.handleApply()
      } else {
        // 不存在，则弹出弹层自己登录
        this.setData({
          isShowModal: true,
        });
      }
    }
  },

  // 收藏/取消收藏操作
  handleLikeButtonClick() {
    let course = this.data.course;
    let courseList = this.data.courseList;
    if (course && this.data.nickName) {
      this.data.liked?course.likes--:course.likes++;
       // 更新全局课程列表中对应课程的报名人数
       courseList.forEach((item)=> {
        if (item.id === course.id) {
          item.likes = course.likes;
        }
      });
      this.setData({
        course: course,
        courseList: courseList,
      });
      // 根据收藏/取消收藏，将数据更新到storage的likeCourses中
      const likeCourses = wx.getStorageSync('likeCourses') || [];
      if (likeCourses&&likeCourses.length) {
        // 如果likeCourses不为空，则判断当前用户是否已经收藏过其他课程
        let flag = false
        likeCourses.forEach(element => {
          if (element.nickName === this.data.nickName){
            flag = true
            if (this.data.liked) {
              // 如果已经收藏过，则取消收藏
              console.log('如果已经收藏过，则取消收藏')
              element.collectList.forEach((item,index) => {
                if(item.id === Number(this.data.courseId)){
                  element.collectList.splice(index,1)
                  return
                }
              })
            } else{
              // 如果没有收藏过，则添加收藏
              element.collectList.push(this.data.course)
              console.log('如果没有收藏过，则添加收藏')
            }
          }
        })
        if(!flag){
          // 如果当前用户没有收藏过其他课程，则直接将当前课程添加到likeCourses中
          console.log('如果当前用户没有收藏过其他课程，则直接将当前课程添加到likeCourses中')
          likeCourses.push({nickName:this.data.nickName,collectList:[this.data.course]})
        }
      } else {
        // 如果likeCourses为空，则直接将当前课程添加到likeCourses中
        console.log('如果likeCourses为空，则直接将当前课程添加到likeCourses中')
        likeCourses.push({nickName:this.data.nickName,collectList:[this.data.course]})
      }
      //将数据保存到cos的文件中
      const cosJsonUrl = '自己cos的服务域名地址/jsonData/course.json';
      // 先从cos中获取文件内容，然后再将最新内容更更新到cos中
      wx.request({
        url: cosJsonUrl,
        method: 'GET',
        success: (res)=> {
          const jsonData = res.data;
          jsonData.likeInfo.likeCourses = likeCourses
          jsonData.likeInfo.likeCounts = courseList.map(course=>{return {"id":Number(course.id),"likeCount":course.likes}})
          // 将最新数据jsonData更新到cos中
          wx.request({
            url: '自己cos的服务域名地址/jsonData/course.json', // 替换为 COS 的 JSON 文件的访问链接
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', // 设置请求头中的 Content-Type
            },
            data: JSON.stringify(jsonData),
            success: (res) => {
              wx.setStorageSync('likeCourses', likeCourses); 
              console.log('成功更新数据',likeCourses);
              wx.setStorageSync('courseList', courseList); 
              // 更新数据并存储到本地
              this.setData({
                liked: !this.data.liked
              });
            },
            fail: (error) => {
              console.error('Failed to update COS JSON file:', error);
            }
          });
        },
        fail: (error) => {
          console.error('Failed to fetch COS JSON file:', error);
        }
      })
    } 
  },

  // 轮播视频播放功能
  onVideoPlay() {
    const videoContext = wx.createVideoContext('videoPlayer');
    videoContext.play();
    this.setData({
      autoplay: false
    });
  },

  // 轮播视频暂停功能
  onVideoPause() {
    const videoContext = wx.createVideoContext('videoPlayer');
    videoContext.pause();
    this.setData({
      autoplay: true
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
    const avatarUrl=this.data.avatarUrl
    const nickName = this.data.nickName
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
              // wx.showToast({
              //   title: '登录成功',
              //   icon: 'success',
              // });
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
            // 登录成功之后，走报名逻辑
            this.handleApply()
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

  // 上传图片到cos中  
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
  // 报名相关后续操作
  handleApply() {
    let nickName = this.data.nickName;
    let courseId = this.data.courseId;
    let course = this.data.course;
    let courseList = this.data.courseList;
    let that = this;
    if (nickName) {
      wx.request({
        url: '自己cos的服务域名地址/jsonData/course.json', 
        method: 'GET',
        success: (res) => {
          const jsonData = res.data;
          // 查找用户对象
          const currentUser = jsonData.applyInfo.applyCourses.find(item => item.nickName === nickName);
          if (currentUser) {
            // 用户已经存在
            const isSignedUp = currentUser.courseIds.includes(courseId);
            if (isSignedUp) {
              // 用户已经报名过，给出相应提示
              wx.showToast({
                title: '您已报名过该课程',
                icon: 'none'
              });
            } else {
              // 用户未报名过，执行报名操作
              currentUser.courseIds.push(courseId);
              // 更新报名人数
              const appliedCourse = jsonData.applyInfo.applyCounts.find(course => course.id === courseId);
              appliedCourse.applyCount += 1;
              // 更新 COS 的 JSON 文件
              wx.request({
                url: '自己cos的服务域名地址/jsonData/course.json', // 替换为 COS 的 JSON 文件的访问链接
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json', // 设置请求头中的 Content-Type
                },
                data: JSON.stringify(jsonData),
                success: (res) => {
                    // 更新当前课程的报名人数
                  course.applyCount++;
                  // 更新全局课程列表中对应课程的报名人数
                  courseList.forEach(function(item) {
                    if (item.id === course.id) {
                      item.applyCount = course.applyCount;
                    }
                  });
                  // 更新数据并存储到本地
                  that.setData({
                    course: course,
                    courseList: courseList,
                  });
                  wx.setStorageSync('courseList', courseList);
                  wx.showToast({
                    title: '报名成功',
                    icon: 'success',
                    duration: 1000,
                    success: () => {
                      // 报名成功提示框显示后，跳转到首页
                      setTimeout(() => {
                        wx.reLaunch({
                          url: '/pages/index/index' // 首页的路径
                        });
                      }, 1000);
                    }
                  });
                },
                fail: function (error) {
                  console.error('Failed to update COS JSON file:', error);
                }
              });
            }
          } else {
            // 用户不存在，创建新用户并执行报名操作
            const newUser = {
              nickName: nickName,
              courseIds: [courseId] // 替换为实际的课程ID
            };
            jsonData.applyInfo.applyCourses.push(newUser);
            // 更新报名人数
            const appliedCourse = jsonData.applyInfo.applyCounts.find(course => course.id === courseId);
            appliedCourse.applyCount += 1;
            // 更新 COS 的 JSON 文件
            wx.request({
              url: '自己cos的服务域名地址/jsonData/course.json', // 替换为 COS 的 JSON 文件的访问链接
              method: 'PUT',
              data: JSON.stringify(jsonData),
              header: {
                'Content-Type': 'application/json',
              },
              success: (res) => {
                // 更新当前课程的报名人数
                course.applyCount++;
                // 更新全局课程列表中对应课程的报名人数
                courseList.forEach(function(item) {
                  if (item.id === course.id) {
                    item.applyCount = course.applyCount;
                  }
                });
                // 更新数据并存储到本地
                that.setData({
                  course: course,
                  courseList: courseList,
                });
                wx.setStorageSync('courseList', courseList);
                wx.showToast({
                  title: '报名成功',
                  icon: 'success',
                  duration: 1000,
                  success: () => {
                    // 报名成功提示框显示后，跳转到首页
                    setTimeout(() => {
                      wx.reLaunch({
                        url: '/pages/index/index' // 首页的路径
                      });
                    }, 1000);
                  }
                });
              },
              fail: (error) => {
                console.error('Failed to update COS JSON file:', error);
              }
            });
          }
        },
        fail: (error) => {
          console.error('Failed to fetch COS JSON file:', error);
        }
      });
    }
  }
})