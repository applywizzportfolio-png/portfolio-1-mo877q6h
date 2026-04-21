/**
 * usePortfolioData
 * ----------------
 * Fetches /portfolioData.json at runtime.
 * The server writes this file into public/ before Vite starts.
 *
 * Returns { data, loading, error }.
 */

import { useState, useEffect } from 'react';

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  leetcode: string;
  hackerrank: string;
  portfolio: string;
}

export interface ParsedExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  bullets: string;           // newline-separated bullet points
}

export interface ParsedEducation {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  socialLinks: SocialLinks;
  summary: string;
  targetRole?: string;
  skills: string[];
  experiences: ParsedExperience[];
  educations: ParsedEducation[];
  projects: string;           // newline-separated project descriptions
  certifications: string;     // newline-separated
  custom: any[];
}

const EMPTY: PortfolioData = {
  personal: { name: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '' },
  socialLinks: { linkedin: '', github: '', twitter: '', leetcode: '', hackerrank: '', portfolio: '' },
  summary: '',
  targetRole: '',
  skills: [],
  experiences: [],
  educations: [],
  projects: '',
  certifications: '',
  custom: [],
};

export function usePortfolioData() {
  const [data, setData]       = useState<PortfolioData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    fetch('/portfolioData.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: PortfolioData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[usePortfolioData] Failed to load portfolioData.json:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Parse a newline/bullet-separated string into an array of non-empty lines */
export function parseLines(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/\n|•|–|-(?=\s)/)
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Parse certifications string into [{name, issuer}] pairs */
export function parseCertifications(raw: string | undefined): { name: string; issuer: string }[] {
  const lines = parseLines(raw);
  return lines.map((line) => {
    // Format: "Cert Name (Issuer)" or "Cert Name - Issuer"
    const parenMatch = line.match(/^(.+?)\s*\((.+?)\)\s*$/);
    if (parenMatch) return { name: parenMatch[1].trim(), issuer: parenMatch[2].trim() };
    const dashMatch = line.match(/^(.+?)\s*[-–]\s*(.+)$/);
    if (dashMatch) return { name: dashMatch[1].trim(), issuer: dashMatch[2].trim() };
    return { name: line, issuer: '' };
  });
}

/** Parse projects string into structured project objects */
export function parseProjects(raw: string | undefined): { title: string; description: string; tech: string[] }[] {
  if (!raw) return [];
  // Projects separated by double newline or "###"
  const blocks = raw.split(/\n{2,}|###/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const title = lines[0] || 'Project';
    const description = lines.slice(1).join(' ') || '';
    // Extract tech keywords in parentheses or after "Tech:" marker
    const techMatch = block.match(/Tech(?:nologies|nology|Stack|s)?:\s*(.+)/i);
    const tech = techMatch
      ? techMatch[1].split(/,|\//).map((t) => t.trim()).filter(Boolean)
      : [];
    return { title, description, tech };
  });
}
