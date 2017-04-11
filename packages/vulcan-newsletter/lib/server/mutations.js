import Newsletters from "../modules/collection.js";
import Users from 'meteor/vulcan:users';
import { GraphQLSchema, Utils } from 'meteor/vulcan:core';

GraphQLSchema.addMutation('sendNewsletter : JSON');
GraphQLSchema.addMutation('testNewsletter : JSON');
GraphQLSchema.addMutation('addUserNewsletter(userId: String) : JSON');
GraphQLSchema.addMutation('addEmailNewsletter(email: String) : JSON');
GraphQLSchema.addMutation('removeUserNewsletter(userId: String) : JSON');

const resolver = {
  Mutation: {
    sendNewsletter(root, args, context) {
      if(context.currentUser && Users.isAdminById(context.currentUser._id)) {
        return Newsletters.send();
      } else {
        throw new Error(Utils.encodeIntlError({id: "app.noPermission"}));
      }
    },
    testNewsletter(root, args, context) {
      if(context.currentUser && Users.isAdminById(context.currentUser._id)) 
        return Newsletters.send(true);
    },
    addUserNewsletter(root, args, context) {

      const currentUser = context.currentUser;
      const user = Users.findOne({_id: args.userId});
      if (!user || !Users.options.mutations.edit.check(currentUser, user)) {
        throw new Error(Utils.encodeIntlError({id: "app.noPermission"}));
      }
      try {
        return Newsletters.subscribe(user, false);
      } catch (error) {
        const errorMessage = error.message.includes('subscription-failed') ? Utils.encodeIntlError({id: "newsletter.subscription_failed"}) : error.message
        throw new Error(errorMessage);
      }
    },
    addEmailNewsletter(root, args, context) {
      const email = args.email;
      try {
        return Newsletters.subscribe(email, true);
      } catch (error) {
        const errorMessage = error.message.includes('subscription-failed') ? Utils.encodeIntlError({id: "newsletter.subscription_failed"}) : error.message
        throw new Error(errorMessage);
      }
    },
    removeUserNewsletter(root, { userId }, context) {
      const currentUser = context.currentUser;
      const user = Users.findOne({_id: userId});
      if (!user || !Users.options.mutations.edit.check(currentUser, user)) {
        throw new Error(Utils.encodeIntlError({id: "app.noPermission"}));
      }
      
      try {
        return Newsletters.unsubscribe(user);
      } catch (error) {
        const errorMessage = error.message.includes('subscription-failed') ? Utils.encodeIntlError({id: "newsletter.subscription_failed"}) : error.message
        throw new Error(errorMessage);
      }
    },
  },
};
GraphQLSchema.addResolvers(resolver);