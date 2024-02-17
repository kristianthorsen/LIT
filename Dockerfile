FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS install
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN corepack install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm deploy --filter=case-iot-api dev/api
RUN pnpm deploy --filter=case-iot-async-api dev/async_api

FROM base AS async-api
COPY --from=install /usr/src/app/dev/async_api /services/async_api
WORKDIR /services/async_api

FROM base AS api
COPY --from=install /usr/src/app/dev/api /services/api
WORKDIR /services/api
