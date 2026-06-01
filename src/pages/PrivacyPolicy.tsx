import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';

export default function PrivacyPolicy() {
  const canonical = getCanonicalUrl('/privacy-policy');
  
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Privacy Policy | The AI Call Pro - Voice AI Solutions</title>
        <meta name="description" content="Privacy Policy for The AI Call Pro voice AI solutions. Learn how we protect and handle your personal information." />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto max-w-4xl px-4">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-4">
                The AI Call Pro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our voice AI services and website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, phone number</li>
                    <li>Business information and contact details</li>
                    <li>Account credentials and preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Voice Data</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Voice recordings and audio data from calls</li>
                    <li>Call transcriptions and conversation logs</li>
                    <li>Voice patterns for AI training (anonymized)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Usage Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Service usage statistics and analytics</li>
                    <li>Device information and IP addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our voice AI services</li>
                <li>Process appointments and customer interactions</li>
                <li>Train and enhance AI models (using anonymized data)</li>
                <li>Send service updates and important notifications</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your information, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="mb-4">
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations. Voice recordings may be kept for quality assurance and AI training purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability (where applicable)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
              <p className="mb-4">
                We may use third-party services for analytics, payment processing, and service delivery. These providers are bound by confidentiality agreements and data protection requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="font-medium">The AI Call Pro</p>
                <p>Email: privacy@theaicall.pro</p>
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