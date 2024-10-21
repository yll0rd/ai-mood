<h1 align="center" style="font-weight: bold;">AI-MOOD 💻</h1>

<p align="center">
<a href="#tech">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#colab">Collaborators</a>
<a href="#contribute">Contribute</a>
</p>

<p align="center">Simple description of what your project do or how to use it</p>

<p align="center">
<a href="https://github.com/ShaanCoding">📱 Visit this Project</a>
</p>

<h2 id="technologies">💻 Technologies</h2>

- NextJS
- Prisma
- ClerkJS
- LangChain
- Google Gen AI
- NeonDB

<h2 id="started">🚀 Getting started</h2>

How to run the project locally

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [NodeJS](https://nodejs.org/)
- [NextJS](https://github.com)
- [Prisma](https://www.prisma.io/orm)
- [Langchain](https://js.langchain.com/docs/)
- [NeonDB Account](https://neon.tech)
- [Google Gen AI Api Key](https://aistudio.google.com/)

<h3>Environment Setup</h3>

<ol>
<li>
Copy the `.env.example` to `.env` and fill in the required environment variables:

```bash
cp .env.example .env
```

</li>
<li>
If you have any environment variables specific to your local environment, copy .env.local.example to .env.local and set them up as well:

```bash

cp .env.local.example .env.local
```

Make sure to add your `GOOGLE_GEN_AI_API_KEY`, `DATABASE_URL` (from NeonDB), and any other required environment variables in the .env or .env.local files.
</li>
</ol>

<h3>Cloning</h3>

How to clone your project

```bash
git clone https://github.com/yll0rd/ai-mood.git
```

<h3>Installation</h3>

```bash
cd ai-mood
npm install
```

<h3>Prisma Setup</h3>

Once the repository is cloned, you need to generate Prisma Client and apply migrations:

<ol>
<li>
Push the Prisma schema to your NeonDB:

```bash
npx prisma db push
```

</li>
<li>
Generate the Prisma client:

```bash
npx prisma generate
```

</li>
</ol>
<h3>Starting</h3>

How to start your project

```bash
npm run dev
```

<h2 id="tests">⚙️ Running Tests</h2>

To run tests, run the following command

```bash
  npm run test
```

<h2 id="colab">🤝 Collaborators</h2>

<p>Special thank you for all people that contributed for this project.</p>
<table>
<tr>

<td align="center">
<a href="https://github.com/yll0rd">
<img src="https://avatars.githubusercontent.com/u/114886588?v=4 " width="100px;" alt="Youmbi leo Profile Picture"/><br>
<sub>
<b>Youmbi Leo</b>
</sub>
</a>
</td>

</tr>
</table>

<h2 id="contribute">📫 Contribute</h2>

Contributions are always welcome!

1. `git clone https://github.com/yll0rd/ai-mood.git`
2. `git checkout -b feature/NAME`
3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!

<h3>Documentations that might help</h3>

[📝 How to  set up Clerk with environment variables, including integrating it with React and Next.js.](https://clerk.com/docs/quickstarts/nextjs)

[📝 How to connect a Next.js application to Neon](https://neon.tech/docs/guides/nextjs)
