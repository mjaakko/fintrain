//This method adds "actual times" to timetable rows which have been passed, but do not have actual time published yet
//Latest live estimate is used for "actual time"
const fixMissingActualTimes = timetableRows => {
  let maxPassed = -1;
  for (let i = timetableRows.length - 1; i >= 0; i--) {
    const timetableRow = timetableRows[i];
    if (timetableRow.actualTime && i > maxPassed) {
      maxPassed = i;
    }
    if (!timetableRow.actualTime && i < maxPassed) {
      timetableRow.actualTime = timetableRow.liveEstimateTime;
    }
  }

  return timetableRows;
};

export default fixMissingActualTimes;
