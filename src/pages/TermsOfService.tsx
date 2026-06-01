import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';

export default function TermsOfService() {
  const canonical = getCanonicalUrl('/terms-of-service');
  
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Terms of Service | The AI Call - Voice AI Solutions</title>
        <meta name="description" content="Terms of Service for The AI Call voice AI solutions. Review our service terms and conditions." />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto max-w-4xl px-4">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="mb-4">
                By accessing and using The AI Call services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Description of Services</h2>
              <p className="mb-4">
                The AI Call provides voice AI solutions for businesses, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>AI-powered phone answering services</li>
                <li>Voice agents for lead qualification</li>
                <li>Automated appointment scheduling</li>
                <li>Call center automation solutions</li>
                <li>Workflow and task automation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Account Security</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Notify us immediately of any unauthorized use</li>
                    <li>Ensure all account information is accurate and up-to-date</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Acceptable Use</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use services only for lawful business purposes</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Respect the rights and privacy of others</li>
                    <li>Do not use services for spam, harassment, or illegal activities</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
              <p className="mb-4">
                We strive to maintain high service availability but cannot guarantee uninterrupted access. We may temporarily suspend services for maintenance, updates, or due to circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fees are charged according to your selected service plan</li>
                <li>Payments are due according to your billing cycle</li>
                <li>Late payments may result in service suspension</li>
                <li>Refunds are subject to our refund policy</li>
                <li>We reserve the right to change our pricing with notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="mb-4">
                All content, features, and functionality of our services are owned by The AI Call and are protected by copyright, trademark, and other intellectual property laws. You may not modify, distribute, or create derivative works without our written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data and Privacy</h2>
              <p className="mb-4">
                Your use of our services is also governed by our Privacy Policy. By using our services, you consent to the collection and use of information as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Disclaimers</h2>
              <div className="bg-muted/50 p-6 rounded-lg space-y-2">
                <p className="font-medium">IMPORTANT DISCLAIMERS:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Services are provided "as is" without warranties of any kind</li>
                  <li>We do not guarantee the accuracy of AI-generated responses</li>
                  <li>Users are responsible for verifying AI outputs before acting on them</li>
                  <li>We are not liable for business decisions based on AI recommendations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, The AI Call shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="mb-4">
                Either party may terminate the service agreement at any time. We reserve the right to suspend or terminate accounts that violate these terms or engage in prohibited activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p className="mb-4">
                These terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. We will notify users of material changes and continued use constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="font-medium">The AI Call</p>
                <p>Email: legal@theaicall.pro</p>
                <p>Address: [Your Business Address]</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}