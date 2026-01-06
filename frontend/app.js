console.log("✅ app.js loaded");

// Load voices properly
window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};

//  THEME CHANGE
function updateTheme() {
  const age = document.getElementById("ageGroup").value;
  const container = document.getElementById("container");

  document.body.className = age + "-bg";
  container.className = "app-container " + age + "-theme";
}

//  ANALYZE INGREDIENTS
async function analyze() {
  const ingredients = document.getElementById("ingredients").value;
  const ageGroup = document.getElementById("ageGroup").value;
  const result = document.getElementById("result");

  if (!ingredients.trim()) {
    alert("Please enter ingredients");
    return;
  }

  result.innerHTML = "🧠 AI is reasoning...";

  try {
    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients, ageGroup })
    });

    const data = await response.json();
    console.log("Backend response:", data);

    let html = `<h3>${data.summary || "Ingredient Analysis"}</h3>`;
    html += `<p><b>Age group:</b> ${data.age_group || ageGroup}</p>`;

    if (data.key_concerns && data.key_concerns.length > 0) {
      html += "<ul>";
      data.key_concerns.forEach(i => {
        html += `<li>⚠️ ${i}</li>`;
      });
      html += "</ul>";
    }

    if (data.uncertainty) {
      html += `<i>${data.uncertainty}</i>`;
    }

    result.innerHTML = html;

  } catch (err) {
    console.error(err);
    result.innerHTML = "❌ Backend connection failed.";
  }
}

//  VOICE ASSISTANT
function speak() {
  const resultBox = document.getElementById("result");
  const ageGroup = document.getElementById("ageGroup").value;

  const text = resultBox.innerText;

  if (!text.trim()) {
    alert("Please analyze ingredients first.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  //  Auto language detection (basic)
  utterance.lang = /[அ-ஹ]/.test(text) ? "ta-IN" : "en-IN";

  // 🎤 Age-based voice tuning
  if (ageGroup === "child") {
    utterance.rate = 0.85;
    utterance.pitch = 1.2;
  } else if (ageGroup === "adult") {
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
  } else {
    utterance.rate = 0.75;
    utterance.pitch = 0.9;
  }

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v =>
    v.lang.startsWith(utterance.lang.split("-")[0])
  );

  if (matchedVoice) utterance.voice = matchedVoice;

  window.speechSynthesis.speak(utterance);
}
