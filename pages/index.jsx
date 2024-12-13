import {
  Page,
  Layout,
  Card,
  Link,
  Text,
  VerticalStack,
  Box,
} from "@shopify/polaris";
import { TitleBar } from '@shopify/app-bridge-react';
import { useTranslation } from 'react-i18next';
import {ProductsCard, OrdersCard} from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page fullWidth>
      <TitleBar title={t("HomePage.title")}/>
      <Box paddingInlineStart="4" paddingInlineEnd="4">
        <VerticalStack gap="5">
          {/* Dropshipping Section */}
          <Card>
            <Box padding="4">
              <VerticalStack gap="4">
                <Box borderBlockEndWidth="025" borderColor="border" paddingBlockEnd="3">
                  <Text variant="headingMd" as="h2">Dropshipping</Text>
                </Box>
                <div style={styles.linkGrid}>
                  {["cjdropshipping", "aliexpress", "gigacloudtech", "dsers", "zendrop", "spocket"].map((linkText) => (
                    <Link key={linkText} url={`https://${linkText}.com`} external monochrome removeUnderline>
                      <Box padding="3" background="bg-surface-secondary" borderRadius="2" hover={styles.linkHover}>
                        {linkText}
                      </Box>
                    </Link>
                  ))}
                </div>
              </VerticalStack>
            </Box>
          </Card>

          {/* Supplier Section */}
          <Card>
            <Box padding="4">
              <VerticalStack gap="4">
                <Box borderBlockEndWidth="025" borderColor="border" paddingBlockEnd="3">
                  <Text variant="headingMd" as="h2">Supplier</Text>
                </Box>
                <div style={styles.linkGrid}>
                  {["globalsources", "thomasnet", "indiamart", "europages", "ec21", "tradekey"].map((linkText) => (
                    <Link key={linkText} url={`https://${linkText}.com`} external monochrome removeUnderline>
                      <Box padding="3" background="bg-surface-secondary" borderRadius="2" hover={styles.linkHover}>
                        {linkText}
                      </Box>
                    </Link>
                  ))}
                </div>
              </VerticalStack>
            </Box>
          </Card>

          {/* Products & Orders Cards */}
          <Layout>
            <Layout.Section oneHalf>
              <Card>
                <Box padding="4">
                  <ProductsCard />
                </Box>
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card>
                <Box padding="4">
                  <OrdersCard />
                </Box>
              </Card>
            </Layout.Section>
          </Layout>
        </VerticalStack>
      </Box>
    </Page>
  );
}

const styles = {
  linkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
  },
  linkHover: {
    backgroundColor: 'var(--p-color-bg-success-subdued)',
    color: 'var(--p-color-text-success)',
  }
};
