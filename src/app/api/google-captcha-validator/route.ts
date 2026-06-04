import ApiResponse from '@api/config/ApiResponse';
import { googleCaptcha } from '@api/config/validationSchema';
import axios from 'axios';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = googleCaptcha.safeParse(body);

    if (!validation?.success) {
      return ApiResponse({
        statusCode: 404,
        title: 'ERROR',
        message: 'Google reCAPTCHA v3 token is required',
        myData: validation?.error?.errors,
      });
    }

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${body?.token}`;

    const response = await axios.post(url);

    if (response?.data?.success) {
      return ApiResponse({
        statusCode: 200,
        title: 'SUCCESS',
        message: 'Google reCAPTCHA v3 token is valid (Human 👨👩)',
        myData: response?.data,
      });
    }

    return ApiResponse({
      statusCode: 400,
      title: 'ERROR',
      message: 'Google reCAPTCHA v3 token is invalid (Robot 🤖)',
      myData: response?.data,
    });
  } catch (error: unknown) {
    return ApiResponse({
      statusCode: 500,
      title: 'ERROR',
      message: error instanceof Error ? error?.message : 'Getting Server Side Error',
      myData: error,
    });
  }
}
