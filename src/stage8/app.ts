import { ReportService } from "./report.service";
import { PuppeteerPDFGenerator } from "./pdf-generators/puppeteer.pdf-generator";
import { GDriveSender } from "./senders/gdrive.sender";

async function main() {
  const pdfGenerator = new PuppeteerPDFGenerator();
  const gDriveSender = new GDriveSender();
  const service = new ReportService(pdfGenerator, gDriveSender);

  const today = new Date();
  const numberOfDayInCurrentWeek = new Date().getDay(); // starts from 1; Mon - 1, Tue - 2...
  const mondayTime = today.getTime() - (numberOfDayInCurrentWeek - 1) * 24 * 60 * 60 * 1000;
  const monday = new Date(mondayTime);
  monday.setHours(0, 0, 0, 0);

  await service.createDailyReport(today, 3);
  await service.createWeeklyReport(monday, today, 3);
}

main().then(() => process.exit(0)).catch(console.log);
