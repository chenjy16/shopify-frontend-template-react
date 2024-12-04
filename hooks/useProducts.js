import { useState, useEffect, useMemo } from "react";

// 通过 Express API 获取产品数据
export const useProducts = ({ query = "" } = {}) => {
  const [products, setProducts] = useState([]); // 存储产品数据
  const [loading, setLoading] = useState(true); // 存储加载状态
  const [error, setError] = useState(null); // 存储错误信息

  useEffect(() => {
    // 发起请求获取产品数据
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/productlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }), // 将 query 作为请求体发送
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const { success, products, error } = await response.json();

        if (!success) {
          throw new Error(error || "Unknown error");
        }

        setProducts(products); // 更新产品数据
      } catch (error) {
        setError(error.message); // 更新错误状态
      } finally {
        setLoading(false); // 请求完成，更新加载状态
      }
    };
    fetchProducts(); // 调用 fetch 方法获取数据
  }, [query]); // 依赖于 query，query 变化时重新请求数据

  // 返回处理后的结果
  return useMemo(() => ({ products, loading, error }), [products, loading, error]);
};
