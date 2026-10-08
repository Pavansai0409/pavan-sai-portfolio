import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { portfolio } from './src/content/portfolio.ts';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-metadata',
      transformIndexHtml() {
        const { profile, meta, theme } = portfolio;
        const title = `${profile.name} — ${profile.role}`;
        const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${escapeHtml(theme.colors.ink)}"/><text x="32" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="30" fill="${escapeHtml(theme.colors.paper)}">${escapeHtml(profile.initials)}</text></svg>`;
        const tags = [
          { tag: 'title', children: title },
          { tag: 'meta', attrs: { name: 'description', content: meta.description } },
          { tag: 'meta', attrs: { name: 'theme-color', content: theme.colors.paper } },
          { tag: 'meta', attrs: { property: 'og:title', content: title } },
          { tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
          { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
          { tag: 'meta', attrs: { name: 'twitter:card', content: meta.socialImage ? 'summary_large_image' : 'summary' } },
          { tag: 'link', attrs: { rel: 'icon', href: `data:image/svg+xml,${encodeURIComponent(favicon)}` } },
          { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.fullName, jobTitle: profile.role, description: meta.description, sameAs: profile.socials.map(social => social.url), ...(meta.siteUrl ? { url: meta.siteUrl } : {}) }).replace(/</g, '\\u003c') },
        ];
        if (meta.siteUrl) {
          tags.push({ tag: 'link', attrs: { rel: 'canonical', href: meta.siteUrl } });
          tags.push({ tag: 'meta', attrs: { property: 'og:url', content: meta.siteUrl } });
        }
        if (meta.socialImage) tags.push({ tag: 'meta', attrs: { property: 'og:image', content: meta.socialImage } });
        return tags;
      },
    },
  ],
});
