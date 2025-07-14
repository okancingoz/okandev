/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { IProject } from "@/interfaces/project.interface";
import { createProject, updateProject } from "@/services/project.service";
import http from "@/services/http";

interface ProjectFormProps {
  initialData?: IProject | null;
  onSuccess: () => void; // Proje oluşturma/güncelleme sonrası listeyi yenilemek için
}

export function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setGithubUrl(initialData.githubUrl || "");
      setLiveUrl(initialData.liveUrl || "");
      setExistingImageUrl(initialData.imageUrl || null);
    }
  }, [initialData]);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await http.post("/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.data.imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageUrl = existingImageUrl;

      if (image) {
        imageUrl = await handleImageUpload(image);
      }

      const projectData: IProject = {
        title,
        description,
        imageUrl: imageUrl || "", // kesinlikle string olmalı
        githubUrl,
        liveUrl,
      };

      if (initialData?._id) {
        await updateProject(initialData._id, projectData);
        alert("Project updated successfully!");
      } else {
        await createProject(projectData);
        alert("Project created successfully!");
      }

      // Temizle ve üst bileşeni bilgilendir
      if (!initialData) {
        setTitle("");
        setDescription("");
        setImage(null);
        setGithubUrl("");
        setLiveUrl("");
        setExistingImageUrl(null);
      }

      onSuccess(); // Listeyi yenile
    } catch (error) {
      console.error(error);
      alert("Error submitting project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-md max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold text-white">
        {initialData ? "Edit Project" : "Add New Project"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
      />

      {/* image preview */}
      {existingImageUrl && !image && (
        <img
          src={existingImageUrl}
          alt="Preview"
          className="w-full h-48 object-cover rounded border"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        className="w-full text-white"
      />

      <input
        type="url"
        placeholder="GitHub URL (optional)"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
      />

      <input
        type="url"
        placeholder="Live URL (optional)"
        value={liveUrl}
        onChange={(e) => setLiveUrl(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
      >
        {loading
          ? initialData
            ? "Updating..."
            : "Creating..."
          : initialData
          ? "Update Project"
          : "Add Project"}
      </button>
    </form>
  );
}
