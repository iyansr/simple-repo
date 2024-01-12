import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export const GET = (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  req.nextUrl.host;
  const token = params.get('token') || '';
  const redirectPath = params.get('redirectPath') || '/';

  cookies().set({
    name: '__token',
    value: token,
    maxAge: 1000 * 60 * 60 * 7,
    httpOnly: true,
  });

  redirect(redirectPath);
};
