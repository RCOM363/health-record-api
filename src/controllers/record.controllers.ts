import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

import prisma from "../db/prismaClient.js";
import redis from "../db/redisClient.js";
import { publishMessage } from "../queue/publisher.js";
import { broadcastMessage } from "../websocket/notificationServer.js";
import { sendHealthUpdates } from "../routes/sse.routes.js";
import { ApiError } from "../utils/ApiError.js";

export const createHealthRecord = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, age, status } = req.body;
    const record = await prisma.records.create({
      data: {
        name,
        age: Number(age),
        status,
      },
    });

    if (!record) {
      throw new ApiError(500, "Error while creating a record");
    }

    // add message to queue
    await publishMessage(`Added Record: ${record.id}`);

    // broadcast using websocket
    broadcastMessage(`Added Record: ${record.id}`);

    // stream using sse
    sendHealthUpdates(`Added Record: ${record.id}`);

    res.status(201).json({ message: "Record added successfully", record });
  },
);

export const getHealthRecord = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const cacheKey = `record:${req.params.id}`;

    let cacheEntry = await redis.get(cacheKey);

    // check if there is cache entry
    if (cacheEntry) {
      cacheEntry = JSON.parse(cacheEntry);
      res
        .status(200)
        .json({ message: "Record fetched successfully", cacheEntry });
      return;
    }

    const record = await prisma.records.findUnique({
      where: { id: req.params.id },
    });

    if (!record) {
      throw new ApiError(404, "Record not found");
    }

    await redis.set(cacheKey, JSON.stringify(record), {
      expiration: {
        type: "EX",
        value: 300, // TTL set to 5 min
      },
    });

    res.status(200).json({ message: "Record fetched successfully", record });
  },
);

export const updateHealthRecord = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const record = await prisma.records.findUnique({
      where: { id: req.params.id },
    });

    if (!record) {
      throw new ApiError(404, "Record not found");
    }

    const updatedRecord = await prisma.records.update({
      where: { id: req.params.id },
      data: req.body,
    });

    if (!updatedRecord) {
      throw new ApiError(500, "Something went wrong while updating the record");
    }

    // add message to queue
    await publishMessage(`Updated Record: ${updatedRecord.id}`);

    // broadcast using websocket
    broadcastMessage(`Updated Record: ${updatedRecord.id}`);

    // stream using sse
    sendHealthUpdates(`Updated Record: ${updatedRecord.id}`);

    res.status(200).json({ message: "Record updated successfully", record });
  },
);

export const deleteHealthRecord = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const record = await prisma.records.findUnique({
      where: { id: req.params.id },
    });

    if (!record) {
      throw new ApiError(404, "Record not found");
    }

    await prisma.records.delete({ where: { id: req.params.id } });

    res.status(204).json({ message: "Record deleted successfully" });
  },
);
