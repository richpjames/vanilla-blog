import { BunFile } from "bun";
import { PagePath } from "../types";

export class Page {
  file: BunFile;
  template = Bun.file("layout.html");

  constructor(fileName: PagePath) {
    const file = Bun.file(fileName);

    this.file = file;
  }

  get fileName() {
    return this.file.name?.split(".")[0];
  }

  metadata = (filename: string = "index") => {
    if (!filename) throw new Error("Missing filename");

    const pagesMetadata: Record<
      string,
      { title: string; description: string; date?: string; published?: boolean }
    > = {
      index: {
        title:
          "Monitor Books #3: static site generation with Gatsby, Strapi and a new look",
        description:
          "How I rebuilt the site from the ground up using Gatsby, Strapi as the CMS and implementing a whole new look",
        date: "2022-01-02",
        published: true,
      },
      "page-2": {
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

  async render() {
    const template = await this.template.text();
    const { title } = this.metadata(this.fileName);
    const headerTemplate = template.split("±")[0];
    const footer = template.split("±")[1];

    return (
      this.header(headerTemplate, title) + (await this.file.text()) + footer
    );
  }
}
