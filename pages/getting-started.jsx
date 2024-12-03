import { useMemo } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { RiskMinor, CircleTickOutlineMinor } from "@shopify/polaris-icons";
import {
  Page,
  Layout,
  Spinner,
  Stack,
  Card,
  TextContainer,
  Icon,
  TextStyle,
  Link,
} from "@shopify/polaris";
import useSWR from "swr";
import { fetch } from "@utils/app-bridge.js";

const GettingStartedStep = ({ title, description, completed }) => {
  const source = completed ? CircleTickOutlineMinor : RiskMinor;
  const color = completed ? "success" : "critical";

  return (
    <Stack vertical spacing="tight">
      <Stack>
        <Icon color={color} source={source} />
        <TextStyle variation="strong">{title}</TextStyle>
      </Stack>
      {description && <div>{description}</div>}
    </Stack>
  );
};


const GettingStarted = () => {

  return (
    <Page title="Getting Started">
    </Page>
  );
};

export default GettingStarted;
