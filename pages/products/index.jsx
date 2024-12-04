import React, { useState, useMemo, useCallback } from "react";
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
import { useNavigate, useParams } from "react-router-dom";  // 引入 useNavigate
import { Rating } from "@component";
import { useProducts } from "@hooks";  // 假设这个hook支持基于查询值的过滤
import { extractIdFromGid } from "@utils/metafields";
import { useAppBridge } from "@shopify/app-bridge-react";
import { ResourcePicker } from "@shopify/app-bridge/actions";

// 渲染产品项
const renderItem = ({ id, name, media, avgRating }) => {
  let ratingToShow = 0;
  try {
    ratingToShow = JSON.parse(avgRating?.value).value;
  } catch (e) {
    console.log("Publish a review of", name, "to have the average review show.");
  }

  return (
    <ResourceList.Item
      id={id}
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
  const [queryValue, setQueryValue] = useState(""); // 存储搜索查询值
  const { products, loading, error } = useProducts({ query: queryValue }); // 假设这个hook支持基于查询值的过滤
  const app = useAppBridge(); // 获取 AppBridge 实例

  // 如果路由参数 id 存在，重定向到指定产品
  if (id) {
    // 确保在客户端执行此逻辑，避免 SSR 问题
    if (typeof window === "object") {
      const productId = extractIdFromGid(id);
      if (productId) {
        navigate(`/products/${productId}`); // 使用 navigate 进行路由跳转
      } else {
        console.error(`Invalid product ID: ${id}`);
      }
    }
    return null; // 防止渲染页面内容
  }

  // 打开 Product 选择器
  const handleOpenPicker = useCallback(() => {
    const resourcePicker = ResourcePicker.create(app, {
      resourceType: ResourcePicker.ResourceType.Product, // 选择产品
      showVariants: false,
      allowMultiple: false,
    });

    // 选择产品后处理
    resourcePicker.subscribe(ResourcePicker.Action.SELECT, (resources) => {
      const selectedProducts = resources.selection;
      console.log("Selected Products:", selectedProducts);
      // 处理选中的产品，例如更新状态，跳转等
    });

    // 打开选择器
    resourcePicker.dispatch(ResourcePicker.Action.OPEN);
  }, [app]);

  // 空状态渲染逻辑
  const emptyStateMarkup = useMemo(() => {
    if (queryValue && products.length === 0) {
      return (
        <EmptyState
          heading="No products found"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>No products matching your search were found.</p>
        </EmptyState>
      );
    }

    if (!queryValue && products.length === 0) {
      return (
        <EmptyState
          heading="You don't have any products with reviews yet"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>
            Once you have products with reviews, they will display on this page.
          </p>
        </EmptyState>
      );
    }

    return null;
  }, [queryValue, products]);

  // 错误渲染逻辑
  const errorMarkup = error ? (
    <div style={{ color: "red", marginTop: "20px" }}>
      <p>Error: {error}</p>
    </div>
  ) : null;

  // 渲染产品项
  const items = useMemo(() => {
    return products.map(({ id, title, featuredImage, avgRatingMetafield }) => {
      const productId = extractIdFromGid(id);

      if (!productId) {
        console.error(`Invalid product ID for ${title}`);
        return null;
      }

      return {
        id,
        name: title,
        media: (
          <Thumbnail
            source={featuredImage?.originalSrc || ImageMajor}
            alt={title}
          />
        ),
        avgRating: avgRatingMetafield,
      };
    }).filter(Boolean); // 移除无效项
  }, [products]);

  // 点击产品项时使用 navigate 进行跳转
  const handleProductClick = (productId) => {
    const encodedProductId = encodeURIComponent(productId);
    navigate(`/products/${encodedProductId}`);
  };

  return (
    <Page
      title="Reviewed Products"
      primaryAction={{
        content: "Create Review",
        onAction: handleOpenPicker, // 点击按钮时打开选择器
      }}
    >
      {errorMarkup}
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: "product", plural: "products" }}
              showHeader
              emptyState={emptyStateMarkup}
              items={items}
              renderItem={(item) => {
                const productId = extractIdFromGid(item.id);
                if (!productId) {
                  console.error(`Invalid product ID for ${item.name}`);
                  return null;
                }
                return (
                  <div onClick={() => handleProductClick(productId)}>
                    {renderItem(item)}
                  </div>
                );
              }}
              loading={loading}
              filterControl={
                <Filters
                  filters={[]}
                  queryValue={queryValue}
                  onQueryChange={setQueryValue}
                  onQueryClear={() => setQueryValue("")}
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
