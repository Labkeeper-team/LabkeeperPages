// Local static preview with the same extensionless article URLs as nginx.
const https = require('node:https');
const fs = require('node:fs/promises');
const { mkdtempSync, readFileSync, unlinkSync, rmdirSync } = require('node:fs');
const { execFileSync } = require('node:child_process');
const { tmpdir } = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '../src');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };

// Production CSP upgrades HTTP resources in WebKit. Use HTTPS locally too,
// with an ephemeral certificate rather than weakening the site's policy.
const certificateDir = mkdtempSync(path.join(tmpdir(), 'labkeeper-blog-tls-'));
const keyPath = path.join(certificateDir, 'key.pem');
const certPath = path.join(certificateDir, 'cert.pem');
execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes',
    '-keyout', keyPath, '-out', certPath, '-days', '1', '-subj', '/CN=localhost',
    '-addext', 'subjectAltName=DNS:localhost,IP:127.0.0.1'], { stdio: 'ignore' });
const tls = { key: readFileSync(keyPath), cert: readFileSync(certPath) };
unlinkSync(keyPath);
unlinkSync(certPath);
rmdirSync(certificateDir);

https.createServer(tls, async (request, response) => {
    try {
        const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
        const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
        if (!file.startsWith(root + path.sep)) {
            response.writeHead(403).end();
            return;
        }
        const resolved = path.extname(file) ? file : `${file}.html`;
        const data = await fs.readFile(resolved);
        response.writeHead(200, { 'Content-Type': types[path.extname(resolved)] || 'application/octet-stream' });
        response.end(data);
    } catch {
        response.writeHead(404).end('Not found');
    }
}).listen(8761, '127.0.0.1');
