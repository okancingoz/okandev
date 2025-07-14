"use client";

import { useState, useEffect } from "react";
import { IMessage } from "@/interfaces/message.interface";
import { getAllMessages, deleteMessage } from "@/services/message.service";

export default function MessageContent() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchMessages = async () => {
    try {
      const response = await getAllMessages();
      // Burada doğru veri yolunu kullanıyoruz: response.data.messages
      setMessages(response.data.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmDelete) return;

    try {
      await deleteMessage(id);
      fetchMessages(); // Mesaj silindikten sonra verileri tekrar çek
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Manage Messages</h2>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className="bg-white text-black p-4 rounded-md shadow"
            >
              <p className="text-lg font-semibold mb-2">{message.message}</p>
              <p className="text-sm text-gray-500">From: {message.email}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(message._id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
}
