import { Breadcrumb, Button, Flex } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Logout } from "../../pages/auth/Logout";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export const DashboardTopBar = ({ collapsed, setCollapsed }: Props) => {
  const [items, setItems] = useState<any>([]);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const newItems = createArrayForBreadcrumb(pathname);
    return setItems(newItems);
  }, [location]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Flex
      style={{ padding: "10px 15px", borderBottom: "1px solid #eee" }}
      justify="space-between"
      align="center"
    >
      <Button type="default" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Breadcrumb separator=">" items={[...items]} />
      <Logout />
    </Flex>
  );
};

const getBreadcrumbArrayforCrudRoute = (relatedHref: string) => {
  const isCreateRoute = relatedHref.includes("create");
  const isEditRoute = relatedHref.includes("edit");
  const splitedHref = relatedHref.split("/").filter((item) => item !== ""); //remove space
  const mainRouteName = splitedHref[0];

  const items = [
    {
      title: <Link to={`/${mainRouteName}`}>{mainRouteName}</Link>,
    },
  ];

  if (isCreateRoute) {
    return [
      ...items,
      {
        title: (
          <Link to={`/${mainRouteName}/create`}>create-{mainRouteName}</Link>
        ),
      },
    ];
  }

  if (isEditRoute) {
    const id = splitedHref[2];
    return [
      ...items,
      {
        title: (
          <Link to={`/${mainRouteName}/edit/${id}`}>edit-{mainRouteName}</Link>
        ),
      },
    ];
  }

  return items;
};

const createArrayForBreadcrumb = (href: string) => {
  const isDashboardRoute = href === "/";
  const isSaleHistoryRoute = href.includes("sales/history");
  const isReportsRoute = href.includes("reports");
  const isCategoriesRoute = href.includes("categories");
  const isProductsRoute = href.includes("products");
  const isCustomersRoute = href.includes("customers");
  const isSuppliersRoute = href.includes("suppliers");

  if (isDashboardRoute) {
    return [
      {
        title: <Link to={"/"}>dashboard</Link>,
      },
    ];
  }

  if (isSaleHistoryRoute) {
    const isSaleDetailRoute = href.includes("detail");
    if (isSaleDetailRoute) {
      const saleId = href.split("/")[3];
      return [
        {
          title: <Link to={"/sales/history"}>Sales-history</Link>,
        },
        {
          title: (
            <Link to={`/sales/history/${saleId}/detail`}>
              Sales-history-detail
            </Link>
          ),
        },
      ];
    }

    return [
      {
        title: <Link to={"/sales/history"}>Sales-history</Link>,
      },
    ];
  }

  if (isReportsRoute) {
    const isSalesReportsRoute = href.includes("sales");
    const isInventoryReportsRoute = href.includes("inventory");

    if (isSalesReportsRoute) {
      return [
        {
          title: <Link to={"/reports/sales"}>sales-reports</Link>,
        },
      ];
    }

    if (isInventoryReportsRoute) {
      return [
        {
          title: <Link to={"/reports/inventory"}>inventory-reports</Link>,
        },
      ];
    }
  }

  //start => crud route
  if (isCategoriesRoute) {
    return getBreadcrumbArrayforCrudRoute(href);
  }

  if (isProductsRoute) {
    return getBreadcrumbArrayforCrudRoute(href);
  }

  if (isCustomersRoute) {
    return getBreadcrumbArrayforCrudRoute(href);
  }

  if (isSuppliersRoute) {
    return getBreadcrumbArrayforCrudRoute(href);
  }
  //end => crud route
};
