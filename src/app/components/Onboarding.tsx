import React, { useState,ChangeEvent } from "react";

export default function SignupWizard() {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    brandPrimary: "",
    brandSecondary: "",
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

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, files } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name as keyof FormData]: files,
  }));
};

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
    const values = Array.from(e.target.selectedOptions as HTMLCollectionOf<HTMLOptionElement>, (option) => option.value);

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
    <div style={{ maxWidth: "800px", margin: "auto", fontFamily: "Arial" }}>

      {/* STEP INDICATOR */}

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>

        {steps.map((s, index) => (
          <div key={index} style={{ textAlign: "center", flex: 1 }}>

            <div
              style={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                margin: "auto",
                background: step >= index + 1 ? "green" : "gray",
                color: "white",
                lineHeight: "35px"
              }}
            >
              {index + 1}
            </div>

            <small>{s}</small>

          </div>
        ))}

      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <div>

          <h2>Business Details</h2>

          <input placeholder="Company Name"
            name="companyName"
            onChange={handleChange}
          />

          <br /><br />

          <input placeholder="Contact Name"
            name="contactName"
            onChange={handleChange}
          />

          <br /><br />

          <input type="email"
            placeholder="Business Email"
            name="email"
            onChange={handleChange}
          />

          <br /><br />

          <input placeholder="Phone Number"
            name="phone"
            onChange={handleChange}
          />

          <br /><br />

          <input placeholder="Website URL"
            name="website"
            onChange={handleChange}
          />

          <br /><br />

          <label>Company Logo</label>
          <br />
          <input type="file" name="logo" onChange={handleFile} />

          <br /><br />

          <label>Primary Brand Color</label>
          <br />
          <input type="color" name="brandPrimary" onChange={handleChange} />

          <br /><br />

          <label>Secondary Brand Color</label>
          <br />
          <input type="color" name="brandSecondary" onChange={handleChange} />

          <br /><br />

          <label>Builder Type</label>

          <br />

          <select name="builderType" onChange={handleChange}>
            <option>Select</option>
            <option>Production Builder</option>
            <option>Custom Builder</option>
            <option>Remodeler</option>
            <option>Developer</option>
          </select>

          <br /><br />

          <button onClick={next}>Next</button>

        </div>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <div>

          <h2>Warranty Content</h2>

          <label>Warranty Policy Documents</label>

          <br />

          <input
            type="file"
            multiple
            name="warrantyDocs"
            onChange={handleFile}
          />

          <br /><br />

          <label>FAQ Document</label>
          <br />

          <input
            type="file"
            name="faqDoc"
            onChange={handleFile}
          />

          <br /><br />

          <label>Common Warranty Categories</label>

          <br />

          <select
            multiple
            onChange={(e) => handleMultiSelect(e, "categories")}
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

          <br /><br />

          <label>Chatbot Tone</label>

          <br />

          <label>
            <input
              type="radio"
              name="chatbotTone"
              value="Professional"
              onChange={handleChange}
            /> Professional
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="chatbotTone"
              value="Friendly"
              onChange={handleChange}
            /> Friendly
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="chatbotTone"
              value="Neutral"
              onChange={handleChange}
            /> Neutral
          </label>

          <br /><br />

          <textarea
            name="notes"
            placeholder="Special Instructions"
            maxLength={1000}        
        
            onChange={handleChange}
          />

          <br /><br />

          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>

        </div>
      )}

      {/* STEP 3 */}

      {step === 3 && (
        <div>

          <h2>Integrations</h2>

          <label>CRM / ERP System</label>

          <br />

          <select name="crm" onChange={handleChange}>
            <option>Select</option>
            <option>Buildertrend</option>
            <option>CoConstruct</option>
            <option>Salesforce</option>
            <option>HubSpot</option>
            <option>Custom</option>
            <option>None</option>
          </select>

          <br /><br />

          <input
            placeholder="Webhook URL / API Key"
            name="apiKey"
            onChange={handleChange}
          />

          <br /><br />

          <label>Where will chatbot be embedded?</label>

          <br />

          <select
            multiple
            onChange={(e) => handleMultiSelect(e, "embedLocations")}
          >

            <option>WordPress</option>
            <option>Shopify</option>
            <option>GoHighLevel</option>
            <option>Custom Website</option>
            <option>Mobile App</option>
            <option>Other</option>

          </select>

          <br /><br />

          <input
            type="number"
            placeholder="Number of properties"
            name="properties"
            onChange={handleChange}
          />

          <br /><br />

          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>

        </div>
      )}

      {/* STEP 4 */}

      {step === 4 && (
        <div>

          <h2>Review & Payment</h2>

          <p><b>Company:</b> {formData.companyName}</p>
          <p><b>Contact:</b> {formData.contactName}</p>
          <p><b>Email:</b> {formData.email}</p>
          <p><b>Phone:</b> {formData.phone}</p>
          <p><b>Website:</b> {formData.website}</p>

          <p><b>CRM:</b> {formData.crm}</p>

          <p><b>Properties:</b> {formData.properties}</p>

          <br />

          <label>

            <input type="checkbox" required />

            I agree to Terms of Service and Privacy Policy

          </label>

          <br /><br />

          <button onClick={back}>Back</button>

          <button
            style={{
              background: "purple",
              color: "white",
              padding: "10px 20px",
              marginLeft: 10
            }}
          >
            Pay with Stripe
          </button>

        </div>
      )}
</div>
  );
}