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
                <Text variant="headingMd" as="h2" color="success">Dropshipping</Text>
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
                <Text variant="headingMd" as="h2" color="success">Supplier</Text>
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
    padding: '24px',
    backgroundColor: '#ffffff',
  },
  categoryHeader: {
    marginBottom: '24px',
    borderBottom: '2px solid #008060',
    paddingBottom: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  linkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    alignItems: 'stretch',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 18px',
    backgroundColor: '#f4f6f8',
    borderRadius: '8px',
    color: '#2c6ecb',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    border: '1px solid #e1e3e5',
    height: '100%',
    '&:hover': {
      backgroundColor: '#f9fafb',
      color: '#008060',
      borderColor: '#008060',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
  },
};
