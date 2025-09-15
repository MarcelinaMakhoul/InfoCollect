'use client';

import { useState, useEffect } from 'react';

interface FormData {
  fullName: string;
  phone: string;
  countryCode: string;
  email: string;
  lookingFor: 'candidate' | 'partner' | '';
  yearsOfExperience: string;
  candidateInterest: 'problem-solving' | 'developing' | '';
  additionalInfo: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  countryCode?: string;
  email?: string;
  lookingFor?: string;
  yearsOfExperience?: string;
  candidateInterest?: string;
  additionalInfo?: string;
}

// Country codes data 
const countryCodes = [
  { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+358', country: 'Finland', flag: '🇫🇮' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+30', country: 'Greece', flag: '🇬🇷' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+51', country: 'Peru', flag: '🇵🇪' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+962', country: 'Jordan', flag: '🇯🇴' },
  { code: '+963', country: 'Syria', flag: '🇸🇾' },
  { code: '+964', country: 'Iraq', flag: '🇮🇶' },
  { code: '+972', country: 'Israel', flag: '🇮🇱' },
  { code: '+970', country: 'Palestine', flag: '🇵🇸' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦' },
  { code: '+213', country: 'Algeria', flag: '🇩🇿' },
  { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
  { code: '+218', country: 'Libya', flag: '🇱🇾' },
  { code: '+249', country: 'Sudan', flag: '🇸🇩' },
  { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+225', country: 'Ivory Coast', flag: '🇨🇮' },
  { code: '+221', country: 'Senegal', flag: '🇸🇳' },
  { code: '+223', country: 'Mali', flag: '🇲🇱' },
  { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
  { code: '+227', country: 'Niger', flag: '🇳🇪' },
  { code: '+228', country: 'Togo', flag: '🇹🇬' },
  { code: '+229', country: 'Benin', flag: '🇧🇯' },
  { code: '+230', country: 'Mauritius', flag: '🇲🇺' },
  { code: '+231', country: 'Liberia', flag: '🇱🇷' },
  { code: '+232', country: 'Sierra Leone', flag: '🇸🇱' },
  { code: '+235', country: 'Chad', flag: '🇹🇩' },
  { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
  { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
  { code: '+238', country: 'Cape Verde', flag: '🇨🇻' },
  { code: '+239', country: 'São Tomé and Príncipe', flag: '🇸🇹' },
  { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: '+241', country: 'Gabon', flag: '🇬🇦' },
  { code: '+242', country: 'Republic of the Congo', flag: '🇨🇬' },
  { code: '+243', country: 'Democratic Republic of the Congo', flag: '🇨🇩' },
  { code: '+244', country: 'Angola', flag: '🇦🇴' },
  { code: '+245', country: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: '+248', country: 'Seychelles', flag: '🇸🇨' },
  { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
  { code: '+252', country: 'Somalia', flag: '🇸🇴' },
  { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬' },
  { code: '+257', country: 'Burundi', flag: '🇧🇮' },
  { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
  { code: '+260', country: 'Zambia', flag: '🇿🇲' },
  { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
  { code: '+262', country: 'Réunion', flag: '🇷🇪' },
  { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
  { code: '+264', country: 'Namibia', flag: '🇳🇦' },
  { code: '+265', country: 'Malawi', flag: '🇲🇼' },
  { code: '+266', country: 'Lesotho', flag: '🇱🇸' },
  { code: '+267', country: 'Botswana', flag: '🇧🇼' },
  { code: '+268', country: 'Swaziland', flag: '🇸🇿' },
  { code: '+269', country: 'Comoros', flag: '🇰🇲' },
  { code: '+290', country: 'Saint Helena', flag: '🇸🇭' },
  { code: '+291', country: 'Eritrea', flag: '🇪🇷' },
  { code: '+297', country: 'Aruba', flag: '🇦🇼' },
  { code: '+298', country: 'Faroe Islands', flag: '🇫🇴' },
  { code: '+299', country: 'Greenland', flag: '🇬🇱' },
  { code: '+350', country: 'Gibraltar', flag: '🇬🇮' },
  { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪' },
  { code: '+354', country: 'Iceland', flag: '🇮🇸' },
  { code: '+355', country: 'Albania', flag: '🇦🇱' },
  { code: '+356', country: 'Malta', flag: '🇲🇹' },
  { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
  { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
  { code: '+360', country: 'Hungary', flag: '🇭🇺' },
  { code: '+361', country: 'Romania', flag: '🇷🇴' },
  { code: '+362', country: 'Slovakia', flag: '🇸🇰' },
  { code: '+363', country: 'Czech Republic', flag: '🇨🇿' },
  { code: '+364', country: 'Poland', flag: '🇵🇱' },
  { code: '+365', country: 'Slovenia', flag: '🇸🇮' },
  { code: '+366', country: 'Croatia', flag: '🇭🇷' },
  { code: '+367', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: '+368', country: 'Serbia', flag: '🇷🇸' },
  { code: '+369', country: 'Montenegro', flag: '🇲🇪' },
  { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
  { code: '+371', country: 'Latvia', flag: '🇱🇻' },
  { code: '+372', country: 'Estonia', flag: '🇪🇪' },
  { code: '+373', country: 'Moldova', flag: '🇲🇩' },
  { code: '+374', country: 'Armenia', flag: '🇦🇲' },
  { code: '+375', country: 'Belarus', flag: '🇧🇾' },
  { code: '+376', country: 'Andorra', flag: '🇦🇩' },
  { code: '+377', country: 'Monaco', flag: '🇲🇨' },
  { code: '+378', country: 'San Marino', flag: '🇸🇲' },
  { code: '+379', country: 'Vatican City', flag: '🇻🇦' },
  { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
  { code: '+381', country: 'Serbia', flag: '🇷🇸' },
  { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
  { code: '+383', country: 'Kosovo', flag: '🇽🇰' },
  { code: '+385', country: 'Croatia', flag: '🇭🇷' },
  { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
  { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: '+389', country: 'North Macedonia', flag: '🇲🇰' },
  { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
  { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
  { code: '+423', country: 'Liechtenstein', flag: '🇱🇮' },
  { code: '+500', country: 'Falkland Islands', flag: '🇫🇰' },
  { code: '+501', country: 'Belize', flag: '🇧🇿' },
  { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
  { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
  { code: '+504', country: 'Honduras', flag: '🇭🇳' },
  { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
  { code: '+507', country: 'Panama', flag: '🇵🇦' },
  { code: '+508', country: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
  { code: '+509', country: 'Haiti', flag: '🇭🇹' },
  { code: '+590', country: 'Guadeloupe', flag: '🇬🇵' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+592', country: 'Guyana', flag: '🇬🇾' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+594', country: 'French Guiana', flag: '🇬🇫' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '+596', country: 'Martinique', flag: '🇲🇶' },
  { code: '+597', country: 'Suriname', flag: '🇸🇷' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
  { code: '+599', country: 'Netherlands Antilles', flag: '🇳🇱' },
  { code: '+670', country: 'East Timor', flag: '🇹🇱' },
  { code: '+672', country: 'Antarctica', flag: '🇦🇶' },
  { code: '+673', country: 'Brunei', flag: '🇧🇳' },
  { code: '+674', country: 'Nauru', flag: '🇳🇷' },
  { code: '+675', country: 'Papua New Guinea', flag: '🇵🇬' },
  { code: '+676', country: 'Tonga', flag: '🇹🇴' },
  { code: '+677', country: 'Solomon Islands', flag: '🇸🇧' },
  { code: '+678', country: 'Vanuatu', flag: '🇻🇺' },
  { code: '+679', country: 'Fiji', flag: '🇫🇯' },
  { code: '+680', country: 'Palau', flag: '🇵🇼' },
  { code: '+681', country: 'Wallis and Futuna', flag: '🇼🇫' },
  { code: '+682', country: 'Cook Islands', flag: '🇨🇰' },
  { code: '+683', country: 'Niue', flag: '🇳🇺' },
  { code: '+684', country: 'American Samoa', flag: '🇦🇸' },
  { code: '+685', country: 'Samoa', flag: '🇼🇸' },
  { code: '+686', country: 'Kiribati', flag: '🇰🇮' },
  { code: '+687', country: 'New Caledonia', flag: '🇳🇨' },
  { code: '+688', country: 'Tuvalu', flag: '🇹🇻' },
  { code: '+689', country: 'French Polynesia', flag: '🇵🇫' },
  { code: '+690', country: 'Tokelau', flag: '🇹🇰' },
  { code: '+691', country: 'Micronesia', flag: '🇫🇲' },
  { code: '+692', country: 'Marshall Islands', flag: '🇲🇭' },
  { code: '+850', country: 'North Korea', flag: '🇰🇵' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
  { code: '+853', country: 'Macau', flag: '🇲🇴' },
  { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
  { code: '+856', country: 'Laos', flag: '🇱🇦' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
  { code: '+960', country: 'Maldives', flag: '🇲🇻' },
  { code: '+992', country: 'Tajikistan', flag: '🇹🇯' },
  { code: '+993', country: 'Turkmenistan', flag: '🇹🇲' },
  { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
  { code: '+995', country: 'Georgia', flag: '🇬🇪' },
  { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: '+998', country: 'Uzbekistan', flag: '🇺🇿' }
];

// Looking For options
const lookingForOptions = [
  { value: 'candidate', label: 'I am seeking opportunities' },
  { value: 'partner', label: 'I am looking for a business partner' },
];

// Candidate Interest options
const candidateInterestOptions = [
  { value: 'problem-solving', label: 'Solution Architecture & Problem Solving' },
  { value: 'developing', label: 'Software Development & Implementation' },
];

// Years of Experience options
const yearsOptions = [
  { value: '0-2', label: '0-2 years' },
  { value: '2-5', label: '2-5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: '10+', label: '10+ years' }
];

export default function InfoForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    countryCode: '+961',
    email: '',
    lookingFor: '',
    yearsOfExperience: '',
    candidateInterest: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isLookingForDropdownOpen, setIsLookingForDropdownOpen] = useState(false);
  const [isCandidateInterestDropdownOpen, setIsCandidateInterestDropdownOpen] = useState(false);
  const [isYearsDropdownOpen, setIsYearsDropdownOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone number - only allow numbers
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCountrySelect = (countryCode: string) => {
    setFormData(prev => ({
      ...prev,
      countryCode: countryCode
    }));
    setIsCountryDropdownOpen(false);
  };

  const handleLookingForSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: value as 'candidate' | 'partner'
    }));
    setIsLookingForDropdownOpen(false);
  };

  const handleCandidateInterestSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      candidateInterest: value as 'problem-solving' | 'developing'
    }));
    setIsCandidateInterestDropdownOpen(false);
  };

  const handleYearsSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      yearsOfExperience: value
    }));
    setIsYearsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (isCountryDropdownOpen && !target.closest('.country-dropdown')) {
        setIsCountryDropdownOpen(false);
      }
      if (isLookingForDropdownOpen && !target.closest('.looking-for-dropdown')) {
        setIsLookingForDropdownOpen(false);
      }
      if (isCandidateInterestDropdownOpen && !target.closest('.candidate-interest-dropdown')) {
        setIsCandidateInterestDropdownOpen(false);
      }
      if (isYearsDropdownOpen && !target.closest('.years-dropdown')) {
        setIsYearsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCountryDropdownOpen, isLookingForDropdownOpen, isCandidateInterestDropdownOpen, isYearsDropdownOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.lookingFor) {
      newErrors.lookingFor = 'Please select what you are seeking';
    }

    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    }

    if (formData.lookingFor === 'candidate' && !formData.candidateInterest) {
      newErrors.candidateInterest = 'Please select your primary area of interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setFormData({
          fullName: '',
          phone: '',
          countryCode: '+961',
          email: '',
          lookingFor: '',
          yearsOfExperience: '',
          candidateInterest: '',
          additionalInfo: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative z-10 py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
              Get Connected
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto leading-relaxed px-4">
              Share your information to explore opportunities
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl sm:rounded-3xl border border-white/20 overflow-visible">
            <div className="p-4 sm:p-8 lg:p-12 pb-8 sm:pb-12 lg:pb-16">

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Full Name */}
                <div className="group">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3 group-focus-within:text-blue-600 transition-colors">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-base ${
                        errors.fullName 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3 group-focus-within:text-blue-600 transition-colors">
                    Phone Number *
                  </label>
                  <div className="flex flex-row gap-2">
                    {/* Country Code Selector */}
                    <div className="relative w-28 sm:w-36 country-dropdown">
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className={`w-full py-3 sm:py-4 pl-3 pr-8 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-left text-base ${
                          errors.countryCode 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                      <span className="flex items-center">
                        <span className="mr-1">{countryCodes.find(c => c.code === formData.countryCode)?.flag}</span>
                        <span>{formData.countryCode}</span>
                      </span>
                      </button>
                      <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      {/* Custom Dropdown */}
                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-[9999] max-h-48 sm:max-h-60 overflow-y-auto">
                          {countryCodes.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountrySelect(country.code)}
                              className={`w-full px-3 py-2 sm:py-2 text-left hover:bg-blue-50 transition-colors flex items-center text-sm sm:text-base ${
                                formData.countryCode === country.code ? 'bg-blue-100' : ''
                              }`}
                            >
                              <span className="mr-2 text-base">{country.flag}</span>
                              <span className="font-medium">{country.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Phone Number Input */}
                    <div className="relative w-full sm:flex-1">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-base ${
                          errors.phone 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3 group-focus-within:text-blue-600 transition-colors">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-base ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Looking For */}
                <div className="group">
                  <label htmlFor="lookingFor" className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3 group-focus-within:text-blue-600 transition-colors">
                    What are you looking for? *
                  </label>
                  <div className="relative looking-for-dropdown">
                    <button
                      type="button"
                      onClick={() => setIsLookingForDropdownOpen(!isLookingForDropdownOpen)}
                      className={`w-full py-3 sm:py-4 pl-12 pr-10 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-left text-base ${
                        errors.lookingFor 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <span className="flex items-center">
                        {formData.lookingFor ? (
                          lookingForOptions.find(option => option.value === formData.lookingFor)?.label
                        ) : (
                          'Select an option'
                        )}
                      </span>
                    </button>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Custom Dropdown */}
                    {isLookingForDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 max-h-48 sm:max-h-60 overflow-y-auto">
                        {lookingForOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleLookingForSelect(option.value)}
                            className={`w-full px-3 py-2 sm:py-2 text-left hover:bg-blue-50 transition-colors flex items-center text-sm sm:text-base ${
                              formData.lookingFor === option.value ? 'bg-blue-100' : ''
                            }`}
                          >
                            <span className="font-medium">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.lookingFor && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.lookingFor}
                    </p>
                  )}
                </div>

                {/* Candidate Interest - Only show if looking for is "candidate" */}
                {formData.lookingFor === 'candidate' && (
                  <div className="group animate-in slide-in-from-top-2 duration-300">
                    <label htmlFor="candidateInterest" className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3 group-focus-within:text-blue-600 transition-colors">
                      What is your primary area of interest? *
                    </label>
                    <div className="relative candidate-interest-dropdown">
                      <button
                        type="button"
                        onClick={() => setIsCandidateInterestDropdownOpen(!isCandidateInterestDropdownOpen)}
                        className={`w-full py-3 sm:py-4 pl-12 pr-10 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-left text-base ${
                          errors.candidateInterest 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <span className="flex items-center">
                          {formData.candidateInterest ? (
                            candidateInterestOptions.find(option => option.value === formData.candidateInterest)?.label
                          ) : (
                            'Select your area of interest'
                          )}
                        </span>
                      </button>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Custom Dropdown */}
                      {isCandidateInterestDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-[9999] max-h-48 sm:max-h-60 overflow-y-auto">
                          {candidateInterestOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleCandidateInterestSelect(option.value)}
                              className={`w-full px-3 py-2 sm:py-2 text-left hover:bg-blue-50 transition-colors flex items-center text-sm sm:text-base ${
                                formData.candidateInterest === option.value ? 'bg-blue-100' : ''
                              }`}
                            >
                              <span className="font-medium">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.candidateInterest && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.candidateInterest}
                      </p>
                    )}
                  </div>
                )}

                {/* Years of Experience */}
                <div className="group">
                  <label htmlFor="yearsOfExperience" className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3 group-focus-within:text-blue-600 transition-colors">
                    Years of Experience *
                  </label>
                  <div className="relative years-dropdown">
                    <button
                      type="button"
                      onClick={() => setIsYearsDropdownOpen(!isYearsDropdownOpen)}
                      className={`w-full py-3 sm:py-4 pl-12 pr-10 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-left text-base ${
                        errors.yearsOfExperience 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="flex items-center">
                        {formData.yearsOfExperience ? (
                          yearsOptions.find(option => option.value === formData.yearsOfExperience)?.label
                        ) : (
                          'Select years of experience'
                        )}
                      </span>
                    </button>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Custom Dropdown */}
                    {isYearsDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-[9999] max-h-32 sm:max-h-40 overflow-y-auto">
                        {yearsOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleYearsSelect(option.value)}
                            className={`w-full px-3 py-2 sm:py-2 text-left hover:bg-blue-50 transition-colors flex items-center text-sm sm:text-base ${
                              formData.yearsOfExperience === option.value ? 'bg-blue-100' : ''
                            }`}
                          >
                            <span className="font-medium">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.yearsOfExperience && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.yearsOfExperience}
                    </p>
                  )}
                </div>

                {/* Additional Information */}
                <div className="group">
                  <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3 group-focus-within:text-blue-600 transition-colors">
                    Additional Information
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-base resize-none ${
                        errors.additionalInfo 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Tell us more about yourself, your goals, or any additional information you'd like to share..."
                    />
                  </div>
                  {errors.additionalInfo && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.additionalInfo}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full py-3 sm:py-4 px-6 sm:px-8 rounded-2xl font-semibold text-base sm:text-lg focus:ring-4 focus:ring-blue-500/20 focus:ring-offset-2 transition-all duration-200 transform ${
                      isSubmitting
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed scale-95'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-xl active:scale-95'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Information
                          <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 rounded-2xl animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-green-800">Success!</p>
                        <p className="text-green-700">Your information has been submitted successfully.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 text-red-800 rounded-2xl animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-red-800">Error!</p>
                        <p className="text-red-700">There was an error submitting your information. Please try again.</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
