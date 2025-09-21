import dayjs from "dayjs";
import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
    });

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (err) {
    next(err);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (err) {
    next(err);
  }
};

export const getSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    // check if the user is the same as the one in the token
    if (req.user.id.toString() !== subscription.user.toString()) {
      const error = new Error("You are not the owner of this subscription");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (err) {
    next(err);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { name, startDate, renewalDate, price, currency, frequency, status } =
      req.body;
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    // check if the user is the same as the one in the token
    if (req.user.id.toString() !== subscription.user.toString()) {
      const error = new Error("You are not the owner of this subscription");
      error.statusCode = 401;
      throw error;
    }

    // Update only provided fields
    if (name !== undefined) subscription.name = name;
    if (startDate !== undefined) subscription.startDate = startDate;
    if (renewalDate !== undefined) subscription.renewalDate = renewalDate;
    if (price !== undefined) subscription.price = price;
    if (currency !== undefined) subscription.currency = currency;
    if (frequency !== undefined) subscription.frequency = frequency;
    if (status !== undefined) subscription.status = status;

    await subscription.save();

    res.status(200).json({ success: true, data: subscription });
  } catch (err) {
    next(err);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    // check if the user is the same as the one in the token
    if (req.user.id.toString() !== subscription.user.toString()) {
      const error = new Error("You are not the owner of this subscription");
      error.statusCode = 401;
      throw error;
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: subscription });
  } catch (err) {
    next(err);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const daysAhead = parseInt(req.query.days) || 7;

    const now = dayjs();
    const last = now.add(daysAhead, "day");

    const subscriptions = await Subscription.find({
      user: req.user._id,
      status: "active",
      renewalDate: {
        $gte: now.toDate(),
        $lte: last.toDate(),
      },
    }).sort({ renewalDate: 1 });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (err) {
    next(err);
  }
};
