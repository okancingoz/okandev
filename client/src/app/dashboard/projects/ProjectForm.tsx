"use client";

import { useState } from "react";
import http from "@/services/http";
import { createProject } from "@/services/project.service";

export function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Resmi ayrı upload eden fonksiyon
  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await http.post("/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // Backend’den dönen yapıya göre URL buradan alınıyor
    return res.data.data.imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    try {
      // 1. Image upload et
      const uploadedImageUrl = await handleImageUpload(image);

      // 2. Proje oluştur
      await createProject({
        title,
        description,
        imageUrl: uploadedImageUrl,
      });

      alert("Project added successfully!");

      // Form temizle
      setTitle("");
      setDescription("");
      setImage(null);
      setGithubUrl("");
      setLiveUrl("");
    } catch (error) {
      console.error(error);
      alert("Error adding project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-md max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold text-white">Add New Project</h2>

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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        required
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
        {loading ? "Loading..." : "Add Project"}
      </button>
    </form>
  );
}
