async function sendMessage() {
    let input = document.getElementById("user-input");
    let box = document.getElementById("chat-box");
    let text = input.value;
    if (!text) return;

    // إضافة رسالتك للواجهة
    box.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;

    // هذا هو الرابط والمفتاح جاهزان تماماً للعمل
    const API_KEY = "AQ.Ab8RN6IZ-inEwdhSONqSNrT1sRWhX7-UtOcb1_G5uzJygLpfiQ";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ contents: [{ parts: [{ text: text }] }] })
        });
        const data = await res.json();
        
        // استخراج الرد وعرضه
        const reply = data.candidates[0].content.parts[0].text;
        box.innerHTML += `<div class="ai-msg"><b>Youssef AI:</b><br>${reply.replace(/\n/g, '<br>')}</div>`;
    } catch (e) {
        box.innerHTML += `<div class="ai-msg">عذراً، تأكد من الاتصال بالإنترنت وحاول مجدداً.</div>`;
    }
    box.scrollTop = box.scrollHeight;
}
