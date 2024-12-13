import {
  Page,
  Layout,
  Card,
  Link,
  Text,
  VerticalStack,
  Box,
  Icon,
} from "@shopify/polaris";
import { TitleBar } from '@shopify/app-bridge-react';
import { useTranslation } from 'react-i18next';
import { LinkMinor, ExternalMinor } from '@shopify/polaris-icons';
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
            <Box padding="4">
              <div style={styles.section}>
                <div style={styles.categoryHeader}>
                  <Text variant="headingLg" as="h2">
                    <Icon source={LinkMinor} />
                    <span style={styles.headerText}>Dropshipping</span>
                  </Text>
                </div>
                <div style={styles.linkGrid}>
                  {["cjdropshipping", "aliexpress", "gigacloudtech", "dsers", "zendrop", "spocket"].map((linkText) => (
                    <Link 
                      key={linkText} 
                      url={`https://${linkText}.com`} 
                      external 
                      removeUnderline
                    >
                      <div style={styles.linkContainer}>
                        <span>{linkText}</span>
                        <Icon source={ExternalMinor} color="base" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Box>
          </Card>

          {/* Supplier Section */}
          <Card>
            <Box padding="4">
              <div style={styles.section}>
                <div style={styles.categoryHeader}>
                  <Text variant="headingLg" as="h2">
                    <Icon source={LinkMinor} />
                    <span style={styles.headerText}>Supplier</span>
                  </Text>
                </div>
                <div style={styles.linkGrid}>
                  {["globalsources", "thomasnet", "indiamart", "europages", "ec21", "tradekey"].map((linkText) => (
                    <Link 
                      key={linkText} 
                      url={`https://${linkText}.com`} 
                      external 
                      removeUnderline
                    >
                      <div style={styles.linkContainer}>
                        <span>{linkText}</span>
                        <Icon source={ExternalMinor} color="base" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Box>
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
    padding: '0',
  },
  categoryHeader: {
    marginBottom: '24px',
    borderBottom: '1px solid var(--p-border-subdued)',
    paddingBottom: '16px',
  },
  headerText: {
    marginLeft: '8px',
    verticalAlign: 'middle',
  },
  linkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    alignItems: 'stretch',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'var(--p-surface-selected)',
    borderRadius: '8px',
    border: '1px solid var(--p-border-subdued)',
    transition: 'all 0.2s ease',
    color: 'var(--p-text)',
    minHeight: '52px',
    '&:hover': {
      backgroundColor: 'var(--p-surface-hovered)',
      borderColor: 'var(--p-border-hovered)',
      boxShadow: 'var(--p-shadow-button)',
    },
  },
};
