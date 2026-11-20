import "./StreakChip.scss";

function StreakChip({ streak }) {
  return (
    <p className="streak-chip">
      {streak > 0 ? (
        <>
          <span aria-hidden="true">🔥</span>
          <strong>
            {streak} {streak === 1 ? "day" : "days"} in a row
          </strong>
        </>
      ) : (
        <strong>A new streak starts today</strong>
      )}
    </p>
  );
}

export default StreakChip;