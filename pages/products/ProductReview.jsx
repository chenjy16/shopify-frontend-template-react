import { useCallback, useMemo } from "react";
import {
  Page,
  Layout,
  Card,
  Stack,
  TextStyle,
  TextContainer,
  Spinner,
  Banner,
} from "@shopify/polaris";
import { find } from "lodash";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { generateShopifyProductGid } from "../../../utilities/metafields";
import { ReviewList, Rating, ProductInfoSkeleton } from "components";
import {
  useDeleteReviews,
  useProductReviews,
  usePublishReviews,
  useUnpublishReviews,
  useProduct,
} from "hooks";
import { ROUTES } from "constants";

/**
 * 产品评论页面组件
 */
const ProductReviews = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();
  const { id: productId, state = "published" } = query;
  
  // 获取产品数据
  const shopifyProductGid = generateShopifyProductGid(productId);
  const { product, loading: productLoading, error } = useProduct(shopifyProductGid);

  // 获取评论数据
  const {
    reviews,
    refetch: refetchReviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useProductReviews({
    productId: shopifyProductGid,
    state,
  });

  // 评论操作 hooks
  const { publishAll, loading: publishing } = usePublishReviews();
  const { unpublishAll, loading: unpublishing } = useUnpublishReviews();
  const { deleteAll, loading: deleting } = useDeleteReviews();

  // 批量操作处理函数
  const handleBulkAction = useCallback(
    async (ids, bulkAction) => {
      try {
        const reviewMetafields = ids.map((id) => find(reviews, { id }));
        await bulkAction({ productId: shopifyProductGid, reviewMetafields });
        await refetchReviews();
      } catch (error) {
        console.error("Bulk action failed:", error);
      }
    },
    [reviews, shopifyProductGid, refetchReviews]
  );

  // 批量操作配置
  const bulkActions = useMemo(() => {
    const unpublishAction = {
      content: t("ProductReviews.unpublishSelected"),
      onAction: (ids) => handleBulkAction(ids, unpublishAll),
    };
    const publishAction = {
      content: t("ProductReviews.publishSelected"), 
      onAction: (ids) => handleBulkAction(ids, publishAll),
    };

    return [
      state === "published" ? unpublishAction : publishAction,
      {
        content: t("ProductReviews.deleteSelected"),
        onAction: (ids) => handleBulkAction(ids, deleteAll),
        destructive: true,
      },
    ];
  }, [state, unpublishAll, publishAll, deleteAll, handleBulkAction, t]);

  // 标签切换处理
  const handleTabChange = useCallback(
    (newState) => {
      push({
        pathname: `/products/${productId}`,
        query: { state: newState },
      });
    },
    [push, productId]
  );

  // 产品信息区域渲染
  const productInfoMarkup = useMemo(() => {
    if (productLoading) {
      return (
        <Layout.Section>
          <Card sectioned>
            <ProductInfoSkeleton />
          </Card>
        </Layout.Section>
      );
    }

    if (error) {
      return (
        <Layout.Section>
          <Banner status="critical">
            <p>{error.message}</p>
          </Banner>
        </Layout.Section>
      );
    }

    const productThumbnailUrl = product?.featuredImage?.originalSrc || "";
    let avgRating = 0;
    try {
      avgRating = JSON.parse(product?.avgRatingMetafield?.value).value;
    } catch (e) {
      console.log(t("ProductReviews.noRatingMessage"));
    }

    return (
      <Layout.Section>
        <Card
          title={product.title}
          sectioned
          actions={[
            {
              content: t("ProductReviews.createReview"),
              url: `/products/${productId}/create-review`,
            },
          ]}
        >
          <Stack alignment="center">
            <Stack.Item>
              <img 
                src={productThumbnailUrl}
                alt=""
                style={{ width: 50, height: 50, objectFit: "cover" }}
              />
            </Stack.Item>
            <Stack.Item>
              <TextContainer spacing="tight">
                <TextStyle variation="strong">{t("ProductReviews.overallRating")}</TextStyle>
                <Rating value={avgRating} />
              </TextContainer>
            </Stack.Item>
          </Stack>
        </Card>
      </Layout.Section>
    );
  }, [productLoading, error, product, productId, t]);

  const isProcessing = publishing || unpublishing || deleting;

  const reviewsErrorMarkup = reviewsError && (
    <Layout.Section>
      <Banner status="critical">
        <p>{t("ProductReviews.errorLoadingReviews")}</p>
      </Banner>
    </Layout.Section>
  );

  return (
    <Page
      title={t("ProductReviews.title")}
      breadcrumbs={[
        {
          url: ROUTES.products,
          accessibilityLabel: t("ProductReviews.backLinkLabel"),
        },
      ]}
    >
      <Layout>
        {productInfoMarkup}
        <Layout.Section>
          <Card>
            <ReviewList
              state={state}
              reviews={reviews}
              loading={reviewsLoading}
              processing={isProcessing}
              onTabChange={handleTabChange}
              bulkActions={bulkActions}
            />
          </Card>
        </Layout.Section>
        {reviewsErrorMarkup}
      </Layout>
    </Page>
  );
};

export default ProductReviews;
