"use client";

import { useState, useEffect } from "react";
import { IAbout } from "@/interfaces/about.interface";
import { getAboutMe, updateAboutMe } from "@/services/about.service";

export default function AboutMeContent() {
  const [aboutMe, setAboutMe] = useState<IAbout | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState("");

  // Veri çekme fonksiyonu
  const fetchAboutMe = async () => {
    try {
      const response = await getAboutMe();
      // Veri doğru şekilde alındıktan sonra state güncelleniyor
      const fetchedAbout = response.data.data.about;
      setAboutMe(fetchedAbout); 
      setNewText(fetchedAbout.content); // İçeriği yeni metne ekliyoruz
    } catch (error) {
      console.error("Error fetching about me:", error);
    }
  };

  // Güncelleme işlemi
  const handleUpdate = async () => {
    if (!newText.trim()) return; // Boş metin girilmesine izin verme

    if (aboutMe) {
      try {
        const updatedData = { ...aboutMe, content: newText }; // content güncelleniyor
        // Güncellenen veriyi hemen state'de yansıtıyoruz
        setAboutMe(updatedData);
        
        // API'ye güncellenmiş veriyi gönderiyoruz
        await updateAboutMe(updatedData);
        setIsEditing(false); // Düzenleme modunu sonlandırıyoruz
      } catch (error) {
        console.error("Error updating about me:", error);
      }
    }
  };

  useEffect(() => {
    fetchAboutMe(); // Sayfa yüklendiğinde veriyi çekiyoruz
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Manage About Me</h2>

      {isEditing ? (
        <div>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)} // Textarea'da metin değiştiğinde state güncelleniyor
            className="w-full h-40 p-2 bg-gray-800 text-white"
          />
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleUpdate} // Güncelleme butonuna tıklandığında handleUpdate çağrılır
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)} // Düzenleme modunu kapatır
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>{aboutMe?.content}</p> {/* content buradaki veri */}
          <button
            onClick={() => setIsEditing(true)} // Düzenlemeye başlamak için
            className="mt-4 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
