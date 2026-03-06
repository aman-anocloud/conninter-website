import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import HeroSlider from '@/components/HeroSlider/HeroSlider';
import StatsBar from '@/components/StatsBar/StatsBar';
import AboutSection from '@/components/AboutSection/AboutSection';
import Departments from '@/components/Departments/Departments';
import FeaturedServices from '@/components/FeaturedServices/FeaturedServices';
import DoctorsDirectory from '@/components/DoctorsDirectory/DoctorsDirectory';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';
import HospitalRibbon from '@/components/HospitalRibbon/HospitalRibbon';
import EmergencyCTA from '@/components/EmergencyCTA/EmergencyCTA';
import NewsletterStrip from '@/components/NewsletterStrip/NewsletterStrip';
import AppBanner from '@/components/AppBanner/AppBanner';
import Footer from '@/components/Footer/Footer';
import ChooseGateway from '@/components/ChooseGateway/ChooseGateway';
import BlogInsightsSection from '@/components/BlogInsightsSection/BlogInsightsSection';

export const metadata: Metadata = {
    title: 'Conninter – Clinic & Hospital Management Platform',
    description: 'Conninter streamlines visitor management, delivery coordination, and healthcare scheduling for hospitals, distributors, and medical representatives across India.',
    keywords: 'hospital management, clinic software, visitor management system, delivery management, healthcare coordination, India',
    openGraph: {
        title: 'Conninter – Clinic & Hospital Management Platform',
        description: 'Schedule visits, coordinate deliveries, and manage healthcare logistics on one unified platform.',
        type: 'website',
    },
};

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                {/* 1. Hero */}
                <HeroSlider />

                {/* 2. Stats strip with count-up animation on scroll */}
                <StatsBar />

                {/* 3. Choose Your Gateway */}
                <ChooseGateway />

                {/* 4. About – Two-column story + feature cards with SVG icons */}
                <AboutSection />

                {/* 5. Departments – VMS, DMS, Emergency, Directory, Pro Network, Analytics */}
                <Departments />

                {/* 5. Featured Services – 3 service cards + 6 mini chips */}
                <FeaturedServices />

                {/* 6. Contacts Directory – Find a hospital partner */}
                <DoctorsDirectory />

                {/* 7. Why Choose Us – Dark left panel + testimonial + 6-feature grid */}
                <WhyChooseUs />

                {/* 8. Hospital Ribbon – Trusted partner hospitals */}
                <HospitalRibbon />

                {/* 9. Emergency CTA – Full-width blue gradient, two-column */}
                <EmergencyCTA />

                {/* 10. Custom Blog Insights Section */}
                <BlogInsightsSection />

                {/* 12. Newsletter Strip – Email subscription */}
                <NewsletterStrip />

                {/* 12. App / WhatsApp Banner */}
                <AppBanner />
            </main>
            <Footer />
        </>
    );
}
