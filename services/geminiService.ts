
import { GoogleGenAI } from "@google/genai";

// FIX: Initialize GoogleGenAI client directly with process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPrompt = (text: string): string => `
Sen bir akademik metin özetleyicisin.
Aşağıda bir kullanıcı tarafından sağlanan metin bulunmaktadır.
Görevin, bu metni analiz ederek aşağıdaki format ve kurallara göre bir özet oluşturmaktır:

**Kurallar:**
- Kısa ve net yaz.
- Tekrar yapma.
- Çıktıyı Türkçe olarak oluştur.
- Sayfa numarası, referans, tablo gibi detaylara girme.
- Eğer metin çok uzunsa, sadece en önemli kısımlara odaklan.

**İstenen Çıktı Formatı:**

📘 **Genel Özet**
[Buraya 100 kelime civarında kısa, sade bir genel özet yaz.]

📍 **Önemli Noktalar**
1. [En önemli birinci nokta]
2. [En önemli ikinci nokta]
3. [En önemli üçüncü nokta]
4. [En önemli dördüncü nokta]
5. [En önemli beşinci nokta]

🧩 **Kavramlar / Terimler**
- **[Önemli Terim 1]**: [Terimin kısa tanımı]
- **[Önemli Terim 2]**: [Terimin kısa tanımı]
... (en fazla 5 terim)

🧪 **Yöntem ve Sonuç (varsa)**
[Eğer belge akademik bir çalışma ise, kullanılan yöntemi, ulaşılan sonuçları ve temel bulguları kısaca belirt.]

💡 **Çıkarım / Öneri**
[Belgeden çıkan ana çıkarımı veya yazarın önerilerini özetle.]

---
**Kullanıcının Metni:**

${text}
---
`;

export const generateSummary = async (text: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: getPrompt(text),
        });
        return response.text;
    } catch (error) {
        console.error("Error generating summary:", error);
        throw new Error("Failed to generate summary from AI. Please check your connection and try again.");
    }
};
