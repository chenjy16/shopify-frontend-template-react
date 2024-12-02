import { useMutation } from "@apollo/client";  // 使用 Apollo Client 的 useMutation
import { useCallback } from "react";
import { PRODUCT_METAFIELD_CREATE } from "../graphql";

export const useProductMetafieldCreate = () => {
  const [createProductMetafieldMutation] = useMutation(PRODUCT_METAFIELD_CREATE);

  return useCallback(
    async ({ productId, metafield }, options = {}) => {
      try {
        // 执行 mutation
        const mutationResult = await createProductMetafieldMutation({
          variables: { input: { id: productId, metafields: [metafield] } },
          ...options,
        });

        const { data } = mutationResult;
        const userErrors = data?.productUpdate?.userErrors;

        if (userErrors?.length) {
          throw userErrors;
        }

        return mutationResult;
      } catch (error) {
        console.error("Error creating product metafield:", error);
        throw error;
      }
    },
    [createProductMetafieldMutation]
  );
};
