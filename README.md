# 项目名称： WechatCourse
一个微信小程序，旨在提供一个课程学习平台，用户可以浏览不同的课程资料、查看课程详情、登录/注册账号、报名课程和收藏感兴趣的课程。同时，用户还可以在个人中心页管理自己的账号信息和查看已收藏的课程。

## 功能特点

- 首页：展示所有课程资料，用户可以点击进入详情页查看更多信息。
- 课程详情页：展示特定课程的详细资料，包括标题、封面、描述等。
- 登录/注册功能：支持用户登录和注册账号，登录后可以享受更多功能。
- 报名功能：登录用户可以报名感兴趣的课程，参与学习。
- 收藏功能：登录用户可以收藏自己喜欢的课程，方便以后查看。
- 个人中心页：展示用户的个人信息和已收藏的课程，支持修改个人信息和退出登录。

## 技术栈

- 前端：微信小程序框架、HTML、CSS、JavaScript
- 后台数据：文件存储 COS（腾讯云对象存储）

## 开始使用

1. 克隆本项目到本地或下载源代码。
2. 使用微信开发者工具打开项目目录。
3. 配置微信开发者工具的 AppID（需要提前注册微信小程序账号）。
4. 配置项目中的文件存储 COS，包括设置存储桶名称、地域、秘钥等信息。
5. 运行项目并在微信开发者工具中预览效果。

## 目录结构

- `pages/`：存放各个页面的目录
  - `home/`：首页相关的页面文件
  - `detail/`：课程详情页相关的页面文件
  - `mine/`：个人中心页相关的页面文件
- `app.js`：小程序的入口文件
- `app.json`：小程序的配置文件
- `app.wxss`：小程序的全局样式文件

## 参与贡献

- 如果您发现问题或有任何建议，请提交 Issue。
- 如果您想要贡献代码，请 Fork 本项目并提交 Pull Request。

## cos文件目录

- images/目录下放置所需图片
- jsondata目录下的2个json数据，loginUser.json、course.json用来保存登录信息和报名点赞数
  - course.json的文件内容：
  {
    "applyInfo": {
        "applyCounts": [
            {
                "id": 1,
                "applyCount": 3
            },
            {
                "id": 2,
                "applyCount": 3
            },
            {
                "id": 3,
                "applyCount": 2
            },
            {
                "id": 4,
                "applyCount": 3
            },
            {
                "id": 5,
                "applyCount": 2
            },
            {
                "id": 6,
                "applyCount": 0
            },
            {
                "id": 7,
                "applyCount": 1
            },
            {
                "id": 8,
                "applyCount": 0
            },
            {
                "id": 9,
                "applyCount": 0
            },
            {
                "id": 10,
                "applyCount": 0
            }
        ],
        "applyCourses": [
            {
                "nickName": "竹逸生",
                "courseIds": [
                    2,
                    3,
                    4,
                    1,
                    7,
                    5
                ]
            },
            {
                "nickName": "123",
                "courseIds": [
                    4,
                    2,
                    3,
                    1
                ]
            },
            {
                "nickName": "232",
                "courseIds": [
                    2,
                    1
                ]
            },
            {
                "nickName": "2233",
                "courseIds": [
                    4,
                    5
                ]
            }
        ]
    },
    "likeInfo": {
        "likeCounts": [
            {
                "id": 1,
                "likeCount": 2
            },
            {
                "id": 2,
                "likeCount": 2
            },
            {
                "id": 3,
                "likeCount": 1
            },
            {
                "id": 4,
                "likeCount": 1
            },
            {
                "id": 5,
                "likeCount": 2
            },
            {
                "id": 6,
                "likeCount": 2
            },
            {
                "id": 7,
                "likeCount": 0
            },
            {
                "id": 8,
                "likeCount": 1
            }
        ],
        "likeCourses": [
            {
                "nickName": "竹逸生",
                "collectList": [
                    {
                        "id": 1,
                        "category": "绘图类",
                        "title": "AI绘图工具入门教程",
                        "description": "探索MidJourney的基本功能和界面，快速上手绘图工具，为你的创作之旅打下坚实基础。",
                        "coverUrl": "/images/课程封面01.png",
                        "images": [
                            "/images/课程封面01.png"
                        ],
                        "applyCount": 1,
                        "likes": 2,
                        "lecturer": {
                            "avatar": "/images/avatar01.png",
                            "name": "amy.xue",
                            "department": "AI工具探索者"
                        },
                        "chapterList": [
                            {
                                "title": "第一章：介绍MidJourney",
                                "description": "课程概述：了解课程内容和学习目标。"
                            },
                            {
                                "title": "第二章：安装和入门",
                                "description": "1、指导学员如何下载和安装MidJourney应用程序。\n2、注册和登录：详细说明注册和登录MidJourney账号的步骤和方法。\n3、界面导览：介绍MidJourney的主要界面和功能区域。"
                            },
                            {
                                "title": "第三章：基本绘图工具",
                                "description": "1、绘图基础知识：回顾绘图的基本概念和技巧。\n2、绘图工具概览：介绍MidJourney中常用的绘图工具和功能。\n3、图层管理：学习如何创建、编辑和管理图层，实现绘图的分层效果。"
                            },
                            {
                                "title": "第四章：图像处理和效果",
                                "description": "1、调整图像参数：学习如何使用MidJourney的调整功能对图像进行亮度、对比度、饱和度等参数的调整。\n2、滤镜和特效：探索MidJourney中的滤镜和特效功能，为图像添加艺术效果和风格。\n3、文本和标注：学习如何在图像上添加文本、标注和说明，增强图像的表达力和可读性。"
                            },
                            {
                                "title": "第五章：导出和分享作品",
                                "description": "1、图像导出：教授学员如何导出和保存绘制的图像，选择合适的格式和质量设置。\n2、分享和展示：介绍将作品分享到社交媒体平台、博客或在线画廊的方法，展示自己的创作成果。"
                            }
                        ],
                        "estimatedDate": "日期待定",
                        "estimatedDuration": 30
                    }
                ]
            },
            {
                "nickName": "123",
                "collectList": [
                    {
                        "id": 2,
                        "category": "绘图类",
                        "title": "AI换脸艺术",
                        "description": "利用MidJourney的AI换脸功能，学习如何将自己或他人的脸部特征与名人、艺术作品等进行融合。",
                        "coverUrl": "自己cos的服务域名地址/images/course02/%E6%8D%A2%E8%84%B8%E5%B0%81%E9%9D%A2.png",
                        "images": [
                            "自己cos的服务域名地址/images/course02/%E6%8D%A2%E8%84%B8%E5%B0%81%E9%9D%A2.png",
                            "自己cos的服务域名地址/images/course02/%E6%8D%A2%E8%84%B8%E8%BD%AE%E6%92%AD%E5%9B%BE01.png"
                        ],
                        "applyCount": 3,
                        "likes": 2,
                        "lecturer": {
                            "avatar": "自己cos的服务域名地址/images/avatar01.png",
                            "name": "amy.xue",
                            "department": "AI工具探索者"
                        },
                        "chapterList": [
                            {
                                "title": "第一章：介绍",
                                "description": "了解课程的概述和学习目标"
                            },
                            {
                                "title": "第二章：基础知识",
                                "description": "掌握AI换脸的基本原理和相关技术"
                            },
                            {
                                "title": "第三章：MidJourney工具介绍",
                                "description": "学习MidJourney工具的功能和界面"
                            },
                            {
                                "title": "第四章：准备工作",
                                "description": "了解进行AI换脸艺术所需的前期准备"
                            },
                            {
                                "title": "第五章：人脸特征提取",
                                "description": "学习如何提取自己或他人的人脸特征"
                            },
                            {
                                "title": "第六章：选择换脸素材",
                                "description": "探索选择合适的名人或艺术作品作为换脸素材"
                            },
                            {
                                "title": "第七章：融合人脸特征",
                                "description": "学习将人脸特征与素材进行融合的技巧和方法"
                            },
                            {
                                "title": "第八章：调整与优化",
                                "description": "掌握调整换脸效果和优化艺术效果的技巧"
                            },
                            {
                                "title": "第九章：创作实践",
                                "description": "实践应用所学知识，创作个性化的AI换脸作品"
                            },
                            {
                                "title": "第十章：作品分享与展示",
                                "description": "分享和展示自己的AI换脸艺术作品"
                            }
                        ],
                        "estimatedDate": "日期待定",
                        "estimatedDuration": 30
                    }
                ]
            },
            {
                "nickName": "456",
                "collectList": [
                    {
                        "id": 3,
                        "category": "绘图类",
                        "title": "创意海报设计",
                        "description": "探索MidJourney的设计工具和素材库，学习如何利用AI工具设计令人印象深刻的海报，为你的品牌、活动或个人展示增添创意。",
                        "coverUrl": "/images/课程封面03.png",
                        "images": [
                            "/images/课程封面03.png"
                        ],
                        "applyCount": 2,
                        "likes": 3,
                        "lecturer": {
                            "avatar": "/images/avatar01.png",
                            "name": "amy.xue",
                            "department": "AI工具探索者"
                        },
                        "chapterList": [
                            {
                                "title": "第一章：认识MidJourney",
                                "description": "介绍MidJourney工具的概述和功能，了解如何开始使用该工具进行创意海报设计。"
                            },
                            {
                                "title": "第二章：海报设计基础",
                                "description": "学习海报设计的基本原理和要素，包括色彩搭配、排版技巧、字体选择等，为创作令人印象深刻的海报打下基础。"
                            },
                            {
                                "title": "第三章：MidJourney工具介绍",
                                "description": "深入了解MidJourney工具的各项功能和操作，包括素材库的使用、图层管理、图像处理等，掌握如何利用工具进行海报设计。"
                            },
                            {
                                "title": "第四章：创意海报构思",
                                "description": "学习如何进行创意海报的构思和策划，包括目标受众分析、主题选择、创意发散等，为设计出独特和有吸引力的海报奠定基础。"
                            },
                            {
                                "title": "第五章：海报设计实践",
                                "description": "通过实际案例演练，掌握如何使用MidJourney工具进行海报设计，包括添加图像、调整图层、应用特效等技巧和操作。"
                            },
                            {
                                "title": "第六章：创意海报优化",
                                "description": "学习如何优化和完善创意海报，包括颜色调整、细节修饰、效果增强等，提升海报的吸引力和表现力。"
                            },
                            {
                                "title": "第七章：海报输出与分享",
                                "description": "了解海报的输出格式和要求，学习如何导出高质量的海报文件，并掌握分享海报的方式和渠道，让你的创作得到更多的关注和赞赏。"
                            },
                            {
                                "title": "第八章：海报案例解析",
                                "description": "分析和解读一些优秀的创意海报案例，探讨其设计思路和技巧，启发你在海报设计中的创意和灵感。"
                            },
                            {
                                "title": "第九章：品牌展示与个人推广",
                                "description": "学习如何利用创意海报为品牌、活动或个人进行展示和推广，包括在社交媒体上发布、制作印刷品等方式，打造个性化的形象和品牌价值。"
                            },
                            {
                                "title": "第十章：创意海报设计进阶",
                                "description": "进一步探索创意海报设计的高级技巧和趋势，了解最新的设计潮流和应用场景，为你的创作之路开拓更广阔的可能性。"
                            }
                        ],
                        "estimatedDate": "日期待定",
                        "estimatedDuration": 30
                    },
                    {
                        "id": 8,
                        "category": "编程类",
                        "title": "使用ChatGPT从0-1搭建微信小程序",
                        "description": "学习如何利用ChatGPT和微信小程序开发框架，从项目规划、界面设计、逻辑实现到发布上线的全流程，掌握微信小程序的开发要点和技巧。",
                        "coverUrl": "自己cos的服务域名地址/images/course08/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%B0%81%E9%9D%A2.png",
                        "images": [
                            "自己cos的服务域名地址/images/course08/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%B0%81%E9%9D%A2.png"
                        ],
                        "applyCount": 0,
                        "likes": 1,
                        "lecturer": {
                            "avatar": "/images/avatar01.png",
                            "name": "amy.xue",
                            "department": "AI工具探索者"
                        },
                        "chapterList": [
                            {
                                "title": "第一章：课程介绍",
                                "description": "了解课程的概述和学习目标"
                            },
                            {
                                "title": "第二章：微信小程序开发入门",
                                "description": "学习微信小程序的基本概念和开发环境的搭建"
                            },
                            {
                                "title": "第三章：界面设计与布局",
                                "description": "探索微信小程序界面设计的基本原则和布局方法"
                            },
                            {
                                "title": "第四章：逻辑实现与数据交互",
                                "description": "学习微信小程序逻辑实现和与后端数据交互的方法"
                            },
                            {
                                "title": "第五章：小程序发布与上线",
                                "description": "了解微信小程序的发布流程和上线注意事项"
                            },
                            {
                                "title": "第六章：小程序优化与调试",
                                "description": "学习微信小程序的性能优化和调试技巧"
                            },
                            {
                                "title": "第七章：小程序商业化变现",
                                "description": "探索如何利用微信小程序进行商业化变现和推广"
                            }
                        ],
                        "estimatedDate": "日期待定",
                        "estimatedDuration": 30
                    }
                ]
            },
            {
                "nickName": "2233",
                "collectList": [
                    {
                        "id": 4,
                        "category": "绘图类",
                        "title": "AI卡通形象创作",
                        "description": "使用MidJourney的AI技术，学习如何将照片或人物形象转化为可爱的卡通形象，为个人品牌、社交媒体等打造独特形象。",
                        "coverUrl": "自己cos的服务域名地址/images/course04/%E5%8D%A1%E9%80%9A%E4%BA%BA%E7%89%A9%E5%B0%81%E9%9D%A2.png",
                        "images": [
                            "自己cos的服务域名地址/images/course04/%E5%8D%A1%E9%80%9A%E4%BA%BA%E7%89%A9%E5%B0%81%E9%9D%A2.png",
                            "自己cos的服务域名地址/images/course04/%E5%8D%A1%E9%80%9A%E4%BA%BA%E7%89%A9%E8%BD%AE%E6%92%AD%E5%9B%BE01.png",
                            "自己cos的服务域名地址/images/course04/%E5%8D%A1%E9%80%9A%E4%BA%BA%E7%89%A9%E8%BD%AE%E6%92%AD%E5%9B%BE02.png",
                            "自己cos的服务域名地址/images/course04/%E5%8D%A1%E9%80%9A%E4%BA%BA%E7%89%A9%E8%BD%AE%E6%92%AD%E5%9B%BE03.png"
                        ],
                        "applyCount": 2,
                        "likes": 1,
                        "lecturer": {
                            "avatar": "自己cos的服务域名地址/images/avatar01.png",
                            "name": "amy.xue",
                            "department": "AI工具探索者"
                        },
                        "chapterList": [
                            {
                                "title": "第一章：课程介绍",
                                "description": "了解课程的概述和学习目标"
                            },
                            {
                                "title": "第二章：卡通形象的特点",
                                "description": "探索卡通形象的基本特点和设计原则"
                            },
                            {
                                "title": "第三章：MidJourney工具介绍",
                                "description": "学习MidJourney工具的功能和界面"
                            },
                            {
                                "title": "第四章：准备工作",
                                "description": "了解进行AI卡通形象创作所需的前期准备"
                            },
                            {
                                "title": "第五章：选择素材照片",
                                "description": "学习如何选择适合的照片作为卡通形象的基础"
                            },
                            {
                                "title": "第六章：形象转化",
                                "description": "掌握将照片转化为卡通形象的技巧和方法"
                            },
                            {
                                "title": "第七章：特征调整与个性化",
                                "description": "学习调整卡通形象特征和个性化定制的技巧"
                            },
                            {
                                "title": "第八章：表情和动作设计",
                                "description": "探索为卡通形象设计表情和动作的创意方法"
                            },
                            {
                                "title": "第九章：配色和风格化",
                                "description": "学习如何为卡通形象选择合适的配色和风格化处理"
                            },
                            {
                                "title": "第十章：应用和展示",
                                "description": "实践应用所学知识，展示个人卡通形象的应用场景"
                            }
                        ],
                        "estimatedDate": "日期待定",
                        "estimatedDuration": 30
                    },
                    {
                        "id": 5,
                        "category": "绘图类",
                        "title": "电商模块图设计",
                        "description": "学习如何使用MidJourney的工具和功能，设计吸引人的电商模块图，提升产品在电商平台上的吸引力和销售效果。",
                        "coverUrl": "自己cos的服务域名地址/images/course05/%E7%94%B5%E5%95%86%E6%A8%A1%E7%89%B9%E5%B0%81%E9%9D%A2.png",
                        "images": [
                            "自己cos的服务域名地址/images/course05/%E7%94%B5%E5%95%86%E6%A8%A1%E7%89%B9%E5%B0%81%E9%9D%A2.png",
                            "自己cos的服务域名地址/images/course05/%E7%94%B5%E5%95%86%E6%A8%A1%E7%89%B9%E8%BD%AE%E6%92%AD%E5%9B%BE01.png",
                            "自己cos的服务域名地址/images/course05/%E7%94%B5%E5%95%86%E6%A8%A1%E7%89%B9%E8%BD%AE%E6%92%AD%E5%9B%BE02.png",
                            "自己cos的服务域名地址/images/course05/%E7%94%B5%E5%95%86%E6%A8%A1%E7%89%B9%E8%BD%AE%E6%92%AD%E5%9B%BE03.png"
                        ],
                        "applyCount": 1,
                        "likes": 2,
                        "lecturer": {
                            "avatar": "自己cos的服务域名地址/images/avatar01.png",
                            "name": "amy.xue",
                            "department": "AI工具探索者"
                        },
                        "chapterList": [
                            {
                                "title": "第一章：课程介绍",
                                "description": "了解课程的概述和学习目标"
                            },
                            {
                                "title": "第二章：电商模块图概述",
                                "description": "探索电商模块图的基本概念和设计原则"
                            },
                            {
                                "title": "第三章：MidJourney工具介绍",
                                "description": "学习MidJourney工具的功能和界面"
                            },
                            {
                                "title": "第四章：电商平台分析",
                                "description": "了解各种电商平台的特点和需求"
                            },
                            {
                                "title": "第五章：模块图设计要素",
                                "description": "学习电商模块图的设计要素和注意事项"
                            },
                            {
                                "title": "第六章：产品展示模块",
                                "description": "掌握设计吸引人的产品展示模块的技巧和方法"
                            },
                            {
                                "title": "第七章：导航和分类模块",
                                "description": "学习设计清晰的导航和分类模块以提升用户体验"
                            },
                            {
                                "title": "第八章：推广和促销模块",
                                "description": "探索设计引人注目的推广和促销模块的创意方法"
                            },
                            {
                                "title": "第九章：购物流程模块",
                                "description": "学习设计简洁流畅的购物流程模块以提升转化率"
                            },
                            {
                                "title": "第十章：响应式设计与适配",
                                "description": "了解如何设计响应式的电商模块图并适配不同设备"
                            }
                        ],
                        "estimatedDate": "日期待定",
                        "estimatedDuration": 30
                    }
                ]
            }
        ]
    }
}
  - loginUser.json的文件内容：
  [
      {
          "nickName": "amy",
          "avatarUrl": [
              "自己cos的服务域名地址/images/userAvatar/1687877068798_33381.png"
          ]
      },
      {
          "nickName": "xue",
          "avatarUrl": [
              "自己cos的服务域名地址/images/userAvatar/1687919134978_21958.png"
          ]
      },
      {
          "nickName": "123",
          "avatarUrl": [
              "自己cos的服务域名地址/images/userAvatar/1688092062511_43012.png"
          ]
      },
      {
          "nickName": "2233",
          "avatarUrl": [
              "自己c'o's/images/userAvatar/1688092305243_77783.png"
          ]
      },
      {
          "nickName": "232",
          "avatarUrl": "自己cos的服务域名地址/images/userAvatar/1688094743409_58568.png"
      }
  ]

## 成果展示
<img width="319" alt="image" src="https://github.com/xw-an/WechatCourse/assets/9762767/1dc90fed-862e-47a3-b613-0015f0032962">
<img width="320" alt="image" src="https://github.com/xw-an/WechatCourse/assets/9762767/03e8519c-abe6-42e6-9c17-42a0b37d6495">
<img width="319" alt="image" src="https://github.com/xw-an/WechatCourse/assets/9762767/0a8092b1-7fc1-42c1-9595-46a4bffd33a9">
<img width="321" alt="image" src="https://github.com/xw-an/WechatCourse/assets/9762767/8dc11432-030e-40e2-aa53-0eebd7e36c70">

https://github.com/xw-an/WechatCourse/assets/9762767/98f80f44-8e0b-4cf6-bea2-2177b6462291

