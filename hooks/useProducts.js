import { useState, useEffect, useMemo } from "react";
import { GET_PRODUCTS_QUERY } from "../graphql"; // 你的 GraphQL 查询语句
import { getNodesFromConnections } from "../utils/graphql";

export const useProducts = ({ query = "" } = {}) => {
  const [products, setProducts] = useState([]); // 存储产品数据
  const [loading, setLoading] = useState(true); // 存储加载状态

  useEffect(() => {
    // 发起 GraphQL 请求
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/graphql", { // 确保此处的 URL 与你的 GraphQL 端点一致
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 如果需要身份验证，可以在此处添加 authorization headers
            "Authorization": `Bearer YOUR_ACCESS_TOKEN`,
          },
          body: JSON.stringify({
            query: GET_PRODUCTS_QUERY,
            variables: { query }, // 传递查询变量
          }),
        });
        const { data } = await response.json();

        if (data) {
          // 处理返回的数据
          const nodes = getNodesFromConnections(data.products);
          const filteredProducts = nodes
            .map((node) => ({
              ...node,
              avgRating: node?.avgRatingMetafield?.value,
              hasReviews: Boolean(
                [
                  ...getNodesFromConnections(node.publicReviews),
                  ...getNodesFromConnections(node.privateReviews),
                ].length
              ),
            }))
            .filter((node) => node.hasReviews);

          setProducts(filteredProducts); // 更新产品数据
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // 请求完成，更新加载状态
      }
    };

    fetchProducts(); // 调用 fetch 方法获取数据
  }, [query]); // 依赖于 query，query 变化时重新请求数据

  // 返回处理后的结果
  return useMemo(() => ({ products, loading }), [products, loading]);
};
