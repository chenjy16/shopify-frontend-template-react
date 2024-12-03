import React, { useMemo, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { RiskMinor, CircleTickOutlineMinor } from "@shopify/polaris-icons";
import {
  Page,
  Layout,
  Spinner,
  Stack,
  Card,
  TextContainer,
  Icon,
  TextStyle,
  Link,
} from "@shopify/polaris";
import useSWR from "swr";
import { fetch } from "@utils/app-bridge.js";  // 确保 app-bridge.js 中有 fetch 方法

// GettingStartedStep 组件，用于显示步骤和状态
const GettingStartedStep = ({ title, description, completed }) => {
  const source = completed ? CircleTickOutlineMinor : RiskMinor;
  const color = completed ? "success" : "critical";

  return (
    <Stack vertical spacing="tight">
      <Stack>
        <Icon color={color} source={source} />
        <TextStyle variation="strong">{title}</TextStyle>
      </Stack>
      {description && <div>{description}</div>}
    </Stack>
  );
};

// AppBlockSetupLayout 组件，用于显示有关 app blocks 配置的内容
const AppBlockSetupLayout = ({
                               theme,
                               supportsAppBlocks,
                               supportsSe,
                               containsAverageRatingAppBlock,
                               containsProductReviewsAppBlock,
                               editorUrl,
                             }) => {
  return (
    <Layout.AnnotatedSection
      title="Theme app blocks setup"
      description="Provide a way for your customers to engage with you and boost your sales by making sure you have installed the product reviews app blocks."
    >
      <Card>
        <Card.Section>
          <Stack vertical>
            <GettingStartedStep
              title="Average Review Score"
              completed={containsAverageRatingAppBlock}
            />
            <GettingStartedStep
              title="Product Reviews"
              completed={containsProductReviewsAppBlock}
            />
          </Stack>
        </Card.Section>

        <Card.Section>
          {supportsAppBlocks && supportsSe && (
            <p>
              Edit the product page for theme (
              <TextStyle variation="strong">{theme.name}</TextStyle>) in the{" "}
              <Link external url={editorUrl}>
                editor
              </Link>
              to add or update app blocks.
            </p>
          )}
          {(!supportsAppBlocks || !supportsSe) && (
            <p>Setup is only possible with supported themes.</p>
          )}
        </Card.Section>
      </Card>
    </Layout.AnnotatedSection>
  );
};

// CurrentThemeLayout 组件，用于显示当前主题的支持情况
const CurrentThemeLayout = ({ theme, supportsAppBlocks, supportsSe }) => {
  const appBlocksUnsupportedDescription = (
    <p>
      Currently published theme's{" "}
      <TextStyle variation="strong">main-product</TextStyle> section (
      <TextStyle variation="strong">{theme.name}</TextStyle>) does not support
      app blocks.
    </p>
  );

  const sectionsEverywhereUnsupportedDescription = (
    <p>
      Currently published theme (
      <TextStyle variation="strong">{theme.name}</TextStyle>) does not support
      Sections Everywhere.
    </p>
  );

  return (
    <Layout.AnnotatedSection
      title="Current theme"
      description="Ensure your current theme fully supports theme app extensions."
    >
      <Card>
        <Card.Section>
          <Stack vertical>
            <GettingStartedStep
              title="Sections Everywhere support"
              completed={supportsSe}
              description={
                !supportsSe && sectionsEverywhereUnsupportedDescription
              }
            />
            <GettingStartedStep
              title="App block support"
              completed={supportsAppBlocks}
              description={
                !supportsAppBlocks && appBlocksUnsupportedDescription
              }
            />
          </Stack>
        </Card.Section>

        <Card.Section>
          {supportsAppBlocks && supportsSe && (
            <p>Your theme fully supports app blocks 🎉</p>
          )}
          {(!supportsAppBlocks || !supportsSe) && (
            <TextContainer>
              <p>
                It looks like your theme does not fully support the
                functionality of this app.
              </p>
              <p>
                Try switching to a different theme or contacting your theme
                developer to request support.
              </p>
            </TextContainer>
          )}
        </Card.Section>
      </Card>
    </Layout.AnnotatedSection>
  );
};

// GettingStarted 组件，作为页面的入口
const GettingStarted = () => {
  const app = useAppBridge();

  // 使用 useMemo 创建 fetcher 函数
  const fetcher = useMemo(() => {
    return async (uri, options) => {
      return fetch(app)(uri, options).then((response) => response?.json());
    };
  }, [app]);

  // 使用 useSWR 获取主题数据
  const { data, error } = useSWR("/api/store/themes/main", fetcher);

  if (error) {
    return (
      <Page title="Getting Started">
        <Layout>
          <TextContainer>
            <p>Error loading data</p>
          </TextContainer>
        </Layout>
      </Page>
    );
  }

  if (!data) {
    return (
      <Page title="Getting Started">
        <Layout>
          <Layout.Section>
            <Stack distribution="center">
              <Spinner />
            </Stack>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  const theme = data?.theme; // 假设 theme 是数据的一部分
  const supportsAppBlocks = data?.supportsAppBlocks || false;
  const supportsSe = data?.supportsSe || false;
  const editorUrl = data?.editorUrl;

  return (
    <Page title="Getting Started">
      <Layout>
        <AppBlockSetupLayout
          theme={theme}
          supportsAppBlocks={supportsAppBlocks}
          supportsSe={supportsSe}
          containsAverageRatingAppBlock={data?.containsAverageRatingAppBlock}
          containsProductReviewsAppBlock={data?.containsProductReviewsAppBlock}
          editorUrl={editorUrl}
        />
        <CurrentThemeLayout
          theme={theme}
          supportsAppBlocks={supportsAppBlocks}
          supportsSe={supportsSe}
        />
      </Layout>
    </Page>
  );
};

export default GettingStarted;
