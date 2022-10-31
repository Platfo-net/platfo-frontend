FROM node:16 AS deps

#RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16 AS builder


WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG BASE_URL
ENV BASE_URL=${BASE_URL}

ARG FACEBOOK_ID
ENV FACEBOOK_ID=${FACEBOOK_ID}

ARG FACEBOOK_SECRET
ENV FACEBOOK_SECRET=${FACEBOOK_SECRET}

RUN yarn build

#FROM node:16 AS runner
FROM node:16
WORKDIR /app

ENV NODE_ENV production

ARG BASE_URL
ENV BASE_URL=${BASE_URL}

ARG FACEBOOK_ID
ENV FACEBOOK_ID=${FACEBOOK_ID}

#
#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js

#USER nextjs

EXPOSE 3003

CMD ["yarn", "start"]