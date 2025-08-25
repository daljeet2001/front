import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getTaskApi } from "../../api/tasks";
import { createSubmissionApi } from "../../api/submissions";
import Editor from "@monaco-editor/react";
import { LiveProvider, LiveEditor, LivePreview } from "react-live";
import React from 'react'

export default function TaskDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [task, setTask] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [deployment,setDeployment]=useState("")
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");



  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTaskApi(id);
        console.log(data)
        setTask(data?.data || null);
      } catch {
        setErr("Failed to load task");
      }
    })();
  }, [id]);

  const submit = async () => {
    setErr("");

    setSubmitting(true);
    try {
      console.log("code",code)
      await createSubmissionApi({ task: id, codeLink:code,deploymentLink:deployment });
      nav(`/task/${id}/submissions`);
    } catch (e) {
      setErr(e?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!task) return <div>Loading...</div>;

  const font = {
    fontSize: task.assets?.fontSize || undefined,
    fontFamily: task.assets?.fontFamily || undefined,
  };

  return (
    <div className="space-y-5 font-chewy">
      <div className=" rounded-xl p-5">
            <img className="h-full w-full" src={task.uiImage} alt="task_image"/>
        <div className="flex items-center gap-4">

            <div className="flex items-center space-x-2 mt-2">

    <h2 className="text-lg font-semibold">{task.title}</h2>
       <p className="text-sm text-gray-500">{task.points ?? 10} pts • {task.difficulty}</p>
  </div>

       
        </div>
        <div className="mt-4 whitespace-pre-wrap text-gray-800">
          {task.description}
        </div>
{Array.isArray(task.dependencies) && task.dependencies.length > 0 && (
  <div className="mt-3 text-sm text-gray-700">
    <h3 className="font-semibold">Dependencies</h3>
    <p>
      {task.dependencies.length === 1
        ? task.dependencies[0]
        : task.dependencies.slice(0, -1).join(", ") +
          " and " +
          task.dependencies[task.dependencies.length - 1]}
    </p>
  </div>
)}

   {/* <div className="mt-4 whitespace-pre-wrap text-gray-800">
    <p>Font Size</p>
          {task.assets.fontSize}
        </div> */}

           <div className="mt-4 whitespace-pre-wrap text-gray-800">
             <p>Font Family</p>
          {task.assets.fontFamily}
        </div>

{/* Download Section */}
<div className="mt-4">
  <h2 className="text-sm font-medium mb-2">Download Files</h2>

  {/* Logo */}
  {task.assets?.logo && (
    <a
      href={task.assets.logo.replace("/upload/", "/upload/fl_attachment/")}
      className="block text-blue-600 underline"
    >
      Download Logo
    </a>
  )}

  {/* Images */}
  {Array.isArray(task.assets?.images) && task.assets.images.length > 0 && (
    <div className="space-y-1">
      {task.assets.images.map((img, idx) => (
        <a
          key={idx}
          href={img.replace("/upload/", "/upload/fl_attachment/")}
          className="block text-blue-600 underline"
        >
          Download Image {idx + 1}
        </a>
      ))}
    </div>
  )}
</div>

      </div>

     <div className="bg-white p-5  space-y-4">
  {/* Header Row */}
  <div className="flex items-center">
    <label className="text-sm font-semibold">Solve</label>
    <Link
      className="ml-auto text-sm text-black hover:underline"
      to={`/task/${id}/submissions`}
    >
      View my submissions
    </Link>
  </div>

  {/* Form Section */}
  <div className="space-y-4">
    <div className="flex flex-col">
      <label htmlFor="code" className="text-sm font-medium mb-1">
        GitHub Repo Link
      </label>
      <input
        id="code"
        type="text"
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="https://github.com/username/repo"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="deployment" className="text-sm font-medium mb-1">
        Deployment Link
      </label>
      <input
        id="deployment"
        type="text"
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={deployment}
        onChange={(e) => setDeployment(e.target.value)}
        placeholder="https://yourapp.vercel.app"
      />
    </div>
  </div>

  {/* Error Message */}
  {err && <p className="text-red-600 text-sm">{err}</p>}

  {/* Submit Button */}
  <button
    disabled={submitting}
    onClick={submit}
    className="w-full px-4 py-2 rounded bg-black text-white text-sm font-medium  disabled:opacity-50 transition"
  >
    {submitting ? "Submitting..." : "Submit"}
  </button>
</div>

    </div>
  );
}
