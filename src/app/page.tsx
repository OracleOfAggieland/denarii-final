import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <ShoppingCartIcon className="w-12 h-12 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          To Buy or Not to Buy?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          That is the million dollar question. Get rational advice on your purchasing decisions.
        </p>
      </div>

      {/* Chat Interface */}
      <ChatInterface />
    </main>
  );
}