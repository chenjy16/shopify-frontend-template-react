/**
 * Check if an specific app block wsa added to a template file.
 */
export const containsAppBlock = (
  templateJSONAssetContent,
  appBlockName,
  themeAppExtensionUuid
) => {
  const regExp = new RegExp(
    `shopify:\/\/apps\/.*\/blocks\/${appBlockName}\/${themeAppExtensionUuid}`
  );

  let parsedContent = undefined;

  try {
    parsedContent = JSON.parse(templateJSONAssetContent);
  } catch (err) {
    console.error(err);
  }

  /**
   * Retrieves all blocks belonging to template sections
   */
  const sections = Object.values(parsedContent?.sections || {});
  const blocks = sections
    .map(({ blocks = {} }) => Object.values(blocks))
    .flat();

  return blocks.some((block) => regExp.test(block.type));
};
