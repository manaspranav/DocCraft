import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/login">
        <Button className="px-6 py-3 text-lg rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:brightness-110 transition">
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button variant="outline" className="px-6 py-3 text-lg rounded-2xl border-gray-300 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 text-gray-800 hover:brightness-105 transition">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
