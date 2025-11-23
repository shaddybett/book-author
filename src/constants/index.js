import book3 from "../assets/projects/author-s.webp";
import book4 from "../assets/projects/vows.webp";
// Children's books
import book1 from "../assets/projects/itikadi.webp";
import abc from "../assets/projects/abc.webp";
import book2 from "../assets/projects/kiswahili.webp";
import book1excerpt from "../assets/projects/book2-excerpt.jpeg";
import abcexcerpt from "../assets/projects/abc-excerpt.webp";
import book2excerpt from "../assets/projects/book2-excerpt.webp";

export const HERO_CONTENT = `From the hills of Kenya to the heart of Canada, I write stories of transformation, resilience, and the courage it takes to rebuild your life in unfamiliar places. Through memoir and inspirational writing, I illuminate the journey of finding home within yourself, even when everything familiar disappears.`;

export const AUTHOR_BIO = [
  {
    year: "2020 – Present",
    role: "Inspirational Author & Social Worker",
    company: "Ottawa, Canada",
    description: `Mercy Langat is an emerging social worker and inspirational author based in Ottawa, Canada, where she lives with her young family of three. Passionate about human connection and personal growth, she writes to inspire healing, hope, and authenticity in everyday life. Her work reflects a deep belief in resilience, love, and the power of stories to transform lives.`,
    achievements: [
      "Published Memoirs",
      "Immigrant Advocate",
      "Social Work Professional",
      "Speaker & Storyteller"
    ],
  },
  {
    year: "Journey & Passion",
    role: "Writer, Connector, Dreamer",
    company: "Kenya to Canada",
    description: `When not writing, Mercy enjoys exploring new places, spending quality time with loved ones, and sharing laughter with friends over good food and great conversations. Her journey from Kenya to Canada has shaped her unique perspective on identity, belonging, and what it means to call a place home.`,
    achievements: [
      "Cultural Bridge Builder",
      "Community Advocate",
      "Faith-Driven",
      "Life-Long Learner"
    ],
  }
];

export const BOOKS = [
  {
    title: "Navigating a Foreign Land",
    image: book3,
    description:
      "A deeply personal and inspiring memoir taking readers on a transformative journey from the hills of Kenya to the cold streets of Canada. With raw honesty and quiet strength, Mercy shares her story of immigration, culture shock, motherhood, and resilience. More than geographical relocation, it's about the emotional landscapes we traverse when we leave home in search of security, identity, and purpose.",
    genre: "Memoir & Biography",
    priceKES: "1500",
    priceUSD: "20",
    purchaseLink:
      "https://www.amazon.com/Navigating-Foreign-Land-Identity-Belonging/dp/B0FMSZDSM2",
    isbn: "B0FMSZDSM2",
    publishedYear: "2024",
    rating: 4.9,
    pages: 125,
    excerpt:
      "Moving across continents isn't just a change in geography, it is a leap into the unknown. It means leaving behind the familiar rhythms of home, the sights and sounds that ground you, and stepping into a world where everything feels slightly offbeat...",
  },
  {
    title: "Behind the Vows",
    image: book4,
    description:
      "Is marriage really a scam? This powerful book takes readers on a heartfelt journey through the truth about love, commitment, and the realities that come after saying 'I do.' Blending real-life experiences with compelling stories, it opens the curtain on what truly happens when romance meets responsibility. Behind the Vows explores the beauty and battles of marriage, challenging myths and offering hope to anyone questioning whether true love still exists.",
    genre: "Relationships & Self-Help",
    priceKES: "1500",
    priceUSD: "20",
    purchaseLink:
      "https://www.amazon.com/Behind-Vows-Marriage-Really-Scam/dp/B0EXAMPLE",
    isbn: "B0EXAMPLE",
    publishedYear: "2024",
    rating: 4.8,
    pages: 125,
    excerpt:
      "Those who know me personally might be wondering: 'What does she know about marriage? Only ten years into it, and she's just 32!' Well, I understand ten years may not be a lifetime, but it is long enough to see patterns, to experience highs and lows, and to learn lessons that can't be taught in theory...",
  },
  {
    title: "ABC Bible",
    image: abc,
    description:
      "ABC Bible takes little readers on a joyful journey through God's Word—from A for Abraham to Z for Zion. Each letter introduces a simple, meaningful Bible verse that helps children learn the alphabet while discovering God's love. Ideal for bedtime reading, Sunday school, or family devotion time, this book plants seeds of faith that will grow throughout a child's life. 30 pages.",
    genre: "Children's Educational / Faith-Based",
    priceKES: "1200",
    priceUSD: "14.99",
    purchaseLink:
      "https://www.amazon.com/Navigating-Foreign-Land-Identity-Belonging/dp/B0FMSZDSM2",
    isbn: "978-1234567891",
    publishedYear: "2023",
    rating: 4.8,
    pages: 30,
    excerptImage: abcexcerpt,
  },
  {
    title: "Kiswahili Lugha Yetu",
    image: book2,
    description:
      "Kiswahili Lugha Yetu is a bright and engaging beginner's guide designed to help young learners discover the beauty of the Swahili language. Through colorful illustrations and simple, familiar words, children explore the alphabet, learn the names of fruits, vegetables, and everyday objects, and practice easy sentences that build confidence. This delightful book makes language learning fun, interactive, and inspiring — perfect for children, beginners, or anyone starting their Kiswahili journey.",
    genre: "Children's Educational / Language Learning",
    priceKES: "1200",
    priceUSD: "14.99",
    purchaseLink:
      "https://www.amazon.com/Navigating-Foreign-Land-Identity-Belonging/dp/B0FMSZDSM2",
    isbn: "978-1-234567-891",
    publishedYear: "2024",
    rating: 4.9,
    pages: 35,
    excerptImage: book2excerpt,
  },
  {
    title: "Itikadi za Kiswahili",
    image: book1,
    description:
      "Itikadi za Kiswahili welcomes young learners into a vibrant world of color, creativity, and discovery. Inside, children explore everyday greetings, bright colors, fun numbers, fascinating facts about the human body, and exciting wild animals. With simple language and joyful illustrations, this book makes learning Swahili both fun and meaningful. Perfect for toddlers, preschoolers, and beginners learning Swahili as a second language. 45 pages.",
    genre: "Children's Educational / Language Learning",
    priceKES: "1200",
    priceUSD: "14.99",
    purchaseLink:
      "https://www.amazon.com/Navigating-Foreign-Land-Identity-Belonging/dp/B0FMSZDSM2",
    isbn: "978-1234567890",
    publishedYear: "2023",
    rating: 4.8,
    pages: 45,
    excerptImage: book1excerpt,
  }
];

export const WRITING_GENRES = [
  "Memoir & Biography",
  "Inspirational & Self-Help",
  "Immigration Stories",
  "Marriage & Relationships",
  "Faith & Spirituality",
  "Women's Empowerment",
  "Cultural Identity"
];

export const TESTIMONIALS = [
  {
    quote:
      "Mercy Langat writes with raw honesty and quiet strength. Her memoir took me on a journey I'll never forget—from Kenya to Canada, from uncertainty to belonging. A truly inspiring read.",
    author: "Sarah M.",
    title: "Amazon Verified Reader",
    rating: 5,
  },
  {
    quote:
      "Behind the Vows challenged everything I thought I knew about marriage. Mercy's honesty is refreshing, and her insights are both practical and profound. A must-read for anyone in a relationship.",
    author: "Michael Johnson",
    title: "Goodreads Reviewer",
    rating: 5,
  },
  {
    quote:
      "As an immigrant myself, Navigating a Foreign Land spoke to my soul. Mercy captures the loneliness, the hope, and the strength it takes to start over. Her story is universal and deeply personal at the same time.",
    author: "Priya Patel",
    title: "Book Club Member",
    rating: 5,
  },
];

export const CONTACT = {
  address: "Ottawa, ON, Canada",
  phoneNo: "+254 713 315 219",
  email: "merchepkim@gmail.com",
  website: "www.mercylangat.com",
  socialMedia: {
    twitter:
      "https://x.com/mercy_blangat?s=21&t=4fV5qSts1bEuUpkaD9IWUg",
    instagram: "https://www.instagram.com/mercy_chep_/",
    facebook: "https://www.facebook.com/Mer.langat",
    goodreads: "https://goodreads.com/mercylangat",
  },
};

export const NEWSLETTER = {
  headline: "Join the Story Circle",
  description:
    "Get exclusive book updates, behind-the-scenes insights, early chapter previews, and special reader-only content delivered to your inbox monthly.",
  benefits: [
    "Early access to new releases",
    "Exclusive short stories",
    "Behind-the-scenes writing process",
    "Book recommendations",
    "Virtual event invitations"
  ],
};

export const PAYMENT_CONFIG = {
  paystackPublicKey:
    "pk_test_00e40d5cd3e321a68b22aad7e1c42a62f8587d4c",
  whatsappNumber: "19053473564",
  deliveryFee: 0,
  currency: "KES",
};
