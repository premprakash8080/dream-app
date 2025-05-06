import { useState } from 'react';

const FormSidebar = ({ currentStep }) => {
  // Define the steps
  const steps = [
    { label: 'User Info', step: 1 },
    { label: 'Account Info', step: 2 },
    { label: 'Dream Info', step: 3 }
  ];

  return (
    <div className="w-72 p-4 bg-white border-r border-gray-300">
  <ol className="space-y-4">
    {steps.map(({ label, step }) => (
      <li key={step}>
        <div
          className={`w-full p-4 border rounded-lg ${
            currentStep === step
              ? 'text-green-700 border-green-300 bg-green-50' // Active step styles
              : 'text-gray-500 border-gray-300 bg-white' // Inactive step styles
          }`}
          role="alert"
        >
          <div className="flex items-center justify-between">
            <span className="sr-only">{label}</span>
            <h3 className="font-medium">{`${step}. ${label}`}</h3>
            {currentStep === step && (
              <svg
                className="w-4 h-4 text-green-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917L5.724 10.5 15 1.5"
                />
              </svg>
            )}
          </div>
        </div>
      </li>
    ))}
  </ol>
</div>

  );
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(prevStep => Math.min(prevStep + 1, 3));
  const handleBack = () => setStep(prevStep => Math.max(prevStep - 1, 1));

  return (
    <div className="flex">
      {/* Sidebar */}
      <FormSidebar currentStep={step} />

      {/* Form content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Submit Your Dream</h1>

        <form>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: User Info</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your age"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 2: Account Info</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 3: Dream Info</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Dream Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your dream title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Dream Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Describe your dream"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
