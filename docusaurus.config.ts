import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const config: Config = {
  title: 'Orca',
  tagline: 'Stream data to AI in days, not Months',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://orc-a.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'orc-analytics', // Usually your GitHub org/user name.
  projectName: 'orca', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'], //, 'fr', 'es'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB'
      }
    }
  },

  onBrokenAnchors:'warn',

  headTags: [
    // Structured data for Organization
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Organization',
        name: 'Orca',
        url: 'https://orc-a.io',
        logo: 'https://orc-a.io/img/logo.svg',
        description: 'Stream data to AI in days, not Months. Build Analytics on Realtime Data, Fast, with Orca.',
        sameAs: [
          'https://github.com/orc-analytics/orca',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Open Source Support',
          url: 'https://github.com/orc-analytics/orca/issues',
        },
      }),
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/orc-analytics/docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/orc-analytics/docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html', 'htm'], // /myPage.html -> /myPage
        toExtensions: ['exe', 'zip'], // /myAsset -> /myAsset.zip (if latter exists)
        redirects: [
          {
            from: '/docs',
            to: '/docs/quickstart',
          },
          {
            from: '/docs/sdks',
            to: '/docs/category/sdks',
          },
        ],
      },
    ],
  ],

themeConfig: {
    // Social card image
    image: 'img/orca-social-card.jpeg',
    // Global metadata for SEO
    metadata: [
      {name: 'keywords', content: 'orca, real-time analytics, time series data, data analytics, AI platform, stream processing, algorithm orchestration, timeseries analytics, IoT analytics, data pipeline'},
      {name: 'author', content: 'Orca Analytics'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@orcanalytics'},
      {name: 'twitter:creator', content: '@orcanalytics'},
      {name: 'og:type', content: 'website'},
      {name: 'og:site_name', content: 'Orca Documentation'},
      {name: 'theme-color', content: '#1c1e21'},
    ],
    // Smooth transitions for theme switching
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Orca',
      hideOnScroll: true, // hides navbar when scrolling down
      logo: {
        alt: 'Orca Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        {to: '/roadmap', label: 'Roadmap', position: 'left'},
        {
          href: 'https://github.com/orc-analytics/orca',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },

    footer: {
      style: 'light', // Uses our custom.css borders instead of Docusaurus's default gray
      links: [
        {
          title: 'Resources',
          items: [
            { label: 'Docs', to: '/docs/quickstart' },
            { label: 'GitHub', href: 'https://github.com/orc-analytics/orca' },
          ],
        },
        {
          title: 'Legal',
          items: [
            { label: 'Privacy', to: '/privacy' },
            { label: 'Terms', to: '/terms' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Orca.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
