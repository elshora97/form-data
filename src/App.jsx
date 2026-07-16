import React, { useState } from "react";
import { styles } from "./styles";

const FIELD_CONFIG = [
  { id: "fullName", label: "الاسم الرباعي", type: "text", placeholder: "مثال: أحمد محمد احمد علي" },
  { id: "studentPhone", label: "رقم الطالب", type: "tel", placeholder: "01xxxxxxxxx" },
  { id: "fatherPhone", label: "رقم ولي الامر", type: "tel", placeholder: "01xxxxxxxxx" },
  { id: "governorate", label: "القرية", type: "text", placeholder: "مثال: الدلجمون" },
];

function CandidatePortrait() {
  return (
    <div style={{
      width: "100%",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      overflow: "hidden",
      border: "4px solid #B8874E",
      boxShadow: "0 20px 40px -20px rgba(184,135,78,0.55)",
      background: "#FDF7EC",
    }}>
      <img
        src="/candidate.jpeg"
        alt="الدكتور محمد أشرف أبو عيسى"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function PhoneStoreIcon({ kind }) {
  if (kind === "android") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M17.6 9.48l1.84-3.18a.5.5 0 10-.87-.5l-1.86 3.22a10.4 10.4 0 00-9.42 0L5.43 5.8a.5.5 0 00-.87.5L6.4 9.48A9.9 9.9 0 002 17h20a9.9 9.9 0 00-4.4-7.52zM8 14a1 1 0 110-2 1 1 0 010 2zm8 0a1 1 0 110-2 1 1 0 010 2z" fill="currentColor"/>
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M16.365 1.43c0 1.14-.462 2.15-1.217 2.98-.82.9-2.16 1.6-3.28 1.51-.15-1.1.42-2.24 1.17-3.03.83-.87 2.28-1.53 3.33-1.46zM20.5 17.34c-.53 1.22-.78 1.77-1.47 2.85-.96 1.5-2.31 3.37-3.98 3.39-1.49.02-1.87-.97-3.89-.96-2.02.01-2.43.98-3.92.96-1.67-.02-2.95-1.7-3.91-3.19-2.68-4.14-2.96-9-.13-11.53 1.03-.92 2.24-1.44 3.37-1.46 1.42-.03 2.09.98 3.9.98 1.8 0 2.35-.99 3.94-.96 1.05.02 2.68.4 3.87 2.16-3.4 1.86-2.85 6.7.22 7.76z" fill="currentColor"/>
    </svg>
  );
}

const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzv8CEbkz7e8ekKSEpOgHYE1n44vGV36BgTi0lTWzMLUwQgq10aoQ5rB8s3Ma5oAmYgCA/exec";

export default function App() {
  const [values, setValues] = useState({});
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (id, val) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = FIELD_CONFIG.find((f) => !values[f.id]);
    if (missing) {
      setError(`فضلاً استكمل حقل "${missing.label}"`);
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Request failed");
      setShowModal(true);
      setValues({});
    } catch (err) {
      setError("حصلت مشكلة أثناء إرسال البيانات، حاول تاني.");
    } finally {
      setSending(false);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div dir="rtl" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; font-family: 'Cairo', sans-serif; }
        input:focus, select:focus, button:focus-visible {
          outline: 3px solid #B8874E;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .fade-in { animation: none !important; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeUp .5s ease both; }
        @media (max-width: 720px) {
          .hero-art { margin: 0 auto; }
          .hero-text { text-align: center; }
        }
      `}</style>

      {/* Hero: عنوان + رسمة */}
      <header style={styles.hero} className="fade-in">
        <div style={styles.heroText} className="hero-text">
          <span style={styles.freeBadge}>
            <span style={styles.freeBadgeDot}>★</span>
            المنصة مجانية تماما حتي استلام الكود مجاني
          </span>
          <h1 style={styles.title}>المنصة المجانية للباحث الكيميائى الدكتور محمد أشرف أبو عيسي</h1>
          <p style={styles.subtitle}>
            سجل بياناتك بصورة كاملة (امل الاربع خانات حتي يتم تسجيلك بطريقة صحيحة)
          </p>

          <div style={styles.heroFbCta}>
            <span style={styles.heroFbCtaText}>
        لابد من متابعة الصفحة الرسمية ووضعها في المفضلة ليصلك مكان استلام كود التسجيل في بلدك
            </span>
            <a
              href="https://www.facebook.com/share/1BinRx3oUD/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.heroFbCtaBtn}
            >
              لينك الصفحة
            </a>
          </div>
        </div>
        <div style={styles.heroArt} className="hero-art">
          <CandidatePortrait />
        </div>
      </header>


      {/* الفورم */}
      <main style={styles.card} className="fade-in">
        <h2 style={styles.cardTitle}>بيانات التسجيل</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {FIELD_CONFIG.map((field) => (
            <div key={field.id} style={styles.fieldWrap}>
              <label style={styles.label} htmlFor={field.id}>{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                style={styles.input}
                value={values[field.id] || ""}
                onChange={(e) => {
                  const val = field.type === "tel"
                    ? e.target.value.replace(/\D/g, "").slice(0, 11)
                    : e.target.value;
                  handleChange(field.id, val);
                }}
                inputMode={field.type === "tel" ? "numeric" : undefined}
                pattern={field.type === "tel" ? "01[0-9]{9}" : undefined}
                title={field.type === "tel" ? "رقم موبايل مصري مكون من 11 رقم يبدأ بـ 01" : undefined}
                required
              />
            </div>
          ))}

          {error && <p style={styles.errorText}>{error}</p>}

          <button type="submit" style={styles.submitBtn} disabled={sending}>
            {sending ? "جاري الإرسال..." : "إرسال البيانات"}
          </button>
        </form>
      </main>

            {/* بانر فيسبوك */}
            <section style={styles.fbBanner} className="fade-in">
        <div style={styles.fbTextWrap}>
          <h3 style={styles.fbTitle}>عشان توصلك كل التحديثات أول بأول</h3>
          <p style={styles.fbSubtitle}>اشترك في الصفحة الرسمية <strong style={{ color: "#FFFFFF", fontWeight: 800 }}>للباحث الكيميائى الدكتور محمد أشرف أبو عيسي</strong> على فيسبوك دلوقتي</p>
          <a
            href="https://www.facebook.com/share/1BinRx3oUD/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.fbInlineLink}
          >
            facebook.com/official-page
          </a>
        </div>
        <a
          href="https://www.facebook.com/share/1BinRx3oUD/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.fbBtn}
        >
          اشترك في الصفحة الرسمية
        </a>
      </section>

      {/* التحميل والخطوات */}
      <section style={styles.stepsSection} className="fade-in">
        <h2 style={styles.sectionTitle}>حمّل التطبيق واتبع الخطوات</h2>
        <p style={styles.sectionSubtitle}>متاح على أجهزة أندرويد (سامسونج وغيره) والآيفون</p>
        <p style={styles.sectionSubtitle}>ودي لينكات التحميل</p>

        <div style={styles.storeRow}>
          <a
            href="https://play.google.com/store/apps/details?id=com.ulearne.android.app"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.storeBtn}
          >
            <PhoneStoreIcon kind="android" />
            <span style={styles.storeBtnText}>
              <small>حمّله من</small>
              <strong>Google Play</strong>
            </span>
          </a>
          <a
            href="https://apps.apple.com/eg/app/ulearn/id1672078052"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.storeBtn}
          >
            <PhoneStoreIcon kind="ios" />
            <span style={styles.storeBtnText}>
              <small>حمّله من</small>
              <strong>App Store</strong>
            </span>
          </a>
        </div>

        <h3 style={styles.stepsHeading}>وبعد ما تنزل البرنامج، اتبع الخطوات دي بالترتيب</h3>
        <ol style={styles.stepsList}>
          {[
            "اضغط على Continue with Google",
            "اختار المرحلة: الثانوية العامة",
            "اختار باب الكيمياء العضوية",
            "اختار شراء الكورس عبر كود",
            "تابع الصفحة الرسمية عشان تعرف هتستلم الكود إزاي وفي معاد إيه في قريتك — لأنها هي صلة التواصل الوحيدة",
          ].map((text, i) => (
            <li key={i} style={styles.stepItem}>
              <span style={styles.stepNumber}>{i + 1}</span>
              <span style={styles.stepText}>{text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* بانر واتساب */}
      <section style={styles.waBanner} className="fade-in">
        <div style={styles.waTextWrap}>
          <h3 style={styles.waTitle}>اشترك في جروب الواتساب</h3>
          <p style={styles.waSubtitle}>
            عشان يوصلك كل الملفات والمذكرات والتحديثات اللي بترفع أول بأول، اشترك في جروب الواتساب الرسمي، مع العلم ان الارقام لن يتم الاطلاع عليها من قبل الاعضاء الاخرين
          </p>
        </div>
        <a
          href="https://whatsapp.com/channel/0029Vb8Ql04L2ATuhDQsXa2m"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.waBtn}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          اشترك في الجروب
        </a>
      </section>

      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalIcon}>✓</div>
            <h3 style={styles.modalTitle}>تم إرسال بياناتك بنجاح</h3>
            <p style={styles.modalText}>لابد من متابعة الصفحة الرسمية ووضعها في المفضلة ليصلك مكان استلام كود التسجيل في بلدك </p>
            <a
              href="https://www.facebook.com/share/1BinRx3oUD/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.modalBtn, display: "inline-block", textDecoration: "none" }}
              onClick={closeModal}
            >
              تمام
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
