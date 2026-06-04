# Next.js 15+ Boilerplate

A modern, production-ready Next.js 15+ template featuring React.js, Ant Design, Tailwind
CSS, Redux Toolkit and TypeScript for building scalable web applications.

## Getting Started

Commands, to exciting & controlling application:

```bash
npm run dev # start dev server
npm run build # application production build
npm run start # start production server
npm run pretty # formatting source code
npm run lint # code linting check
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

You can start editing the page by modifying `src/app/(root)/page.tsx`. The page auto-updates as you edit the file.

## Features

- ⚡️ Next.js 15+ with App Router
- 🎨 Ant Design v5 with custom theme
- 🔄 Redux Toolkit for state management
- 📝 Form handling with Formik & Yup
- 🔒 JWT Authentication
- 🎯 Type-safe development
- 🎨 Tailwind CSS for utility-first styling

## Project Structure

```plaintext
next-template/
├── public/                    # Static files
│   ├── images/                # Path to store images
│   ├── fonts/                 # Path to store fonts
│   ├── cnd/                   # Path to store cdn
├── src/
│   ├── app/                   # Next.js APP directory
│   │   ├── api/               # Next.js API directory
│   │   ├── (root)/page.tsx    # Next.js app home page
│   │   ├── layout.tsx         # Next.js app layout component
│   │   ├── error.tsx          # Next.js error handler component
│   │   ├── not-found.tsx      # Next.js app route not found (404) component
│   │   ├── globals.css        # Next.js app main css file
│   │   ├── route-one/page.tsx # Other page file
│   │   └── add-more-folder-to-more-page...
│   ├── components/            # React components
│   │   ├── common/            # Commons components like theme, redux config etc.
│   │   ├── layout/            # Page structure components
│   │   ├── shared/            # Shared reusable components
│   │   ├── feature-1/         # Others features based components
│   │   └── feature-2/ ...     # Others features based components
│   ├── data/                  # Path to store static like JSON etc.
│   ├── hooks/                 # React custom hooks
│   ├── store/                 # Redux store configuration
│   │   ├── slices/            # Redux toolkit slices
│   │   └── index.ts           # Redux configurable store file
│   ├── types/                 # TypeScript custom types store path
│   └── utils/                 # Utility functions
├── .env.local                 # Development environment variables file
├── .env.example               # Example environment variables file
├── next.config.ts             # Next.js configurable file
├── package.json               # Fundamental file in Node.js projects
├── package-lock.json          # Packages lock file in Node.js projects
└── tsconfig.json              # File is a configuration file used by the TypeScript compiler
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# APPLICATION VARIABLE
APP_NAME = "your_app_name"
API_BASE_URL = "api_base_url"
API_SUFFIX_URL = "api_suffix_url"

# GOOGLE RE-CAPTCHA v3 to make here: https://www.google.com/recaptcha/admin
CAPTCHA_SITE_KEY = "google_captcha_v3_site_key"
CAPTCHA_SECRET_KEY = "google_captcha_v3_secret_key"
```

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [React.js Documentation](https://react.dev/reference/react) - Learn about React features and API.
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - Learn about TypeScript and its features.
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started) - Learn about Redux Toolkit for state management.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation/framework-guides/nextjs) - Learn about Tailwind CSS utility-first framework.
- [Ant Design Documentation](https://ant.design/docs/react/introduce) - Learn about Ant Design components and features.

<p align='center'>
  Made with ❤️ By <a href="https://siliconorchard.com">Silicon Orchard Ltd.</a>
</p>
# Glamora-ecom
