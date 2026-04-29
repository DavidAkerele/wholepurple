"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
}

export default function Pagination({ totalPages, currentPage, baseUrl }: PaginationProps) {
  const searchParams = useSearchParams();
  
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
          currentPage === 1 
          ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
          : 'border-gray-200 text-gray-600 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)]'
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
            currentPage === page
            ? 'bg-[var(--primary-purple)] text-white shadow-lg shadow-purple-200'
            : 'border border-gray-200 text-gray-600 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)]'
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
          currentPage === totalPages 
          ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
          : 'border-gray-200 text-gray-600 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)]'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
