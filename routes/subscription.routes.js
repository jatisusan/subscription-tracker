import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  getUpcomingRenewals,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

// get all subscriptions of logged-in user
subscriptionRouter.get("/", authorize, getUserSubscriptions);

// get subscription by id
subscriptionRouter.get("/:id", authorize, getSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

// update subscription, pause/resume, cancel
subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

export default subscriptionRouter;
