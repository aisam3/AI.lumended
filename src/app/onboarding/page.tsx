"use client";

import { ChangeEvent, useState, useRef } from "react";
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Palette,
  Upload,
  ChevronRight,
  ChevronLeft,
  Check,
  FileText,
  Link2,
  CreditCard,
  Settings,
  Layers,
  AlertCircle,
  X,
  File,
  Image as ImageIcon,
  FileJson,
  Trash2,
  Loader2
} from "lucide-react";

export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<{
    logo: File | null;
    documents: File[];
    template: File | null;
  }>({
    logo: null,
    documents: [],
    template: null
  });
  const [formData, setFormData] = useState<{
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    website: string;
    primaryColor: string;
    secondaryColor: string;
    builderType: string;
    tone: string;
    specialInstructions: string;
    coverageCategories: string[];
    integration: string;
    apiKey: string;
    platforms: string[];
    propertyCount: string;
    termsAccepted: boolean;
  }>({
    // Step 1
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    primaryColor: "",
    secondaryColor: "",
    builderType: "",
    // Step 2
    tone: "",
    specialInstructions: "",
    coverageCategories: [],
    // Step 3
    integration: "",
    apiKey: "",
    platforms: [],
    propertyCount: "",
    // Step 4
    termsAccepted: false
  });

  const logoInputRef = useRef<HTMLInputElement>(null);
  const documentsInputRef = useRef<HTMLInputElement>(null);
  const templateInputRef = useRef<HTMLInputElement>(null);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const progress = (step / 4) * 100;

  const steps = [
    { number: 1, title: "Business Details", icon: Building2 },
    { number: 2, title: "Content & Knowledge", icon: FileText },
    { number: 3, title: "Integrations", icon: Link2 },
    { number: 4, title: "Review & Payment", icon: CreditCard },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prev => ({
      ...prev,
      [name]: selectedValues
    }));
  };

  // File upload handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File size must be less than 10MB");
        return;
      }
      if (!file.type.match('image.*')) {
        alert("Please upload an image file");
        return;
      }
      setFiles(prev => ({ ...prev, logo: file }));
    }
  };

  const handleDocumentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    const validFiles = uploadedFiles.filter(file => {
      if (file.size > 25 * 1024 * 1024) { // 25MB limit
        alert(`${file.name} is too large. Max size is 25MB`);
        return false;
      }
      return true;
    });
    
    setFiles(prev => ({ 
      ...prev, 
      documents: [...prev.documents, ...validFiles]
    }));
  };

  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) { // 25MB limit
        alert("File size must be less than 25MB");
        return;
      }
      setFiles(prev => ({ ...prev, template: file }));
    }
  };

  const removeFile = (type: 'logo' | 'template' | 'document', index: number | null = null) => {
    if (type === 'logo') {
      setFiles(prev => ({ ...prev, logo: null }));
      if (logoInputRef.current) logoInputRef.current.value = '';
    } else if (type === 'template') {
      setFiles(prev => ({ ...prev, template: null }));
      if (templateInputRef.current) templateInputRef.current.value = '';
    } else if (type === 'document' && index !== null) {
      setFiles(prev => ({
        ...prev,
        documents: prev.documents.filter((_, i) => i !== index)
      }));
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return ImageIcon;
    if (fileType.includes('pdf')) return FileText;
    if (fileType.includes('json')) return FileJson;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
    } else {
      // Here you would typically submit the form data and files to your backend
      console.log('Form Data:', formData);
      console.log('Files:', files);
      alert('Form submitted successfully! (Check console for data)');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Complete Your Onboarding
          </h1>
          <p className="text-gray-600">Let's get your warranty management system set up</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="hidden md:flex justify-between mb-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.number} className="flex-1 text-center">
                  <div className="relative">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                      step >= s.number 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {step > s.number ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className={`absolute top-0 left-1/2 w-full h-0.5 -z-10 transition-all duration-300 ${
                      step > s.number ? 'bg-blue-600' : 'bg-gray-200'
                    }`} style={{ width: s.number === 4 ? '0' : '100%', transform: 'translateX(50%)' }} />
                  </div>
                  <p className={`mt-2 text-sm font-medium ${
                    step >= s.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {s.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Step {step} of 4</span>
              <span className="text-blue-600 font-medium">{progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-lg backdrop-filter">
          {/* STEP 1 - Business Details */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Business Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company Name *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g., Acme Construction"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Contact Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Business Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contact@company.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://www.example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company Logo</label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    {!files.logo ? (
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <ImageIcon className="w-6 h-6 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{files.logo.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(files.logo.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile('logo');
                          }}
                          className="p-1 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    )}
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Primary Brand Color</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                        placeholder="#HEX"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <input
                      type="color"
                      className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer"
                      onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                      value={formData.primaryColor || '#000000'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Secondary Brand Color</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="secondaryColor"
                        value={formData.secondaryColor}
                        onChange={handleInputChange}
                        placeholder="#HEX"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <input
                      type="color"
                      className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer"
                      onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      value={formData.secondaryColor || '#000000'}
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Builder Type *</label>
                  <select 
                    name="builderType"
                    value={formData.builderType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                    required
                  >
                    <option value="">Select builder type</option>
                    <option value="production">Production Builder</option>
                    <option value="custom">Custom Builder</option>
                    <option value="remodeler">Remodeler</option>
                    <option value="developer">Developer</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 - Content & Knowledge */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Warranty Content & Knowledge Base</h2>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Upload Documents</label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-500 transition-colors cursor-pointer"
                    onClick={() => documentsInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-700">Drop files here or click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, XLS up to 25MB each</p>
                    </div>
                    <input
                      ref={documentsInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                      onChange={handleDocumentsUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Document List */}
                  {files.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Uploaded Documents:</p>
                      {files.documents.map((file, index) => {
                        const FileIcon = getFileIcon(file.type);
                        return (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileIcon className="w-5 h-5 text-purple-600" />
                              <div>
                                <p className="text-sm text-gray-700">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile('document', index)}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors"
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Warranty Template</label>
                  <div className="flex gap-2">
                    <input
                      ref={templateInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleTemplateUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => templateInputRef.current?.click()}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:border-purple-500 transition-colors text-left"
                    >
                      {files.template ? files.template.name : 'Choose a template file...'}
                    </button>
                    {files.template && (
                      <button
                        type="button"
                        onClick={() => removeFile('template')}
                        className="px-3 py-3 border border-gray-200 rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Coverage Categories</label>
                  <select 
                    multiple 
                    name="coverageCategories"
                    onChange={handleSelectChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent h-40"
                  >
                    <option value="structural">Structural</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                    <option value="roofing">Roofing</option>
                    <option value="finishes">Finishes</option>
                    <option value="appliances">Appliances</option>
                    <option value="other">Other</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  {formData.coverageCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.coverageCategories.map(cat => (
                        <span key={cat} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Communication Tone</label>
                  <div className="flex flex-wrap gap-4">
                    {['Professional', 'Friendly', 'Neutral'].map((tone) => (
                      <label key={tone} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tone"
                          value={tone.toLowerCase()}
                          checked={formData.tone === tone.toLowerCase()}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-700">{tone}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Special Instructions</label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements or notes..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-32 resize-none"
                    maxLength={1000}
                  />
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-500">{formData.specialInstructions.length}/1000</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 - Integrations */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Settings className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Integrations & Deployment</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Project Management Integration</label>
                  <select 
                    name="integration"
                    value={formData.integration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select integration</option>
                    <option value="buildertrend">Buildertrend</option>
                    <option value="coconstruct">CoConstruct</option>
                    <option value="salesforce">Salesforce</option>
                    <option value="hubspot">HubSpot</option>
                    <option value="custom">Custom</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">API Key / Webhook URL</label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="apiKey"
                      value={formData.apiKey}
                      onChange={handleInputChange}
                      placeholder="Enter your API key or webhook URL"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Platform Integration</label>
                  <select 
                    multiple 
                    name="platforms"
                    onChange={handleSelectChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-40"
                  >
                    <option value="wordpress">WordPress</option>
                    <option value="shopify">Shopify</option>
                    <option value="gohighlevel">GoHighLevel</option>
                    <option value="custom">Custom Website</option>
                    <option value="mobile">Mobile App</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Number of Properties/Communities</label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="propertyCount"
                      value={formData.propertyCount}
                      onChange={handleInputChange}
                      placeholder="e.g., 25"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 - Review & Payment */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Review & Payment</h2>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Plan Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Professional Plan</span>
                    <span className="font-medium">$199/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Setup Fee</span>
                    <span className="font-medium">$99 one-time</span>
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total (first month)</span>
                      <span>$298</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500 rounded"
                    required
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>. I understand that I'll be charged the amount shown above.
                  </label>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <p className="text-xs text-yellow-700">
                    You'll be redirected to Stripe's secure checkout page to complete your payment. We never store your payment information.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2 font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}

            <button
              type="submit"
              className={`ml-auto px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-medium ${
                step < 4 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-200' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-200 hover:shadow-xl'
              }`}
            >
              {step < 4 ? (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Complete Payment
                  <CreditCard className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🔒 Secure & encrypted • 30-day money-back guarantee
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}