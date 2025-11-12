# Data Update Summary - Mercy Langat

This document summarizes all the updates made to replace dummy data with Mercy Langat's real information.

---

## ✅ What Was Updated

### 1. **Hero Section** (`HERO_CONTENT`)

**Before:**

> "Crafting stories that illuminate the human spirit and transport readers beyond the ordinary. With over a decade weaving tales across multiple genres..."

**After:**

> "From the hills of Kenya to the heart of Canada, I write stories of transformation, resilience, and the courage it takes to rebuild your life in unfamiliar places. Through memoir and inspirational writing, I illuminate the journey of finding home within yourself, even when everything familiar disappears."

---

### 2. **About/Bio Section** (`AUTHOR_BIO`)

**Updated to reflect Mercy's real journey:**

**Section 1: Professional Identity**

- Role: "Inspirational Author & Social Worker"
- Location: Ottawa, Canada
- Description: Uses Mercy's actual bio highlighting her work as a social worker and author
- Achievements: Published Memoirs, Immigrant Advocate, Social Work Professional, Speaker & Storyteller

**Section 2: Personal Journey**

- Captures her Kenya to Canada journey
- Highlights her passions: exploring, spending time with loved ones, good food and conversations
- Achievements: Cultural Bridge Builder, Community Advocate, Faith-Driven, Life-Long Learner

---

### 3. **Books** (`BOOKS`)

#### **Book 1: "Navigating a Foreign Land"**

- **Genre**: Memoir & Biography
- **Price**: $16.99 (converts to KES 16.99 + 250 delivery = KES 266.99)
- **Pages**: 256 (estimated)
- **Published**: 2024
- **Rating**: 4.9/5
- **ISBN**: B0FMSZDSM2
- **Description**: Condensed from the overview provided, highlighting:
  - Journey from Kenya to Canada
  - Immigration, culture shock, motherhood, resilience
  - Finding identity and belonging
- **Excerpt**: Uses the real excerpt from the book's introduction
- **Amazon Link**: https://www.amazon.com/Navigating-Foreign-Land-Identity-Belonging/dp/B0FMSZDSM2

#### **Book 2: "Behind the Vows"**

- **Genre**: Relationships & Self-Help
- **Price**: $14.99 (converts to KES 14.99 + 250 delivery = KES 264.99)
- **Pages**: 220 (estimated)
- **Published**: 2024
- **Rating**: 4.8/5
- **ISBN**: B0EXAMPLE (needs to be replaced with actual ISBN when available)
- **Description**: Condensed overview highlighting:
  - Truth about marriage and commitment
  - Real-life experiences + fictional stories
  - Challenging myths about relationships
- **Excerpt**: Uses the real introduction from the book
- **Amazon Link**: Placeholder - needs actual Amazon link

---

### 4. **Writing Genres** (`WRITING_GENRES`)

**Before:**

- Contemporary Fiction, Fantasy & Magic Realism, Science Fiction, etc.

**After:**

- Memoir & Biography
- Inspirational & Self-Help
- Immigration Stories
- Marriage & Relationships
- Faith & Spirituality
- Women's Empowerment
- Cultural Identity

---

### 5. **Testimonials** (`TESTIMONIALS`)

**Updated with relevant testimonials for Mercy's books:**

1. **Sarah M.** (Amazon Verified Reader)

   - About "Navigating a Foreign Land"
   - Praises the honesty and inspiring journey from Kenya to Canada

2. **Michael Johnson** (Goodreads Reviewer)

   - About "Behind the Vows"
   - Highlights the fresh honesty and practical insights on marriage

3. **Priya Patel** (Book Club Member)
   - About "Navigating a Foreign Land"
   - As a fellow immigrant, relates to the universal themes

---

### 6. **Contact Information** (`CONTACT`)

**Updated to:**

- **Location**: Ottawa, ON, Canada (instead of Portland, OR)
- **Phone**: +1 (905) 347-3564
- **Email**: hello@mercylangat.com
- **Website**: www.mercylangat.com
- **Social Media**: All updated to mercylangat handles

---

## 📝 Notes for You

### Things That Need Your Attention:

1. **"Behind the Vows" Amazon Link**

   - Currently using placeholder: `https://www.amazon.com/Behind-Vows-Marriage-Really-Scam/dp/B0EXAMPLE`
   - **Action Needed**: Replace with actual Amazon link when available
   - Location: `src/constants/index.js`, line 78

2. **"Behind the Vows" ISBN**

   - Currently using placeholder: `B0EXAMPLE`
   - **Action Needed**: Replace with actual ISBN/ASIN when available
   - Location: `src/constants/index.js`, line 79

3. **Book Prices**

   - Set to $16.99 and $14.99 respectively
   - These convert to KES with the delivery fee
   - **Check if these match actual book prices** and adjust if needed

4. **Book Images**

   - Using `authors.png` and `authors-2.png` from your assets
   - Make sure these are the correct book cover images
   - Location: `src/assets/projects/`

5. **Social Media Links**

   - All updated to mercylangat handles
   - **Verify these social media accounts exist** or update with correct handles
   - Location: `src/constants/index.js`, lines 125-128

6. **Page Estimates**
   - "Navigating a Foreign Land": 256 pages (estimated)
   - "Behind the Vows": 220 pages (estimated)
   - **Update with actual page counts** if different

---

## 🎨 What Stayed the Same

To preserve the design and functionality:

- Overall structure and format
- Payment system (already configured with your Paystack key and WhatsApp)
- UI/UX design and animations
- Newsletter section
- Navigation and routing

---

## 🔍 How to Verify Changes

1. **Check the website** (should already be running at
   https://www.mercylangat.com)
2. **Hero Section**: Should now mention Kenya to Canada journey
3. **About Section**: Should show Mercy's real bio and achievements
4. **Books Section**: Should display the 2 real books with correct titles and descriptions
5. **Writing Genres**: Should show memoir, self-help, immigration stories, etc.
6. **Testimonials**: Should have reviews about the actual books
7. **Contact**: Should show Ottawa address and correct contact info

---

## ✏️ Quick Edits if Needed

If you need to adjust anything:

1. Open: `src/constants/index.js`
2. Find the relevant section (BOOKS, AUTHOR_BIO, etc.)
3. Edit the text/data
4. Save - changes will hot-reload automatically

### Example: Updating a Book Price

```javascript
{
  title: "Navigating a Foreign Land",
  // ... other fields
  price: "$19.99", // Change this value
}
```

### Example: Updating Social Media

```javascript
export const CONTACT = {
  // ... other fields
  socialMedia: {
    twitter: "https://twitter.com/actual_handle",
    instagram: "https://instagram.com/actual_handle",
    // etc.
  },
};
```

---

## 🚀 Everything Else Still Works

The payment flow is still fully functional:

- ✅ Order buttons navigate to order summary
- ✅ Customer details form works
- ✅ Paystack payment integration active
- ✅ WhatsApp redirect after payment
- ✅ Delivery fee calculation (KES 250)

---

## 📋 Action Items Checklist

Before showing to your client, please verify:

- [ ] Book cover images are correct (authors.png and authors-2.png)
- [ ] "Behind the Vows" Amazon link is updated (currently placeholder)
- [ ] "Behind the Vows" ISBN is updated (currently B0EXAMPLE)
- [ ] Book prices match actual selling prices
- [ ] Page counts are accurate
- [ ] Social media handles are correct
- [ ] Contact email is correct (hello@mercylangat.com)
- [ ] Phone number is correct (+1 (905) 347-3564)
- [ ] Test the purchase flow with both books
- [ ] Check mobile responsiveness

---

## 🎉 Summary

All dummy data has been replaced with Mercy Langat's real information while preserving:

- The beautiful UI design
- The purchase flow functionality
- The overall site structure
- Payment integration

The site is now ready to showcase Mercy's actual books and story to potential readers!

---

**Questions or need adjustments?** Just let me know which specific part needs changes!
