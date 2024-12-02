import { useQuery } from "@shopify/react-hooks";
import { useMemo } from "react";
import { GET_PRODUCTS_QUERY } from "../graphql";
import { getNodesFromConnections } from "../utils/graphql";

export const useProducts = ({ query = "" } = {}) => {
  // 使用 @shopify/react-hooks 的 useQuery
  const { data, loading } = useQuery(GET_PRODUCTS_QUERY, {
    variables: { query },
    fetchPolicy: "network-only",
  });

  // 使用 useMemo 来处理 products 数据
  const products = useMemo(() => {
    if (!data) {
      return [];
    }

    const nodes = getNodesFromConnections(data.products);

    return nodes
      .map((node) => ({
        ...node,
        // 平均评分值存储在产品的公开 metafield 中
        avgRating: node?.avgRatingMetafield?.value,
        hasReviews: Boolean(
          [
            ...getNodesFromConnections(node.publicReviews),
            ...getNodesFromConnections(node.privateReviews),
          ].length
        ),
      }))
      .filter((node) => node.hasReviews);
  }, [data]);

  // 返回处理后的结果和 loading 状态
  return useMemo(() => ({ products, loading }), [products, loading]);
};
