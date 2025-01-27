This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
Clone the repo locally:
```bash
git clone https://github.com/ski043/job-marshal-finale-locale.git --depth 1 && cd job-marshal-finale-locale
```

Create your .env file:
```bash
cp env.txt .env
```
setup your database and other environmental variables

Install dependecies:
```bash
npm i
```
Then migrate your database:
```bash
npx prisma migrate dev
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
And on a diffrent tab:
```bash
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Screenshots:

[job_posting_page](images/image.png)

[dashboard](images/image%20copy.png)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
