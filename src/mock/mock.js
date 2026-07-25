import Mock from "mockjs";
Mock.setup({
  // 延迟请求
  timeout: 500,
});
Mock.mock("http://localhost:8080/login", "post", (req) => {
  // console.log("1111", req);
  const { password, username } = JSON.parse(req.body);
  if (password == "123456" && username == "admin") {
    return {
      code: 200,
      success: true,
      message: "登录成功",
      nickname: "Dave",
      token: "bdhsgcikne2vsajgausr3",
    };
  } else {
    return {
      code: 100,
      success: false,
      message: "用户名或者密码有误",
    };
  }
});

//菜单数据
const menuList = [
  {
    name: "首页",
    icon: "el-icon-s-home",
    url: "/index",
  },
  {
    name: "订单管理",
    icon: "el-icon-s-order",
    url: "/order",
    children: [
      {
        name: "订单列表",
        icon: "el-icon-user",
        url: "/orders/list",
      },
    ],
  },
  {
    name: "运单管理",
    icon: "el-icon-menu",
    url: "/waybill",
    children: [
      {
        name: "运单录入",
        icon: "el-icon-notebook-2",
        url: "/waybill/in",
      },
      {
        name: "运单列表",
        icon: "el-icon-truck",
        url: "/waybill/list",
      },
    ],
  },
  {
    name: "发车管理",
    icon: "el-icon-s-order",
    url: "/depart",
    children: [
      {
        name: "发车数据单",
        icon: "el-icon-tickets",
        url: "/depart/data",
      },
    ],
  },
  {
    name: "承运商管理",
    icon: "el-icon-user",
    url: "/carrier",
    children: [
      {
        name: "承运商列表",
        icon: "el-icon-chat-square",
        url: "/carrier/list",
      },
      {
        name: "车辆列表",
        icon: "el-icon-bank-card",
        url: "/carrier/trucks",
      },
      {
        name: "承运司机列表",
        icon: "el-icon-bank-card",
        url: "/carrier/list",
      },
    ],
  },
  {
    name: "客户管理",
    icon: "el-icon-chat-dot-square",
    url: "/customer",
  },
  {
    name: "财务管理",
    icon: "el-icon-user",
    url: "/my",
    children: [
      {
        name: "客户对账单",
        icon: "el-icon-chat-square",
        url: "/customer/info",
      },
      {
        name: "承运商对账单",
        icon: "el-icon-bank-card",
        url: "/record",
      },
      {
        name: "承运司机列表",
        icon: "el-icon-bank-card",
        url: "/record",
      },
    ],
  },
  {
    name: "个人中心",
    icon: "el-icon-chat-dot-square",
    url: "/personal",
  },
];
//返回菜单的接口
Mock.mock("http://localhost:8080/menu", "get", () => {
  return {
    code: 200,
    success: true,
    message: "请求成功",
    data: menuList,
  };
});
