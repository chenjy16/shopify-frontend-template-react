import { useCallback, useMemo } from "react";
import {
  Page,
  Layout,
  Thumbnail,
  Card,
  Stack,
  TextStyle,
  TextContainer,
} from "@shopify/polaris";
import { useParams, useNavigate } from "react-router-dom";
import { generateShopifyProductGid } from "@utils/metafields";

const ROUTES = { products: "/products" };

const ProductReviews = () => {
  const navigate = useNavigate();
  const { id: productId, state = "published" } = useParams();

  const shopifyProductGid = generateShopifyProductGid(productId);

  const handleBulkAction = useCallback(
    async (ids, bulkAction) => {
      console.log("Bulk action triggered with IDs:", ids);
      // Implement bulk action logic here if needed
    },
    []
  );

  const bulkActions = useMemo(() => {
    const unpublishAction = {
      content: "Unpublish Selected",
      onAction: (ids) => handleBulkAction(ids, () => console.log("Unpublish")),
    };
    const publishAction = {
      content: "Publish Selected",
      onAction: (ids) => handleBulkAction(ids, () => console.log("Publish")),
    };

    return [
      state === "published" ? unpublishAction : publishAction,
      {
        content: "Delete Selected",
        onAction: (ids) => handleBulkAction(ids, () => console.log("Delete")),
      },
    ];
  }, [state, handleBulkAction]);

  const handleTabChange = useCallback(
    (newState) => {
      navigate(`/products/${productId}?state=${newState}`);
    },
    [navigate, productId]
  );

  const productInfoMarkup = useMemo(() => {
    const productThumbnailUrl = "https://via.placeholder.com/150";
    const avgRating = 4.5; // Example static rating

    return (
      <Layout.Section>
        <Card
          title="Sample Product Title"
          sectioned
          actions={[
            {
              content: "Create Review",
              onAction: () => navigate(`/products/${productId}/create-review`),
            },
          ]}
        >
          <Stack alignment="center">
            <Stack.Item>
              <Thumbnail source={productThumbnailUrl} alt="" />
            </Stack.Item>
            <Stack.Item>
              <TextContainer spacing="tight">
                <TextStyle variation="strong">Overall Rating</TextStyle>
                <p>{avgRating} / 5</p>
              </TextContainer>
            </Stack.Item>
          </Stack>
        </Card>
      </Layout.Section>
    );
  }, [navigate, productId]);

  return (
    <Page
      title="Sample Reviews"
      breadcrumbs={[
        {
          content: "Back",
          onAction: () => navigate(ROUTES.products),
        },
      ]}
    >
      <Layout>
        {productInfoMarkup}
        <Layout.Section>
          <Card>
            <p>Review List will go here.</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ProductReviews;
