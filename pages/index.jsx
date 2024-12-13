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
import {ProductsCard, OrdersCard} from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page fullWidth>
      <TitleBar title={t("HomePage.title")}/>
      <div style={styles.container}>
        <VerticalStack gap="5">
          {/* Dropshipping Section */}
          <Card>
            <div style={styles.section}>
              <div style={styles.categoryHeader}>
                <Text variant="headingMd" as="h2">Dropshipping</Text>
              </div>
              <div style={styles.linkGrid}>
                {["cjdropshipping", "aliexpress", "gigacloudtech", "dsers", "zendrop", "spocket"].map((linkText) => (
                  <Link key={linkText} url={`https://${linkText}.com`} external style={styles.link}>
                    {linkText}
                  </Link>
                ))}
              </div>
            </div>
          </Card>

          {/* Supplier Section */}
          <Card>
            <div style={styles.section}>
              <div style={styles.categoryHeader}>
                <Text variant="headingMd" as="h2">Supplier</Text>
              </div>
              <div style={styles.linkGrid}>
                {["globalsources", "thomasnet", "indiamart", "europages", "ec21", "tradekey"].map((linkText) => (
                  <Link key={linkText} url={`https://${linkText}.com`} external style={styles.link}>
                    {linkText}
                  </Link>
                ))}
              </div>
            </div>
          </Card>

          {/* Products & Orders Cards */}
          <Layout>
            <Layout.Section oneHalf>
              <Card>
                <ProductsCard />
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card>
                <OrdersCard />
              </Card>
            </Layout.Section>
          </Layout>
        </VerticalStack>
      </div>
    </Page>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  section: {
    padding: '20px',
  },
  categoryHeader: {
    marginBottom: '20px',
    borderBottom: '1px solid #e1e3e5',
    paddingBottom: '12px',
  },
  linkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px',
    alignItems: 'start',
  },
  link: {
    display: 'block',
    padding: '12px 16px',
    backgroundColor: '#f6f6f7',
    borderRadius: '4px',
    color: '#2c6ecb',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#e6e6e7',
      color: '#1a1a1a',
    },
  },
};
