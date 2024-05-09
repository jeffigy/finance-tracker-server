import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";
const router = express.Router();

router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const records = await FinancialRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("no records found for the user");
    }

    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newRecord = new FinancialRecordModel(data);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const record = await FinancialRecordModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!record) {
      return res.status(404).send();
    }
    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).send();
    }
    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
