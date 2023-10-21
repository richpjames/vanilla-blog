import { BunFile } from "bun";

export class Page {
  file: BunFile;
  template = Bun.file("layout.html");

  constructor(file: BunFile) {
    this.file = file;
  }

  metadata = (filename: string = "index") => {
    if (!filename) throw new Error("Missing filename");

    const pagesMetadata: Record<
      string,
      { title: string; description: string }
    > = {
      index: {
        title: "test",
        description: "hello hi a test",
      },
    };

    const { title, description } = pagesMetadata[filename];

    if (!title || !description) {
      throw new Error(`Missing metadata for ${filename}`);
    }

    return {
      title,
      description,
    };
  };

  header = (headerTemplate: string, title: string, description: string) => {};

  async render(body: BunFile) {
    const template = await this.template.text();
    const { title, description } = this.metadata(this.file.name);
    const headerTemplate = template.split("±")[0];
    const footer = template.split("±")[1];

    return (
      this.header(headerTemplate, title, description) +
      (await body.text()) +
      footer
    );
  }
}
