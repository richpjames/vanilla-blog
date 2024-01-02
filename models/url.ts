import { PagePath } from "../types";

export class Url extends URL {
  constructor(url: string) {
    super(url);
  }

  get filePath() {
    const result = this.pathname.split("/")[1];
    return result;
  }

  get qualifiedFilePath(): PagePath {
    if (new RegExp("page-2").test(this.filePath)) return "page-2.html";

    return "index.html";
  }

  isForCss() {
    return this.pathname.search(".css") > 0;
  }

  hasFileExtension() {
    return this.pathname.search(".") > 0;
  }

  isForHtml() {
    return this.pathname.search(".html") > 0;
  }
}
