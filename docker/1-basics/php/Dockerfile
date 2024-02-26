### php + pdo ###
# FROM php:8.1-fpm-alpine
FROM php:8.1-fpm-alpine as app

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extension /usr/local/bin/

RUN set -eux; \
    install-php-extensions pdo pdo_mysql;

# direct method
# RUN docker-php-ext-install pdo pdo_mysql

### composer ###
ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:2.4 /usr/bin/composer /usr/bin/composer

# for composer.json & composer.lock
COPY ./app/composer.* ./ 

RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

COPY ./app .

RUN composer dump-autoload --optimize

FROM app as app_dev

ENV XDEBUG_MODE=off

COPY ./php/conf.d/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini