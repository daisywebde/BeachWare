import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Beachware';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/portfolio_gallery',
      label: 'portfolio_gallery',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const faqs = [
    {
      question: 'How does ${projectName} ensure beach safety?',
      answer:
        '${projectName} uses data from trusted sources like tourism departments and marine authorities to provide real-time safety updates for each beach.',
    },
    {
      question: 'Can I contribute my own beach reviews?',
      answer:
        'Yes, users can share their experiences by leaving reviews for beaches they visit, helping others make informed decisions.',
    },
    {
      question: 'What kind of alerts does ${projectName} provide?',
      answer:
        '${projectName} offers location-based alerts about changing beach conditions, ensuring you stay informed during your visit.',
    },
    {
      question: 'Is ${projectName} available in multiple languages?',
      answer:
        'Currently, ${projectName} supports English and Hindi, making it accessible to a wider audience in India.',
    },
    {
      question: 'How frequently is the beach data updated?',
      answer:
        'Beach data is updated in real-time as soon as new information is available from our integrated sources, ensuring accuracy and reliability.',
    },
    {
      question: 'Can I use ${projectName} outside of India?',
      answer:
        'Currently, ${projectName} focuses on beaches within India, but we plan to expand our coverage to other regions in the future.',
    },
    {
      question: 'Is there a cost to use ${projectName}?',
      answer:
        '${projectName} is free to use, providing valuable beach safety and community insights at no cost to users.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}, including features, usage, and more. Contact us for further inquiries.`}
        />
      </Head>
      <WebSiteHeader projectName={'Beachware'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Beachware'}
          image={['Person reading a FAQ document']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Get the information you need to enhance your beach experience.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Beachware'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Beachware'}
          design={ContactFormDesigns.HIGHLIGHTED_DIVERSITY || ''}
          image={['Person writing an email']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have more questions or feedback? Contact us anytime and our team at ${projectName} will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Beachware'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
