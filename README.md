<div align="left">
  <h1>:trollface: Confess</h1>
</div>

**Introducing Confess** - an anonymous message platform for free.(an alternative to Secreto / NglLink)

**Live Demo**
[Confess](https://confess.thp.my.id)

**Features**
- Creating user link.
- Get audience response
- Super simple user interface
- Goodby complicated js frontend, hello htmx
- Run on cloudflare worker, no need to pay for hosting (free plan)

**Tech Stack**
- Cloudflare worker (wrangler, "@tsndr/cloudflare-worker-router)
- Turso database (sqlite)
- Drizzle orm
- HTMX
- Uno css
- @kitajs/html for jsx templating

### Run the development server

You can start the server using these steps command:
- git clone `https://github.com/tarsisius/confess.git`
- create worker on cloudflare, get your account name, put it on wrangler.toml
- get turso db url & token, put it on [vars] wrangler.toml also on .env file
- generate database migrations `pnpm db:generate`, it will create `migrations` folder
- push database migrations `pnpm db:push`
- run `pnpm pre` to pre-compile uno css and dom js
- run `pnpm dev` to start worker development server


### Deployment
You can check the deployment guide wrangler deploy from cloudflare worker documentation


Open [http://localhost:8787](http://localhost:8787) with your browser to see the result. 