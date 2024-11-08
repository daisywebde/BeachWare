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
  GalleryPortfolioDesigns,
  ContactFormDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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
    'Crystal clear ocean waves',
    'Family playing on sandy beach',
    'Colorful beach sunset view',
    'Surfers catching big waves',
    'Seashells scattered on shore',
    'Palm trees swaying in breeze',
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
        const formattedImages = images.map((image) => ({
          src: image.src || undefined,
          photographer: image.photographer || undefined,
          photographer_url: image.photographer_url || undefined,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const testimonials = [
    {
      text: 'The gallery on ${projectName} is stunning! It helped us choose the perfect beach for our family vacation.',
      company: 'Beachside Getaways',
      user_name: 'Samantha Green, Travel Enthusiast',
    },
    {
      text: 'I was amazed by the beautiful images on ${projectName}. They truly capture the essence of each beach.',
      company: 'Oceanic Adventures',
      user_name: 'James Carter, Photographer',
    },
    {
      text: 'Thanks to ${projectName}, I discovered hidden gems I never knew existed. The gallery is a visual treat!',
      company: 'Seaside Explorers',
      user_name: 'Olivia Brown, Beach Lover',
    },
    {
      text: 'The images on ${projectName} are breathtaking. They inspired me to visit new beaches and explore more.',
      company: 'Coastal Wanderers',
      user_name: 'Liam Wilson, Travel Blogger',
    },
    {
      text: "I love how ${projectName} showcases each beach's unique beauty. The gallery is both informative and inspiring.",
      company: 'Sunset Seekers',
      user_name: 'Emma Davis, Adventure Seeker',
    },
    {
      text: 'The gallery on ${projectName} is a fantastic resource for planning beach trips. The visuals are top-notch!',
      company: 'Wave Riders',
      user_name: 'Noah Smith, Surf Instructor',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Explore Our Beach Gallery - ${projectName}`}</title>
        <meta
          name='description'
          content={`Browse through stunning images of beaches and user experiences captured by ${projectName}. Discover the beauty and safety of your next beach destination.`}
        />
      </Head>
      <WebSiteHeader projectName={'Beachware'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Beachware'}
          image={['Sunset over a tranquil beach']}
          mainText={`Discover Beaches with ${projectName} Gallery`}
          subTitle={`Explore breathtaking beach images and user experiences captured through ${projectName}. Find inspiration for your next beach adventure.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Gallery`}
        />

        <GalleryPortfolioSection
          projectName={'Beachware'}
          images={images}
          mainText={`Capture the Beauty of Beaches`}
          design={GalleryPortfolioDesigns.OVERLAPPING_CENTRAL_IMAGE || ''}
        />

        <TestimonialsSection
          projectName={'Beachware'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY || ''}
          testimonials={testimonials}
          mainText={`What Our Users Love About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Beachware'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person using a smartphone']}
          mainText={`Reach Out to ${projectName} `}
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
