/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
    title: '在线文档', // Title for your website.
    tagline: 'KubeOperator 在线文档',
    url: 'https://docs.kubeoperator.io', // Your website URL
    baseUrl: '/', // Base URL for your project */
    // For github.io type URLs, you would set the url and baseUrl like:
    //   url: 'https://facebook.github.io',
    //   baseUrl: '/test-site/',

    cname: 'docs.kubeoperator.io',

    // Used for publishing and more
    projectName: 'docs',
    organizationName: 'FIT2CLOUD 飞致云',
    // For top-level user or org sites, the organization is still the same.
    // e.g., for the https://JoelMarcey.github.io site, it would be set like...
    //   organizationName: 'JoelMarcey'

    docsUrl: '',

    //GA settings
    gaTrackingId: 'UA-147297392-1',
    gaGtag: true,
    
    // enable scroll to top button
    scrollToTop:true,

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks: [
        {href: 'https://kubeoperator.io',label: '网站',external: true},
        {href: 'https://github.com/KubeOperator/KubeOperator',label: 'GitHub',external: true},
        {search:true}
    ],

    /* path to images for header/footer */
    headerIcon: 'img/kubeoperator-white.png',
    favicon: 'img/favicon.png',

    /* Colors for website */
    colors: {
        primaryColor: '#000000',
        secondaryColor: '#3cc68a',
    },

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: 'default',
    },

    // Add custom scripts here that would be placed in <script> tags.
    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
        '/js/code-block-buttons.js',
    ],

    algolia: {
        apiKey: '478e01143cbab954ebdc8ad0a654ffa3',
        indexName: 'kubeoperator',
        placeholder: '搜索',
        algoliaOptions: {} // Optional, if provided by Algolia
      },

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    // No .html extensions for paths.
    cleanUrl: true,

    // Collapsible Categories
    docsSideNavCollapsible: true,

    //base url for edit button
    //editUrl: 'https://github.com/KubeOperator/docs/edit/master/docs/',

    // Show documentation's last update time.
    enableUpdateTime: true,
};

module.exports = siteConfig;
