"use client";

import { useState } from "react";

export default function SignupPage() {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    logo: null,
    primaryColor: "",
    secondaryColor: "",
    builderType: "",

    warrantyDocs: [],
    faqDoc: null,
    categories: [],
    chatbotTone: "",
    notes: "",

    crm: "",
    apiKey: "",
    embedLocations: [],
    properties: ""
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFile = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files
    });
  };

  const handleMultiSelect = (e, field) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFormData({
      ...formData,
      [field]: values
    });
  };

  const steps = [
    "Business Details",
    "Warranty Content",
    "Integrations",
    "Review & Payment"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-10">

      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">

        {/* Step Indicator */}

        <div className="flex justify-between mb-10">

          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">

              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white 
                ${step >= index + 1 ? "bg-green-500" : "bg-gray-300"}`}
              >
                {index + 1}
              </div>

              <p className="text-xs mt-2 text-center">{item}</p>

            </div>
          ))}

        </div>

        {/* STEP 1 */}

        {step === 1 && (
          <div className="space-y-4">

            <h2 className="text-xl font-semibold">Business Details</h2>

            <input
              className="input"
              placeholder="Company Name"
              name="companyName"
              onChange={handleChange}
            />

            <input
              className="input"
              placeholder="Primary Contact Name"
              name="contactName"
              onChange={handleChange}
            />

            <input
              className="input"
              type="email"
              placeholder="Business Email"
              name="email"
              onChange={handleChange}
            />

            <input
              className="input"
              placeholder="Phone Number"
              name="phone"
              onChange={handleChange}
            />

            <input
              className="input"
              placeholder="Website URL"
              name="website"
              onChange={handleChange}
            />

            <div>
              <label className="text-sm">Company Logo</label>
              <input type="file" name="logo" onChange={handleFile} />
            </div>

            <div className="flex gap-4">

              <input
                type="color"
                name="primaryColor"
                onChange={handleChange}
              />

              <input
                type="color"
                name="secondaryColor"
                onChange={handleChange}
              />

            </div>

            <select
              name="builderType"
              onChange={handleChange}
              className="input"
            >

              <option>Select Builder Type</option>
              <option>Production Builder</option>
              <option>Custom Builder</option>
              <option>Remodeler</option>
              <option>Developer</option>

            </select>

            <div className="flex justify-end">
              <button
                onClick={next}
                className="btn-primary"
              >
                Next
              </button>
            </div>

          </div>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <div className="space-y-4">

            <h2 className="text-xl font-semibold">
              Warranty Content
            </h2>

            <div>
              <label>Warranty Documents</label>
              <input
                type="file"
                multiple
                name="warrantyDocs"
                onChange={handleFile}
              />
            </div>

            <div>
              <label>FAQ Document</label>
              <input
                type="file"
                name="faqDoc"
                onChange={handleFile}
              />
            </div>

            <div>
              <label>Warranty Categories</label>

              <select
                multiple
                className="input"
                onChange={(e) =>
                  handleMultiSelect(e, "categories")
                }
              >
                <option>Structural</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>HVAC</option>
                <option>Roofing</option>
                <option>Finishes</option>
                <option>Appliances</option>
                <option>Other</option>
              </select>

            </div>

            <div>

              <label>Chatbot Tone</label>

              <div className="flex gap-4 mt-2">

                <label>
                  <input
                    type="radio"
                    name="chatbotTone"
                    value="Professional"
                    onChange={handleChange}
                  /> Professional
                </label>

                <label>
                  <input
                    type="radio"
                    name="chatbotTone"
                    value="Friendly"
                    onChange={handleChange}
                  /> Friendly
                </label>

                <label>
                  <input
                    type="radio"
                    name="chatbotTone"
                    value="Neutral"
                    onChange={handleChange}
                  /> Neutral
                </label>

              </div>

            </div>

            <textarea
              className="input"
              placeholder="Special Instructions"
              maxLength="1000"
              name="notes"
              onChange={handleChange}
            />

            <div className="flex justify-between">

              <button
                onClick={back}
                className="btn-secondary"
              >
                Back
              </button>

              <button
                onClick={next}
                className="btn-primary"
              >
                Next
              </button>

            </div>

          </div>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <div className="space-y-4">

            <h2 className="text-xl font-semibold">
              Integrations
            </h2>

            <select
              name="crm"
              className="input"
              onChange={handleChange}
            >

              <option>Select CRM</option>
              <option>Buildertrend</option>
              <option>CoConstruct</option>
              <option>Salesforce</option>
              <option>HubSpot</option>
              <option>Custom</option>
              <option>None</option>

            </select>

            <input
              className="input"
              placeholder="Webhook URL or API Key"
              name="apiKey"
              onChange={handleChange}
            />

            <select
              multiple
              className="input"
              onChange={(e) =>
                handleMultiSelect(e, "embedLocations")
              }
            >

              <option>WordPress</option>
              <option>Shopify</option>
              <option>GoHighLevel</option>
              <option>Custom Website</option>
              <option>Mobile App</option>
              <option>Other</option>

            </select>

            <input
              className="input"
              type="number"
              placeholder="Number of properties"
              name="properties"
              onChange={handleChange}
            />

            <div className="flex justify-between">

              <button
                onClick={back}
                className="btn-secondary"
              >
                Back
              </button>

              <button
                onClick={next}
                className="btn-primary"
              >
                Next
              </button>

            </div>

          </div>
        )}

        {/* STEP 4 */}

        {step === 4 && (
          <div className="space-y-4">

            <h2 className="text-xl font-semibold">
              Review & Payment
            </h2>

            <div className="bg-gray-100 p-4 rounded">

              <p><b>Company:</b> {formData.companyName}</p>
              <p><b>Contact:</b> {formData.contactName}</p>
              <p><b>Email:</b> {formData.email}</p>
              <p><b>Phone:</b> {formData.phone}</p>
              <p><b>Website:</b> {formData.website}</p>
              <p><b>CRM:</b> {formData.crm}</p>
              <p><b>Properties:</b> {formData.properties}</p>

            </div>

            <label className="flex gap-2">

              <input type="checkbox" required />

              I agree to Terms of Service and Privacy Policy

            </label>

            <div className="flex justify-between">

              <button
                onClick={back}
                className="btn-secondary"
              >
                Back
              </button>

              <button className="bg-purple-600 text-white px-6 py-2 rounded">

                Pay with Stripe

              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}