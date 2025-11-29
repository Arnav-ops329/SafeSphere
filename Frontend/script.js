// ========== NAVIGATION ==========
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

navLinks.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.section;
    navLinks.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    sections.forEach((sec) => {
      sec.classList.toggle("active", sec.id === target);
    });
  });
});

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "light";
document.body.dataset.theme = savedTheme;
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  const current = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = current;
  themeToggle.textContent = current === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", current);
});

// ========== LANGUAGE TOGGLE (EN / HI FULL) ==========
let currentLang = localStorage.getItem("lang") || "en";
const langToggle = document.getElementById("langToggle");
langToggle.textContent = currentLang === "en" ? "EN" : "HI";

// Helper for soft-type headings
function animateSoftType(el, text) {
  if (!el) return;
  el.innerHTML = "";
  [...text].forEach((ch, i) => {
    const span = document.createElement("span");
    span.textContent = ch;
    span.style.animationDelay = `${i * 0.03}s`;
    el.appendChild(span);
  });
}

const texts = {
  en: {
    navDashboard: "Dashboard",
    navTracker: "Cycle Tracker",
    navSymptoms: "Symptoms & Mood",
    navTips: "Tips & Diet",
    navProducts: "Products",
    navMyths: "Myths & Facts",
    navFaq: "FAQ",
    dashTitle: "Dashboard",
    dashSubtitle: "Quick overview of your cycle, health & recent activity.",
    trackerTitle: "Cycle Tracker",
    trackerSubtitle: "Track your cycle & symptoms easily.",
    symTitle: "Symptoms & Mood",
    symSubtitle: "Log how you feel today.",
    tipsTitle: "Tips & Diet",
    tipsSubtitle: "Personalized health guidance for your cycle.",
    prodTitle: "Products",
    prodSubtitle: "Best period care essentials curated for you.",
    mythTitle: "Myths & Facts",
    mythSubtitle: "Understand what’s true and what isn’t.",
    faqTitle: "FAQs",
    faqSubtitle:
      "General information only — for medical issues, please consult a doctor or health professional.",
    sosTitle: "SOS Emergency Help",
    sosSubtitle: "In an emergency, contact trusted people and local helplines.",
    chatTitle: "Your Buddy",

    tracker_last_period: "Last period started on",
    tracker_cycle_len: "Average cycle length (in days)",
    tracker_flow_label: "Flow intensity",
    tracker_btn: "Save & Calculate",

    sym_date_label: "Date",
    sym_mood_label: "Mood",
    sym_symptoms_label: "Symptoms",
    sym_save_btn: "Save Log",
    sym_insight_default:
      "Log a few days of mood & symptoms to see patterns here.",

    tips_before_h2: "Before Period (PMS phase)",
    tips_during_h2: "During Period",
    tips_after_h2: "After Period",
    tips_pcos_h2: "PCOS / PCOD Friendly Tips",
    tips_before: [
      "Eat more fruits, veggies, and whole grains.",
      "Reduce very salty and junk food to avoid bloating.",
      "Sleep 7–8 hours regularly.",
      "Light exercise or walking can help mood.",
    ],
    tips_during: [
      "Use a heating pad or warm water bag for cramps.",
      "Stay hydrated and avoid skipping meals.",
      "Change pads/cups/tampons regularly for hygiene.",
      "Choose comfortable clothing.",
    ],
    tips_after: [
      "Include iron-rich foods: spinach, lentils, beans.",
      "Include protein: dals, paneer, eggs, etc.",
      "Slowly return to regular exercise if you paused.",
    ],
    tips_pcos: [
      "Regular movement (even 20–30 minutes daily walk).",
      "Limit very sugary and processed foods.",
      "Keep a routine sleep schedule.",
      "Consult a doctor for personalized advice.",
    ],

    prod_pad_title: "Sanitary Pads",
    prod_pad_desc: "Common, easy to use, available everywhere.",
    prod_pad_pros: [
      "Beginner friendly",
      "No insertion needed",
      "Variety of sizes & absorbency",
    ],
    prod_pad_cons: [
      "Can feel bulky",
      "Can cause rashes if not changed often",
      "More waste generation",
    ],

    prod_cup_title: "Menstrual Cups",
    prod_cup_desc: "Reusable silicone cup placed inside the vagina.",
    prod_cup_pros: [
      "Eco-friendly & cost-effective long-term",
      "Can be worn for longer hours",
    ],
    prod_cup_cons: [
      "Needs practice to insert/remove",
      "Requires boiling for sterilization",
    ],

    prod_tampon_title: "Tampons",
    prod_tampon_desc: "Absorbent material inserted to absorb flow.",
    prod_tampon_pros: [
      "Discrete, comfortable for many",
      "Good for sports/swimming",
    ],
    prod_tampon_cons: [
      "Must be changed regularly",
      "Insertion may feel uncomfortable for some",
    ],

    prod_under_title: "Period Underwear / Cloth Pads",
    prod_under_desc: "Washable, reusable options.",
    prod_under_pros: ["Reusable, eco-friendly", "Comfortable for daily wear"],
    prod_under_cons: ["Needs proper washing & drying", "May need multiple pairs"],

    myths: [
      {
        q: "You shouldn’t exercise during your period.",
        a: "Light to moderate exercise is usually safe and can actually help reduce cramps and improve mood. Listen to your body and avoid over-exertion.",
      },
      {
        q: "Menstrual blood is “dirty” or impure.",
        a: "Menstrual blood is simply a mix of blood and tissue from the uterine lining. It is not dirty — it’s a normal body process.",
      },
      {
        q: "It’s normal for everyone to have very painful periods.",
        a: "Mild discomfort is common, but very severe pain that affects daily life is not “just normal.” It can be a sign of conditions like endometriosis and should be discussed with a doctor.",
      },
      {
        q: "You can’t get pregnant during your period.",
        a: "Pregnancy is less likely but still possible, especially if cycles are short or irregular. Sperm can survive in the body for several days.",
      },
    ],

    faqs: [
      {
        q: "My period is irregular. Should I worry?",
        a: "Some irregularity is common, especially during teenage years and times of stress. However, very irregular cycles or long gaps should be discussed with a doctor to rule out hormonal or health issues.",
      },
      {
        q: "What is PMS?",
        a: "PMS (Premenstrual Syndrome) refers to emotional and physical symptoms (like mood swings, bloating, breast tenderness) that happen in the days before a period and improve once it starts.",
      },
      {
        q: "When should I see a doctor about my period?",
        a: "Some reasons include: extremely painful periods, very heavy bleeding, periods stopping suddenly (without pregnancy), or cycles that are very irregular for many months.",
      },
      {
        q: "Are period tracking apps 100% accurate?",
        a: "No. Trackers give estimates based on your data. Bodies naturally vary from cycle to cycle. Use trackers as a guide, not as exact medical tools.",
      },
    ],

    sos_quick_list: [
      "Call a trusted family member or friend.",
      "If you feel unsafe, move to a public or safer place.",
      "Use official helplines in your area.",
    ],
    sos_saved: "Contacts saved locally on this device.",
    sos_disclaimer:
      "This website does not replace emergency services. Please contact official helplines and local authorities when needed.",
    sos_fake_call:
      "Incoming call from: Mom 📞\n(This is a fake call for safety situations.)",

    chat_intro:
      "Hi! I can answer basic questions about periods & cycles. For serious issues, please talk to a doctor. 💙",

    insight_end:
      "If any symptom worries you, please consult a doctor.",

    print_btn: "Print / Save Report",
  },

  hi: {
    navDashboard: "डैशबोर्ड",
    navTracker: "साइकिल ट्रैकर",
    navSymptoms: "लक्षण और मूड",
    navTips: "टिप्स और आहार",
    navProducts: "उत्पाद",
    navMyths: "मिथक और तथ्य",
    navFaq: "अक्सर पूछे जाने वाले प्रश्न",
    dashTitle: "डैशबोर्ड",
    dashSubtitle: "आपके चक्र, स्वास्थ्य और हाल की गतिविधि का त्वरित अवलोकन।",
    trackerTitle: "साइकिल ट्रैकर",
    trackerSubtitle: "अपना चक्र और लक्षण आसानी से ट्रैक करें।",
    symTitle: "लक्षण और मूड",
    symSubtitle: "आज आप कैसा महसूस कर रहे हैं, उसे दर्ज करें।",
    tipsTitle: "टिप्स और आहार",
    tipsSubtitle: "आपके चक्र के लिए सरल स्वास्थ्य मार्गदर्शन।",
    prodTitle: "उत्पाद",
    prodSubtitle: "आपके लिए चुने गए मासिक धर्म से जुड़े उत्पाद।",
    mythTitle: "मिथक और तथ्य",
    mythSubtitle: "जानें क्या सच है और क्या सिर्फ़ मिथक।",
    faqTitle: "प्रश्न और उत्तर",
    faqSubtitle:
      "यह केवल सामान्य जानकारी है — किसी भी चिकित्सा समस्या के लिए कृपया डॉक्टर से सलाह लें।",
    sosTitle: "आपातकालीन सहायता (SOS)",
    sosSubtitle:
      "आपात स्थिति में भरोसेमंद लोगों और स्थानीय हेल्पलाइन से संपर्क करें।",
    chatTitle: "आपका साथी",

    tracker_last_period: "पिछली बार पीरियड शुरू होने की तिथि",
    tracker_cycle_len: "औसत साइकिल लंबाई (दिनों में)",
    tracker_flow_label: "फ्लो की तीव्रता",
    tracker_btn: "सेव करें और गणना देखें",

    sym_date_label: "तारीख",
    sym_mood_label: "मूड",
    sym_symptoms_label: "लक्षण",
    sym_save_btn: "लॉग सेव करें",
    sym_insight_default:
      "कई दिनों तक मूड और लक्षण दर्ज करें, यहाँ एक साधारण पैटर्न दिखाई देगा।",

    tips_before_h2: "पीरियड से पहले (PMS चरण)",
    tips_during_h2: "पीरियड के दौरान",
    tips_after_h2: "पीरियड के बाद",
    tips_pcos_h2: "PCOS / PCOD के लिए सहायक टिप्स",

    tips_before: [
      "ज्यादा फल, सब्जियाँ और साबुत अनाज खाएं।",
      "बहुत नमकीन और तला-भुना खाना कम लें ताकि सूजन कम रहे।",
      "रोज़ 7–8 घंटे की नींद लेने की कोशिश करें।",
      "हल्की वॉक या स्ट्रेचिंग मूड के लिए सहायक हो सकती है।",
    ],
    tips_during: [
      "ऐंठन के लिए हीटिंग पैड या गर्म पानी की बोतल का प्रयोग करें।",
      "पानी पीते रहें और खाना बिल्कुल न छोड़ें।",
      "पैड/कप/टैम्पॉन नियमित रूप से बदलते रहें।",
      "आरामदायक और ढीले कपड़े पहनें।",
    ],
    tips_after: [
      "आयरन से भरपूर भोजन लें: पालक, दालें, बीन्स आदि।",
      "प्रोटीन शामिल करें: दाल, पनीर, अंडे आदि।",
      "यदि आपने व्यायाम रोका था तो धीरे-धीरे दोबारा शुरू करें।",
    ],
    tips_pcos: [
      "नियमित हलचल (रोज़ 20–30 मिनट की वॉक भी पर्याप्त है)।",
      "बहुत मीठा और प्रोसेस्ड खाना सीमित रखें।",
      "सोने और खाने का समय रोज़ लगभग एक जैसा रखें।",
      "सही निदान और सलाह के लिए डॉक्टर से मिलें।",
    ],

    prod_pad_title: "सेनेटरी पैड",
    prod_pad_desc: "आम, इस्तेमाल में आसान और लगभग हर जगह उपलब्ध।",
    prod_pad_pros: [
      "शुरुआती उपयोगकर्ताओं के लिए आसान",
      "इंसर्शन (अंदर डालने) की ज़रूरत नहीं",
      "कई साइज और एब्ज़ॉर्बेंसी विकल्प",
    ],
    prod_pad_cons: [
      "कभी-कभी भारी या भरा हुआ लग सकता है",
      "समय पर न बदलने पर रैशेज़ हो सकते हैं",
      "अधिक कचरा पैदा होता है",
    ],

    prod_cup_title: "मासिक धर्म कप (मेंस्ट्रुअल कप)",
    prod_cup_desc: "पुन: उपयोग योग्य सिलिकॉन कप जो योनि के अंदर लगाया जाता है।",
    prod_cup_pros: [
      "लंबे समय तक उपयोग योग्य और पर्यावरण के लिए बेहतर",
      "कई घंटों तक पहना जा सकता है",
    ],
    prod_cup_cons: [
      "लगाने और निकालने की प्रैक्टिस की ज़रूरत",
      "स्टरलाइज़ेशन के लिए उबालना पड़ता है",
    ],

    prod_tampon_title: "टैम्पॉन",
    prod_tampon_desc: "शोषक पदार्थ जो अंदर लगाया जाता है।",
    prod_tampon_pros: [
      "कई लोगों के लिए आरामदायक और कम दिखाई देता है",
      "खेल या तैराकी के दौरान उपयोगी",
    ],
    prod_tampon_cons: [
      "समय पर बदलना बहुत ज़रूरी",
      "कुछ लोगों के लिए इंसर्शन असहज हो सकता है",
    ],

    prod_under_title: "पीरियड अंडरवियर / कपड़े के पैड",
    prod_under_desc: "धोकर दोबारा इस्तेमाल किए जा सकने वाले विकल्प।",
    prod_under_pros: [
      "पुन: उपयोग योग्य, पर्यावरण के लिए बेहतर",
      "रोज़मर्रा पहनने में आरामदायक",
    ],
    prod_under_cons: [
      "साफ़ धोने और सुखाने पर ध्यान देना होता है",
      "अच्छी कवरेज के लिए कई पीस की ज़रूरत हो सकती है",
    ],

    myths: [
      {
        q: "पीरियड के दौरान व्यायाम नहीं करना चाहिए।",
        a: "हल्का से मध्यम व्यायाम आमतौर पर सुरक्षित होता है और ऐंठन कम करने तथा मूड बेहतर करने में मदद कर सकता है। अपने शरीर की सुनें और ज़्यादा ज़ोर न डालें।",
      },
      {
        q: "मासिक धर्म का रक्त “गंदा” या अपवित्र होता है।",
        a: "मासिक धर्म का रक्त गर्भाशय की परत से निकले रक्त और ऊतकों का मिश्रण होता है। यह गंदा नहीं है — यह शरीर की एक प्राकृतिक प्रक्रिया है।",
      },
      {
        q: "बहुत दर्दनाक पीरियड सभी के लिए सामान्य हैं।",
        a: "हल्का दर्द या असहजता आम हो सकती है, लेकिन इतना ज़्यादा दर्द जो रोज़मर्रा के कामों में बाधा डाले, सामान्य नहीं माना जाता और यह किसी बीमारी का संकेत हो सकता है। ऐसे में डॉक्टर से बात करना ज़रूरी है।",
      },
      {
        q: "पीरियड के दौरान प्रेग्नेंट होना संभव नहीं होता।",
        a: "संभावना कम हो सकती है, लेकिन फिर भी प्रेग्नेंसी हो सकती है, खासकर यदि साइकिल छोटी या अनियमित हो। शुक्राणु शरीर के अंदर कई दिनों तक जिंदा रह सकते हैं।",
      },
    ],

    faqs: [
      {
        q: "मेरा पीरियड अनियमित है। क्या मुझे चिंता करनी चाहिए?",
        a: "थोड़ी बहुत अनियमितता खासकर किशोरावस्था या तनाव के समय आम हो सकती है। लेकिन बहुत अधिक अनियमित साइकिल या बहुत लंबे गैप होने पर डॉक्टर से सलाह लेना अच्छा होता है।",
      },
      {
        q: "PMS क्या होता है?",
        a: "PMS (प्रीमेंस्ट्रुअल सिंड्रोम) भावनात्मक और शारीरिक लक्षणों को कहते हैं, जैसे मूड स्विंग, सूजन और स्तनों में कोमलता, जो पीरियड शुरू होने से कुछ दिन पहले दिखते हैं और पीरियड शुरू होने के बाद आमतौर पर कम हो जाते हैं।",
      },
      {
        q: "मुझे पीरियड के बारे में कब डॉक्टर से मिलना चाहिए?",
        a: "बहुत ज़्यादा दर्द, बहुत भारी ब्लीडिंग, अचानक पीरियड बंद हो जाना (बिना प्रेग्नेंसी), या कई महीनों तक बहुत अनियमित साइकिल होने पर डॉक्टर से मिलना ज़रूरी है।",
      },
      {
        q: "क्या पीरियड ट्रैकिंग ऐप 100% सही होते हैं?",
        a: "नहीं। ये ऐप आपके पुराने डेटा के आधार पर अनुमान लगाते हैं। शरीर स्वाभाविक रूप से साइकिल से साइकिल बदल सकता है, इसलिए अपने लक्षणों पर भी ध्यान देना ज़रूरी है।",
      },
    ],

    sos_quick_list: [
      "किसी भरोसेमंद परिवार सदस्य या दोस्त को कॉल करें।",
      "यदि आप असुरक्षित महसूस कर रही हैं, तो किसी सुरक्षित या सार्वजनिक स्थान पर जाएँ।",
      "अपने क्षेत्र की आधिकारिक हेल्पलाइन का उपयोग करें।",
    ],
    sos_saved: "आपकी कॉन्टैक्ट जानकारी इस डिवाइस पर सुरक्षित कर ली गई है।",
    sos_disclaimer:
      "यह वेबसाइट आपातकालीन सेवाओं का स्थानापन्न नहीं है। कृपया ज़रूरत पड़ने पर आधिकारिक हेल्पलाइन और स्थानीय प्रशासन से संपर्क करें।",
    sos_fake_call:
      "कॉल आ रही है: माँ 📞\n(यह सिर्फ़ सुरक्षा की स्थिति के लिए एक नकली कॉल है।)",

    chat_intro:
      "नमस्ते! मैं पीरियड और साइकिल से जुड़े सामान्य सवालों के जवाब दे सकती हूँ। किसी गंभीर समस्या के लिए कृपया डॉक्टर से संपर्क करें। 💙",

    insight_end:
      "यदि कोई लक्षण आपको परेशान कर रहा हो, तो डॉक्टर से सलाह लेना बेहतर है।",

    print_btn: "प्रिंट / सेव रिपोर्ट",
  },
};

function applyLanguage(lang) {
  const t = texts[lang];

  // Nav
  document.getElementById("navDashboard").textContent = t.navDashboard;
  document.getElementById("navTracker").textContent = t.navTracker;
  document.getElementById("navSymptoms").textContent = t.navSymptoms;
  document.getElementById("navTips").textContent = t.navTips;
  document.getElementById("navProducts").textContent = t.navProducts;
  document.getElementById("navMyths").textContent = t.navMyths;
  document.getElementById("navFaq").textContent = t.navFaq;

  // Headings with soft-type
  animateSoftType(document.getElementById("dashTitle"), t.dashTitle);
  animateSoftType(document.getElementById("trackerTitle"), t.trackerTitle);
  animateSoftType(document.getElementById("symTitle"), t.symTitle);
  animateSoftType(document.getElementById("tipsTitle"), t.tipsTitle);
  animateSoftType(document.getElementById("prodTitle"), t.prodTitle);
  animateSoftType(document.getElementById("mythTitle"), t.mythTitle);
  animateSoftType(document.getElementById("faqTitle"), t.faqTitle);

  // Subtitles
  document.getElementById("dashSubtitle").textContent = t.dashSubtitle;
  document.getElementById("trackerSubtitle").textContent = t.trackerSubtitle;
  document.getElementById("symSubtitle").textContent = t.symSubtitle;
  document.getElementById("tipsSubtitle").textContent = t.tipsSubtitle;
  document.getElementById("prodSubtitle").textContent = t.prodSubtitle;
  document.getElementById("mythSubtitle").textContent = t.mythSubtitle;
  document.getElementById("faqSubtitle").textContent = t.faqSubtitle;
  document.getElementById("sosTitle").textContent = t.sosTitle;
  document.getElementById("sosSubtitle").textContent = t.sosSubtitle;
  document.getElementById("chatTitle").textContent = t.chatTitle;

  // Tracker labels
  document.querySelector('label[for="lastPeriod"]').textContent =
    t.tracker_last_period;
  document.querySelector('label[for="cycleLength"]').childNodes[0].textContent =
    t.tracker_cycle_len + " ";
  document.querySelector('label[for="flowIntensity"]').textContent =
    t.tracker_flow_label;
  document.querySelector("#trackerForm .primary-btn").textContent =
    t.tracker_btn;

  // Symptoms labels
  document.querySelector('label[for="logDate"]').textContent =
    t.sym_date_label;
  document.querySelectorAll("#symptoms .form-group label")[1].textContent =
    t.sym_mood_label;
  document.querySelectorAll("#symptoms .form-group label")[2].textContent =
    t.sym_symptoms_label;
  document.querySelector("#logForm .primary-btn").textContent =
    t.sym_save_btn;
  document.getElementById("symptomInsight").textContent =
    t.sym_insight_default;

  // Tips section
  const tipsCards = document.querySelectorAll("#tips .card");
  if (tipsCards.length >= 4) {
    tipsCards[0].querySelector("h2").textContent = t.tips_before_h2;
    const beforeLis = tipsCards[0].querySelectorAll(".simple-list li");
    t.tips_before.forEach((txt, i) => {
      if (beforeLis[i]) beforeLis[i].textContent = txt;
    });

    tipsCards[1].querySelector("h2").textContent = t.tips_during_h2;
    const duringLis = tipsCards[1].querySelectorAll(".simple-list li");
    t.tips_during.forEach((txt, i) => {
      if (duringLis[i]) duringLis[i].textContent = txt;
    });

    tipsCards[2].querySelector("h2").textContent = t.tips_after_h2;
    const afterLis = tipsCards[2].querySelectorAll(".simple-list li");
    t.tips_after.forEach((txt, i) => {
      if (afterLis[i]) afterLis[i].textContent = txt;
    });

    tipsCards[3].querySelector("h2").textContent = t.tips_pcos_h2;
    const pcosLis = tipsCards[3].querySelectorAll(".simple-list li");
    t.tips_pcos.forEach((txt, i) => {
      if (pcosLis[i]) pcosLis[i].textContent = txt;
    });
  }

  // Products
  const prodCards = document.querySelectorAll("#products .product-card");
  if (prodCards.length >= 4) {
    // Pads
    prodCards[0].querySelector("h2").textContent = t.prod_pad_title;
    prodCards[0].querySelector("p").textContent = t.prod_pad_desc;
    let pros = prodCards[0].querySelectorAll("ul.simple-list")[0].children;
    let cons = prodCards[0].querySelectorAll("ul.simple-list")[1].children;
    t.prod_pad_pros.forEach((txt, i) => {
      if (pros[i]) pros[i].textContent = txt;
    });
    t.prod_pad_cons.forEach((txt, i) => {
      if (cons[i]) cons[i].textContent = txt;
    });

    // Cups
    prodCards[1].querySelector("h2").textContent = t.prod_cup_title;
    prodCards[1].querySelector("p").textContent = t.prod_cup_desc;
    pros = prodCards[1].querySelectorAll("ul.simple-list")[0].children;
    cons = prodCards[1].querySelectorAll("ul.simple-list")[1].children;
    t.prod_cup_pros.forEach((txt, i) => {
      if (pros[i]) pros[i].textContent = txt;
    });
    t.prod_cup_cons.forEach((txt, i) => {
      if (cons[i]) cons[i].textContent = txt;
    });

    // Tampons
    prodCards[2].querySelector("h2").textContent = t.prod_tampon_title;
    prodCards[2].querySelector("p").textContent = t.prod_tampon_desc;
    pros = prodCards[2].querySelectorAll("ul.simple-list")[0].children;
    cons = prodCards[2].querySelectorAll("ul.simple-list")[1].children;
    t.prod_tampon_pros.forEach((txt, i) => {
      if (pros[i]) pros[i].textContent = txt;
    });
    t.prod_tampon_cons.forEach((txt, i) => {
      if (cons[i]) cons[i].textContent = txt;
    });

    // Period underwear
    prodCards[3].querySelector("h2").textContent = t.prod_under_title;
    prodCards[3].querySelector("p").textContent = t.prod_under_desc;
    pros = prodCards[3].querySelectorAll("ul.simple-list")[0].children;
    cons = prodCards[3].querySelectorAll("ul.simple-list")[1].children;
    t.prod_under_pros.forEach((txt, i) => {
      if (pros[i]) pros[i].textContent = txt;
    });
    t.prod_under_cons.forEach((txt, i) => {
      if (cons[i]) cons[i].textContent = txt;
    });
  }

  // Myths
  const mythItems = document.querySelectorAll("#myths .accordion-item");
  mythItems.forEach((item, index) => {
    if (t.myths[index]) {
      item.querySelector(".accordion-header").textContent =
        t.myths[index].q;
      item.querySelector(".accordion-body p").textContent =
        t.myths[index].a;
    }
  });

  // FAQs
  const faqItems = document.querySelectorAll("#faq .accordion-item");
  faqItems.forEach((item, index) => {
    if (t.faqs[index]) {
      item.querySelector(".accordion-header").textContent =
        t.faqs[index].q;
      item.querySelector(".accordion-body p").textContent =
        t.faqs[index].a;
    }
  });

  // SOS quick actions & disclaimer
  const sosQuickLis = document.querySelectorAll(
    "#sosModal .card:first-of-type .simple-list li"
  );
  t.sos_quick_list.forEach((txt, i) => {
    if (sosQuickLis[i]) sosQuickLis[i].textContent = txt;
  });
  const disc = document.querySelector("#sosModal .disclaimer");
  if (disc) disc.textContent = t.sos_disclaimer;

  // Chat intro
  const firstBotMsg = document.querySelector(
    "#chatMessages .chat-message.bot"
  );
  if (firstBotMsg) firstBotMsg.textContent = t.chat_intro;

  // Print button
  const printBtn = document.getElementById("printReportBtn");
  if (printBtn) printBtn.textContent = t.print_btn;
}

applyLanguage(currentLang);

// language toggle
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "hi" : "en";
  langToggle.textContent = currentLang === "en" ? "EN" : "HI";
  localStorage.setItem("lang", currentLang);
  applyLanguage(currentLang);
  setDailyQuote();
  updateDashboardFromCycle();
  updateTodaySuggestion();
  renderLogs();
});

// ========== DAILY QUOTE ==========
const dailyQuotes = [
  "Drink water, breathe deeply, and be kind to yourself today.",
  "Rest is also productive. Your body is doing important work.",
  "You are more than your cycle. Be gentle with your mind and body.",
  "Small self-care steps daily make a big difference over time.",
  "Listen to your body. It knows what it needs.",
];
const dailyQuotesHi = [
  "पानी पीते रहें, गहरी साँस लें और आज खुद के प्रति दयालु रहें।",
  "आराम भी उतना ही ज़रूरी है — आपका शरीर महत्वपूर्ण काम कर रहा है।",
  "आप सिर्फ़ अपने पीरियड नहीं हैं। अपने शरीर और मन दोनों का खयाल रखें।",
  "हर दिन की छोटी-छोटी सेल्फ-केयर आदतें बड़ा अंतर ला सकती हैं।",
  "अपने शरीर की बात सुनिए, वह अक्सर सही संकेत देता है।",
];
const quoteEl = document.getElementById("dailyQuote");

function setDailyQuote() {
  if (!quoteEl) return;
  const arr = currentLang === "hi" ? dailyQuotesHi : dailyQuotes;
  const q = arr[Math.floor(Math.random() * arr.length)];
  quoteEl.textContent = q;
}
setDailyQuote();

// ========== TRACKER + CALENDAR + DASHBOARD SUMMARY ==========
const trackerForm = document.getElementById("trackerForm");
const trackerResult = document.getElementById("trackerResult");
const cycleSummary = document.getElementById("cycleSummary");
const cycleStatusText = document.getElementById("cycleStatusText");
const calendarMonth = document.getElementById("calendarMonth");
const calendarGrid = document.getElementById("calendarGrid");
const todaySuggestionList = document.getElementById("todaySuggestion");

let cycleData = null;
let cycleHistory = [];

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getDatePlusDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d;
}

function updateCalendar() {
  if (!calendarMonth || !calendarGrid || !cycleData) return;

  const monthValue = calendarMonth.value;
  if (!monthValue) return;

  const [year, month] = monthValue.split("-").map(Number);
  calendarGrid.innerHTML = "";

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  dayLabels.forEach((d) => {
    const labelDiv = document.createElement("div");
    labelDiv.textContent = d;
    labelDiv.className = "day-label";
    calendarGrid.appendChild(labelDiv);
  });

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day";
    calendarGrid.appendChild(empty);
  }

  const nextPeriodDate = getDatePlusDays(
    cycleData.lastPeriod,
    cycleData.cycleLength
  );
  const npYear = nextPeriodDate.getFullYear();
  const npMonth = nextPeriodDate.getMonth() + 1;
  const npDay = nextPeriodDate.getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = day;

    if (year === npYear && month === npMonth && day === npDay) {
      div.classList.add("period-day");
    }

    calendarGrid.appendChild(div);
  }
}

function updateDashboardFromCycle() {
  if (!cycleSummary || !cycleStatusText) return;

  if (!cycleData) {
    cycleSummary.innerHTML = `<p>${
      currentLang === "hi"
        ? "ट्रैकर में अपना चक्र जोड़ें, यहाँ सारांश दिखेगा।"
        : "Add your cycle in Tracker to see summary here."
    }</p>`;
    cycleStatusText.textContent =
      currentLang === "hi"
        ? "आपके चक्र की स्थिति यहाँ दिखाई देगी।"
        : "Your cycle status will appear here.";
    return;
  }

  const nextPeriodDate = getDatePlusDays(
    cycleData.lastPeriod,
    cycleData.cycleLength
  );
  const ovulationDate = getDatePlusDays(
    cycleData.lastPeriod,
    cycleData.cycleLength - 14
  );

  // Tracker result & summary
  if (currentLang === "hi") {
    trackerResult.innerHTML = `
      <p><strong>अगले पीरियड का अनुमान:</strong> ${nextPeriodDate.toDateString()}</p>
      <p><strong>संभावित ओव्यूलेशन के आसपास:</strong> ${ovulationDate.toDateString()}</p>
      <p class="small">ये सिर्फ अनुमान हैं, वास्तविक साइकिल भिन्न हो सकती है।</p>
    `;
    cycleSummary.innerHTML = `
      <p><strong>पिछला पीरियड:</strong> ${cycleData.lastPeriod}</p>
      <p><strong>औसत लंबाई:</strong> ${cycleData.cycleLength} दिन</p>
    `;
  } else {
    trackerResult.innerHTML = `
      <p><strong>Next period (estimate):</strong> ${nextPeriodDate.toDateString()}</p>
      <p><strong>Possible ovulation around:</strong> ${ovulationDate.toDateString()}</p>
      <p class="small">These are only estimates. Actual cycles can vary.</p>
    `;
    cycleSummary.innerHTML = `
      <p><strong>Last period:</strong> ${cycleData.lastPeriod}</p>
      <p><strong>Average length:</strong> ${cycleData.cycleLength} days</p>
    `;
  }

  const today = new Date();
  const diffDays = Math.round(
    (nextPeriodDate - today) / (1000 * 60 * 60 * 24)
  );
  let status = "";

  if (currentLang === "hi") {
    if (diffDays < 0) {
      status =
        "अनुमानित पीरियड की तारीख बीत चुकी है। यदि काफी देर हो रही हो, तो कुछ साइकिल ट्रैक करें या डॉक्टर से सलाह लें।";
    } else if (diffDays === 0) {
      status =
        "संभावना है कि आपका अनुमानित पीरियड आज शुरू हो। अपना ध्यान रखें और ज़रूरी उत्पाद पास रखें।";
    } else if (diffDays <= 5) {
      status = `आपका पीरियड लगभग ${diffDays} दिन में आ सकता है। आप PMS के लक्षण महसूस कर सकती हैं।`;
    } else {
      status =
        "आप अभी अनुमानित पीरियड की तारीख से दूर हैं। यह समग्र स्वास्थ्य पर ध्यान देने का अच्छा समय है।";
    }
  } else {
    if (diffDays < 0) {
      status =
        "Your estimated period date has passed. If there is a large delay, consider tracking more cycles or consulting a doctor.";
    } else if (diffDays === 0) {
      status =
        "Your estimated period may start today. Take extra care and keep products ready.";
    } else if (diffDays <= 5) {
      status = `Your period may start in about ${diffDays} day(s). You might notice PMS symptoms.`;
    } else {
      status =
        "You are currently away from your expected period date. This is a good time to focus on overall wellbeing.";
    }
  }
  cycleStatusText.textContent = status;

  // Pattern analyzer (history)
  if (cycleHistory && cycleHistory.length >= 2) {
    const lengths = cycleHistory.map((c) => c.cycleLength);
    const avg = lengths.reduce((s, v) => s + v, 0) / lengths.length;
    const min = Math.min(...lengths);
    const max = Math.max(...lengths);
    const variation = max - min;

    let analysisText = "";
    if (currentLang === "hi") {
      analysisText += `पिछली ${cycleHistory.length} साइकिल के आधार पर:\n`;
      analysisText += `● औसत लंबाई: लगभग ${Math.round(avg)} दिन\n`;
      analysisText += `● न्यूनतम: ${min} दिन, अधिकतम: ${max} दिन\n`;
      if (variation <= 3) {
        analysisText += "● आपका साइकिल अभी तक काफी नियमित दिख रहा है।";
      } else if (variation <= 7) {
        analysisText +=
          "● लंबाई में थोड़ा उतार-चढ़ाव है, जो कई लोगों के लिए सामान्य हो सकता है।";
      } else {
        analysisText +=
          "● साइकिल की लंबाई में ज़्यादा उतार-चढ़ाव दिख रहा है। यदि आप चिंतित हों तो डॉक्टर से सलाह लें।";
      }
    } else {
      analysisText += `Based on your last ${cycleHistory.length} cycles:\n`;
      analysisText += `● Average length: ~${Math.round(avg)} days\n`;
      analysisText += `● Min: ${min} days, Max: ${max} days\n`;
      if (variation <= 3) {
        analysisText += "● Your cycle looks fairly regular so far.";
      } else if (variation <= 7) {
        analysisText +=
          "● There is some variation, which can be normal for many people.";
      } else {
        analysisText +=
          "● There is a lot of variation. If you feel worried, consider talking to a doctor.";
      }
    }

    const extra = document.createElement("p");
    extra.className = "small";
    extra.textContent = analysisText;
    cycleSummary.appendChild(extra);
  }

  // Calendar default month
  if (calendarMonth) {
    const monthValue = `${nextPeriodDate.getFullYear()}-${String(
      nextPeriodDate.getMonth() + 1
    ).padStart(2, "0")}`;
    calendarMonth.value = monthValue;
    updateCalendar();
  }

  updateTodaySuggestion();
}

if (calendarMonth) {
  calendarMonth.addEventListener("change", updateCalendar);
}

if (trackerForm) {
  trackerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const lastPeriod = document.getElementById("lastPeriod").value;
    const cycleLength = Number(
      document.getElementById("cycleLength").value
    );
    const flowIntensity =
      document.getElementById("flowIntensity").value || "medium";

    if (!lastPeriod || !cycleLength) return;

    cycleData = { lastPeriod, cycleLength, flowIntensity };
    localStorage.setItem("cycleData", JSON.stringify(cycleData));

    // history
    cycleHistory.push({
      lastPeriod,
      cycleLength,
      createdAt: new Date().toISOString(),
    });
    if (cycleHistory.length > 6) cycleHistory.shift();
    localStorage.setItem("cycleHistory", JSON.stringify(cycleHistory));

    updateDashboardFromCycle();
  });
}

const savedCycle = localStorage.getItem("cycleData");
if (savedCycle) {
  cycleData = JSON.parse(savedCycle);
  const lastPeriodInput = document.getElementById("lastPeriod");
  const cycleLengthInput = document.getElementById("cycleLength");
  const flowIntensityInput = document.getElementById("flowIntensity");
  if (lastPeriodInput) lastPeriodInput.value = cycleData.lastPeriod;
  if (cycleLengthInput) cycleLengthInput.value = cycleData.cycleLength;
  if (flowIntensityInput)
    flowIntensityInput.value = cycleData.flowIntensity || "medium";
}

const savedHistory = localStorage.getItem("cycleHistory");
if (savedHistory) {
  cycleHistory = JSON.parse(savedHistory);
}

updateDashboardFromCycle();

// ========== TODAY'S SUGGESTION ==========
function updateTodaySuggestion() {
  if (!todaySuggestionList) return;
  todaySuggestionList.innerHTML = "";

  const suggestions = [];

  if (cycleData) {
    const nextPeriodDate = getDatePlusDays(
      cycleData.lastPeriod,
      cycleData.cycleLength
    );
    const today = new Date();
    const diffDays = Math.round(
      (nextPeriodDate - today) / (1000 * 60 * 60 * 24)
    );

    if (currentLang === "hi") {
      if (diffDays <= 0) {
        suggestions.push(
          "पीरियड के लिए ज़रूरी सामान पास रखें और ज़रूरत होने पर आराम भी करें।"
        );
        suggestions.push(
          "पानी पीते रहें और ऐंठन होने पर हीटिंग पैड या गर्म पानी की बोतल का उपयोग करें।"
        );
      } else if (diffDays <= 5) {
        suggestions.push(
          "आप PMS चरण में हो सकती हैं, अपनी भावनाओं के प्रति नरम रहें।"
        );
        suggestions.push(
          "बहुत नमकीन या तला-भुना खाना कम लेने की कोशिश करें ताकि सूजन कम रहे।"
        );
      } else {
        suggestions.push(
          "यह समय नियमित हल्की गतिविधि और अच्छी नींद पर ध्यान देने का अच्छा मौका है।"
        );
      }

      if (cycleData.flowIntensity === "heavy") {
        suggestions.push(
          "यदि आपका फ्लो ज़्यादा रहता है, तो प्रोडक्ट नियमित रूप से बदलने पर ध्यान दें।"
        );
      } else if (cycleData.flowIntensity === "light") {
        suggestions.push(
          "हल्के फ्लो वाले दिन हल्की स्ट्रेचिंग और वॉक आपके लिए आरामदायक हो सकती है।"
        );
      }
    } else {
      if (diffDays <= 0) {
        suggestions.push(
          "Keep period products handy and rest when you need to."
        );
        suggestions.push(
          "Stay hydrated and use a heating pad if you have cramps."
        );
      } else if (diffDays <= 5) {
        suggestions.push(
          "You may be in PMS phase, be gentle with your emotions."
        );
        suggestions.push(
          "Reduce extra salty or very oily foods to reduce bloating."
        );
      } else {
        suggestions.push(
          "Good time to focus on regular movement and sleep."
        );
      }

      if (cycleData.flowIntensity === "heavy") {
        suggestions.push(
          "Since you often have heavier flow, remember to change products regularly."
        );
      } else if (cycleData.flowIntensity === "light") {
        suggestions.push(
          "Light flow days are good for light stretching and walks."
        );
      }
    }
  } else {
    if (currentLang === "hi") {
      suggestions.push(
        "पर्सनलाइज़्ड टिप्स के लिए पहले ट्रैकर में अपना चक्र दर्ज करें।"
      );
      suggestions.push(
        "पानी पर्याप्त मात्रा में पिएँ और 7–8 घंटे की नींद लेने की कोशिश करें।"
      );
    } else {
      suggestions.push(
        "Add your cycle details in the tracker to get personalized tips."
      );
      suggestions.push(
        "Drink enough water and try to sleep 7–8 hours tonight."
      );
    }
  }

  suggestions.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    todaySuggestionList.appendChild(li);
  });
}
updateTodaySuggestion();

// ========== SYMPTOMS & MOOD LOGGING ==========
const logForm = document.getElementById("logForm");
const logsList = document.getElementById("logsList");
const recentLogs = document.getElementById("recentLogs");
const symptomInsight = document.getElementById("symptomInsight");

let logs = [];

function updateSymptomInsights() {
  if (!symptomInsight || logs.length === 0) return;

  const moodCount = {};
  const symptomCount = {};

  logs.forEach((log) => {
    if (log.mood) {
      moodCount[log.mood] = (moodCount[log.mood] || 0) + 1;
    }
    log.symptoms.forEach((s) => {
      symptomCount[s] = (symptomCount[s] || 0) + 1;
    });
  });

  const topMood =
    Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0];
  const topSymptom =
    Object.entries(symptomCount).sort((a, b) => b[1] - a[1])[0];

  let text = "";
  if (currentLang === "hi") {
    text = "आपके हाल के लॉग के आधार पर: ";
    if (topMood) {
      text += `आप अक्सर "${topMood[0]}" महसूस करती हैं। `;
    }
    if (topSymptom) {
      text += `सबसे ज़्यादा दर्ज किया गया लक्षण "${topSymptom[0]}" है। `;
    }
    text += texts.hi.insight_end;
  } else {
    text = "Based on your recent logs: ";
    if (topMood) text += `you often feel "${topMood[0]}". `;
    if (topSymptom)
      text += `Your most common symptom is "${topSymptom[0]}". `;
    text += texts.en.insight_end;
  }

  symptomInsight.textContent = text;
}

function renderLogs() {
  if (!logsList) return;
  logsList.innerHTML = "";
  logs.slice(-10).forEach((log) => {
    const li = document.createElement("li");
    if (currentLang === "hi") {
      li.textContent = `${log.date} — मूड: ${
        log.mood || "N/A"
      }; लक्षण: ${
        log.symptoms.length ? log.symptoms.join(", ") : "कोई नहीं"
      }`;
    } else {
      li.textContent = `${log.date} — Mood: ${
        log.mood || "N/A"
      }; Symptoms: ${
        log.symptoms.length ? log.symptoms.join(", ") : "None"
      }`;
    }
    logsList.appendChild(li);
  });

  if (recentLogs) {
    recentLogs.innerHTML = "";
    logs.slice(-3).forEach((log) => {
      const li = document.createElement("li");
      if (currentLang === "hi") {
        li.textContent = `${log.date}: ${log.mood || "N/A"} — ${
          log.symptoms.join(", ") || "कोई लक्षण दर्ज नहीं"
        }`;
      } else {
        li.textContent = `${log.date}: ${log.mood || "N/A"} — ${
          log.symptoms.join(", ") || "No symptoms logged"
        }`;
      }
      recentLogs.appendChild(li);
    });
  }

  updateSymptomInsights();
}

if (logForm) {
  logForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const dateInput = document.getElementById("logDate");
    let date = dateInput.value;
    if (!date) date = formatDate(new Date());

    const moodInput = document.querySelector('input[name="mood"]:checked');
    const mood = moodInput ? moodInput.value : "";

    const symptomInputs = logForm.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const symptoms = Array.from(symptomInputs).map((c) => c.value);

    const log = { date, mood, symptoms };
    logs.push(log);
    localStorage.setItem("logs", JSON.stringify(logs));

    if (moodInput) moodInput.checked = false;
    symptomInputs.forEach((c) => (c.checked = false));
    dateInput.value = "";

    renderLogs();
  });
}

const savedLogs = localStorage.getItem("logs");
if (savedLogs) {
  logs = JSON.parse(savedLogs);
  renderLogs();
}

// ========== PRINT / SAVE REPORT ==========
const printReportBtn = document.getElementById("printReportBtn");
if (printReportBtn) {
  printReportBtn.addEventListener("click", () => {
    window.print();
  });
}

// ========== ACCORDION ==========
document.querySelectorAll(".accordion-item").forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const body = item.querySelector(".accordion-body");
  if (!header || !body) return;

  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".accordion-item.open")
      .forEach((openItem) => {
        openItem.classList.remove("open");
        const openBody = openItem.querySelector(".accordion-body");
        if (openBody) openBody.style.maxHeight = null;
      });

    if (!isOpen) {
      item.classList.add("open");
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      item.classList.remove("open");
      body.style.maxHeight = null;
    }
  });
});

// ========== SOS MODAL, FAKE CALL, QUICK EXIT ==========
const sosBtn = document.getElementById("sosBtn");
const sosModal = document.getElementById("sosModal");
const closeSos = document.getElementById("closeSos");
const sosForm = document.getElementById("sosForm");
const sosSavedMsg = document.getElementById("sosSavedMsg");
const fakeCallBtn = document.getElementById("fakeCallBtn");
const quickExitBtn = document.getElementById("quickExitBtn");

if (sosBtn && sosModal) {
  sosBtn.addEventListener("click", () => {
    sosModal.classList.add("active");
  });
}

if (closeSos) {
  closeSos.addEventListener("click", () => {
    sosModal.classList.remove("active");
  });
}

if (sosModal) {
  sosModal.addEventListener("click", (e) => {
    if (e.target === sosModal) sosModal.classList.remove("active");
  });
}

if (sosForm) {
  sosForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const contacts = {
      contact1: document.getElementById("contact1").value,
      contact2: document.getElementById("contact2").value,
      contact3: document.getElementById("contact3").value,
    };
    localStorage.setItem("sosContacts", JSON.stringify(contacts));
    if (sosSavedMsg) {
      sosSavedMsg.textContent =
        currentLang === "hi"
          ? texts.hi.sos_saved
          : texts.en.sos_saved;
      setTimeout(() => {
        sosSavedMsg.textContent = "";
      }, 2500);
    }
  });

  const savedContacts = localStorage.getItem("sosContacts");
  if (savedContacts) {
    const c = JSON.parse(savedContacts);
    document.getElementById("contact1").value = c.contact1 || "";
    document.getElementById("contact2").value = c.contact2 || "";
    document.getElementById("contact3").value = c.contact3 || "";
  }
}

if (fakeCallBtn) {
  fakeCallBtn.addEventListener("click", () => {
    alert(
      currentLang === "hi"
        ? texts.hi.sos_fake_call
        : texts.en.sos_fake_call
    );
  });
}

if (quickExitBtn) {
  quickExitBtn.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
}

// ========== STEALTH MODE (Q KEY) ==========
const stealthOverlay = document.getElementById("stealthOverlay");
let stealthActive = false;

function toggleStealth() {
  stealthActive = !stealthActive;
  if (stealthActive) {
    stealthOverlay.classList.add("active");
  } else {
    stealthOverlay.classList.remove("active");
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "q" || e.key === "Q") {
    toggleStealth();
  }
});

// ========== CHATBOT (AI-POWERED) ==========
const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatClose = document.getElementById("chatClose");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

if (chatToggle && chatBox) {
  chatToggle.addEventListener("click", () => {
    chatBox.classList.toggle("open");
  });
}

if (chatClose) {
  chatClose.addEventListener("click", () => {
    chatBox.classList.remove("open");
  });
}

function addChatMessage(text, isUser = false) {
  const div = document.createElement("div");
  div.className = "chat-message " + (isUser ? "user" : "bot");
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (chatForm) {
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    addChatMessage(text, true);
    chatInput.value = "";

    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-message bot";
    typingDiv.textContent =
      currentLang === "hi" ? "सोच रही हूं..." : "Thinking...";
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const res = await fetch("http://localhost:5000/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      typingDiv.remove();
      addChatMessage(
        data.reply ||
          (currentLang === "hi"
            ? "अभी जवाब नहीं दे पाई, कृपया बाद में फिर कोशिश करें।"
            : "I couldn’t respond right now. Please try again later."),
        false
      );
    } catch (err) {
      console.error(err);
      typingDiv.remove();
      addChatMessage(
        currentLang === "hi"
          ? "कोई त्रुटि आ गई। कृपया अपना इंटरनेट या सर्वर जांचें।"
          : "Something went wrong. Please check your server or internet.",
        false
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.href = "auth.html";  // your login + signup page
        });
    }
});