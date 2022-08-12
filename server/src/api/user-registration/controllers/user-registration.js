"use strict";

/**
 *  user-registration controller
 */

const admin = require("../../../../config/firebase-config.js");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::user-registration.user-registration",
  ({ strapi }) => ({
    async verifyToken(ctx) {
      try {
        const { token } = ctx.request.body;
        const decodedToken = await admin.auth().verifyIdToken(token);

        if(!decodedToken) {
            ctx.status = 401;
            ctx.body = {
                message: "Invalid token"
            }
            return ctx.badRequest(ctx.body);
        }

        ctx.send(decodedToken);
        console.log(decodedToken);

        // do stuff with your data
        // is user already existed or new 
        // if new then create new user
        // if already existed then login user

        const user = await admin.auth().getUser(decodedToken.uid);
        console.log(user);
        if(!user) {
            const newUser = await admin.auth().createUser({
                uid: decodedToken.uid,
                email: decodedToken.email,
                displayName: decodedToken.name,
                photoURL: decodedToken.picture,
            });
            console.log(newUser);
        }
      } catch (error) {
        ctx.send(error);
        console.log(error);
      }
    },
  })
);
