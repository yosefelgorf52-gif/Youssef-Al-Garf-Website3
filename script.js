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
    
    // إعداد البيانات للطلب
    const requestData = {
        contents: [{ parts: [{ text: text }] }]
    };

    // الرابط الوسيط (Proxy) لتخطي مشاكل الحماية في GitHub Pages
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY)}`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        const rawData = await res.json();
        const data = JSON.parse(rawData.contents);
        
        // استخراج الرد
        const reply = data.candidates[0].content.parts[0].text;
        
        // عرض الرد بشكل منسق
        box.innerHTML += `<div class="ai-msg"><b>Youssef AI:</b><br>${reply.replace(/\n/g, '<br>')}</div>`;
    } catch (e) {
        box.innerHTML += `<div class="ai-msg">عذراً، هناك مشكلة في الاتصال بالسيرفر. تأكد من الإنترنت.</div>`;
    }
    
    box.scrollTop = box.scrollHeight;
}
