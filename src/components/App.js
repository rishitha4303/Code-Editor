import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [collapsedEditors, setCollapsedEditors] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    console.log("Current Project:", currentProject);
  
    const timeout = setTimeout(() => {
      // Always update preview regardless of project state
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
      
      // Only save project data if a project is selected
      if (currentProject) {
        // 🔹 Save files in localStorage with project ID
        localStorage.setItem(`project-${currentProject}-html`, html);
        localStorage.setItem(`project-${currentProject}-css`, css);
        localStorage.setItem(`project-${currentProject}-js`, js);
  
        let recentProjects = JSON.parse(localStorage.getItem("recentProjects")) || [];
        const projectIndex = recentProjects.findIndex((p) => p.id === currentProject);
  
        if (projectIndex !== -1) {
          console.log("Updating existing project:", recentProjects[projectIndex]);
          recentProjects[projectIndex] = {
            ...recentProjects[projectIndex],
            html,
            css,
            js,
            lastEdited: new Date().toLocaleString(),
          };
        } else {
          console.log("Creating a new project entry:", currentProject);
          recentProjects.push({
            id: currentProject,
            name: `Project ${recentProjects.length + 1}`,
            html,
            css,
            js,
            lastEdited: new Date().toLocaleString(),
          });
        }
  
        localStorage.setItem("recentProjects", JSON.stringify(recentProjects));
      }
    }, 250);
  
    return () => clearTimeout(timeout);
  }, [html, css, js, currentProject]);
  

  const toggleEditor = (editorName) => {
    setCollapsedEditors((prev) =>
      prev.includes(editorName)
        ? prev.filter((name) => name !== editorName)
        : prev.length < 2
        ? [...prev, editorName]
        : prev
    );
  };

  const openRecentProject = (projectId) => {
    const recentProjects = JSON.parse(localStorage.getItem("recentProjects")) || [];
    const project = recentProjects.find((p) => p.id === projectId);

    if (project) {
      setHtml(project.html || "");
      setCss(project.css || "");
      setJs(project.js || "");
      setCurrentProject(projectId);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard
                setHtml={setHtml}
                setCss={setCss}
                setJs={setJs}
                setCurrentProject={setCurrentProject}
                openRecentProject={openRecentProject} // Pass the openRecentProject function
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/editor"
          element={
            isAuthenticated ? (
              <>
                <div className="pane top-pane">
                  <Editor
                    language="html"
                    displayName="HTML"
                    value={html}
                    onChange={setHtml}
                    isCollapsed={collapsedEditors.includes("HTML")}
                    toggleEditor={() => toggleEditor("HTML")}
                  />
                  <Editor
                    language="css"
                    displayName="CSS"
                    value={css}
                    onChange={setCss}
                    isCollapsed={collapsedEditors.includes("CSS")}
                    toggleEditor={() => toggleEditor("CSS")}
                  />
                  <Editor
                    language="javascript"
                    displayName="JavaScript"
                    value={js}
                    onChange={setJs}
                    isCollapsed={collapsedEditors.includes("JS")}
                    toggleEditor={() => toggleEditor("JS")}
                  />
                </div>
                <div className="pane">
                  <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                  />
                </div>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;