import { Routes, Route } from "react-router-dom";

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
export default function Routes({ pages }) {
  // 获取所有路由
  const routes = useRoutes(pages);

  // 渲染路由组件
  const routeComponents = routes.map(({ path, component: Component }) => (
    <Route key={`${path}-${Component.name}`} path={path} element={<Component />} />
  ));

  // 查找并设置 404 页面
  const NotFound = routes.find(({ path }) => path === "/notFound")?.component || DefaultNotFoundComponent;

  return (
    <Routes>
      {routeComponents}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/**
 * 默认的 404 页面组件
 */
function DefaultNotFoundComponent() {
  return <div>Page Not Found</div>;
}

function useRoutes(pages) {
  const routes = Object.keys(pages)
    .map((key) => {
      let path = key
        .replace("./pages", "") // 去掉 ./pages
        .replace(/\.(t|j)sx?$/, "") // 去掉文件扩展名
        .replace(/\/index$/i, "/") // 将 /index 替换为 /
        .replace(/\b[A-Z]/g, (firstLetter) => firstLetter.toLowerCase()) // 首字母小写
        .replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`); // 动态参数处理

      // 如果路径最后有斜杠且不是根路径，去掉斜杠
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
    .filter((route) => route.component); // 只保留有组件的路由

  return routes;
}
