# 🗺️ Visual Site Map & Navigation Guide

## Overall Site Structure

```
Indian Stock Screener
│
├── Main Pages
│   ├── / (Home)
│   ├── /company/:symbol (Company Dashboard)
│   ├── /screens (Screener)
│   ├── /portfolio (Portfolio)
│   └── /document-analyzer (Document Analyzer)
│
├── Legal & Compliance Pages ✅ NEW
│   ├── /disclaimer ⚠️ (Important!)
│   ├── /terms-and-conditions
│   ├── /privacy-policy
│   └── Footer Links
│
├── Information Pages ✅ NEW
│   ├── /about
│   ├── /contact
│   └── /faq
│
└── Error Pages
    └── /* (404 Not Found)
```

---

## Navigation Flow

### From Any Page → Footer → Legal Pages

```
┌─────────────────────────────────────┐
│         Any Page on Site            │
│                                     │
│    ┌──────────────────────────┐    │
│    │    Main Content Area     │    │
│    └──────────────────────────┘    │
│                                     │
│    ┌──────────────────────────┐    │
│    │       Footer             │    │
│    │ • About  • FAQ           │    │
│    │ • Terms  • Privacy       │    │
│    │ • Disclaimer • Contact   │    │
│    └──────────────────────────┘    │
└─────────────────────────────────────┘
         ↓ (Click Link)
         
┌─────────────────────────────────────┐
│    Legal/Info Page Loads            │
│    (All have same layout)            │
│    • Header with title               │
│    • Main content                    │
│    • Call-to-action (if relevant)    │
│    • Footer                          │
└─────────────────────────────────────┘
```

---

## Page Hierarchy

### By Importance

```
🔴 Critical Pages (MUST HAVE)
├── /disclaimer ⚠️ (Legal protection)
├── /terms-and-conditions (Legal agreement)
└── /privacy-policy (Data protection)

🟡 Important Pages (SHOULD HAVE)
├── /about (Trust building)
├── /contact (User support)
└── /faq (Self-service help)
```

### By User Journey

```
New Visitor
    ↓
1. Home Page (/)
    ↓
2. Browse (Screener, Company Pages)
    ↓
3. Questions? → FAQ (/faq)
    ↓
4. More Info? → About (/about)
    ↓
5. Contact? → Contact (/contact)
    ↓
6. Legal Docs? → Terms/Privacy/Disclaimer
```

---

## Page Content Overview

### 1. 🏠 Home Page (/)
- Purpose: Entry point, showcase features
- Footer: Present
- Link from: Direct URL

### 2. 📊 Screener (/screens)
- Purpose: Stock screening tool
- Footer: Present
- Link from: Navbar

### 3. 🏢 Company Dashboard (/company/:symbol)
- Purpose: Detailed company info
- Footer: Present
- Link from: Search, stock cards

### 4. 💼 Portfolio (/portfolio)
- Purpose: Portfolio tracking
- Footer: Present
- Link from: Navbar

### 5. 📄 Document Analyzer (/document-analyzer)
- Purpose: Document analysis
- Footer: Present
- Link from: Navbar

---

### 6. ⚠️ Disclaimer (/disclaimer) - NEW
```
Header: "Disclaimer"
Icon: AlertTriangle

Sections:
├── Critical Disclaimer Banner (RED)
├── 1. Not Financial Advice
├── 2. Data Accuracy Disclaimer
├── 3. Risk Warning
├── 4. External Links Disclaimer
├── 5. No Guarantee of Results
├── 6. Regulatory Compliance
├── 7. Limitation of Liability
└── Your Acknowledgment Section

CTA: Link to Contact page
```

### 7. 📋 Terms & Conditions (/terms-and-conditions) - NEW
```
Header: "Terms & Conditions"

Sections:
├── 1. Introduction
├── 2. Acceptance of Terms
├── 3. Use of Service
├── 4. User Responsibilities
├── 5. Financial Disclaimer (RED highlight)
├── 6. Limitation of Liability
├── 7. Termination
├── 8. Governing Law (India)
└── Questions Section

CTA: Link to Contact page
```

### 8. 🔐 Privacy Policy (/privacy-policy) - NEW
```
Header: "Privacy Policy"

Sections:
├── 1. Introduction
├── 2. Information We Collect
├── 3. Cookies & Tracking
├── 4. Data Storage & Security
├── 5. Third-Party Services
├── 6. Your Rights
├── 7. Children's Privacy
└── Contact Us Section

CTA: Link to Contact page
```

### 9. ℹ️ About Us (/about) - NEW
```
Header: "About Indian Stock Screener"
Hero Section: Gradient background

Content:
├── Mission Statement
├── Vision Statement
├── Core Values (4 cards)
├── What We Offer (4 feature cards)
├── Important Notice (YELLOW highlight)
└── Contact CTA

CTA: Link to Contact page
```

### 10. 📧 Contact Us (/contact) - NEW
```
Header: "Get in Touch"

Content:
├── Contact Info Cards (3)
│   ├── Email
│   ├── Location
│   └── Support
│
├── Contact Form
│   ├── Name (required)
│   ├── Email (required)
│   ├── Subject (required)
│   ├── Message (required)
│   ├── Submit Button
│   └── Status Messages
│
└── Response Time Notice

Form Integration: POST /api/contact
```

### 11. ❓ FAQ (/faq) - NEW
```
Header: "Frequently Asked Questions"

Categories:
├── 1. General (3 Q&A)
│   ├── What is this platform?
│   ├── Is it free?
│   └── Do I need to register?
│
├── 2. Data & Technical (3 Q&A)
│   ├── How is data fetched?
│   ├── Is it real-time?
│   └── Which stocks?
│
├── 3. Security & Privacy (3 Q&A)
│   ├── Is my data safe?
│   ├── Data storage?
│   └── Does it trade for me?
│
├── 4. Investment & Financial (4 Q&A)
│   ├── Can I use for automated trading?
│   ├── Are you a financial advisor?
│   ├── What does screener do?
│   └── Should I invest in results?
│
├── 5. Features & Usage (3 Q&A)
│   ├── How to create watchlist?
│   ├── Compare stocks?
│   └── Use charts?
│
└── 6. Troubleshooting (3 Q&A)
    ├── Why data N/A?
    ├── Slow platform?
    └── Report bug?

UI: Accordion expand/collapse
Total: 20+ Questions
```

---

## Footer Navigation Map

```
┌──────────────────────────────────────┐
│              FOOTER                  │
│  About  FAQ  Terms  Privacy  Disclaimer │
│                  Contact              │
│                                      │
│  © 2026 Indian Stock Screener        │
│  Data is for informational purposes  │
└──────────────────────────────────────┘
  ↓     ↓    ↓      ↓        ↓          ↓
 /a   /faq /t&c  /privacy /disclaimer /contact
```

---

## URL Structure

### Main Routes
```
Protocol://Domain/Route

http://localhost:5173/
http://localhost:5173/company/INFY
http://localhost:5173/screens
http://localhost:5173/portfolio
http://localhost:5173/document-analyzer
```

### Legal & Info Routes (NEW)
```
http://localhost:5173/about
http://localhost:5173/contact
http://localhost:5173/faq
http://localhost:5173/disclaimer
http://localhost:5173/terms-and-conditions
http://localhost:5173/privacy-policy
```

### Fallback
```
http://localhost:5173/* → 404 Not Found
```

---

## Color Coding Scheme

### Page Types by Color

```
🔵 Blue Pages (Standard Info)
├── /about (info)
├── /faq (questions)
├── /contact (forms)

🔴 Red Pages (Critical Legal)
├── /disclaimer (risk warning)
├── /terms-and-conditions (legal)
├── /privacy-policy (data protection)
```

### UI Color Scheme

```
Primary Color: Blue (#3B82F6)
├── Main buttons
├── Links
└── Accents

Warning Color: Red (#DC2626)
├── Disclaimer sections
├── Risk warnings
└── Important notices

Caution Color: Yellow (#CA8A04)
├── General cautions
├── Additional warnings
└── Notes

Neutral Color: Gray
├── Body text
├── Background
└── Borders
```

---

## Device Responsiveness

### All Pages Support

```
📱 Mobile (< 768px)
├── Single column layout
├── Stacked cards
├── Touch-friendly buttons
└── Readable text sizes

💻 Tablet (768px - 1024px)
├── Multi-column layout
├── Side-by-side content
└── Optimized spacing

🖥️ Desktop (> 1024px)
├── Full layout
├── Multiple columns
├── Enhanced spacing
└── Hover effects
```

---

## Accessibility Features

```
✅ All Pages Include:
├── Proper heading hierarchy (h1, h2, h3)
├── Image alt text
├── Form labels
├── Color contrast (WCAG AA)
├── Keyboard navigation
├── ARIA labels where needed
└── Semantic HTML

✅ Dark Mode:
├── All pages support
├── High contrast maintained
├── Eye-friendly backgrounds
└── Readable text
```

---

## SEO Structure

```
Each Page Has:
├── <title> Meta tag
├── <description> Meta tag
├── <h1> heading (unique)
├── Semantic HTML5
├── Proper heading hierarchy
├── Internal linking
├── Mobile-friendly design
└── Fast load times
```

---

## Load Flow Diagram

```
1. Browser requests page (e.g., /faq)
        ↓
2. Router matches route in App.jsx
        ↓
3. Component imported (lazy loading)
        ↓
4. Suspense shows LoadingSpinner
        ↓
5. Component renders with:
   ├── Layout wrapper
   ├── Navbar
   ├── IndicesTicker
   ├── Main content
   └── Footer
        ↓
6. SEO meta tags applied
        ↓
7. Page interactive
```

---

## Testing Navigation

### Quick Test Checklist
```
✅ Footer visible on all pages?
✅ All footer links clickable?
✅ Links go to correct pages?
✅ Back navigation works?
✅ Mobile menu works?
✅ Navbar works?
✅ Search navigation works?
✅ No broken links?
```

---

## Site Map Summary

| Page | Type | Status | Icon | CTA |
|------|------|--------|------|-----|
| Home | Main | ✅ | 🏠 | Browse |
| Screener | Main | ✅ | 📊 | Screen |
| Company | Main | ✅ | 🏢 | Analyze |
| Portfolio | Main | ✅ | 💼 | Track |
| Analyzer | Main | ✅ | 📄 | Upload |
| Disclaimer | Legal | ✅ NEW | ⚠️ | Acknowledge |
| Terms | Legal | ✅ NEW | 📋 | Accept |
| Privacy | Legal | ✅ NEW | 🔐 | Read |
| About | Info | ✅ NEW | ℹ️ | Learn |
| Contact | Info | ✅ NEW | 📧 | Contact |
| FAQ | Info | ✅ NEW | ❓ | Ask |
| 404 | Error | ✅ | ❌ | Go Home |

---

## Conclusion

Your platform now has:
- ✅ 5 main functional pages
- ✅ 6 new legal/info pages
- ✅ Complete footer navigation
- ✅ Consistent routing
- ✅ Professional site structure

**Total Pages: 11 + 404 error page = 12 unique pages**

---

Created: April 2026 | Status: ✅ COMPLETE
