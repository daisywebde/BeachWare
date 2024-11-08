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
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const features_points = [
    {
      name: 'Comprehensive Beach Database',
      description:
        'Access a wide range of beaches across India with detailed information on safety, amenities, and user reviews. Plan your perfect beach day with ease.',
      icon: 'mdiDatabase',
    },
    {
      name: 'Instant Safety Alerts',
      description:
        'Receive real-time notifications about beach conditions and safety updates. Stay informed and make the best decisions for your beach outings.',
      icon: 'mdiBellAlert',
    },
    {
      name: 'Community Insights',
      description:
        "Engage with a community of beachgoers by reading and sharing reviews. Gain valuable insights from others' experiences to enhance your own visits.",
      icon: 'mdiAccountGroup',
    },
  ];

  const testimonials = [
    {
      text: "Thanks to ${projectName}, our family beach trips are now safer and more enjoyable. The app's real-time updates are invaluable.",
      company: 'Sunny Shores Inc.',
      user_name: 'Jessica Lee, Family Coordinator',
    },
    {
      text: 'As a travel blogger, ${projectName} is my go-to tool for discovering new beaches. The user reviews are incredibly helpful.',
      company: 'Wanderlust Travels',
      user_name: 'David Kim, Travel Blogger',
    },
    {
      text: 'The safety alerts have been a lifesaver. ${projectName} ensures that our beach outings are always well-informed and secure.',
      company: 'Coastal Safety Group',
      user_name: 'Rachel Adams, Safety Officer',
    },
    {
      text: 'I love the community aspect of ${projectName}. Sharing experiences with other beachgoers has enriched our trips.',
      company: 'Beach Buddies',
      user_name: 'Tom Harris, Community Manager',
    },
    {
      text: "The app's interface is intuitive and easy to use. ${projectName} has become an essential part of our beach planning.",
      company: 'Seaside Solutions',
      user_name: 'Emily White, UX Designer',
    },
    {
      text: "With ${projectName}, I can confidently choose the best beaches for my clients. It's a fantastic resource for travel agents.",
      company: 'Oceanic Travels',
      user_name: 'Michael Brown, Travel Agent',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Discover ${projectName}`}</title>
        <meta
          name='description'
          content={`Learn more about ${projectName}, our mission to enhance beach safety and enjoyment, and how we connect users with real-time beach information.`}
        />
      </Head>
      <WebSiteHeader projectName={'Beachware'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Beachware'}
          image={['Team collaborating on a project']}
          mainText={`Discover the Vision Behind ${projectName}`}
          subTitle={`Explore our mission to provide safe and enjoyable beach experiences. Learn how ${projectName} connects you with real-time beach insights and community feedback.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <AboutUsSection
          projectName={'Beachware'}
          image={['Team brainstorming innovative ideas']}
          mainText={`Our Journey with ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to enhancing your beach experiences with safety and community insights. Discover our story and the values that drive us.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Our Story`}
        />

        <FeaturesSection
          projectName={'Beachware'}
          image={['App interface showing features']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Features`}
          subTitle={`Discover how ${projectName} enhances your beach visits with innovative features designed for safety and enjoyment.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'Beachware'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our ${projectName} Users `}
        />

        <ContactFormSection
          projectName={'Beachware'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person writing an email']}
          mainText={`Connect with ${projectName} Team `}
          subTitle={`Reach out to us for any inquiries or feedback. Our team at ${projectName} is ready to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Beachware'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
