import { BunFile } from "bun";

export class Page {
  file: BunFile;
  template = Bun.file("layout.html");

  constructor(file: BunFile) {
    this.file = file;
  }

  get fileName() {
    return this.file.name?.split(".")[0];
  }

  metadata = (filename: string = "index") => {
    if (!filename) throw new Error("Missing filename");

    const pagesMetadata: Record<
      string,
      { title: string; description: string }
    > = {
      index: {
        title: "rich james",
        description: "a website",
      },
    };

    const { title = "title", description = "description" } =
      pagesMetadata[filename];

    if (!title || !description) {
      throw new Error(`Missing metadata for ${filename}`);
    }

    return {
      title,
      description,
    };
  };

  header = (headerTemplate: string, title: string) => {
    return headerTemplate.replace("{{ title }}", title);
  };

  async render(body: BunFile) {
    const template = await this.template.text();
    const { title } = this.metadata(this.fileName);
    const headerTemplate = template.split("±")[0];
    const footer = template.split("±")[1];

    return this.header(headerTemplate, title) + (await body.text()) + footer;
  }
}
