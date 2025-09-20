import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "GET all subscriptions" });
});

subscriptionRouter.get("/:id", () => {});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", () => {});

subscriptionRouter.delete("/:id", () => {});

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", () => {});

subscriptionRouter.get("/upcoming-renewals", () => {});

export default subscriptionRouter;
