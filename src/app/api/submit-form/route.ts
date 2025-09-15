import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'Form Responses'; // You can change this to your preferred sheet name

// Initialize Google Sheets API
async function getGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    const { fullName, phone, countryCode, email, lookingFor, yearsOfExperience, candidateInterest } = body;

    // Validate required fields
    if (!fullName || !phone || !countryCode || !email || !lookingFor || !yearsOfExperience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!SPREADSHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets configuration:', {
        hasSpreadsheetId: !!SPREADSHEET_ID,
        hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY
      });
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const sheets = await getGoogleSheets();

    // Prepare the row data
    const rowData = [
      new Date().toISOString(), // Timestamp
      fullName,
      `${countryCode} ${phone}`, // Combined country code and phone
      email,
      lookingFor,
      yearsOfExperience,
      candidateInterest || '', // Empty string if not provided
    ];

    // Check if sheet exists, if not create it
    try {
      await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
        ranges: [SHEET_NAME],
      });
    } catch (error) {
      // Sheet doesn't exist, create it
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: SHEET_NAME,
                },
              },
            },
          ],
        },
      });

      // Add headers to the new sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:G1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [
            [
              'Timestamp',
              'Full Name',
              'Phone',
              'Email',
              'Looking For',
              'Years of Experience',
              'Area of Interest',
            ],
          ],
        },
      });
    }

    // Append the new row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json(
      { message: 'Form submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
