import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getSubmissionsForTaskApi,
  updateSubmissionApi,
  deleteSubmissionApi,
} from "../../api/submissions";

export default function ReviewSubmissions() {
  const { id } = useParams(); // taskId
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      const { data } = await getSubmissionsForTaskApi(id);
      setSubs(data?.data || []);
    } catch (e) {
      setErr("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const save = async (sid, patch) => {
    await updateSubmissionApi(sid, patch);
    await load();
  };

  const remove = async (sid) => {
    if (!confirm("Delete this submission?")) return;
    await deleteSubmissionApi(sid);
    await load();
  };

  if (loading) return <div>Loading...</div>;

  return (
<div className="space-y-4 text-black font-chewy">
  <h1 className="text-2xl font-bold">Review Submissions</h1>
  {err && <p className="text-red-600">{err}</p>}

  {subs.length === 0 && (
    <div className="text-gray-600">No submissions yet.</div>
  )}

  <ul className="space-y-6">
    {subs.map((s) => (
      <li key={s._id} className="bg-white p-5">
        {/* Read-only fields */}
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-semibold">User:</span>{" "}
            {s.user?.username || s.user?.name || "N/A"} ({s.user?.email})
          </div>
          <div>
            <span className="font-semibold">Code:</span>{" "}
            <a
              href={s.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {s.codeLink}
            </a>
          </div>
          <div>
            <span className="font-semibold">Deployment:</span>{" "}
            <a
              href={s.deploymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {s.deploymentLink}
            </a>
          </div>
          <div>
            <span className="font-semibold">Submitted:</span>{" "}
            {new Date(s.createdAt).toLocaleString()}
          </div>
        </div>

        {/* Editable fields */}
        <div className="mt-4 space-y-2 text-sm">
<div>
  <span className="font-semibold">Status:</span>{" "}
  <InlineEdit
    value={s.status}
    type="custom"
    onSave={(val) => save(s._id, { status: val })}
    renderCustom={(props) => (
      <StatusSelect
        value={props.value}
        onChange={(val) => props.onChange(val)}
        options={["pending", "evaluating", "passed", "failed"]}
      />
    )}
  />
</div>



          <div>
            <span className="font-semibold">Score:</span>{" "}
            <InlineEdit
              value={s.score}
              type="number"
              onSave={(val) => save(s._id, { score: Number(val) })}
            />
          </div>
          <div>
            <span className="font-semibold">Feedback:</span>{" "}
            <InlineEdit
              value={s.feedback}
              onSave={(val) => save(s._id, { feedback: val })}
            />
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>


  );
}






function InlineEdit({ value, onSave, type = "text", options = [], renderCustom }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    if (draft !== value) onSave(draft);
    setEditing(false);
  };

  if (!editing) {
    return (
      <span
        className="cursor-pointer hover:underline"
        onClick={() => setEditing(true)}
      >
        {value || "—"}
      </span>
    );
  }

  // Use custom renderer if provided
  if (renderCustom) {
    return renderCustom({
      value: draft,
      onChange: setDraft,
      onSave: handleSave,
    });
  }

  if (type === "select") {
    return (
      <select
        className="border px-2 py-1 text-sm"
        value={draft}
        autoFocus
        onBlur={handleSave}
        onChange={(e) => setDraft(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={type}
      className="border px-2 py-1 text-sm"
      value={draft}
      autoFocus
      onBlur={handleSave}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSave()}
    />
  );
}








function StatusSelect({ value, onChange, options = ["pending", "evaluating", "passed", "failed"] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="relative w-40 font-chewy text-sm" ref={ref}>
      {/* Selected value button */}
      <button
        type="button"
        className="w-full bg-white border border-gray-300 rounded px-3 py-1 text-left flex justify-between items-center hover:border-gray-500"
        onClick={() => setOpen(!open)}
      >
        <span>{value || "Select status"}</span>
   
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${opt === value ? "bg-gray-200 font-semibold" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


