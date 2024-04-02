# Development

## Steps init development

1. Init Docker DB

```
docker-compose up -d
```

2. Config .env with postgres connect
3. Install dependencies

```
npm install
```

4. Init server, development

```
npm run dev
```

5. Executed SEED, [generate local data base](http://localhost:3000/api/api/seed)

## Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
