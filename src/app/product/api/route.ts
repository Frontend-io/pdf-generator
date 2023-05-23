import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(req: NextRequest) {
  try {
    const resBody = await req.json();
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();

    await page.setContent(resBody.html);
    await page.emulateMediaType("screen");
    
    const pdfFileBuffer = await page.pdf({
      format: "a5",
      printBackground: true,
    });

    /** Cleanup process */
    browser.close();
    return new Response(pdfFileBuffer, {
      status: 200,
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (error:any) {
    return NextResponse.json({
      error: true,
      message: error?.message,
    });
  }
}
