"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook


interface FormData {
  name: string;
  email: string;
  description: string;
  [key: string]: string; // For dynamic social media fields
}

const CreativesForm: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  const { user } = useUser(); // Get user data from Clerk
  const [formData, setFormData] = useState<FormData>({
    name: user?.firstName || "", // Autofill name from Clerk
    email: user?.emailAddresses[0]?.emailAddress || "", // Autofill email from Clerk
    description: "",
  });

  const [socialMedia, setSocialMedia] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customSocialMedia, setCustomSocialMedia] = useState('');

  const router = useRouter();

  const socialMediaOptions = ["Instagram", "Twitter", "YouTube", "TikTok", "Twitch"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSocialMedia = (platform: string) => {
    if (!socialMedia.includes(platform)) {
      setSocialMedia([...socialMedia, platform]);
      setFormData({ ...formData, [platform.toLowerCase()]: '' });
    }
    setIsModalOpen(false);
  };

  const handleRemoveSocialMedia = (platform: string) => {
    setSocialMedia(socialMedia.filter((item) => item !== platform));
    const updatedFormData = { ...formData };
    delete updatedFormData[platform.toLowerCase()];
    setFormData(updatedFormData);
  };

  const handleCustomSocialMedia = () => {
    if (customSocialMedia && !socialMedia.includes(customSocialMedia)) {
      setSocialMedia([...socialMedia, customSocialMedia]);
      setFormData({ ...formData, [customSocialMedia.toLowerCase()]: '' });
    }
    setCustomSocialMedia('');
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/interestForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Data saved successfully');
        router.push('/Submitted');
      } else {
        console.error('Error saving data:', result.message);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }

    setSocialMedia([]);
    setFormData({ name: '', email: '', description: '' });
  };

  const handleStart = () => {
    setShowForm(true);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="relative min-h-screen bg-[#0e042c] text-white flex flex-col items-center pt-10 px-4 md:px-8 overflow-hidden">

      {/* Welcome Screen */}
      {showForm && (
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-[#4F77FF] mb-4">Welcome!</h1>
          <p className="text-xl">Are you ready to showcase your creativity and join our creative network?</p>
          {/* <button
            onClick={handleStart}
            className="bg-[#4F77FF] hover:bg-[#789AFF] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Get Started
          </button> */}
        </div>
      )}

      {/* Form Section */}
      {showForm && (
        <Card className={`bg-[#808CFC] text-white rounded-lg overflow-hidden shadow-lg border-[#808CFC] w-full max-w-4xl p-8 mt-8 transition-opacity duration-500 ease-in-out ${showForm ? 'opacity-100' : 'opacity-0'}`}>
          <CardHeader className="text-center mb-8">
            <CardTitle className="text-4xl font-bold">Join Our Creative Network</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded-lg bg-[#16213E] border-none focus:ring-2 focus:ring-[#4F77FF]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded-lg bg-[#16213E] border-none focus:ring-2 focus:ring-[#4F77FF]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Describe Your Work</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded-lg bg-[#16213E] border-none focus:ring-2 focus:ring-[#4F77FF]"
                  placeholder="Briefly describe your work"
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">Social Media Profiles</label>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#4F77FF] hover:bg-[#789AFF] text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                >
                  + Add Social Media
                </button>
              </div>

              {socialMedia.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium">{platform}</label>
                    <input
                      type="text"
                      name={platform.toLowerCase()}
                      value={formData[platform.toLowerCase()]}
                      onChange={handleChange}
                      className="w-10/12 mt-1 p-2 rounded-lg bg-[#16213E] border-none focus:ring-2 focus:ring-[#4F77FF] "
                      placeholder={`Enter your ${platform} profile`}
                    />

                    <button // A hack, need to think about a smarter way to do it.
                      disabled={true}
                      className='w-1/12 '
                    ></button>
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialMedia(platform)}
                      className="w-1/12 bg-[#4F77FF] hover:bg-[#789AFF] text-white font-semibold py-2 px-4 rounded-lg shadow-md justify-self-end"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-[#4F77FF] hover:bg-[#789AFF] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform"
                >
                  Submit
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-[#808CFC] text-white rounded-lg overflow-hidden shadow-lg w-full max-w-md p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Select Social Media</h2>
            <div className="space-y-4">
              {socialMediaOptions.map((platform) => (
                <button
                  key={platform}
                  onClick={() => handleAddSocialMedia(platform)}
                  className="w-full bg-[#4F77FF] hover:bg-[#789AFF] text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                >
                  {platform}
                </button>
              ))}
              <div className="mt-4">
                <label className="block text-sm font-medium">Custom Social Media</label>
                <input
                  type="text"
                  value={customSocialMedia}
                  onChange={(e) => setCustomSocialMedia(e.target.value)}
                  className="w-full mt-1 p-2 rounded-lg bg-[#16213E] border-none focus:ring-2 focus:ring-[#4F77FF]"
                  placeholder="Enter custom social media"
                />
                <button
                  onClick={handleCustomSocialMedia}
                  className="mt-2 w-full bg-[#4F77FF] hover:bg-[#789AFF] text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                >
                  Add Custom Social Media
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativesForm;
