"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";
import { personal } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

/* ── Types ── */
interface Form   { name: string; email: string; subject: string; message: string; }
interface Errors { name?: string; email?: string; subject?: string; message?: string; }

/* ── Floating label input ── */
function Field({
  id, label, value, onChange, error, multiline = false, type = "text",
}: {
  id: keyof Form; label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string; multiline?: boolean; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const shared = {
    id, name: id, value, onChange,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
    className: "w-full pt-6 pb-2 px-4 text-sm text-white bg-transparent outline-none resize-none placeholder-transparent",
    placeholder: label,
  };
  return (
    <div>
      <div
        className="relative rounded-xl border overflow-hidden transition-all duration-300"
        style={{
          background:   "rgba(255,255,255,0.025)",
          borderColor:  error ? "rgba(255,80,80,0.4)" : focused ? "rgba(255,0,60,0.45)" : "rgba(255,255,255,0.07)",
          boxShadow:    focused ? "0 0 0 3px rgba(255,0,60,0.07)" : "none",
        }}
      >
        <label
          htmlFor={id}
          className="absolute left-4 pointer-events-none select-none transition-all duration-200"
          style={{
            top:           active ? "8px" : multiline ? "18px" : "50%",
            transform:     !multiline && !active ? "translateY(-50%)" : "none",
            fontSize:      active ? "9px" : "12px",
            color:         error ? "rgba(255,80,80,0.8)" : focused ? "#FF5E7A" : "rgba(255,255,255,0.3)",
            letterSpacing: active ? "0.1em" : "0",
            textTransform: active ? "uppercase" : "none",
          }}
        >
          {label}
        </label>
        {multiline
          ? <textarea rows={5} {...shared} />
          : <input type={type} {...shared} />}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 mt-1 text-xs pl-1"
            style={{ color: "rgba(255,80,80,0.8)" }}
          >
            <AlertCircle size={10} />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main section ── */
export default function Contact() {
  const { ref, inView } = useInView();
  const [form,   setForm]   = useState<Form>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim())   e.name    = "Name is required";
    if (!form.email.trim())  e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 10) e.message = "At least 10 characters";
    return e;
  };

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof Errors]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1800));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const socials = [
    { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
    { icon: Github,   href: personal.github,   label: "GitHub"   },
    { icon: Mail,     href: `mailto:${personal.email}`, label: "Email" },
  ];

  const contactItems = [
    { icon: Mail,   val: personal.email,    href: `mailto:${personal.email}` },
    { icon: Phone,  val: personal.phone,    href: `tel:${personal.phone}`    },
    { icon: MapPin, val: personal.location, href: null                       },
  ];

  return (
    <section id="contact" className="section-pad relative" style={{ background: "#050505" }}>
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,0,60,0.06), transparent 70%)", filter: "blur(50px)" }}
      />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16"
        >
          <div className="section-subtitle mb-3">Contact</div>
          <h2 className="section-title text-chrome">Get In Touch</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* ── Left info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col justify-between gap-10"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Ready to connect</h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                {"I'm actively seeking internships and enterprise technology roles. Reach out to discuss how I can contribute to your team."}
              </p>

              <div className="space-y-4">
                {contactItems.map(({ icon: Icon, val, href }) => (
                  <div key={val} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.07]"
                      style={{ background: "rgba(255,0,60,0.08)" }}
                    >
                      <Icon size={13} style={{ color: "#FF003C" }} />
                    </div>
                    {href
                      ? <a href={href} className="text-sm text-white/50 hover:text-white transition-colors">{val}</a>
                      : <span className="text-sm text-white/50">{val}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-widest text-white/25 uppercase font-mono mb-4">Find me on</div>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/[0.07] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-red/30"
                    style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.45)" }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <div className="glass-red rounded-3xl p-8 relative overflow-hidden">
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,0,60,0.08), transparent 70%)", filter: "blur(30px)" }}
              />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5 border border-red/25"
                      style={{ background: "rgba(255,0,60,0.1)" }}
                    >
                      <CheckCircle size={28} style={{ color: "#FF003C" }} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {"Thank you — I'll respond within 24 hours."}
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 px-5 py-2 text-xs rounded-xl border border-white/10 text-white/40 hover:text-white transition-all"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={submit} noValidate className="space-y-4 relative z-10"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field id="name"    label="Your Name"     value={form.name}    onChange={change} error={errors.name} />
                      <Field id="email"   label="Email Address" type="email" value={form.email} onChange={change} error={errors.email} />
                    </div>
                    <Field id="subject" label="Subject"       value={form.subject} onChange={change} error={errors.subject} />
                    <Field id="message" label="Your Message"  value={form.message} onChange={change} error={errors.message} multiline />

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-red w-full justify-center disabled:opacity-60"
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    >
                      {status === "sending" ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Sending…
                        </>
                      ) : (
                        <><Send size={14} /> Send Message</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
