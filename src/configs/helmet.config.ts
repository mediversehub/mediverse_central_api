import { HelmetOptions } from 'helmet';

const helmetConfig: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      'default-src': ["'self'"], // Allow resources only from the same origin
      'script-src': ["'self'"], // Allow inline scripts (risky, use only if needed)
      'style-src': ["'self'"], // Allow inline styles (same as above)
      'img-src': ["'self'", 'data:'], // Allow images from same origin and inline base64
      'font-src': ["'self'"], // Allow fonts only from same origin
      'connect-src': ["'self'"], // Limit fetch/XHR/WebSocket connections
      'object-src': ["'none'"], // Disallow Flash and other plugins completely
      'form-action': ["'self'"], // Only allow forms to submit to same origin
    },
  },

  // Disable DNS prefetching for privacy
  dnsPrefetchControl: { allow: false },

  // Prevent clickjacking by disallowing the site from being embedded in iframes
  frameguard: { action: 'deny' },

  // Hide the `X-Powered-By` header to obscure Express tech stack
  hidePoweredBy: true,

  // Enforce HTTPS via Strict-Transport-Security header
  hsts: {
    maxAge: 31536000, // Cache the HTTPS policy for 1 year
    includeSubDomains: true, // Apply to subdomains as well
    preload: true, // Allow domain to be included in browser preload lists
  },

  // Prevent Internet Explorer from executing downloads in the context of your site
  ieNoOpen: true,

  // Prevent the browser from trying to guess ("sniff") the content type
  noSniff: true,

  // Enable XSS protection in older browsers
  xssFilter: true,
};

export default helmetConfig;
