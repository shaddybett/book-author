import axios from 'axios';

/**
 * Generate OAuth access token from M-Pesa
 */
export const generateToken = async () => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const tokenUrl = process.env.MPESA_ENVIRONMENT === 'production'
      ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
      : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const response = await axios.get(tokenUrl, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Token Generation Error:', error.response?.data || error.message);
    throw new Error('Failed to generate access token');
  }
};

/**
 * Generate password for STK Push
 */
export const generatePassword = (timestamp) => {
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
  return password;
};

/**
 * Format phone number to M-Pesa format (254XXXXXXXXX)
 */
export const formatPhoneNumber = (phone) => {
  // Remove all non-numeric characters
  let formatted = phone.replace(/\D/g, '');
  
  // If starts with 0, replace with 254
  if (formatted.startsWith('0')) {
    formatted = '254' + formatted.slice(1);
  }
  
  // If starts with +254, remove +
  if (formatted.startsWith('+254')) {
    formatted = formatted.slice(1);
  }
  
  // If doesn't start with 254, add it
  if (!formatted.startsWith('254')) {
    formatted = '254' + formatted;
  }
  
  return formatted;
};

/**
 * Validate phone number format
 */
export const isValidKenyanPhone = (phone) => {
  const formatted = formatPhoneNumber(phone);
  // Kenyan numbers are 12 digits (254XXXXXXXXX)
  return /^254[17]\d{8}$/.test(formatted);
};



