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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      question: 'How does ${projectName} determine beach safety?',
      answer:
        '${projectName} integrates data from reliable sources like tourism departments and marine authorities to provide real-time safety indicators for each beach.',
    },
    {
      question: 'Can I leave reviews on ${projectName}?',
      answer:
        'Yes, users can share their experiences and leave reviews for beaches they have visited, helping others make informed decisions.',
    },
    {
      question: 'How do location-based alerts work?',
      answer:
        "${projectName} uses your device's location to send you timely alerts about changing beach conditions, ensuring you stay informed during your visit.",
    },
    {
      question: 'Is ${projectName} available in multiple languages?',
      answer:
        'Currently, ${projectName} supports English and Hindi, making it accessible to a wider audience in India.',
    },
    {
      question: 'How often is the beach data updated?',
      answer:
        'Beach data is updated in real-time as soon as new information is available from our integrated sources, ensuring accuracy and reliability.',
    },
    {
      question: 'Can I use ${projectName} to find beaches outside India?',
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
        <title>{`Contact Us - Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to ${projectName} for any inquiries or feedback. Our team is here to assist you with all your beach-related questions.`}
        />
      </Head>
      <WebSiteHeader projectName={'Beachware'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Beachware'}
          image={['Person holding a phone']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help with any questions or feedback you have about ${projectName}. Reach out to us and we'll respond promptly.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'Beachware'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Beachware'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Reach Out to ${projectName} Team `}
          subTitle={`Have questions or feedback? Contact us anytime and our team at ${projectName} will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Beachware'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
