import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.jsx` matches `/`
 * * `/pages/blog/[id].jsx` matches `/blog/123`
 * * `/pages/[...catchAll].jsx` matches any URL not explicitly matched
 *
 * @param {object} pages value of import.meta.glob(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */
export default function AppRoutes({ pages }) {
  // 获取路由
  const routes = useRoutes(pages);

  // 路由组件映射
  const routeComponents = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

  // 找不到页面时的默认组件
  const NotFound = routes.find(({ path }) => path === "/notFound")?.component || DefaultNotFoundComponent;

  return (
    <ReactRouterRoutes>
      {routeComponents}
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

/**
 * 动态生成路由
 * @param {object} pages import.meta.glob() 返回的页面对象
 * @return {Array} 返回的路由数组
 */
function useRoutes(pages) {
  const routes = Object.keys(pages)
    .map((key) => {
      let path = key
        .replace("./pages", "")
        .replace(/\.(t|j)sx?$/, "")
        /**
         * 替换 /index 为 /
         */
        .replace(/\/index$/i, "/")
        /**
         * 仅将首字母小写，保持动态路径的 camelCase，同时确保标准路由以小写形式
         */
        .replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase());

      if (path.endsWith("/") && path !== "/") {
        path = path.substring(0, path.length - 1);
      }

      if (!pages[key].default) {
        console.warn(`${key} doesn't export a default React component`);
      }

      return {
        path,
        component: pages[key].default,
      };
    })
    .filter((route) => route.component);

  return routes;
}

// 默认的 404 页面组件
const DefaultNotFoundComponent = () => <div>Page Not Found</div>;
