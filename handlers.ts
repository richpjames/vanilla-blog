export const handler = (req: Request) => {
  const fileType = ".html";
  const fileName = req.url.split("/").pop() || "index";

  const response = new Response(Bun.file(`${fileName}${fileType}`));
  response.headers.set("Content-Type", "text/html");

  return response;
};
