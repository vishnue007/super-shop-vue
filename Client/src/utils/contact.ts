const API_BASE_URL = 'http://localhost:5000/api';

export interface ContactFormData {
  name: string;
  email: string;
  desc: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const submitContactForm = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to send message',
      };
    }

    return {
      success: true,
      message: result.message || 'Message sent successfully!',
      data: result.data,
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
};

export const getContactMessages = async (): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to fetch messages',
      };
    }

    return {
      success: true,
      message: 'Messages fetched successfully',
      data: result.data,
    };
  } catch (error) {
    console.error('Get contact messages error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
};
