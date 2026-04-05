
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzes, createQuiz, deleteQuiz } from "../../api/quizApi";
import { getBatches } from "../../api/batchApi";


export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [batchId, setBatchId] = useState("");
  const [batches, setBatches] = useState([]);

  const navigate = useNavigate();

  const loadQuizzes = async () => {
    const res = await getQuizzes();
    setQuizzes(res.data || []);
  };

  const loadBatches = async () => {
    const res = await getBatches();
    setBatches(res.data || []);
  };

  useEffect(() => {
    loadQuizzes();
    loadBatches();
  }, []);

  const handleCreate = async () => {
    if (!title || !batchId) return alert("Fill all fields");

    await createQuiz({
      title,
      duration: 30,
      batchId: Number(batchId)
    });

    setTitle("");
    setBatchId("");
    loadQuizzes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    await deleteQuiz(id);
    loadQuizzes();
  };

  return (
    <div className="quizzes-container">
      <h2 className="quizzes-title">Quiz Management</h2>

      {/* Create Quiz Form */}
      <div className="quiz-form">
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={batchId} onChange={(e) => setBatchId(e.target.value)}>
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.batchName}
            </option>
          ))}
        </select>

        <button onClick={handleCreate}>Create Quiz</button>
      </div>

      {/* Quizzes List */}
      <div className="quizzes-list">
        {quizzes.map((q) => (
          <div key={q.id} className="quiz-card">
            <h3 className="quiz-title">{q.title}</h3>
            <div className="quiz-actions">
              <button className="questions-btn" onClick={() => navigate(`/admin/quizzes/${q.id}`)}>
                Questions
              </button>
              <button className="delete-btn" onClick={() => handleDelete(q.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}