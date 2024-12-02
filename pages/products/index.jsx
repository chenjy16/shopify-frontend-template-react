import React, { useState, useMemo } from "react";
import {
  Page,
  Layout,
  Card,
  ResourceList,
  Heading,
  Thumbnail,
  EmptyState,
  Filters,
} from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import { useNavigate, useParams } from "react-router-dom";

import { Rating } from "@component";
import { useProducts } from "@hooks";
import { extractIdFromGid } from "@utils/metafields";

// 渲染产品项
const renderItem = ({ id, name, url, media, avgRating }) => {
  let ratingToShow = 0;
  try {
    ratingToShow = JSON.parse(avgRating?.value).value;
  } catch (e) {
    console.log(
      "Publish a review of",
      name,
      "to have the average review show."
    );
  }

  return (
    <ResourceList.Item
      id={id}
      url={url}
      media={media}
      accessibilityLabel={`View details for ${name}`}
    >
      <Heading element="h2">{name}</Heading>
      <Rating value={ratingToShow} />
    </ResourceList.Item>
  );
};

/**
 * 该页面通过 '/products' 路径访问
 * 使用 React Router 管理路由
 */
const Products = () => {
  const navigate = useNavigate(); // 使用 useNavigate 进行路由跳转
  const { id } = useParams(); // 使用 useParams 获取路由参数
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [queryValue, setQueryValue] = useState("");
  const { products, loading } = useProducts({ query: queryValue });

  // 如果路由参数 id 存在，重定向到指定产品
  if (id) {
    // 确保在客户端执行此逻辑，避免 SSR 问题
    if (typeof window === "object") {
      navigate(`/products/${id}`); // 使用 navigate 进行路由跳转
    }
    return null; // 防止渲染页面内容
  }

  const onSelection = ({ selection = [] }) => {
    const productDetails = selection[0];
    setIsPickerOpen(false);
    const productId = extractIdFromGid(productDetails.id);
    navigate(`/products/${productId}/create-review`); // 使用 navigate 替代 history.push
  };

  const items = useMemo(() => {
    return products.map(({ id, title, featuredImage, avgRatingMetafield }) => ({
      id,
      name: title,
      url: `/products/${extractIdFromGid(id)}`, // 更新为使用相对路径
      media: (
        <Thumbnail
          source={featuredImage?.originalSrc || ImageMajor}
          alt={title}
        />
      ),
      avgRating: avgRatingMetafield,
    }));
  }, [products]);

  const emptyStateMarkup = useMemo(() => {
    if (queryValue) return;

    return (
      <EmptyState
        heading="You don't have any products with reviews yet"
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>
          Once you have products with reviews they will display on this page.
        </p>
      </EmptyState>
    );
  }, [queryValue]);

  return (
    <Page
      title="Reviewed Products"
      primaryAction={{
        content: "Create Review",
        onAction: () => setIsPickerOpen(true),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: "product", plural: "products" }}
              showHeader
              emptyState={emptyStateMarkup}
              items={items}
              renderItem={renderItem}
              loading={loading}
              filterControl={
                <Filters
                  filters={[]}
                  queryValue={queryValue}
                  onQueryChange={setQueryValue}
                  onQueryClear={() => setQueryValue(null)}
                />
              }
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Products;
