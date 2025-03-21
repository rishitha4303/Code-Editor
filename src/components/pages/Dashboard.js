import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Code, History, BookOpen } from "lucide-react";

const Dashboard = ({ setHtml, setCss, setJs, setCurrentProject }) => {
  const navigate = useNavigate();
  const [recentProjects, setRecentProjects] = useState([]);

  // ✅ Load the last opened project when the Dashboard mounts
  // ✅ Load the last opened project when the Dashboard mounts
const loadCurrentProject = () => {
  const projectId = localStorage.getItem("currentProject");
  if (!projectId) return; // No project selected

  const projects = JSON.parse(localStorage.getItem("recentProjects")) || [];
  const project = projects.find((p) => p.id === Number(projectId));

  if (project) {
    console.log("📂 Opening last project:", project);

    // Save to localStorage with JSON stringify since useLocalStorage expects JSON
    localStorage.setItem("codepen-clone-html", JSON.stringify(project.html || ""));
    localStorage.setItem("codepen-clone-css", JSON.stringify(project.css || ""));
    localStorage.setItem("codepen-clone-js", JSON.stringify(project.js || ""));

    // Load saved content
    setHtml(project.html || "");
    setCss(project.css || "");
    setJs(project.js || "");

    // Ensure the editor knows the current project
    setCurrentProject(project.id);
  } else {
    console.error("⚠️ Project not found in localStorage!");
  }
};

  // In your Editor component where the iframe is defined
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  loadCurrentProject();

  // Load the recent projects list
  const storedProjects = JSON.parse(localStorage.getItem("recentProjects")) || [];
  console.log("📁 Saved Projects in LocalStorage:", storedProjects);
  setRecentProjects(storedProjects);
}, []); // Make sure this includes all dependencies

  // ✅ Create a new project (clears editor & starts fresh)
  // ✅ Create a new project (clears editor & starts fresh)
const handleNewProject = () => {
  console.log("🆕 New Project Button Clicked");

  localStorage.removeItem("currentProject");

  // Reset editor contents in localStorage
  localStorage.setItem("codepen-clone-html", JSON.stringify(""));
  localStorage.setItem("codepen-clone-css", JSON.stringify(""));
  localStorage.setItem("codepen-clone-js", JSON.stringify(""));

  // Reset editor contents
  setHtml("");
  setCss("");
  setJs("");
  setCurrentProject(null);

  const previewFrame = document.getElementById('preview-frame');
  if (previewFrame) {
    previewFrame.contentWindow.location.reload();
    // Or completely reset the iframe content:
    // previewFrame.srcdoc = '<html><body></body></html>';
  }
  
  console.log("✅ New project started! Navigating to /editor...");
  navigate("/editor");
};

  // ✅ Open an existing project
  const handleOpenProject = (project) => {
    console.log(`📂 Opening project: ${project.name}`);
  
    const storedProjects = JSON.parse(localStorage.getItem("recentProjects")) || [];
    const existingProject = storedProjects.find((p) => p.id === project.id);
  
    if (!existingProject) {
      console.error("⚠️ Project not found in localStorage!");
      alert("Project does not exist or has been deleted.");
      return;
    }
  
    console.log("🎯 Loading project data:", existingProject);
  
    // Save the raw values to localStorage with JSON stringify since useLocalStorage expects JSON
    localStorage.setItem("codepen-clone-html", JSON.stringify(existingProject.html || ""));
    localStorage.setItem("codepen-clone-css", JSON.stringify(existingProject.css || ""));
    localStorage.setItem("codepen-clone-js", JSON.stringify(existingProject.js || ""));
  
    // Update state with project data
    setHtml(existingProject.html || "");
    setCss(existingProject.css || "");
    setJs(existingProject.js || "");
  
    // Update current project ID
    setCurrentProject(existingProject.id);
    localStorage.setItem("currentProject", existingProject.id);
  
    console.log("✅ Project loaded successfully! Navigating to /editor...");
    navigate("/editor");
  };
  
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-400">Continue working on your projects or start something new</p>
          </div>
          <button
            onClick={handleNewProject}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <PlusCircle size={20} />
            New Project
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <QuickActionCard icon={<Code size={24} />} title="Code Editor" description="Open the code editor" link="/editor" />
          <QuickActionCard icon={<History size={24} />} title="Recent Projects" description="View your recent work" link="#recent" />
          <QuickActionCard icon={<BookOpen size={24} />} title="Templates" description="Start from a template" link="#templates" />
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Recent Projects</h2>
          {recentProjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="pb-4">Project Name</th>
                    <th className="pb-4">Last Edited</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-4">{project.name}</td>
                      <td className="py-4">{project.lastEdited || "Unknown"}</td>
                      <td className="py-4">
                        <button 
                          onClick={() => handleOpenProject(project)} 
                          className="text-purple-500 hover:text-purple-400"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No recent projects found. Start a new project!</p>
          )}
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon, title, description, link }) => (
  <Link to={link} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-200">
    <div className="text-purple-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </Link>
);

export default Dashboard;
