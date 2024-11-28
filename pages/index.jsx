import {
  Page,Layout,Card,
  Link,
  Text, VerticalStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} />
      <VerticalStack gap="4">
        {/* 第一行 */}
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Text as="p" variant="bodyMd" alignment="center">
                <Link url="https://www.hao123.com"  external>
                  hao123
                </Link>
                />
              </Text>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Link url="https://www.hao123.com"  external>
                hao123
              </Link>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Link url="https://www.hao123.com"  external>
                hao123
              </Link>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Link url="https://www.hao123.com"  external>
                hao123
              </Link>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Link url="https://www.hao123.com"  external>
                hao123
              </Link>
            </Card>
          </Layout.Section>
        </Layout>

        {/* 第二行 */}
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Link url="https://www.hao123.com"  external>
                hao123
              </Link>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Link url="https://www.hao123.com"  external>
                hao123
              </Link>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Link url="https://www.hao123.com"  external>
                hao123
              </Link>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Link url="https://www.hao123.com"  external>
                hao123
              </Link>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Link url="https://www.hao123.com"  external>
                hao123
              </Link>
            </Card>
          </Layout.Section>
        </Layout>
      </VerticalStack>
    </Page>
  );
}
