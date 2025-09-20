import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {res.send({title: 'GET all subscriptions'})});

subscriptionRouter.get("/:id", () => {});

subscriptionRouter.post("/", () => {});

subscriptionRouter.put("/:id", () => {});

subscriptionRouter.delete("/:id", () => {});

subscriptionRouter.get("/user/:id", () => {});

subscriptionRouter.put("/:id/cancel", () => {});

subscriptionRouter.get("/upcoming-renewals", () => {});

export default subscriptionRouter;
