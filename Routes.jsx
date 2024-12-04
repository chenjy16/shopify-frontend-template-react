import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import { useMemo } from "react";

/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.jsx` matches `/`
 * * `/pages/products/index.jsx` matches `/products`
 * * `/pages/products/[id]/index.jsx` matches `/products/:id`
 *
 * @param {object} pages value of import.meta.glob(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */
export default function Routes({ pages }) {
  const routes = useRoutes(pages);

  const routeComponents = useMemo(() =>
      routes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      )),
    [routes]
  );

  const NotFound = routes.find(({ path }) => path === "/notFound")?.component;

  return (
    <ReactRouterRoutes>
      {routeComponents}
      {NotFound && <Route path="*" element={<NotFound />} />}
    </ReactRouterRoutes>
  );
}

function useRoutes(pages) {
  const routes = Object.keys(pages)
    .map((key) => {
      let path = key
        .replace("./pages", "") // 移除 /pages 前缀
        .replace(/\.(t|j)sx?$/, "") // 移除扩展名
        .replace(/\/index$/i, "/") // 将 /index 重写为 /
        .replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase()) // 只小写第一个字母
        .replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`); // 将 [id] 替换为 :id

      // 如果路径以 / 结尾，移除多余的 /
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
    .filter((route) => route.component); // 过滤掉没有组件的路由

  return routes;
}
