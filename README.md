# Book Author Portfolio

A modern, elegant portfolio website for book authors built with React, Vite, Tailwind CSS, and integrated with Paystack for seamless book purchases.

![Homepage Screenshot](./src/screenshots/homepage.png)

## ✨ Features

- 📚 **Beautiful Book Showcase**: Display your published works with elegant cards and animations
- 🛒 **Integrated Purchase Flow**: Complete e-commerce flow with Paystack payment integration
- 💳 **Multiple Payment Methods**: Support for Visa, MasterCard, and M-Pesa via Paystack
- 📱 **WhatsApp Integration**: Automatic customer redirection to WhatsApp after purchase for delivery coordination
- 🎨 **Modern UI/UX**: Clean, responsive design with Framer Motion animations
- 📖 **Book Excerpts**: Allow readers to preview your work before purchasing
- ⭐ **Testimonials & Reviews**: Showcase reader reviews and ratings
- 📧 **Newsletter Signup**: Build your reader community
- 📞 **Contact Section**: Easy ways for readers to reach you

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 💳 Payment Setup

The site includes a complete purchase flow with Paystack integration. See [PAYMENT_SETUP.md](./PAYMENT_SETUP.md) for detailed configuration instructions.

### Quick Configuration

1. Get your Paystack public key from [Paystack Dashboard](https://dashboard.paystack.com)
2. Update `src/constants/index.js`:

```javascript
export const PAYMENT_CONFIG = {
  paystackPublicKey: "pk_test_your_key_here",
  whatsappNumber: "254700000000", // Your WhatsApp number
  deliveryFee: 250, // KES
  currency: "KES"
};
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Books.jsx       # Book showcase with purchase buttons
│   ├── Hero.jsx        # Hero section
│   ├── Navbar.jsx      # Navigation
│   ├── Contact.jsx     # Contact form
│   └── ...
├── pages/
│   └── OrderSummary.jsx # Purchase and payment page
├── constants/
│   └── index.js        # Site configuration and data
├── assets/             # Images and media
└── App.jsx             # Main app with routing

```

## 🎨 Customization

### Adding Books

Edit `src/constants/index.js`:

```javascript
export const BOOKS = [
  {
    title: "Your Book Title",
    image: bookCoverImage,
    description: "Book description...",
    genre: "Fiction",
    price: "$19.99",
    purchaseLink: "https://...",
    isbn: "978-...",
    publishedYear: "2024",
    rating: 4.8,
    pages: 350,
    awards: ["Award Name"],
    excerpt: "Book excerpt..."
  },
  // Add more books...
];
```

### Styling

The site uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.js` - Theme configuration
- `src/index.css` - Global styles

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Paystack** - Payment integration
- **React Icons** - Icon library

## 📦 Dependencies

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^6.x",
  "react-paystack": "^6.0.0",
  "framer-motion": "^12.23.9",
  "react-icons": "^5.5.0"
}
```

## 🌐 Deployment

### Build

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy Options

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Push `dist` folder to `gh-pages` branch

## 📝 Environment Variables (Optional)

For better security in production, consider using environment variables:

Create `.env`:
```
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_key
VITE_WHATSAPP_NUMBER=254700000000
```

Then update your constants to use:
```javascript
import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
```

## 🐛 Troubleshooting

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### Payment Issues
- Verify Paystack public key is correct
- Test with Paystack test cards first
- Check browser console for errors

See [PAYMENT_SETUP.md](./PAYMENT_SETUP.md) for detailed payment troubleshooting.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React and Vite
