import React, { useState } from "react";
import axios from "axios";
import { Dialog } from "@mui/material";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [message, setMessage] = useState(""); // Optional message
  const [error, setError] = useState("");

  const handleSubmit = async () => {

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"
    if (!friendName || !friendEmail) {
      setError("Friend's name and friend's email are required!");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/referral`, {
        friend_name: friendName,
        friend_email: friendEmail,
        message,
      });

      console.log("Referral submitted:", response.data);
      alert("Referral submitted successfully!");
      setIsOpen(false); // Close the modal
    } catch (error) {
      console.error("Error submitting referral:", error);
      setError("Failed to submit referral. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md flex justify-between items-center fixed top-0 w-full z-10">
        <h1 className="text-2xl font-extrabold text-blue-600">Refer & Earn</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all"
        >
          Refer Now
        </button>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-32 bg-gradient-to-br from-blue-100 to-blue-300">
        <h2 className="text-5xl font-extrabold text-gray-900">Let’s Learn & Earn</h2>
        <p className="mt-4 text-lg text-gray-700 font-medium">
          Get a chance to win up to{" "}
          <span className="text-blue-700 font-bold">Rs. 15,000</span>
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all"
        >
          Refer Now
        </button>
      </header>

      {/* How it Works */}
      <section className="py-16 text-center bg-white">
        <h3 className="text-3xl font-semibold text-gray-800">How Does It Work?</h3>
        <div className="flex justify-center space-x-8 mt-6">
          <div className="bg-white p-6 shadow-xl rounded-xl w-60 border border-blue-200 transform hover:scale-105 transition-all">
            1. Invite Friends
          </div>
          <div className="bg-white p-6 shadow-xl rounded-xl w-60 border border-blue-200 transform hover:scale-105 transition-all">
            2. They Enroll
          </div>
          <div className="bg-white p-6 shadow-xl rounded-xl w-60 border border-blue-200 transform hover:scale-105 transition-all">
            3. Earn Rewards
          </div>
        </div>
      </section>

      {/* Benefits Table */}
      <section className="py-16 bg-gray-50 text-center">
        <h3 className="text-3xl font-semibold text-gray-800">
          What Are The Referral Benefits?
        </h3>
        <table className="mt-6 w-3/4 mx-auto border-collapse border border-gray-300 shadow-lg bg-white">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-4">Referrals</th>
              <th className="border p-4">Reward</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-100 transition-all">
              <td className="border p-4">1 Referral</td>
              <td className="border p-4">₹1,000</td>
            </tr>
            <tr className="hover:bg-blue-100 transition-all">
              <td className="border p-4">3 Referrals</td>
              <td className="border p-4">₹5,000</td>
            </tr>
            <tr className="hover:bg-blue-100 transition-all">
              <td className="border p-4">5 Referrals</td>
              <td className="border p-4">₹15,000</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* FAQ Section */}
      <section className="py-16 text-center bg-white">
        <h3 className="text-3xl font-semibold text-gray-800">
          Frequently Asked Questions
        </h3>
        <p className="mt-4 text-gray-600 font-medium">
          How do I refer a friend? Simply click 'Refer Now' and fill out the
          form.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-6 mt-16 font-light">
        © 2025 Refer & Earn. All rights reserved.
      </footer>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg w-96 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800">Refer a Friend</h3>
          <input
            type="text"
            placeholder="Friend's Name"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            className="w-full border p-3 mt-4 rounded-md shadow-sm"
          />
          <input
            type="email"
            placeholder="Friend's Email"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            className="w-full border p-3 mt-2 rounded-md shadow-sm"
          />
          <textarea
            placeholder="Message (Optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-3 mt-2 rounded-md shadow-sm"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md mt-4 transform hover:scale-105 transition-all"
          >
            Submit
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
