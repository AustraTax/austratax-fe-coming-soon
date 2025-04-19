"use client";

import { useState } from "react";

export default function Step1({ onNext }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postCode, setPostCode] = useState("");
  const [dob, setDob] = useState("");
  const [isResident, setIsResident] = useState(null);
  const [hasTFN, setHasTFN] = useState(null);
  const [visaType, setVisaType] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isValidDOB = (dateStr) => {
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 14,
      today.getMonth(),
      today.getDate()
    );
    return new Date(dateStr) <= minDate;
  };

  const isValidPostcode = (code) =>
    /^[0-9]{4}$/.test(code) && parseInt(code) >= 200 && parseInt(code) <= 9999;

  const isVisaTaxResident = (visa) => ["482", "permanent"].includes(visa);

  const isFormValid = () => {
    if (
      !firstName ||
      !lastName ||
      !postCode ||
      !dob ||
      isResident === null ||
      hasTFN === null
    )
      return false;

    if (!isValidDOB(dob) || !isValidPostcode(postCode)) return false;

    if ((isResident === "no" || isResident === "maybe") && !visaType)
      return false;

    if (isResident === "no" && !isVisaTaxResident(visaType)) return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please complete all fields correctly.");
      return;
    }

    setError("");
    onNext({
      firstName,
      lastName,
      postCode,
      dob,
      isResident,
      hasTFN,
      visaType,
    });
  };

  const handleSave = () => {
    setShowModal(true);
    // TODO: Later: post data to backend
  };

  return (
    <>
      {/* Save modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 text-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              🔒 Login Required
            </h2>
            <p className="text-gray-600">
              To save your information, please log in.
            </p>
            <button
              className="mt-4 bg-[#ed8936] text-white px-4 py-2 rounded-md hover:opacity-90"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-md shadow"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Step 1: Personal Information
        </h3>

        {/* First Name */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            First Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* DOB */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            max={
              new Date(
                new Date().getFullYear() - 14,
                new Date().getMonth(),
                new Date().getDate()
              )
                .toISOString()
                .split("T")[0]
            }
          />
        </div>

        {/* Post Code */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Post Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            className="w-full px-4 py-2 border rounded-md"
            value={postCode}
            onChange={(e) => {
              // Allow only digits and trim to 4 characters
              const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
              setPostCode(cleaned);
            }}
            maxLength={4}
            placeholder="e.g. 3000"
          />

          {/* Inline validation */}

          {postCode && !isValidPostcode(postCode) && (
            <p className="text-sm text-red-600 mt-1">
              Please enter a valid Australian postcode (0200–9999).
            </p>
          )}
        </div>

        {/* TFN */}
        <div>
          <p className="font-medium mb-1 text-gray-700">
            Do you have a Tax File Number (TFN)?
          </p>
          <div className="flex gap-6">
            <label>
              <input
                type="radio"
                name="tfn"
                value="yes"
                className="mr-1"
                checked={hasTFN === "yes"}
                onChange={() => setHasTFN("yes")}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="tfn"
                value="no"
                className="mr-1"
                checked={hasTFN === "no"}
                onChange={() => setHasTFN("no")}
              />
              No
            </label>
          </div>
          {hasTFN === "no" && (
            <p className="text-sm text-blue-600 mt-1">
              You can apply for a TFN{" "}
              <a
                href="https://www.ato.gov.au/Individuals/Tax-file-number/Apply-for-a-TFN/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-700"
              >
                here
              </a>
              .
            </p>
          )}
        </div>

        {/* Residency + Visa */}
        <div>
          <p className="font-medium mb-1 text-gray-700">
            Are you an Australian resident for tax purposes?
          </p>
          <div className="flex gap-6">
            {["yes", "no", "maybe"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="resident"
                  value={option}
                  className="mr-1"
                  checked={isResident === option}
                  onChange={() => {
                    setIsResident(option);
                    setVisaType("");
                  }}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>

          {(isResident === "no" || isResident === "maybe") && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isResident === "no"
                  ? "Which working visa are you on?"
                  : "What visa are you on?"}
              </label>
              <select
                className="w-full px-4 py-2 border rounded-md"
                value={visaType}
                onChange={(e) => setVisaType(e.target.value)}
              >
                <option value="">-- Select visa type --</option>
                <option value="permanent">Permanent Resident</option>
                <option value="482">
                  Temporary Skill Shortage (Subclass 482)
                </option>
                <option value="student">Student Visa</option>
                <option value="417">Working Holiday (Subclass 417)</option>
                <option value="462">Work and Holiday (Subclass 462)</option>
                <option value="other">Other</option>
              </select>

              {visaType && isResident === "maybe" && (
                <p className="mt-2 text-sm font-medium text-gray-800">
                  {isVisaTaxResident(visaType) ? (
                    <span className="text-green-600">
                      ✅ You are an Australian resident for tax purposes.
                    </span>
                  ) : (
                    <span className="text-red-600">
                      ❌ You are NOT an Australian resident for tax purposes.
                    </span>
                  )}
                </p>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-red-600 font-medium">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-between items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Save
          </button>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`px-6 py-2 rounded-md transition font-medium text-white ${
              isFormValid()
                ? "bg-[#ed8936] hover:opacity-90"
                : "bg-[#ed8936]/60 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
}
