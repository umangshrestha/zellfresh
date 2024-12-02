FROM node:22-alpine AS server_build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --production=false --ignore-engines
RUN yarn run lint
RUN yarn run build
RUN yarn install --production --frozen-lockfile --ignore-engines

FROM node:22-alpine
WORKDIR /app
RUN yarn global add @nestjs/cli

COPY --from=server_build /app/apps/server/dist ./dist
COPY --from=server_build /app/node_modules ./node_modules
COPY --from=server_build /app/apps/server/package.json ./package.json
COPY --from=server_build /app/apps/client/dist ./client
COPY --from=server_build /app/apps/server/prisma/ ./prisma
RUN npx prisma db push

RUN mkdir schema
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser
USER root

EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
