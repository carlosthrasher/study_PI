const User = require('../models/User');
const Schedule = require('../models/Schedule');

exports.generateSchedule = async (req, res) => {
    const user = await User.findById(req.user._id);
    const { subjects, availableTime } = user;
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Simple logic to divide the subjects in the week, refine it as you need
    for (let i = 0; i < weekDays.length; i++) {
        const daySubjects = [];
        const totalSubjects = subjects.length;
        
        for (let j = 0; j < totalSubjects; j++) {
            if ((subjects[j].level === 'difficult' && availableTime >= 0.5) ||
                (subjects[j].level === 'medium' && availableTime >= 0.3) ||
                (subjects[j].level === 'easy' && availableTime >= 0.2)) {
                daySubjects.push(subjects[j].name);
            }
        }
        
        const schedule = new Schedule({
            userId: user._id,
            day: weekDays[i],
            subjects: daySubjects
        });

        await schedule.save();
    }
    res.send({ success: true });
};

exports.getSchedule = async (req, res) => {
    const schedule = await Schedule.find({ userId: req.user._id });
    res.send(schedule);
};
