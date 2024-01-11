import { NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.redirect(`${process.env.API_URL}/auth/github`);
};
