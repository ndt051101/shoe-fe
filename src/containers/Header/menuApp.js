export const adminMenu = [
    {
        //Quản lí người dùng
        name: "menu.admin.manage-user",
        menus: [
            {
                //Quản lí admin
                name: "menu.admin.manage-admin",
                link: "/system/manage-admin",
            },
            {
                //Quản lí khách hàng
                name: "menu.admin.manage-customer",
                link: "/system/manage-customer",
            },
        ],
    },
    {
        //Quản lí danh mục
        name: "menu.admin.category",
        menus: [
            {
                name: "menu.admin.manage-category",
                link: "/system/manage-category",
            },
        ],
    },
    {
        //Quản lí sản phẩm
        name: "menu.admin.product",
        menus: [
            {
                name: "menu.admin.manage-product",
                link: "/system/manage-product",
            },
        ],
    },
    {
        //Quan li đơn hàng
        name: "menu.admin.order",
        menus: [
            {
                name: "menu.admin.manage-order-processing",
                link: "/system/manage-order-processing",
            },
            {
                name: "menu.admin.manage-order-delivering",
                link: "/system/manage-order-delivering",
            },
            {
                name: "menu.admin.manage-order-delivered",
                link: "/system/manage-order-delivered",
            }
        ],
    },
];
