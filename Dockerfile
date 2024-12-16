# Note: --platform=linux/amd64 was added to avoid the error "exec format error" in AWS Fargate.
FROM --platform=linux/amd64  node:22-alpine AS server_build
WORKDIR /app
ENV NODE_ENV=production
COPY . .
RUN yarn install --frozen-lockfile --production=false --ignore-engines
RUN yarn run lint
RUN yarn run test
RUN yarn run build
RUN yarn install --production --frozen-lockfile --ignore-engines

FROM --platform=linux/amd64 node:22-alpine
WORKDIR /app
RUN yarn global add @nestjs/cli
RUN apk add --no-cache openssl sqlite-libs

COPY --from=server_build /app/apps/server/dist ./dist
COPY --from=server_build /app/node_modules ./node_modules
COPY --from=server_build /app/apps/server/package.json ./package.json
COPY --from=server_build /app/apps/client/dist ./client
COPY --from=server_build /app/apps/server/prisma/ ./prisma
COPY --from=server_build /app/apps/server/schema ./apps/schema
RUN npx prisma db push

RUN chown -R node:node /app
# Start the application
CMD ["node", "dist/main.js"]
