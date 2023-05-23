import express from 'express';
import puppeteer from 'puppeteer';

const app = express();

app.get('/api', async function (req, res) {
  try {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    await page.setContent(req.body.html);
    await page.emulateMediaType("screen");

    const pdfFileBuffer = await page.pdf({
      format: "a5",
      printBackground: true,
    });

    /** Cleanup process */
    browser.close();

    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');  
    res.setHeader("Content-Type", "application/pdf").send(pdfFileBuffer);

  } catch (error) {
    res.status(400).json({
      error: true,
      message: error?.message,
    });
  }
});

app.listen(3001, "", ()=> console.log(`Listening on port ${3001}`))