import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  GalleryPortfolioDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import GalleryPortfolioSection from '../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../helpers/pexels';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

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

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'Sunny beach with clear water',
    'Family enjoying beach activities',
    'Colorful beach umbrellas and chairs',
    'Surfers riding ocean waves',
    'Scenic sunset over the ocean',
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
        const formattedImages = (images || []).map((image) => ({
          src: image?.src || undefined,
          photographer: image?.photographer || undefined,
          photographer_url: image?.photographer_url || undefined,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const features_points = [
    {
      name: 'Real-Time Safety Updates',
      description:
        'Stay informed with up-to-the-minute safety indicators for beaches, sourced from reliable authorities. Ensure your beach day is both fun and safe.',
      icon: 'mdiAlertCircle',
    },
    {
      name: 'User Reviews',
      description:
        'Read and share experiences with fellow beachgoers. Gain insights into beach conditions and amenities from a community of users.',
      icon: 'mdiCommentText',
    },
    {
      name: 'Location-Based Alerts',
      description:
        'Receive notifications about changing beach conditions based on your location. Be prepared for any weather or safety updates.',
      icon: 'mdiMapMarkerAlert',
    },
  ];

  const testimonials = [
    {
      text: 'Using ${projectName} has transformed our beach outings. The real-time updates are incredibly accurate and have saved us from unexpected weather changes.',
      company: 'Oceanic Ventures',
      user_name: 'Alice Johnson, Beach Enthusiast',
    },
    {
      text: 'I love how easy it is to find safe beaches with ${projectName}. The user reviews are a great addition, helping us choose the best spots.',
      company: 'Seaside Escapes',
      user_name: 'Mark Thompson, Travel Blogger',
    },
    {
      text: 'The location-based alerts are a game-changer! ${projectName} keeps us informed and safe, making our beach days stress-free.',
      company: 'Coastal Adventures',
      user_name: 'Emily Davis, Outdoor Guide',
    },
    {
      text: 'As a frequent beachgoer, ${projectName} is my go-to app for planning trips. The safety indicators are clear and reliable.',
      company: 'Sunset Travels',
      user_name: 'John Smith, Travel Agent',
    },
    {
      text: "The app's interface is user-friendly and the dual language support is a big plus. ${projectName} is a must-have for beach lovers.",
      company: 'Wave Riders',
      user_name: 'Priya Patel, Surf Instructor',
    },
    {
      text: "I appreciate the community aspect of ${projectName}. Reading others' experiences helps us make informed decisions about where to go.",
      company: 'Beachside Retreats',
      user_name: 'Liam Brown, Vacation Planner',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Beach Safety and Reviews App - Your Guide to Safe Beach Visits`}</title>
        <meta
          name='description'
          content={`Discover the best beaches for recreational activities with our app. Get real-time safety updates, user reviews, and stunning beach images to plan your perfect beach day.`}
        />
      </Head>
      <WebSiteHeader projectName={'Beachware'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Beachware'}
          image={['Beautiful beach with clear skies']}
          mainText={`Explore Safe Beaches with Confidence`}
          subTitle={`Discover the best beaches for your next adventure with ${projectName}. Get real-time safety updates, user reviews, and stunning visuals to plan your perfect beach day.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Find Your Beach`}
        />

        <GalleryPortfolioSection
          projectName={'Beachware'}
          images={images}
          mainText={`Visualize Your Perfect Beach Day`}
          design={GalleryPortfolioDesigns.HORIZONTAL_WITH_BUTTONS || ''}
        />

        <FeaturesSection
          projectName={'Beachware'}
          image={['Color-coded beach safety indicators']}
          withBg={1}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Explore how ${projectName} enhances your beach visits with real-time updates, user insights, and more.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'Beachware'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Users Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Beachware'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime for inquiries or feedback. Our team at ${projectName} is here to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Beachware'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
