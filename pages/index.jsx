import {
  Page,
  Layout,
  Card,
  Link,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import { TitleBar } from '@shopify/app-bridge-react';
import { useTranslation } from 'react-i18next';
import { ProductsCard } from "../components";

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
              <div key={index} style={styles.categoryColumn}>
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
                  Supplier
                </Text>
              </Card>
            </div>
            {/* Link Columns */}
            {["globalsources", "thomasnet", "indiamart", "europages", "ec21", "tradekey"].map((linkText, index) => (
              <div key={index} style={styles.categoryColumn}>
                <Card sectioned>
                  <Link url={`https://${linkText}.com`} external style={styles.link}>
                    {linkText}
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </Layout>
        <Layout>
          <div style={styles.gridContainer}>
            {/* Category Column */}
            <div style={styles.categoryColumn}>
              <Card sectioned>
                <ProductsCard />
              </Card>
            </div>
          </div>
        </Layout>


      </VerticalStack>
    </Page>
  );
}

// CSS styles with unified size, clear borders, and left alignment
const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr repeat(6, 1fr)", // 1st column wider, other columns equally spaced
    gap: "16px", // Space between columns
    marginBottom: "16px", // Space between sections
    width: "100%", // Ensure the container takes full width
    boxSizing: "border-box", // Prevent padding from affecting width
    textAlign: "left", // Ensure the text aligns to the left
  },
  categoryColumn: {
    backgroundColor: "#E9F4FF", // Light blue background for category columns
    padding: "16px",
    borderRadius: "8px",
    textAlign: "left", // Left-aligned text
    minHeight: "120px", // Ensuring all cards have a consistent minimum height
    display: "flex", // Flexbox to center content
    alignItems: "center", // Vertically align content
    justifyContent: "center", // Horizontally center content
    width: "100%", // Ensures it takes the full available width
    boxSizing: "border-box", // Prevent padding from affecting width
    whiteSpace: "nowrap", // Prevents wrapping of text
  },
  link: {
    color: "#0066FF", // Blue link color
    textDecoration: "none", // Remove underline
    fontSize: "14px",
    fontWeight: "500",
    display: "block", // Block display to make the link fill the available space
    whiteSpace: "nowrap", // Prevent text from wrapping onto the next line
    overflow: "hidden", // Hide overflow text
    textOverflow: "ellipsis", // Show ellipsis for overflowing text
    width: "100%", // Ensures the link takes the full width of the card
    lineHeight: "1.5", // Adjust line height for consistent text height
    boxSizing: "border-box", // Prevent padding from affecting the width
  },
  text: {
    color: "#333", // Dark text for visibility
    fontSize: "16px",
    fontWeight: "600", // Bold font for category titles
    textAlign: "left", // Left align category titles
    whiteSpace: "nowrap", // Prevent text from wrapping onto the next line
    overflow: "hidden", // Hide overflow text
    textOverflow: "ellipsis", // Display ellipsis for overflowing text
    wordWrap: "normal", // Prevent breaking long words
    overflowWrap: "normal", // Ensure words are not broken at the hyphen
  },
};
