
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getQuestions,
  addQuestion,
  deleteQuestion
} from "../../api/QuestionApi";


export default function Questions() {
  const { quizId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A"
  });

  const loadQuestions = async () => {
    try {
      const res = await getQuestions(quizId);
      setQuestions(res.data || []);
    } catch (err) {
      console.error("Failed to load questions:", err);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [quizId]);

  const handleAdd = async () => {
    if (!form.questionText || !form.optionA || !form.optionB || !form.optionC || !form.optionD) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addQuestion(quizId, form);
      setForm({ questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "A" });
      loadQuestions();
    } catch (err) {
      console.error("Failed to add question:", err);
      alert("Error adding question");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      await deleteQuestion(id);
      loadQuestions();
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert("Error deleting question");
    }
  };

  return (
    <div className="questions-container">
      <h2 className="questions-title">Manage Questions</h2>

      {/* Add Question Form */}
      <div className="question-form">
        <input
          type="text"
          placeholder="Question"
          value={form.questionText}
          onChange={(e) => setForm({ ...form, questionText: e.target.value })}
        />
        <input type="text" placeholder="Option A" value={form.optionA} onChange={(e) => setForm({ ...form, optionA: e.target.value })} />
        <input type="text" placeholder="Option B" value={form.optionB} onChange={(e) => setForm({ ...form, optionB: e.target.value })} />
        <input type="text" placeholder="Option C" value={form.optionC} onChange={(e) => setForm({ ...form, optionC: e.target.value })} />
        <input type="text" placeholder="Option D" value={form.optionD} onChange={(e) => setForm({ ...form, optionD: e.target.value })} />

        <select value={form.correctAnswer} onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}>
          <option value="A">Correct Answer: A</option>
          <option value="B">Correct Answer: B</option>
          <option value="C">Correct Answer: C</option>
          <option value="D">Correct Answer: D</option>
        </select>

        <button onClick={handleAdd}>Add Question</button>
      </div>

      {/* Questions List */}
      <div className="questions-list">
        {questions.map((q) => (
          <div key={q.id} className="question-card">
            <p className="question-text">Q: {q.questionText}</p>
            <ul className="options-list">
              <li className={q.correctAnswer === "A" ? "correct-answer" : ""}>A: {q.optionA}</li>
              <li className={q.correctAnswer === "B" ? "correct-answer" : ""}>B: {q.optionB}</li>
              <li className={q.correctAnswer === "C" ? "correct-answer" : ""}>C: {q.optionC}</li>
              <li className={q.correctAnswer === "D" ? "correct-answer" : ""}>D: {q.optionD}</li>
            </ul>
            <div className="question-actions">
              <button className="delete-btn" onClick={() => handleDelete(q.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}