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
                <Text as="p" variant="bodyMd" alignment="start" style={styles.text}>
                  Dropshipping
                </Text>
              </Card>
            </div>
            {/* 其他列：展示链接 */}
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://cjdropshipping.com/" external style={styles.link}>
                  cjdropshipping
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.aliexpress.us/" external style={styles.link}>
                  aliexpress
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.gigacloudtech.cn/" external style={styles.link}>
                  gigacloudtech
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.dsers.com/" external style={styles.link}>
                  dsers
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://zendrop.com/" external style={styles.link}>
                  zendrop
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.spocket.co/" external style={styles.link}>
                  spocket
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
                <Text as="p" variant="bodyMd" alignment="start" style={styles.text}>
                  Wholesale supplier
                </Text>
              </Card>
            </div>
            {/* 其他列：展示链接 */}
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.globalsources.com/" external style={styles.link}>
                  globalsources
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.thomasnet.com/" external style={styles.link}>
                  thomasnet
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://cn.made-in-china.com/" external style={styles.link}>
                  madeInChina
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.europages.co.uk/" external style={styles.link}>
                  europages
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.ec21.com/" external style={styles.link}>
                  ec21
                </Link>
              </Card>
            </div>

            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.tradekey.com/" external style={styles.link}>
                  tradekey
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
                <Text as="p" variant="bodyMd" alignment="start" style={styles.text}>
                  Categories
                </Text>
              </Card>
            </div>
            {/* 其他列：展示链接 */}
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external style={styles.link}>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external style={styles.link}>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external style={styles.link}>
                  hao123
                </Link>
              </Card>
            </div>
            <div style={styles.linkColumn}>
              <Card sectioned>
                <Link url="https://www.hao123.com" external style={styles.link}>
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
    gridTemplateColumns: "1fr repeat(6, 1fr)", // 第一列占1份，后面六列均分
    gap: "16px", // 每列之间的间隙
  },
  categoryColumn: {
    backgroundColor: "#f2faff", // 分类列背景色
    padding: "16px", // 内边距
    borderRadius: "8px", // 边框圆角
    textAlign: "left", // 左对齐
    border: "1px solid #b0c4de", // 蓝色系边框
  },
  linkColumn: {
    padding: "16px", // 内边距
    borderRadius: "8px", // 边框圆角
    textAlign: "left", // 左对齐
    border: "1px solid #b0c4de", // 蓝色系边框
  },
  link: {
    color: "#0066ff", // 蓝色链接
    textDecoration: "none", // 去掉下划线
    fontSize: "14px",
    fontWeight: "500",
    display: "block", // 让链接块显示
  },
  text: {
    color: "#333", // 文字颜色
    fontSize: "16px",
    fontWeight: "600",
  },
};
