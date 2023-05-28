const Schedule = require("../models/Schedule");
const jwt = require("jsonwebtoken");

exports.generateSchedule = async (req, res) => {
  const { scheduleName, subjects, availableTime } = req.body;
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Remove existing schedules with the same name
  await Schedule.deleteMany({ userId: req.user._id, name: scheduleName });

  // Generate a new schedule
  for (let i = 0; i < weekDays.length; i++) {
    const daySubjects = [];
    let dayAvailableTime = availableTime;

    // Add existing subjects to schedule
    for (let j = 0; j < subjects.length; j++) {
      let subjectTime =
        subjects[j].level === "difficult"
          ? 0.5 * availableTime
          : subjects[j].level === "medium"
          ? 0.3 * availableTime
          : subjects[j].level === "easy"
          ? 0.2 * availableTime
          : 0;
      if (
        (subjects[j].level === "difficult" &&
          dayAvailableTime >= subjectTime) ||
        (subjects[j].level === "medium" && dayAvailableTime >= subjectTime) ||
        (subjects[j].level === "easy" && dayAvailableTime >= subjectTime)
      ) {
        daySubjects.push({
          name: subjects[j].name,
          level: subjects[j].level,
          time: subjectTime,
        });
        dayAvailableTime -= subjectTime;
      }
    }

    const schedule = new Schedule({
      userId: req.user._id,
      name: scheduleName,
      day: weekDays[i],
      subjects: daySubjects,
      availableTime: dayAvailableTime,
    });

    await schedule.save();
  }
  res.send({ success: true });
};

module.exports.getAllSchedules = async (req, res) => {
    const schedules = await Schedule.find({ userId: req.user._id });
    res.send(schedules);
};

exports.addSubject = async (req, res) => {
  // New subject to be added
  const { scheduleName, newSubject } = req.body;

  // Find the schedule
  const schedules = await Schedule.find({
    userId: req.user._id,
    name: scheduleName,
  });

  // Add the new subject to each day of the schedule
  for (let i = 0; i < schedules.length; i++) {
    schedules[i].subjects.push(newSubject);
    await schedules[i].save();
  }

  // Regenerate schedule
  await this.generateSchedule(req, res);
};

exports.deleteSubject = async (req, res) => {
  const { scheduleName, subjectName } = req.body;

  // Find the schedule
  const schedules = await Schedule.find({
    userId: req.user._id,
    name: scheduleName,
  });

  // Delete the subject from each day of the schedule
  for (let i = 0; i < schedules.length; i++) {
    schedules[i].subjects = schedules[i].subjects.filter(
      (subject) => subject.name !== subjectName
    );
    await schedules[i].save();
  }

  // Regenerate schedule
  await this.generateSchedule(req, res);
};

exports.updateSubject = async (req, res) => {
  const { scheduleName, subjectName, newSubject } = req.body;

  // Find the schedule
  const schedules = await Schedule.find({
    userId: req.user._id,
    name: scheduleName,
  });

  // Update the subject in each day of the schedule
  for (let i = 0; i < schedules.length; i++) {
    for (let j = 0; j < schedules[i].subjects.length; j++) {
      if (schedules[i].subjects[j].name === subjectName) {
        schedules[i].subjects[j] = newSubject;
        await schedules[i].save();
      }
    }
  }

  // Regenerate schedule
  await this.generateSchedule(req, res);
};

exports.updateAvailableTime = async (req, res) => {
  const { scheduleName, newAvailableTime } = req.body;

  // Find the schedule
  const schedules = await Schedule.find({
    userId: req.user._id,
    name: scheduleName,
  });

  // Update the available time in each day of the schedule
  for (let i = 0; i < schedules.length; i++) {
    schedules[i].availableTime = newAvailableTime;
    await schedules[i].save();
  }

  // Regenerate schedule
  await this.generateSchedule(req, res);
};
