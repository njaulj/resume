/**
 * Requires node v0.7.7 or greater.
 *
 * To connect: $ curl -sSNT. localhost:8000
 */

var http = require('http')
  , repl = require('repl')
  , buf0 = new Buffer([0])

var server = http.createServer(function (req, res) {
  res.setHeader('content-type', 'multipart/octet-stream')

  res.write('Hello,I\'m 刘君\r\n输入以下命令可以查看我的简历\r\n> work:查看工作经验\r\n> study:查看学习履历\r\n> skills:查看掌握技能\r\n> likes:查看我的兴趣\r\n> contact:查看我的联系方式\r\n输入\'help\'获得帮助\r\n')
  var replServer = repl.start({
      prompt: 'curl repl> '
    , input: req
    , output: res
    , terminal: false
    , useColors: true
    , useGlobal: false
  })

  replServer.context.help = 'Hello,I\'m 刘君\r\n输入以下命令可以查看我的简历\r\n> work:查看工作经验\r\n> study:查看学习履历\r\n> skills:查看掌握技能\r\n> likes:查看我的兴趣\r\n> contact:查看我的联系方式\r\n'


  replServer.context.work = [{
    start_date:'2010-08',
    end_date:'2015-06',
    company:'某国企信息部',
    position:'开发工程师',
    summary:'主要负责公司网站开发、材料管理软件报表开发',
    hignlights:[
      "不愠不火,感觉没啥可圈可点的"
    ]
  },{
    start_date:'2015-06',
    end_date:'至今',
    company:'杭州蔓藤网络科技公司',
    position:'Web开发工程师',
    summary:'电商公司，前后台开发',
    hignlights:[
      "开发了商城的基于LBS的广告推送后台",
      "开发了爬取京东商城商品页并转换为公司标准商品的爬虫以及商品标准化管理后台",
      "Angular+Ionic 重构了移动端热卖入口，逐步取代Native商城",
      "参与了 Angular+Ionic 重构了开源软件 ECSHOP移动版"
    ]
  }]

  replServer.context.study = [{
    start_date:'2006',
    end_date:'2010',
    area:'计算机科学与技术',
    university:'南京农业大学',
    studyType:'学士'
  }]

  replServer.context.likes=["看书","Coding","逛W3cTech,Div.io,StackOverFlow,github,cnodejs.org,v2ex,reactjs.cn等网站","掼蛋","桌球"]

  replServer.context.skills = [
  { 
    name:'Angular 1.0',
    level:'****'
  },
  {
    name:'Ionic框架',
    level:'*****'
  },
  {
    name:'Node.js写网站后台服务器',
    level:'****'
  },
  {
    name:'ExpressJs框架',
    level:'****'
  },
  { 
    name:'MongoDb & PostgreSQl 数据库',
    level:'****'
  },
  {
    name:'html5+css3',
    level:'****'
  },{
    name:'ReactJs',
    level:'***'
  },{
    name:'React Native',
    level:'**'
  }]

  replServer.context.contact = {
    telephone:'+86 18251888949',
    base:'南京,中国',
    email:'18251888949#163.com(#->@)',
    github:'https://github.com/njaulj(好长时间未打理)'
  }

  // log
  console.log(req.headers['user-agent'])

  // hack to thread stdin and stdout
  // simultaneously in curl's single thread
  var iv = setInterval(function () {
    res.write(buf0)
  }, 100)

  res.connection.on('end', function () {
    clearInterval(iv)
  })
})
server.listen(8000)