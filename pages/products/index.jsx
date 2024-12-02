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
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useHistory, useParams } from "react-router-dom"; // 使用 react-router-dom

import { Rating } from "@component";
import { useProducts } from "@hooks";
import { extractIdFromGid } from "@utils/metafields";

// Render the product item
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
 * This page is accessed via '/products'
 * React Router is used to manage routing
 */
const Products = () => {
  const history = useHistory();
  const { id } = useParams(); // Using useParams to get the route parameter
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [queryValue, setQueryValue] = useState("");
  const { products, loading } = useProducts({ query: queryValue });

  // Handle redirect to specific product if the id is present in the query params
  if (id) {
    // Ensure this check happens on the client side to avoid SSR issues
    if (typeof window === "object") {
      history.replace(`/products/${id}`);
    }
    return null; // Prevent rendering the page content
  }

  const onSelection = ({ selection = [] }) => {
    const productDetails = selection[0];
    setIsPickerOpen(false);
    const productId = extractIdFromGid(productDetails.id);
    history.push(`/products/${productId}/create-review`);
  };

  const items = useMemo(() => {
    return products.map(({ id, title, featuredImage, avgRatingMetafield }) => ({
      id,
      name: title,
      url: `/products/${extractIdFromGid(id)}`, // Update to use relative path
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
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        selectMultiple={false}
        open={isPickerOpen}
        onSelection={onSelection}
        onCancel={() => setIsPickerOpen(false)}
        initialQuery={queryValue}
        actionVerb="select"
      />
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
