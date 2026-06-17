"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, MessageCircle, PhoneCall, Send } from "lucide-react";
import { services, site } from "@/data/site";

type FormState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  service: services[0].shortTitle,
  date: "",
  message: "",
};

export function AppointmentForm() {
  const [form, setForm] = useState(initialState);

  const whatsappHref = useMemo(() => {
    const text = [
      "Hello Kabra Eye Hospital, I want to book an appointment.",
      form.name ? `Name: ${form.name}` : "",
      form.phone ? `Phone: ${form.phone}` : "",
      form.service ? `Service: ${form.service}` : "",
      form.date ? `Preferred date: ${form.date}` : "",
      form.message ? `Message: ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/919529888000?text=${encodeURIComponent(text)}`;
  }, [form]);

  return (
    <section className="appointment-band" id="appointment" aria-labelledby="appointment-title">
      <div className="section-heading">
        <span>Book Consultation</span>
        <h2 id="appointment-title">A calmer appointment flow for eye care.</h2>
        <p>
          Share the basics and continue on WhatsApp, or call the hospital directly if you need
          urgent scheduling help.
        </p>
      </div>
      <div className="appointment-layout">
        <form className="appointment-form">
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Patient name"
              type="text"
            />
          </label>
          <label>
            Phone
            <input
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              placeholder="+91"
              type="tel"
            />
          </label>
          <label>
            Service
            <select
              value={form.service}
              onChange={(event) => setForm({ ...form, service: event.target.value })}
            >
              {services.map((service) => (
                <option key={service.slug} value={service.shortTitle}>
                  {service.shortTitle}
                </option>
              ))}
              <option>General Consultation</option>
            </select>
          </label>
          <label>
            Preferred Date
            <input
              value={form.date}
              onChange={(event) => setForm({ ...form, date: event.target.value })}
              type="date"
            />
          </label>
          <label className="full">
            Message
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="Briefly describe the concern"
              rows={4}
            />
          </label>
          <div className="form-actions">
            <a className="primary-button" href={whatsappHref} target="_blank" rel="noreferrer">
              <Send size={18} aria-hidden />
              Send on WhatsApp
            </a>
            <a className="secondary-button" href={site.phoneHref}>
              <PhoneCall size={18} aria-hidden />
              Call Now
            </a>
          </div>
        </form>
        <aside className="appointment-info">
          <CalendarCheck size={32} aria-hidden />
          <h3>Before your visit</h3>
          <p>
            Bring your current glasses, previous prescriptions, insurance/TPA card if applicable,
            and any eye reports or medicines you already use.
          </p>
          <a href={site.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden />
            Ask on WhatsApp
          </a>
        </aside>
      </div>
    </section>
  );
}

