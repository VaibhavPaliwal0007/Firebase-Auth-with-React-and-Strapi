'use strict';

/**
 * user-registration service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-registration.user-registration');
