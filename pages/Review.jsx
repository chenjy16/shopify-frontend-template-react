import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Helper function to get page view count from localStorage
 */
const getPageViewCountFromLocalStorage = () => {
  // 从 localStorage 获取 pageViewCount，如果没有则返回 0
  const count = localStorage.getItem("prapp.pageViewCount");
  return count ? parseInt(count, 10) : 0;
};

/**
 * Helper function to save page view count to localStorage
 */
const setPageViewCountToLocalStorage = (count) => {
  // 将 pageViewCount 存储到 localStorage
  localStorage.setItem("prapp.pageViewCount", count);
};

const review = () => {
  const navigate = useNavigate(); // 使用 react-router-dom 的 useNavigate 钩子

  // 使用 useState 来存储 pageViewCount
  const [pageViewCount, setPageViewCount] = useState(() => getPageViewCountFromLocalStorage());

  useEffect(() => {
    /**
     * 页面加载时，更新访问计数
     * 如果是第一次加载，pageViewCount 为 0，则增加 1。
     */
    setPageViewCount((prevPageViewCount) => {
      const newCount = prevPageViewCount + 1;
      // 将新的 pageViewCount 存储到 localStorage
      setPageViewCountToLocalStorage(newCount);
      return newCount;
    });
  }, []); // 只在组件首次加载时执行

  useEffect(() => {
    /**
     * 跳转逻辑，依赖于 pageViewCount 的变化
     * 只有 pageViewCount 更新后才会触发
     */
    const url = pageViewCount === 1 ? "/getting-started" : "/products";
    navigate(pageViewCount); // 使用 navigate 来替代 router.replace()
  }, [pageViewCount, navigate]); // 监听 pageViewCount 的变化，触发跳转

  return null; // 不渲染任何内容，只用于路由跳转
};

export default review;
