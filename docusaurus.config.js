// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The CUDA Cache',
  tagline: 'Quick Architecture-level reference for CUDA kernel developers',
  favicon: 'img/favicon.ico',

  // Set to your GitHub Pages URL after deployment
  url: 'https://kayzee3327.github.io',
  baseUrl: '/the-cuda-cache/',

  organizationName: 'kayzee3327', // GitHub org or username
  projectName: 'the-cuda-cache',     // GitHub repo name
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',           // Serve docs at site root (no /docs/ prefix)
          editUrl:
            'https://github.com/kayzee3327/the-cuda-cache/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Optional: change this to 'notes' or 'logs' if you prefer
          path: 'blog',
          routeBasePath: 'blog', 
          blogTitle: 'GPU Blogs & Notes',
          blogDescription: 'In-depth research, technical notes, and curated resources on GPU hardware architecture (computing units, global memory, L1/L2 cache, shared memory, async copy mechanisms and more), compute performance, and silicon design.',
          postsPerPage: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'The CUDA Cache',
        logo: {
          alt: 'The CUDA Cache',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'gpuKnowledgeBase',
            position: 'left',
            label: 'Knowledge Base',
          },
          { to: '/blog', label: 'Blogs', position: 'left' },
          {
            href: 'https://github.com/kayzee3327/the-cuda-cache',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Quick Reference',
          //   items: [
          //     { label: 'Introduction', to: '/' },
          //     { label: 'Memory Hierarchy', to: '/memory-overview' },
          //     { label: 'Ampere Architecture', to: '/ampere' },
          //     { label: 'Bank Conflicts', to: '/shared-memory-bank-conflicts' },
          //   ],
          //   items: [
          //     // Assuming intro.md becomes the root
          //     { label: 'Introduction', to: '/01-foundations/intro' }, 
          //     { label: 'Memory Hierarchy', to: '/02-memory-hierarchy/overview' },
          //     { label: 'Ampere Architecture', to: '/04-architecture/ampere/ampere' },
          //     { label: 'Bank Conflicts', to: '/05-optimization/bank-conflicts/shared-memory-bank-conflicts' },
          //   ],
          // },
          // {
          //   title: 'External Resources',
          //   items: [
          //     {
          //       label: 'CUDA C++ Programming Guide',
          //       href: 'https://docs.nvidia.com/cuda/cuda-c-programming-guide/',
          //     },
          //     {
          //       label: 'PTX ISA Reference',
          //       href: 'https://docs.nvidia.com/cuda/parallel-thread-execution/',
          //     },
          //     {
          //       label: 'Nsight Compute Documentation',
          //       href: 'https://docs.nvidia.com/nsight-compute/',
          //     },
          //     {
          //       label: 'CUTLASS',
          //       href: 'https://github.com/NVIDIA/cutlass',
          //     },
          //   ],
          // },
          // {
          //   title: 'Legal',
          //   items: [
          //     {
          //       label: 'License (CC BY-SA 4.0)',
          //       href: 'https://creativecommons.org/licenses/by-sa/4.0/',
          //     },
          //   ],
          // },
        ],
        // copyright: `
        //   <div style="margin-bottom: 10px;">
        //     <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">
        //       <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />
        //     </a>
        //   </div>
        //   This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" style="color: var(--ifm-footer-link-color); text-decoration: underline;">CC BY-SA 4.0 License</a>.<br/>
        //   Copyright © ${new Date().getFullYear()} kayzee3327. Built with Docusaurus.
        // `,
        copyright: `
          This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" style="color: var(--ifm-footer-link-color); text-decoration: underline;">CC BY-SA 4.0 License</a>.<br/>
          Copyright © ${new Date().getFullYear()} Kaize Wang. Built with Docusaurus.
        `,
      },
      prism: {
        theme: themes.vsLight,
        darkTheme: themes.vsDark,
        additionalLanguages: ['bash', 'cpp', 'nasm'],
      },
      // Enable dark mode by default — suits a developer-focused KB
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
