import { BrowserRouter, Link, Route, Routes as RouterRoutes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import { QueryProvider, PolarisProvider } from "./components";

// 导入页面组件
const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
  eager: true,
});

export default function App() {
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <QueryProvider>
          {/* 更新导航使用 Link */}
          <NavMenu>
            <Link to="/" rel="home">
              Home
            </Link>
            <Link to="/review">{t("NavigationMenu.pageName")}</Link>
          </NavMenu>

          {/* 使用 react-router-dom 的 Routes 组件 */}
          <RouterRoutes>
            {/* 动态添加路由，根据 pages 目录 */}
            {Object.keys(pages).map((path) => {
              // 通过 page 导入的文件路径生成路由路径
              const Component = pages[path].default;
              const routePath = path.replace(/^\.\/pages(.*)\.tsx$/, "$1");
              return (
                <Route
                  key={routePath}
                  path={routePath}
                  element={<Component />}
                />
              );
            })}
          </RouterRoutes>
        </QueryProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
