import { NextResponse } from 'next/server';

export interface ApiResponseParams {
  statusCode: number;
  title: 'SUCCESS' | 'INFO' | 'ERROR';
  message: string;
  myData: unknown;
}

export default function ApiResponse({ statusCode, title, message, myData }: ApiResponseParams) {
  return NextResponse.json({ title, message, data: myData }, { status: statusCode });
}
