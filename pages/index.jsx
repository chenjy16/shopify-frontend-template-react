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
        {/* First Row */}
        <Layout>
          <div style={styles.gridContainer}>
            {/* Category Column */}
            <div style={styles.categoryColumn}>
              <Card sectioned>
                <Text as="p" variant="bodyMd" style={styles.text}>
                  Dropshipping
                </Text>
              </Card>
            </div>
            {/* Link Columns */}
            {["cjdropshipping", "aliexpress", "gigacloudtech", "dsers", "zendrop", "spocket"].map((linkText, index) => (
              <div key={index} style={styles.linkColumn}>
                <Card sectioned>
                  <Link url={`https://${linkText}.com`} external style={styles.link}>
                    {linkText}
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </Layout>

        {/* Second Row */}
        <Layout>
          <div style={styles.gridContainer}>
            {/* Category Column */}
            <div style={styles.categoryColumn}>
              <Card sectioned>
                <Text as="p" variant="bodyMd" style={styles.text}>
                  Wholesale supplier
                </Text>
              </Card>
            </div>
            {/* Link Columns */}
            {["globalsources", "thomasnet", "madeInChina", "europages", "ec21", "tradekey"].map((linkText, index) => (
              <div key={index} style={styles.linkColumn}>
                <Card sectioned>
                  <Link url={`https://${linkText}.com`} external style={styles.link}>
                    {linkText}
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </Layout>

        {/* Third Row */}
        <Layout>
          <div style={styles.gridContainer}>
            {/* Category Column */}
            <div style={styles.categoryColumn}>
              <Card sectioned>
                <Text as="p" variant="bodyMd" style={styles.text}>
                  Categories
                </Text>
              </Card>
            </div>
            {/* Link Columns */}
            {["hao123", "hao123", "hao123", "hao123"].map((linkText, index) => (
              <div key={index} style={styles.linkColumn}>
                <Card sectioned>
                  <Link url={`https://${linkText}.com`} external style={styles.link}>
                    {linkText}
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </Layout>
      </VerticalStack>
    </Page>
  );
}

// Updated CSS styles for best practices and improved design consistency
const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr repeat(6, 1fr)", // Make the first column wider and the other six columns equal
    gap: "16px", // Add space between columns
    marginBottom: "16px", // Add space between sections
  },
  categoryColumn: {
    backgroundColor: "#E9F4FF", // Light blue background for category columns
    padding: "16px",
    borderRadius: "8px",
    textAlign: "left", // Left align text
    border: "1px solid #CCE0FF", // Light blue border for emphasis
  },
  linkColumn: {
    padding: "16px",
    borderRadius: "8px",
    textAlign: "left", // Left align text for link columns
    border: "1px solid #CCE0FF", // Light blue border for consistency
  },
  link: {
    color: "#0066FF", // Bright blue links
    textDecoration: "none", // Remove underlines
    fontSize: "14px",
    fontWeight: "500",
    display: "block", // Make links block level for easier interaction
    transition: "color 0.3s ease", // Smooth color transition
  },
  linkHover: {
    color: "#0057D9", // Darker blue when hovering over link
  },
  text: {
    color: "#333", // Dark text for clarity
    fontSize: "16px",
    fontWeight: "600", // Bold text for category titles
  },
};
