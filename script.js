async function sendMessage() {
    let input = document.getElementById("user-input");
    let box = document.getElementById("chat-box");
    let text = input.value;
    
    if (text.trim() === "") return;

    // إضافة رسالة المستخدم للواجهة
    box.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;

    const API_KEY = "AQ.Ab8RN6IZ-inEwdhSONqSNrT1sRWhX7-UtOcb1_G5uzJygLpfiQ";
    
    // الرابط المباشر للاتصال (تم دمج المفتاح هنا)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        if (!res.ok) {
            throw new Error('خطأ في الاتصال بالسيرفر');
        }

        const data = await res.json();
        
        // استخراج الرد
        const reply = data.candidates[0].content.parts[0].text;
        
        // عرض الرد بشكل منسق
        box.innerHTML += `<div class="ai-msg"><b>Youssef AI:</b><br>${reply.replace(/\n/g, '<br>')}</div>`;
    } catch (e) {
        box.innerHTML += `<div class="ai-msg">عذراً، تأكد من الاتصال بالإنترنت. (خطأ: ${e.message})</div>`;
    }
    
    box.scrollTop = box.scrollHeight;
}
