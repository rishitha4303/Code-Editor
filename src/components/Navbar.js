import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  // Save current project
  // Save current project
  const handleSave = () => {
    const projectId = Date.now();
    const projectName = prompt("Enter project name:", "Untitled Project");  
    if (!projectName) return; 
  
    // Get current editor content - parse the JSON since useLocalStorage stringifies it
    const htmlContent = JSON.parse(localStorage.getItem("codepen-clone-html") || "\"\"");
    const cssContent = JSON.parse(localStorage.getItem("codepen-clone-css") || "\"\"");
    const jsContent = JSON.parse(localStorage.getItem("codepen-clone-js") || "\"\"");
  
    const project = {
      id: projectId,
      name: projectName,
      html: htmlContent,
      css: cssContent,
      js: jsContent,
      lastEdited: new Date().toLocaleString(),
    };
  
    // Save project to localStorage
    const existingProjects = JSON.parse(localStorage.getItem("recentProjects")) || [];
  
    // Check if project with same name exists
    const projectIndex = existingProjects.findIndex((p) => p.name === projectName);
    if (projectIndex !== -1) {
      existingProjects[projectIndex] = project; // Update existing project
    } else {
      existingProjects.unshift(project); // Add new project to top
    }
  
    localStorage.setItem("recentProjects", JSON.stringify(existingProjects));
  
    // Set the new project as current
    localStorage.setItem("currentProject", projectId);
  
    alert("Project saved successfully!");
  };





  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-gray-400">
        CodeEditor
      </Link>
      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
            {/* Hide "Editor" button when already in /editor */}
            {location.pathname !== "/editor" && (
              <Link to="/editor" className="hover:text-gray-400">Editor</Link>
            )}
            <button onClick={handleLogout} className="hover:text-gray-400">
              Logout
            </button>
            {/* Show "Save" button only when in Editor */}
            {location.pathname === "/editor" && (
              <button 
                onClick={handleSave} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
            <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
