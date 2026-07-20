export const config = {
  matcher: '/course/:path*',
};

export default function middleware(request) {
  const user = process.env.COURSE_USER;
  const pass = process.env.COURSE_PASS;

  // Пока переменные не заданы в Vercel — не блокируем сайт, просто пропускаем.
  if (!user || !pass) return;

  const auth = request.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const sep = decoded.indexOf(':');
      const u = decoded.slice(0, sep);
      const p = decoded.slice(sep + 1);
      if (u === user && p === pass) return;
    }
  }

  return new Response('Требуется доступ к материалам курса', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Мастер-ИИ: доступ к курсу"' },
  });
}
