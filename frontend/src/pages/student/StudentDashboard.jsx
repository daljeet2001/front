import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTasksApi } from "../../api/tasks";

const badge = (d) => ({
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
}[d] || "bg-gray-100 text-gray-700");

export default function StudentDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    (async () => {
      const { data } = await getTasksApi();
      setTasks(data?.data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
<div>
  <h1 className="text-2xl font-bold mb-4">Explore</h1>
  <div className="flex-col w-full">
    {tasks.map(t => (
      <Link
        to={`/task/${t._id}`}
        key={t._id}
        className="block bg-white  hover:scale-105 transition transform duration-200 mb-4 p-5 "
      >
          

    <img className="h-full w-full overflow-hidden" src={t.uiImage} alt="task_image"/>
  <div className="flex items-center justify-between mt-2">
  <div className="flex items-center space-x-2">
    {/* Avatar */}
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
      {t.user?.username?.charAt(0).toUpperCase() || "U"}
    </div>
    <h2 className="text-lg font-semibold">{t.title}</h2>
  </div>

  <span className={`text-xs px-2 py-1 rounded ${badge(t.difficulty)}`}>
    {t.difficulty}
  </span>
</div>


        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {t.description}
        </p>
        <div className="text-xs text-gray-500 mt-3">{t.points ?? 10} pts</div>



      </Link>
    ))}
  </div>
</div>

  );
}

