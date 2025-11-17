import React from 'react';
import { Link } from 'react-router-dom';

// Define the static workout split data
const workoutSplit = [
  { day: 'Day 1', focus: 'Push (Chest, Shoulders, Triceps)', exercises: 'Bench Press, Overhead Press, Lateral Raises, Tricep Pushdowns' },
  { day: 'Day 2', focus: 'Pull (Back, Biceps, Traps)', exercises: 'Deadlifts, Pull-ups, Barbell Rows, Bicep Curls' },
  { day: 'Day 3', focus: 'Legs (Quads, Hams, Calves)', exercises: 'Squats, Leg Press, Hamstring Curls, Calf Raises' },
  { day: 'Day 4', focus: 'Push (Upper Focus)', exercises: 'Incline Dumbbell Press, Dumbbell Shoulder Press, Face Pulls, Overhead Extensions' },
  { day: 'Day 5', focus: 'Pull (Lower Focus)', exercises: 'T-Bar Row, Seated Cable Row, Hammer Curls, Shrugs' },
  { day: 'Day 6', focus: 'Full Body / Active Recovery', exercises: 'Lighter Squats, Pushups, Cardio (30 mins), Core work' },
  { day: 'Day 7', focus: 'Rest', exercises: 'Complete rest and recovery. Prioritize sleep!' },
];

const RoutinePage = () => {
  return (
    <div className="content-page padded-section dark-bg">
      <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
      <h2 className="text-gradient">🏋️ Sample 6-Day Push/Pull/Legs Routine</h2>
      <p className="subtitle">
        A highly effective intermediate routine for strength and muscle growth. Remember to adjust sets and reps to fit your current strength level.
      </p>

      <div className="routine-table-container">
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Focus Area</th>
              <th>Key Exercises</th>
            </tr>
          </thead>
          <tbody>
            {workoutSplit.map((item, index) => (
              <tr key={index}>
                <td data-label="Day"><strong>{item.day}</strong></td>
                <td data-label="Focus">{item.focus}</td>
                <td data-label="Key Exercises">{item.exercises}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="routine-notes">
        <h3>Training Notes</h3>
        <p>• Aim for 3-4 sets of 8-12 reps for muscle gain (hypertrophy).</p>
        <p>• Warm up properly for 10 minutes before every session.</p>
        <p>• Log your weights in the dashboard to track progressive overload.</p>
      </div>
    </div>
  );
};

export default RoutinePage;