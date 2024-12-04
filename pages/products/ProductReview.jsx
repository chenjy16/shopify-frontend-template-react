import React from "react";
import { useParams } from "react-router-dom";

const ProductReview = () => {
  const { id } = useParams(); // 获取动态路由参数

  return (
    <div>
      <h1>Product Reviews for Product ID: {id}</h1>
      {/* 在这里根据 id 显示该产品的评论 */}
    </div>
  );
};

export default ProductReview;
