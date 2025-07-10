"use client";

import React, { useEffect } from "react";
import { authService } from "@/services/auth.service";
import { tokenUtils } from "@/utils/token.util";

export default function TestLogin() {
  useEffect(() => {
    async function loginTest() {
      try {
        const res = await authService.loginUser({
          email: "admin@example.com", // Backend'de kayıtlı test kullanıcısı olmalı
          password: "admin123",
        });

        console.log("Login başarılı:", res);

        if (res.token) {
          tokenUtils.saveToken(res.token);
          console.log("Token localStorage'a kaydedildi");
        }
      } catch (err) {
        console.error("Login başarısız:", err);
      }
    }

    loginTest();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Test Login Sayfası</h1>
      <p>Login testi yapılıyor, konsolu açıp sonucu izle.</p>
    </div>
  );
}
