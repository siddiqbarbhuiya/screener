# 📜 Common Page Comment Header Standard

## Overview

All pages in the application now use a standardized comment header at the top of the file. This serves multiple purposes:
- Quick identification of page type
- Documentation of route and purpose
- Consistency across the codebase
- IDE navigation helper

---

## Format

```javascript
/**
 * @page PageName
 * @description Brief, clear description of what the page does
 * @route /actual-route-path
 * @component
 */
```

---

## Examples

### Terms & Conditions Page
```javascript
/**
 * @page TermsAndConditions
 * @description Displays the Terms & Conditions for the platform
 * @route /terms-and-conditions
 * @component
 */
```

### Privacy Policy Page
```javascript
/**
 * @page PrivacyPolicy
 * @description Displays the Privacy Policy for the platform
 * @route /privacy-policy
 * @component
 */
```

### Disclaimer Page
```javascript
/**
 * @page Disclaimer
 * @description Displays important disclaimers for the platform
 * @route /disclaimer
 * @component
 */
```

### About Page
```javascript
/**
 * @page About
 * @description Displays information about the Indian Stock Screener platform
 * @route /about
 * @component
 */
```

### Contact Page
```javascript
/**
 * @page Contact
 * @description Contact form and information for the platform
 * @route /contact
 * @component
 */
```

### FAQ Page
```javascript
/**
 * @page FAQ
 * @description Frequently Asked Questions about the platform
 * @route /faq
 * @component
 */
```

---

## Benefits

| Benefit | Explanation |
|---------|------------|
| **Quick Navigation** | IDEs can show this in outline view |
| **Documentation** | Comments serve as inline documentation |
| **Consistency** | All pages follow same pattern |
| **Findability** | Easy to search for pages by route |
| **Clarity** | New developers understand purpose instantly |
| **Maintenance** | Easy to track what route serves what page |

---

## Usage in Your Codebase

### Finding Pages by Route
When you see a route in `App.jsx`:
```jsx
<Route path="/faq" element={<FAQ />} />
```

You can quickly find the page file and see its purpose from the comment header at the top.

### IDE Features
Many IDEs recognize these JSDoc-style comments and:
- Show them in breadcrumb navigation
- Display in outline/symbol explorer
- Use in autocomplete suggestions
- Generate from template shortcuts

---

## Applying to Existing Pages

### Existing Pages (Before this implementation)
- `Home.jsx` - Could benefit from comment
- `CompanyDashboard.jsx` - Could benefit from comment
- `Screener.jsx` - Could benefit from comment
- `Portfolio.jsx` - Could benefit from comment
- `DocumentAnalyzer.jsx` - Could benefit from comment
- `NotFound.jsx` - Could benefit from comment

### Optional: Update Existing Pages
If you want to standardize all pages, add the comment header to existing pages:

```javascript
/**
 * @page Home
 * @description Home page with trending stocks and market news
 * @route /
 * @component
 */

import { useState, useEffect } from 'react';
// ... rest of code
```

---

## Server-Side Comment Headers

Server files also follow similar patterns for consistency:

### Controller
```javascript
/**
 * @controller contactController
 * @description Handles contact form submissions
 */
```

### Routes
```javascript
/**
 * @routes contactRoutes
 * @description Routes for contact form submissions
 */
```

### Services
```javascript
/**
 * @service aiService
 * @description Handles AI-related API calls and processing
 */
```

### Utils
```javascript
/**
 * @util transformers
 * @description Utility functions for data transformation
 */
```

---

## Best Practices

### ✅ Do:
- Keep descriptions brief and clear
- Use the exact route path from App.jsx
- Always include all 4 tags (@page, @description, @route, @component)
- Update comment if you change routes
- Use camelCase for component names

### ❌ Don't:
- Make descriptions too long or rambling
- Use different route paths than configured
- Skip any of the JSDoc tags
- Use outdated information
- Create inconsistent formatting

---

## Quick Reference

All pages at a glance:

```
@page TermsAndConditions    → @route /terms-and-conditions
@page PrivacyPolicy         → @route /privacy-policy
@page Disclaimer            → @route /disclaimer
@page About                 → @route /about
@page Contact               → @route /contact
@page FAQ                   → @route /faq
@page Home                  → @route /
@page CompanyDashboard      → @route /company/:symbol
@page Screener              → @route /screens
@page Portfolio             → @route /portfolio
@page DocumentAnalyzer      → @route /document-analyzer
@page NotFound              → @route * (catch-all)
```

---

## Integration Tips

### For Team Development
- Add this standard to your CONTRIBUTION_GUIDELINES.md
- New contributors should follow this pattern
- Code reviews can check for compliance
- Helps maintain consistency

### For IDE Setup
- VS Code: Use Comment Anchors extension to highlight
- WebStorm: Built-in outline view shows these
- VIM: Can configure folding to use JSDoc

---

## Conclusion

This common comment header standard provides:
1. ✅ Clear documentation
2. ✅ Consistency across codebase
3. ✅ Quick navigation
4. ✅ Future maintainability
5. ✅ Team collaboration aid

**Recommended for all new pages and components!**

---

Created: April 2026 | Version: 1.0 | Status: ✅ Complete
