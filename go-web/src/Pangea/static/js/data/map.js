var notice_menu = [
    {
        title:"重要公告",
        type:"1",
        link:"/notice/import_notices",
    },{
        title:"中心新闻",
        type:"2",
        link:"/notice/center_notices"
    },{
        title:"科研动态",
        type:"3",
        link:"/notice/scindy_notices"
    },{
        title:"创新信息",
        type:"4",
        link:"/notice/invol_notices",
    },{
        title:"获奖信息",
        type:"5",
        link:"/notice/pride_notices"
    },{
        title:"设备公告",
        type:"6",
        link:"/notice/device_notices"
    },{
        title:"电子大赛",
        type:"7",
        link:"/notice/competition_notices"
    },{
        title:"实验公告",
        type:"8",
        link:"/notice/exp_notices",
    },{
        title:"实验室介绍",
        type:"9",
        link:"/notice/exp_introduction_notices"
    },{
        title:"规章制度",
        type:"10",
        link:"/notice/system_notices"
    }
];

function get_notice_by_link(link){
    for(var i = 0; i < notice_menu.length; i++){
        if(notice_menu[i].link == "/notice/" + link){
            return notice_menu[i];
        }
    }
}

var notice_color = [
    "#a61d31",
    "#52854c",
    "#293352",
    "#ee8348",
    "#428bd1",
];


var teach_harvest = [
{   title:"大赛获奖",
    type:1,
    sub_title:["时间","获奖学生","奖项","等级",
    ]
},{   title:"国家级和省级部分教学成果",
    type:2,
    sub_title:["名称", "等级", "获奖人", "获奖时间"],
},{  title:"教师开发的创新性实验项目",
    type:3,
    sub_title:["项目名称", "投入教学起始时间", "开发人", "参加学生数"],
},{   title:"教学研究论文",
    type:4,
    sub_title:["姓名", "名称", "发表刊物", "时间"],
},{   title:"自编实验教材",
    type:5,
    sub_title:["名称", "作者", "出版社", "时间"],
},{   title:"国家、省部级和部分校级教学成果奖",
    type:6,
    sub_title:["时间", "成果名称", "获奖名称", "等级"],
},{   title:"国家级精品课程",
    type:7,
    sub_title:["课程名称", "评审时间", "课程负责人"],
},{   title:"省级精品课程",
    type:8,
    sub_title:["课程名称", "评审时间", "课程负责人"],
},{   title:"出版特色教材",
    type:9,
    sub_title:["作者","教材名称", "出版社", "时间", "分类"]

},{   title:"主要教学研究项目",
    type:10,
    sub_title:["名称", "单位名称", "时间", "分类"],
},{   title:"国家级和省部级实验教学改革项目",
    type:11,
    sub_title:["项目名称", "项目来源", "项目经费(万元)", "立项时间"],
},{   title:"校级实验教学改革项目",
    type:12,
    sub_title:["项目名称", "项目来源", "项目经费(万元)", "立项时间"],
},{   title:"自编实验讲义",
    type:13,
    sub_title:["名称", "作者", "已使用届数", "编写时间"],
},{   title:"自制教学仪器设备",
    type:14,
    sub_title:["名称", "作者", "已使用人次", "研制时间"],
},{   title:"教研论文",
    type:15,
    sub_title:["论文题目", "作者", "发表刊物", "发表日期"],
}
];

var sr_harvest = [
    {
        title:"主要科学研究项目",
        type:20,
        sub_title:["名称","单位名称","时间","分类"],
    },{
        title:"科学研究论文",
        type:21,
        sub_title:["作者", "名称", "刊物名称", "时间"],
    },{
        title:"国家、省部级和部分校级科研成果奖",
        type:22,
        sub_title:["时间", "成果名称", "项目名称", "等级"],
    },{
        title:"申请专利",
        type:23,
        sub_title:["名称", "设计人", "类型", "授权时间"],
    }
]

var fileType = {
    "invol-tect-material":1,
}

