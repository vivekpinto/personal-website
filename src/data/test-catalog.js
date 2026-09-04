export const testCatalog = [
  {
    category: 'Navigation',
    description:
      'Verifies that visitors can navigate through the main sections of the portfolio.',
    tests: [
      {
        name: 'Home navigation',
        automated: true,
      },
      {
        name: 'Experience navigation',
        automated: true,
      },
      {
        name: 'Projects navigation',
        automated: true,
      },
      {
        name: 'Contact navigation',
        automated: false,
      },
      {
        name: 'Resume navigation',
        automated: false,
      },
    ],
  },

  {
    category: 'Experience',
    description:
      'Verifies that professional experience information is displayed correctly.',
    tests: [
      {
        name: 'Experience section is visible',
        automated: true,
      },
      {
        name: 'Experience heading is displayed',
        automated: true,
      },
      {
        name: 'Experience content is available',
        automated: false,
      },
    ],
  },

  {
    category: 'Projects',
    description:
      'Verifies that project information and project links are available.',
    tests: [
      {
        name: 'Projects section is visible',
        automated: true,
      },
      {
        name: 'Project cards are displayed',
        automated: true,
      },
      {
        name: 'Project titles are displayed',
        automated: false,
      },
      {
        name: 'Project links are available',
        automated: false,
      },
    ],
  },

  {
    category: 'Resume',
    description:
      'Verifies that visitors can access the resume.',
    tests: [
      {
        name: 'Resume link is visible',
        automated: false,
      },
      {
        name: 'Resume has the correct accessible name',
        automated: false,
      },
    ],
  },

  {
    category: 'External Links',
    description:
      'Verifies that important external links are reachable.',
    tests: [
      {
        name: 'GitHub link',
        automated: false,
      },
      {
        name: 'LinkedIn link',
        automated: false,
      },
      {
        name: 'Email link',
        automated: false,
      },
    ],
  },
];