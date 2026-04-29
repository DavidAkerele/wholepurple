"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { bulkUploadCustomers } from "@/app/actions/customer";
import toast from "react-hot-toast";

export default function CustomerBulkUpload() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        toast.error("Please upload a CSV file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const text = await file.text();
      const result = await bulkUploadCustomers(text);

      if (result.success) {
        toast.success(`Successfully uploaded ${result.count} customers!`);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(result.error || "Upload failed.");
      }
    } catch (err) {
      toast.error("Error reading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-100 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Bulk Customer Upload</h3>
          <p className="text-sm text-gray-800 font-medium">Upload a CSV file with 'name', 'email', and 'role' columns.</p>
        </div>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-[24px] p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
          file ? 'border-green-200 bg-green-50/30' : 'border-gray-100 hover:border-[var(--primary-purple)] hover:bg-purple-50/30'
        }`}
      >
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv"
          className="hidden"
        />
        {file ? (
          <>
            <FileText className="w-12 h-12 text-green-500" />
            <div className="text-center">
              <p className="font-bold text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-800">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-500" />
            <p className="font-bold text-gray-600">Click to select CSV file</p>
          </>
        )}
      </div>

      {file && (
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[var(--primary-purple)] text-white font-black text-lg hover:shadow-xl hover:shadow-purple-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Process Upload
            </>
          )}
        </button>
      )}

      <div className="p-4 bg-gray-50 text-gray-900 rounded-2xl flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-800 font-medium leading-relaxed">
          Ensure your CSV file uses commas as separators. The first row must be the header. 
          Valid roles are: <code className="bg-gray-200 px-1 rounded">ADMIN</code>, 
          <code className="bg-gray-200 px-1 rounded">SHOP_MANAGER</code>, 
          <code className="bg-gray-200 px-1 rounded">CLIENT</code>.
        </p>
      </div>
    </div>
  );
}
