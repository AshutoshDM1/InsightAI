import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';

const customCors = (allowedOrigins: string[]) => {
  return async (c: Context, next: () => Promise<void>) => {
    const origin = c.req.header('Origin');
    if (origin && allowedOrigins.includes(origin)) {
      c.header('Access-Control-Allow-Origin', origin);
      c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      c.header('Access-Control-Allow-Credentials', 'true');
    }
    if (c.req.method === 'OPTIONS') {
      return c.text("", 204 as ContentfulStatusCode);
    }
    await next();
  };
};

export { customCors };