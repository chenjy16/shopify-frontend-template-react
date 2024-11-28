import {
  Page,
  Layout,
  Card,
  Link,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} />
      <VerticalStack gap="4">
        {/* 第一行 */}
        <Layout>
          <div style={styles.gridContainer}>
            {/* 第一列：显示分类信息 */}
            <div style={styles.categoryColumn}>
              <Card sectioned>
                <Text as="p" variant="bodyMd" alignment="center">
                  Categories
                </Text>
              </Card>
            </div>
            {/* 其他列：展示链接 */}
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
          </div>
        </Layout>

        {/* 第二行 */}
        <Layout>
          <div style={styles.gridContainer}>
            {/* 第一列：显示分类信息 */}
            <div style={styles.categoryColumn}>
              <Card sectioned>
                <Text as="p" variant="bodyMd" alignment="center">
                  Categories
                </Text>
              </Card>
            </div>
            {/* 其他列：展示链接 */}
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
          </div>
        </Layout>

        {/* 第三行 */}
        <Layout>
          <div style={styles.gridContainer}>
            {/* 第一列：显示分类信息 */}
            <div style={styles.categoryColumn}>
              <Card sectioned>
                <Text as="p" variant="bodyMd" alignment="center">
                  Categories
                </Text>
              </Card>
            </div>
            {/* 其他列：展示链接 */}
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external>
                  hao123
                </Link>
              </Card>
            </div>
          </div>
        </Layout>
      </VerticalStack>
    </Page>
  );
}

// CSS样式：使用Grid布局
const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr repeat(4, 1fr)", // 第一列占1份，后面四列均分
    gap: "16px", // 每列之间的间隙
  },
  categoryColumn: {
    backgroundColor: "#f4f4f4", // 分类列的背景色
    padding: "16px", // 内边距
    borderRadius: "8px", // 边框圆角
    textAlign: "center",
  },
  linkColumn: {
    padding: "16px", // 内边距
    borderRadius: "8px", // 边框圆角
    textAlign: "center",
  },
};
