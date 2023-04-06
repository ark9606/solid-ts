import { launch } from "puppeteer";
import { AbstractPDFTemplate } from "./templates/abstract.pdf-template";
import { IPDFHandler } from "./i.pdf-handler";

export class PuppeteerPDFGenerator implements IPDFHandler {
  public async generatePDF<TPayload>(
    template: AbstractPDFTemplate<TPayload>
  ): Promise<Buffer> {
    const browser = await launch();

    const page = await browser.newPage();

    const html = template.getHTML();

    await page.setContent(html);

    const pdfBuffer: Buffer = await page.pdf({
      landscape: template.isLandscape(),
    });
    console.log('Created buffer');

    return pdfBuffer;
  }
}
