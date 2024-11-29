import { useState } from "react";
import { Card, TextContainer, Text } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

export function OrdersCard() {
  const shopify = useAppBridge();
  const { t } = useTranslation();
  const productsCount = 5;


  const setPopulating = (flag) => {
    shopify.loading(flag);
    setIsPopulating(flag);
  };

  const handlePopulate = async () => {
    const response = await fetch("/api/orders", { method: "POST" });
    if (response.ok) {
      shopify.toast.show(
        t("ProductsCard.productsCreatedToast", { count: productsCount })
      );
    } else {
      shopify.toast.show(t("ProductsCard.errorCreatingProductsToast"), {
        isError: true,
      });
    }
  };

  return (
    <Card
      title={t("ProductsCard.title")}
      sectioned
      onAction: handlePopulate>
    </Card>
  );
}
