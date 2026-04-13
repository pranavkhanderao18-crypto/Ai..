"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

type AppState = "idle" | "preview" | "processing" | "done";

export default function Dashboard() {
  const router = useRouter();
  const [state, setState] = useState<AppState>("idle");
  const [fileName, setFileName] = useState("");
  const [credits, setCredits] = useState(10);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [processedUrl, setProcessedUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState<{id: string, original: string, processed: string}[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem("humanize_credits_state");
    
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        setCredits(parsed.credits);
      } else {
        localStorage.setItem("humanize_credits_state", JSON.stringify({ credits: 10, date: today }));
      }
    } else {
      localStorage.setItem("humanize_credits_state", JSON.stringify({ credits: 10, date: today }));
    }
  }, []);

  const updateCredits = (newCredits: number | ((prev: number) => number)) => {
    setCredits((prev) => {
      const nextCredits = typeof newCredits === 'function' ? newCredits(prev) : newCredits;
      localStorage.setItem("humanize_credits_state", JSON.stringify({ credits: nextCredits, date: new Date().toDateString() }));
      return nextCredits;
    });
  };

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    setState("preview");
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDownload = (withWatermark: boolean) => {
    const cost = withWatermark ? 2 : 3;
    if (credits < cost) {
      setShowUpgradeModal(true);
      return;
    }
    
    const img = new window.Image();
    img.src = processedUrl;
    img.onload = () => {
      updateCredits((prev) => prev - cost);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.filter = "saturate(120%) contrast(110%) brightness(105%)";
        ctx.drawImage(img, 0, 0);
        ctx.filter = "none";
        
        if (withWatermark) {
          ctx.font = `bold ${Math.max(24, Math.floor(img.width / 10))}px Arial`;
          ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Create diagonal watermark pattern across image
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(-Math.PI / 6);
          ctx.fillText("HumanizeAI", 0, 0);
          ctx.rotate(Math.PI / 6);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg", 0.95);
        link.download = withWatermark ? "enhanced-watermark.jpg" : "enhanced-hd.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    img.onerror = () => {
      alert("Error generating the downloaded image.");
    };
  };


  const humanize = async () => {
    setState("processing");
    
    try {
      // Create a dummy form data to simulate sending the image to our API route
      const formData = new FormData();
      formData.append("filename", fileName);
      
      const res = await fetch("/api/process-image", {
        method: "POST",
        body: formData
      });
      
      if (res.ok) {
        // Set processed image - for now we use the same URL but will add CSS enhancements 
        // to show the immediate visual difference until real AI returns a new Image URL.
        setProcessedUrl(previewUrl);
        setState("done");
        // Add to recent history
        setHistory(prev => {
          // avoid duplicates if re-humanizing the exact same session repeatedly
          // but we will just unshift it for demo
          return [{ id: Date.now().toString(), original: previewUrl, processed: previewUrl }, ...prev];
        });
      } else {
        throw new Error("API Failed");
      }
    } catch (e) {
      console.error(e);
      // Fallback
      setProcessedUrl(previewUrl);
      setState("done");
    }
  };

  const reset = () => {
    setState("idle");
    setFileName("");
    setPreviewUrl("");
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.header}>
          <div className={styles.headerGlow}></div>
          <h1 className={styles.title}>
            Elevate your{" "}
            <span className="gradient-text">Visual Identity</span>
          </h1>
          <p className={styles.subtitle}>
            Our neural engine transforms synthetic textures into hyper-realistic
            human aesthetics. Precision in every pixel.
          </p>
        </section>

        {/* Upload Canvas + Controls */}
        <section className={styles.workspace}>
          {/* Sidebar Controls */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.creditsDisplay}>
                <span>Daily Credits:</span>
                <span className={styles.creditAmount}>{credits} / 10</span>
              </div>
              <span className={styles.sidebarLabel}>Engine Settings</span>
              <div className={styles.sliders}>
                <div className={styles.sliderRow}>
                  <div className={styles.sliderMeta}>
                    <span>Humanization Strength</span>
                    <span className={styles.sliderValue}>85%</span>
                  </div>
                  <div className={styles.sliderTrack}>
                    <div
                      className={styles.sliderFill}
                      style={{ width: "85%", background: "var(--primary)", boxShadow: "0 0 8px rgba(129,233,255,0.5)" }}
                    ></div>
                  </div>
                </div>
                <div className={styles.sliderRow}>
                  <div className={styles.sliderMeta}>
                    <span>Texture Softness</span>
                    <span className={styles.sliderValue}>42%</span>
                  </div>
                  <div className={styles.sliderTrack}>
                    <div
                      className={styles.sliderFill}
                      style={{ width: "42%", background: "var(--secondary)" }}
                    ></div>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Main Upload Panel */}
          <div className={styles.canvas}>
            <div className={styles.canvasPanel}>
              {/* Idle — drop zone */}
              {state === "idle" && (
                <div
                  className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ""}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={onDrop}
                  onClick={() => inputRef.current?.click()}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={onFileSelect}
                    hidden
                  />
                  <div className={styles.uploadIcon}>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "2.5rem", color: "var(--primary)" }}
                    >
                      cloud_upload
                    </span>
                  </div>
                  <h3 className={styles.dropTitle}>Drop your image here</h3>
                  <p className={styles.dropSub}>
                    Supports JPG and PNG up to 5MB
                  </p>
                  <button className={styles.browseBtn} type="button">
                    Browse Files
                  </button>
                </div>
              )}

              {/* Preview */}
              {state === "preview" && (
                <div className={styles.previewState}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={styles.previewImg}
                  />
                  <div className={styles.previewOverlay}>
                    <p className={styles.previewFileName}>{fileName}</p>
                    <div className={styles.previewActions}>
                      <button className="btn-primary" onClick={humanize}>
                        <span className="material-symbols-outlined">auto_fix</span>
                        Humanize Image
                      </button>
                      <button className="btn-primary" style={{ background: "var(--surface-variant)", color: "#fff", border: "1px solid rgba(129, 233, 255, 0.4)" }} onClick={() => router.push('/pricing')}>
                        <span className="material-symbols-outlined">tune</span>
                        Edit Manually (Pro)
                      </button>
                      <button className="btn-secondary" onClick={reset}>
                        Change Image
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Processing */}
              {state === "processing" && (
                <div className={styles.processingState}>
                  <div className={styles.loader}></div>
                  <span className={styles.processingLabel}>Processing</span>
                  <h4 className={styles.processingText}>
                    Refining Skin Textures...
                  </h4>
                  <p className={styles.processingNote}>
                    Optimizing features... almost done!
                  </p>
                </div>
              )}

              {/* Done — Result */}
              {state === "done" && (
                <div className={styles.doneState}>
                  <div className={styles.resultGrid}>
                    <div className={styles.resultCard}>
                      <img
                        src={previewUrl}
                        alt="Original"
                        className={styles.resultImg}
                      />
                      <div className={styles.resultBadge}>Before</div>
                    </div>
                    <div className={`${styles.resultCard} ${styles.resultAfter}`}>
                      <img
                        src={processedUrl}
                        alt="Humanized"
                        className={styles.resultImg}
                        style={{ filter: "saturate(1.2) contrast(1.1) brightness(1.05)" }}
                      />
                      <div className={styles.resultBadgeAfter}>
                        Humanized AI
                      </div>
                      <div className={styles.resultTags}>
                        <span>4K Rendering</span>
                        <span>PBR Shaders</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.resultActions}>
                    <button className="btn-primary" onClick={() => handleDownload(true)}>
                      <span className="material-symbols-outlined">download</span>
                      Watermark (2 Credits)
                    </button>
                    <button className="btn-primary" style={{ background: "var(--primary)", color: "#000" }} onClick={() => handleDownload(false)}>
                      <span className="material-symbols-outlined">workspace_premium</span>
                      Download HD (3 Credits)
                    </button>
                    <button className="btn-secondary" onClick={reset}>
                      Humanize Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Past Images History */}
        {history.length > 0 && (
          <section className={styles.historySection}>
            <div className={styles.historyHeader}>
              <h2 className={styles.historyTitle}>Recent Enhancements</h2>
            </div>
            <div className={styles.historyGrid}>
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className={styles.historyCard}
                  onClick={() => {
                    setPreviewUrl(item.original);
                    setProcessedUrl(item.processed);
                    setState("done");
                    // Scroll to top to see before/after
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img 
                    src={item.processed} 
                    alt="Recent generation" 
                    className={styles.historyImg}
                    style={{ filter: "saturate(1.2) contrast(1.1) brightness(1.05)" }}
                  />
                  <div className={styles.historyOverlay}>
                    <button className={styles.historyBtn} onClick={(e) => {
                      e.stopPropagation(); // prevent clicking from triggering the card click
                      alert("Download from the main workspace above!");
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>open_in_full</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {showUpgradeModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <span className="material-symbols-outlined" style={{ fontSize: "3rem", color: "var(--error)" }}>error</span>
              <h2>Out of Credits</h2>
              <p>You need more credits to perform this action. Upgrade your subscription to continue.</p>
              <div className={styles.modalActions}>
                <button className="btn-secondary" onClick={() => setShowUpgradeModal(false)}>Cancel</button>
                <button className="btn-primary" onClick={() => router.push('/pricing')}>Buy Subscription</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
