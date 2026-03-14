import SimpleChat from "@/components/SimpleChat";

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">API Connection Test</h1>
        <SimpleChat />
        
        <div className="mt-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <h3 className="font-bold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Type a message like "im happy" or "im sad"</li>
            <li>Click send to test the API connection</li>
            <li>Open browser console (F12) to see detailed logs</li>
            <li>If successful, you'll see a prediction from the AI</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
