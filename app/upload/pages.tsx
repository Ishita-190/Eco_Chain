"use client";

export default function UploadPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Upload Waste 📤</h1>
      <p className="text-gray-600 mb-8">
        Upload an image of your recyclable waste and earn eco-credits!
      </p>

      <form className="bg-white shadow rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
        <input type="file" accept="image/*" className="border rounded p-2" />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
