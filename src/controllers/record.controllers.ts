import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

import prisma from "../db/prismaClient.js";
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

    res.status(201).json({ message: "Record added successfully", record });
  },
);

export const getHealthRecord = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const record = await prisma.records.findUnique({
      where: { id: req.params.id },
    });

    if (!record) {
      throw new ApiError(404, "Record not found");
    }

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
