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
                  Supplier
                </Text>
              </Card>
            </div>
            {/* Link Columns */}
            {["globalsources", "thomasnet", "made-in-china", "europages", "ec21", "tradekey"].map((linkText, index) => (
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

// CSS styles with unified size, clear borders, and left alignment
const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr repeat(6, 1fr)", // Ensuring the first column is wider, others equally spaced
    gap: "16px", // Space between columns
    marginBottom: "16px", // Space between sections
  },
  categoryColumn: {
    backgroundColor: "#E9F4FF", // Light blue background for category columns
    padding: "16px",
    borderRadius: "8px",
    textAlign: "left", // Left-aligned text
    minHeight: "120px", // Consistent minimum height for each card
    display: "flex", // Flexbox to make sure contents are aligned
    alignItems: "center", // Center items vertically within the card
  },
  linkColumn: {
    backgroundColor: "#FFFFFF", // White background for link columns for contrast
    padding: "16px",
    borderRadius: "8px",
    textAlign: "left", // Left-aligned text for links
    border: "2px solid #0066FF", // Blue border for consistency
    minHeight: "120px", // Ensuring all cards have the same height
    display: "flex", // Flexbox to ensure the content stays in a row
    flexDirection: "column", // Allow content to flow from top to bottom
    justifyContent: "center", // Vertically center the content
    wordBreak: "break-word", // Prevent long words like 'made-in-china' from overflowing or breaking
  },
  link: {
    color: "#0066FF", // Blue link color
    textDecoration: "none", // Remove underline
    fontSize: "14px",
    fontWeight: "500",
    display: "block", // Block display to make the link fill the available space
    whiteSpace: "nowrap", // Prevent text from wrapping onto the next line
    overflow: "hidden", // Hide overflow if necessary
    textOverflow: "ellipsis", // Display ellipsis for overflowing text
    transition: "color 0.3s ease", // Smooth transition for color changes
  },
  text: {
    color: "#333", // Dark text for visibility
    fontSize: "16px",
    fontWeight: "600", // Bold font for category titles
  },
};
