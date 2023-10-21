import { Page } from "./page";

export const handler = async (req: Request) => {
  const path = new URL(req.url).pathname.split("/")[1];

  switch (true) {
    case path.search(".css") > 0:
      return new Response(Bun.file("style.css"), {
        headers: { "Content-Type": "text/css" },
      });
    case !Boolean(path.search("/") > 0) && Boolean(path.search(".")):
      return new Response(await view(req.url), {
        headers: { "Content-Type": "text/html" },
      });
    default:
      return new Response(await view(), {
        headers: { "Content-Type": "text/html" },
      });
  }
};

export const view = async (url: Request["url"] = "index"): Promise<string> => {
  const route = router(url);
  const file = Bun.file(route);

  const page = new Page(file);
  return await page.render(file);
};

export const router = (url: Request["url"]): string => {
  switch (true) {
    case new RegExp(".").test(route(url)):
      return "index.html";
    default:
      return "index.html";
  }
};

export const route = (url: Request["url"]): string => {
  const pathSegments = url.split(".").slice(-1)[0].split("/").slice(1);

  return pathSegments[0] ? pathSegments.join("/") : "index";
};
