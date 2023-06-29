// index.js (续)
Page({
  data: {
    loading: true, // 是否显示加载中状态
    activeTab: '绘图类',
    categories: [
      {
        id: "1",
        name: "绘图类",
      },
      {
        id: "2",
        name: "编程类",
      }
    ],
    videoList: [],
    searchResult: [], // 搜索结果数据
    keyword: '' // 搜索关键字
  },

  onLoad() {
    // 轮询间隔时间（毫秒）
    const interval = 100;
    // 定时器ID
    let timerId = null;
    // 定义轮询函数
    const that = this;
    const pollStorage = () => {
      wx.getStorage({
        key: 'courseList',
        success: res => {
          const courseList = res.data;
          if (courseList) {
            clearInterval(timerId);
            // 获取到数据后，执行相应的逻辑
            that.setData({
              videoList: res.data, // 获取课程列表数据
              loading: false
            })
          }
        },
        fail: () => {
          // 如果获取失败，继续轮询
          console.log('未获取到 courseList 数据，继续轮询...');
        }
      });
    };
    // 开始轮询
    timerId = setInterval(pollStorage, interval);
  },
  navigateToVideoDetail(event) {
    const videoId = event.currentTarget.dataset.videoId;
    wx.navigateTo({
      url: `/pages/detail/detail?courseId=${videoId}`, // 跳转到视频详情页面并传递视频 ID
    });
  },
  switchTab(event) {
    const category = event.currentTarget.dataset.category;
    this.setData({
      activeTab: category
    });
  },
  onSearchInput(event) {
    const keyword = event.detail.value; // 获取搜索框输入的关键字
    this.setData({
      keyword: keyword, // 更新搜索关键字
    });
    this.updateSearchResult(); // 更新搜索结果数据
  },
  updateSearchResult() {
    const keyword = this.data.keyword;
    // 根据关键字在视频列表数据中进行搜索
    const searchResult = this.data.videoList.filter(video =>
      video.title.includes(keyword) || video.description.includes(keyword)
    );
    console.log(searchResult)
    this.setData({
      searchResult: searchResult, // 更新搜索结果数据
    });
  },
  // 监听页面显示事件
  onShow() {
    const videoList = wx.getStorageSync('courseList') || [];
    this.setData({
      videoList: videoList, // 更新搜索结果数据
    })
  }
})
