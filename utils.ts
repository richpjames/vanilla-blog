import { Url } from "./models/url";
import { Page } from "./models/page";

export const handler = async (req: Request) => {
  const url = new Url(req.url);

  if (url.isForCss()) {
    return new Response(Bun.file("style.css"), {
      headers: { "Content-Type": "text/css" },
    });
  }

  return await generateHtmlResponse(url);
};

const generateHtmlResponse = async (url: Url) => {
  const page = new Page(url.qualifiedFilePath);

  return new Response(await page.render(), {
    headers: { "Content-Type": "text/html" },
  });
};
