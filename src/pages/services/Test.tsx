import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Phone, Mic, Shield } from 'lucide-react';

const Test = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <Badge className="bg-blue-600 text-white px-4 py-1 rounded-full mb-6">
            Services / Test Page
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
            Test Service Page
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12">
            This is the test page for services section. Blue theme phat gaya! GSC optimized, Shadcn UI boss level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-xl px-10 py-6 shadow-2xl">
              Test Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-xl px-10 py-6 border-blue-600 hover:bg-blue-600 hover:text-white">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border-blue-200 hover:shadow-2xl transition-all hover:border-blue-400">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>AI Phone Test</CardTitle>
              <CardDescription>Blue theme test with Retell integration.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Blue gradients boss</li>
                <li>• Shadcn components</li>
                <li>• SEO schema ready</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-blue-200 hover:shadow-2xl transition-all hover:border-blue-400">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Mic className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Test Voice AI</CardTitle>
              <CardDescription>Voice agent demo with custom prompts.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Retell SDK integrated</li>
                <li>• Multi-language</li>
                <li>• 24/7 uptime</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-blue-200 hover:shadow-2xl transition-all hover:border-blue-400">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Test Security</CardTitle>
              <CardDescription>Secure AI calls with encryption.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• HIPAA compliant</li>
                <li>• GDPR ready</li>
                <li>• CRM sync</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Test;
