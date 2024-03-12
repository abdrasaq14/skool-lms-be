import { Request, Response } from 'express';
import puppeteer from 'puppeteer';


export const singleDownload = async (req: Request, res: Response) => {
  const id = req.params.id; 

  if (!id) {
    return res.send('Application ID is required');
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:5173/admin/dashboard/application-view/${id}`, { waitUntil: 'networkidle0' });
  const htmlContent = await page.content();

  await browser.close();

  res.send(htmlContent);
};
