import React, { useEffect } from 'react';
import { PROFILE } from '../data/portfolioData';
import { Project, ThemeMode } from '../types/portfolio';

interface SeoHeadProps {
  theme: ThemeMode;
  activeProject: Project | null;
}

const DEFAULT_TITLE = 'Midusa — Software Engineer & Builder';
const DEFAULT_DESCRIPTION =
  'Explore the journey, full-stack web projects, and software engineering mindset of Midusa, a Computer Science student from Kenya.';
const DEFAULT_IMAGE = '/og-image.jpg';
const DEFAULT_IMAGE_ALT =
  'Midusa portfolio preview showing an optical glass prism refracting DodgerBlue light across dark stone';

function upsertMetaTag(
  selectorAttr: 'name' | 'property',
  attrValue: string,
  content: string
) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${selectorAttr}="${attrValue}"]`
  );
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(selectorAttr, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertJsonLd(data: Record<string, unknown>) {
  let script = document.head.querySelector<HTMLScriptElement>(
    'script#midusa-seo-jsonld[type="application/ld+json"]'
  );
  if (!script) {
    script = document.createElement('script');
    script.id = 'midusa-seo-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export const SeoHead: React.FC<SeoHeadProps> = ({ theme, activeProject }) => {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${window.location.pathname}`;

    const title = activeProject
      ? `${activeProject.title} — Midusa`
      : DEFAULT_TITLE;
    const description = activeProject ? activeProject.summary : DEFAULT_DESCRIPTION;
    const imagePath = activeProject ? activeProject.image : DEFAULT_IMAGE;
    const imageAlt = activeProject ? activeProject.imageAlt : DEFAULT_IMAGE_ALT;
    const absoluteImageUrl = new URL(imagePath, origin).toString();
    const themeColor = theme === 'dark' ? '#0B0D10' : '#FFFFFF';

    document.title = title;
    upsertCanonicalLink(canonicalUrl);

    upsertMetaTag('name', 'description', description);
    upsertMetaTag('name', 'theme-color', themeColor);

    upsertMetaTag('property', 'og:type', activeProject ? 'article' : 'website');
    upsertMetaTag('property', 'og:site_name', PROFILE.name);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:image', absoluteImageUrl);
    upsertMetaTag('property', 'og:image:secure_url', absoluteImageUrl);
    upsertMetaTag('property', 'og:image:alt', imageAlt);

    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', absoluteImageUrl);
    upsertMetaTag('name', 'twitter:image:alt', imageAlt);

    if (activeProject) {
      upsertJsonLd({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: activeProject.title,
        description: activeProject.summary,
        image: absoluteImageUrl,
        url: activeProject.liveUrl || canonicalUrl,
        author: {
          '@type': 'Person',
          name: PROFILE.name,
          url: PROFILE.github,
        },
      });
    } else {
      upsertJsonLd({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: canonicalUrl,
        mainEntity: {
          '@type': 'Person',
          name: PROFILE.name,
          jobTitle: 'Junior Software Engineer & Computer Science Student',
          email: `mailto:${PROFILE.email}`,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'KE',
          },
          sameAs: [
            PROFILE.github,
            PROFILE.linkedin,
            'https://www.midusaelibary.co.ke',
          ],
        },
      });
    }
  }, [theme, activeProject]);

  return null;
};
