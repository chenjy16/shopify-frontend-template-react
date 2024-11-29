import { useState } from "react";
import { Card, TextContainer, Text } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

export function OrdersCard() {
  const shopify = useAppBridge();
  const { t } = useTranslation();
  const [isPopulating, setIsPopulating] = useState(false);
  const ordersCount = 5;

  // 获取当前订单数量
  const {
    data,
    refetch: refetchOrderCount,
    isLoading: isLoadingCount,
  } = useQuery({
    queryKey: ["orderCount"],
    queryFn: async () => {
      const response = 0;
      return await response.json();
    },
    refetchOnWindowFocus: false,
  });

  // 设置加载状态
  const setPopulating = (flag) => {
    shopify.loading(flag);
    setIsPopulating(flag);
  };

  // 创建订单的逻辑
  const handlePopulate = async () => {
    setPopulating(true);
    const response = await fetch("/api/orders", { method: "POST" });

    if (response.ok) {
      await refetchOrderCount();

      shopify.toast.show(
        t("OrdersCard.ordersCreatedToast", { count: ordersCount })
      );
    } else {
      shopify.toast.show(t("OrdersCard.errorCreatingOrdersToast"), {
        isError: true,
      });
    }

    setPopulating(false);
  };

  return (
    <Card
      title={t("OrdersCard.title")}
      sectioned
      primaryFooterAction={{
        content: t("OrdersCard.populateOrdersButton", {
          count: ordersCount,
        }),
        onAction: handlePopulate,
        loading: isPopulating,
      }}
    >
      <TextContainer spacing="loose">
        <p>{t("OrdersCard.description")}</p>
        <Text as="h4" variant="headingMd">
          {t("OrdersCard.totalOrdersHeading")}
          <Text variant="bodyMd" as="p" fontWeight="semibold">
            {isLoadingCount ? "-" : data?.count}
          </Text>
        </Text>
      </TextContainer>
    </Card>
  );
}
