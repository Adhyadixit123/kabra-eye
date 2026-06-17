"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_viral: boolean;
}

export function FaqSearch({ initialFaqs }: { initialFaqs: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchSuggestions = useCallback(async (term: string) => {
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`/api/faq-suggest?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      setSuggestions(data.suggestions ?? []);
    } catch {
      setSuggestions([]);
    }
  }, []);

  const searchFaqs = useCallback(async (term: string) => {
    if (!term.trim()) {
      setFaqs(initialFaqs);
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/faq-search?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      setFaqs(data.faqs ?? []);
    } catch {
      setFaqs(initialFaqs);
    } finally {
      setLoading(false);
    }
  }, [initialFaqs]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
      setShowSuggestions(true);
    }, 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    searchFaqs(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    searchFaqs(query);
  };

  const handleClear = () => {
    setQuery("");
    setFaqs(initialFaqs);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".faq-search-wrap")) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="faq-search-wrap">
      <form onSubmit={handleSubmit} className="faq-search-form">
        <Search size={18} className="faq-search-icon" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
          placeholder="Search questions..."
          className="faq-search-input"
          aria-label="Search FAQ questions"
        />
        {query && (
          <button type="button" onClick={handleClear} className="faq-search-clear" aria-label="Clear search">
            <X size={16} />
          </button>
        )}
        <button type="submit" className="faq-search-btn">Search</button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="faq-suggestions" role="listbox">
          {suggestions.map((s, i) => (
            <li key={i} role="option" onClick={() => handleSuggestionClick(s)} className="faq-suggestion-item">
              <Search size={14} aria-hidden />
              {s}
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="faq-loading">Searching...</p>}

      <div className="faq-results">
        {faqs.length === 0 ? (
          <p className="faq-no-results">No questions found. Try a different search.</p>
        ) : (
          faqs.map((faq, index) => (
            <details key={faq.id} open={index === 0 && !query} className={faq.is_viral ? "faq-viral" : ""}>
              <summary>
                {faq.question}
                {faq.is_viral && <span className="faq-viral-badge">Popular</span>}
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))
        )}
      </div>
    </div>
  );
}
