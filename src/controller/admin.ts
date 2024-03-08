import { Request, Response } from 'express';
import puppeteer from 'puppeteer';

export const singleDownload = async (req: Request, res: Response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/dashboard/application-view', { waitUntil: 'networkidle0' });
  
    const pdfBuffer = await page.pdf({ format: 'Tabloid' });
  
    await browser.close();
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=download.pdf');
    res.send(pdfBuffer);
  }