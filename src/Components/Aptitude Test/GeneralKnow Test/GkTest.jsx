import { useEffect, useState } from "react";
import styles from "./GkTest.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useScore } from "../../../Context/ScoreContext";



const GkTest = () => {

  const location = useLocation();
  const { selectedCollege, studentDetails } = location.state || {};
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1500);
  const { setScores } = useScore();
  const [loading, setLoading] = useState(true);



  const handleTestCompletion = () => {
    navigate("/test-completion", {
      state: {
        selectedCollege,
        studentDetails,
      },
    });
  }
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=20&category=9&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((q, index) => {
          const options = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * 4);
          options.splice(randomIndex, 0, q.correct_answer);
          return {
            id: index,
            question: q.question,
            options,
            correct: q.correct_answer,
          };
        });
        setQuestions(formatted);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleOptionChange = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = () => {
    if (submitted) return;

    let newScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) newScore++;
    });
    setScore(newScore);
    setSubmitted(true);

    setScores(prev => ({ ...prev, GkTest: newScore }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p>Loading Test...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!submitted && (
        <div className={styles.header}>
          <h2>General Knowledge Test</h2>
          <div className={styles.timer}>Time Left: {formatTime(timeLeft)}</div>
        </div>
      )}

      {submitted ? (
        <div className={styles.resultContainer}>
          <div className={styles.result}>
            <h2>General Knowledge Test</h2>
            <br />
            <h3>Test Submitted</h3>
            <br />
            <p>Your Score: {score} / {questions.length}</p>
            <p><strong>Remaining Time: {formatTime(timeLeft)}</strong></p>
            <button className={styles.nextBtn} onClick={handleTestCompletion}>
              Check your overall score
            </button>
          </div>
        </div>
      ) : (
        <form className={styles.form}>
          {questions.map((q, index) => (
            <div key={q.id} className={styles.questionBlock}>
              <h4>{index + 1}. {q.question}</h4>
              {q.options.map((opt, idx) => (
                <label key={idx} className={styles.option}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleOptionChange(q.id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            Submit Test
          </button>
        </form>
      )}

      {timeLeft === 0 && !submitted && (
        <div className={styles.timeOverMsg}>
          Time’s up! Test auto-submitted.
        </div>
      )}
    </div>
  );
};

export default GkTest;
