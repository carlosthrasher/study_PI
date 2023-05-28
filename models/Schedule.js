const mongoose = require("../db/conn");

const ScheduleSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },

    subjects: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          required: true,
          enum: ["easy", "medium", "difficult"],
        },
        time: {
          type: Number,
          required: true,
        },
      },
    ],
    availableTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
