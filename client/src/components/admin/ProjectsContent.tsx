/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { deleteProject } from "@/services/project.service";
import { IProject } from "@/interfaces/project.interface";
import { ProjectForm } from "@/app/dashboard/projects/ProjectForm";
import { useFetch } from "@/hooks/useFetch";

export default function ProjectsContent() {
  const {
    data: projects,
    loading,
    error,
    refetch,
  } = useFetch<IProject[]>("/projects", "data.projects");
  
  const [editingProject, setEditingProject] = useState<IProject | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // On submit success, set submitSuccess to true and refetch data
  const onSuccess = () => {
    setEditingProject(null);
    setSubmitSuccess(true);  // Mark that submit was successful
    refetch(); // Fetch new project list
  };

  useEffect(() => {
    // If submit was successful, reset submitSuccess flag
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  }, [submitSuccess]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      refetch(); // Refetch after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEdit = (project: IProject) => {
    setEditingProject(project);
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!projects) return <p>No projects found.</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>

      <ProjectForm initialData={editingProject} onSuccess={onSuccess} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white text-black p-4 rounded-md shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-sm line-clamp-3">{project.description}</p>

            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="mt-2 w-full h-40 object-cover rounded"
              />
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id!)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
