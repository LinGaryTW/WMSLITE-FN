#stage 1
FROM node:14.19 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/WMSLITE-FN /usr/share/nginx/html
COPY nginx.site.template /etc/nginx/conf.d/default.conf
CMD  exec nginx -g 'daemon off;'
