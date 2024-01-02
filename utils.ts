import { Page } from "./page";

const path = (req: Request) => new URL(req.url).pathname.split("/")[1];

export const handler = async (req: Request) => {
  const pathFromReq = path(req);
  switch (true) {
    case pathFromReq.search(".css") > 0:
      return new Response(Bun.file("style.css"), {
        headers: { "Content-Type": "text/css" },
      });
    case !Boolean(pathFromReq.search("/") > 0) &&
      !Boolean(pathFromReq.search(".")):
      return new Response(await view(path(req)), {
        headers: { "Content-Type": "text/html" },
      });
    default:
      return new Response(await view(), {
        headers: { "Content-Type": "text/html" },
      });
  }
};

export const view = async (
  url: Request["url"] = "index.html"
): Promise<string> => {
  const route = router(url);
  const file = Bun.file(route);

  const page = new Page(file);
  return await page.render(file);
};

export const router = (url: Request["url"]): string => {
  const multipleSuffixes = route(url);

  switch (!multipleSuffixes) {
    case new RegExp("page-2").test(url):
      return "page-2.html";
    case new RegExp(".").test(url):
      return "index.html";
    default:
      return "index.html";
  }
};

export const route = (url: Request["url"]): boolean => {
  // does the url have a file extension?
  const pathSegments = url.split(".").slice(-1)[0].split("/").slice(1);

  // if there are multiple segments join them, otherwise return index
  return Boolean(pathSegments.length);
};
