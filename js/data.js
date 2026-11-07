/**
 * LUMA - Fashion & Creative Talent Agency Directory
 * Categorized by Industry Tier:
 * 1. The Hustlers (Independent creators, rising freelancers & stylists)
 * 2. The Establishments (Established studios, proven event hosts & consultants)
 * 3. The Agencies (Boutique advisory firms, agency directors & producers)
 * 4. The Exclusive Circles (High-end heritage advisors & private collection curators)
 */

const LUMA_PROFILES = [
    // ==================== 1. THE HUSTLERS ====================
    {
        id: "luma-talent-01",
        name: "Aanya Sharma",
        age: 25,
        city: "Mumbai",
        location: "Mumbai, Bandra West",
        tier: "The Hustlers",
        role: "Editorial Wardrobe Stylist",
        price: 1499,
        priceDisplay: "₹1,499 / consultation",
        priceBand: "₹999 – ₹1,999",
        category: "The Hustlers",
        rating: 4.8,
        reviewsCount: 42,
        verified: true,
        availability: "Available Today",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Independent freelance stylist specializing in editorial shoots, capsule wardrobes, and indie brand campaigns.",
        languages: ["English", "Hindi"],
        timeSlots: ["10:00 - 12:00", "14:00 - 16:00", "18:00 - 20:00"],
        reviews: [
            { author: "Vikram S.", rating: 5, date: "October 2026", text: "Aanya provided brilliant styling advice for our brand campaign shoot. Highly professional." },
            { author: "Neha K.", rating: 5, date: "September 2026", text: "Great eye for color palettes and fabric coordination." }
        ]
    },
    {
        id: "luma-talent-02",
        name: "Rhea Deshmukh",
        age: 26,
        city: "Pune",
        location: "Pune, Koregaon Park",
        tier: "The Hustlers",
        role: "Freelance Stage & Event Emcee",
        price: 1299,
        priceDisplay: "₹1,299 / consultation",
        priceBand: "₹999 – ₹1,999",
        category: "The Hustlers",
        rating: 4.7,
        reviewsCount: 29,
        verified: true,
        availability: "Available Today",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Dynamic independent emcee for college fests, cultural pop-ups, and indie art exhibitions.",
        languages: ["Marathi", "English", "Hindi"],
        timeSlots: ["11:00 - 13:00", "15:00 - 17:00"],
        reviews: [
            { author: "Tanmay P.", rating: 5, date: "November 2026", text: "Energetic stage presence and great crowd engagement." }
        ]
    },
    {
        id: "luma-talent-03",
        name: "Pooja Hegde",
        age: 25,
        city: "Bengaluru",
        location: "Bengaluru, Indiranagar",
        tier: "The Hustlers",
        role: "Independent Voice Talent & Host",
        price: 1599,
        priceDisplay: "₹1,599 / consultation",
        priceBand: "₹999 – ₹1,999",
        category: "The Hustlers",
        rating: 4.8,
        reviewsCount: 38,
        verified: true,
        availability: "Available Today",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Freelance commercial voice artist and digital product showcase presenter.",
        languages: ["English", "Kannada", "Hindi"],
        timeSlots: ["12:00 - 14:00", "16:00 - 18:00"],
        reviews: [
            { author: "Shashank G.", rating: 5, date: "September 2026", text: "Delivered voice tracks on schedule with exact tone alignment." }
        ]
    },

    // ==================== 2. THE ESTABLISHMENTS ====================
    {
        id: "luma-talent-04",
        name: "Kavya Kulkarni",
        age: 28,
        city: "Mumbai",
        location: "Mumbai, Juhu",
        tier: "The Establishments",
        role: "Couture & Red Carpet Stylist",
        price: 3499,
        priceDisplay: "₹3,499 / consultation",
        priceBand: "₹2,000 – ₹4,999",
        category: "The Establishments",
        rating: 4.9,
        reviewsCount: 67,
        verified: true,
        availability: "Available Today",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Established fashion studio director with consistent placements across mainstream magazines and award red carpets.",
        languages: ["Marathi", "English", "Hindi"],
        timeSlots: ["11:00 - 13:00", "17:00 - 19:00"],
        reviews: [
            { author: "Dr. Pradeep N.", rating: 5, date: "October 2026", text: "Exceptional taste in tailoring and contemporary formal silhouettes." }
        ]
    },
    {
        id: "luma-talent-05",
        name: "Natasha Kapoor",
        age: 30,
        city: "Delhi",
        location: "Delhi, Chanakyapuri",
        tier: "The Establishments",
        role: "Concert Curator & Emcee",
        price: 4200,
        priceDisplay: "₹4,200 / consultation",
        priceBand: "₹2,000 – ₹4,999",
        category: "The Establishments",
        rating: 4.9,
        reviewsCount: 89,
        verified: true,
        availability: "Available Today",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Established classical arts presenter and institutional host for orchestral recitals and cultural foundation galas.",
        languages: ["English", "Hindi", "German"],
        timeSlots: ["14:00 - 16:00", "18:00 - 20:00"],
        reviews: [
            { author: "Raghav M.", rating: 5, date: "November 2026", text: "Conducted our classical evening with grace and profound cultural expertise." }
        ]
    },
    {
        id: "luma-talent-06",
        name: "Meera Patel",
        age: 28,
        city: "Delhi",
        location: "Delhi, South Extension",
        tier: "The Establishments",
        role: "Corporate Presence Coach",
        price: 2499,
        priceDisplay: "₹2,499 / consultation",
        priceBand: "₹2,000 – ₹4,999",
        category: "The Establishments",
        rating: 4.9,
        reviewsCount: 51,
        verified: true,
        availability: "Available Tomorrow",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Senior presence trainer working with established corporate clients on public speaking and professional articulation.",
        languages: ["English", "Hindi", "Gujarati"],
        timeSlots: ["09:00 - 11:00", "15:00 - 17:00"],
        reviews: [
            { author: "Pooja V.", rating: 5, date: "October 2026", text: "Constructive feedback on executive deck presentation and pitch delivery." }
        ]
    },

    // ==================== 3. THE AGENCIES ====================
    {
        id: "luma-talent-07",
        name: "Samyuktha Rao",
        age: 29,
        city: "Bengaluru",
        location: "Bengaluru, Lavelle Road",
        tier: "The Agencies",
        role: "Agency Media Moderator",
        price: 5200,
        priceDisplay: "₹5,200 / consultation",
        priceBand: "₹5,000 – ₹9,999",
        category: "The Agencies",
        rating: 4.8,
        reviewsCount: 45,
        verified: true,
        availability: "Available Tomorrow",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Lead moderator represented by top creative agencies for VC summits, tech conferences, and founder forums.",
        languages: ["English", "Kannada", "Telugu"],
        timeSlots: ["10:00 - 12:00", "15:00 - 17:00"],
        reviews: [
            { author: "Karthik R.", rating: 5, date: "October 2026", text: "Kept our venture panel discussions punctual, incisive, and engaging." }
        ]
    },
    {
        id: "luma-talent-08",
        name: "Ishani Singhania",
        age: 31,
        city: "Mumbai",
        location: "Mumbai, Worli Sea Face",
        tier: "The Agencies",
        role: "Agency Creative Director",
        price: 7500,
        priceDisplay: "₹7,500 / consultation",
        priceBand: "₹5,000 – ₹9,999",
        category: "The Agencies",
        rating: 5.0,
        reviewsCount: 114,
        verified: true,
        availability: "Available Today",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Director at boutique brand agency advising fashion houses on seasonal launch campaigns and high-production content.",
        languages: ["English", "Hindi", "French"],
        timeSlots: ["13:00 - 15:00", "17:00 - 19:00"],
        reviews: [
            { author: "Karan Singhal", rating: 5, date: "November 2026", text: "Her strategic agency advisory elevated our showroom debut tremendously." }
        ]
    },
    {
        id: "luma-talent-09",
        name: "Elena Rostova",
        age: 28,
        city: "Goa",
        location: "Goa, Panaji",
        tier: "The Agencies",
        role: "Hospitality Agency Strategist",
        price: 6500,
        priceDisplay: "₹6,500 / consultation",
        priceBand: "₹5,000 – ₹9,999",
        category: "The Agencies",
        rating: 4.8,
        reviewsCount: 36,
        verified: true,
        availability: "Available Weekend",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Agency consultant representing premier coastal hospitality concepts, private venues, and brand activations.",
        languages: ["English", "Russian", "French"],
        timeSlots: ["14:00 - 16:00", "17:00 - 19:00"],
        reviews: [
            { author: "Nikhil B.", rating: 5, date: "October 2026", text: "Structured our resort launch strategy with high professionalism." }
        ]
    },

    // ==================== 4. THE EXCLUSIVE CIRCLES ====================
    {
        id: "luma-talent-10",
        name: "Victoria Vance",
        age: 33,
        city: "Delhi",
        location: "Delhi, Golf Links",
        tier: "The Exclusive Circles",
        role: "Diplomatic Protocol Advisor",
        price: 12500,
        priceDisplay: "₹12,500 / consultation",
        priceBand: "₹10,000 – ₹19,999",
        category: "The Exclusive Circles",
        rating: 4.9,
        reviewsCount: 92,
        verified: true,
        availability: "Available Tomorrow",
        image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Advises exclusive private foundations and multilateral delegations on cross-border protocol and closed-door summit management.",
        languages: ["English", "Spanish", "Italian"],
        timeSlots: ["10:00 - 12:00", "16:00 - 18:00"],
        reviews: [
            { author: "Sir Arthur C.", rating: 5, date: "October 2026", text: "Unmatched expertise in private bilateral reception protocol." }
        ]
    },
    {
        id: "luma-talent-11",
        name: "Princess Avantika Devi",
        age: 34,
        city: "Jaipur",
        location: "Jaipur, Rambagh Palace Estate",
        tier: "The Exclusive Circles",
        role: "Royal Heritage & Textile Archivist",
        price: 18500,
        priceDisplay: "₹18,500 / consultation",
        priceBand: "₹10,000 – ₹19,999",
        category: "The Exclusive Circles",
        rating: 5.0,
        reviewsCount: 140,
        verified: true,
        availability: "Available Today",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Curator accessible exclusively for bespoke royal estate preservation, museum-grade textile appraisal, and heritage collections.",
        languages: ["Hindi", "English", "French"],
        timeSlots: ["11:00 - 13:00", "15:00 - 17:00"],
        reviews: [
            { author: "Heritage Advisory Council", rating: 5, date: "November 2026", text: "Peerless mastery of historical South Asian royal textiles and private archives." }
        ]
    },
    {
        id: "luma-talent-12",
        name: "Seraphina Sterling",
        age: 35,
        city: "Mumbai",
        location: "Mumbai, Malabar Hill",
        tier: "The Exclusive Circles",
        role: "Private Fine Art Acquisition Advisor",
        price: 16900,
        priceDisplay: "₹16,900 / consultation",
        priceBand: "₹10,000 – ₹19,999",
        category: "The Exclusive Circles",
        rating: 5.0,
        reviewsCount: 128,
        verified: true,
        availability: "Available Today",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80"
        ],
        description: "Advising private family offices and distinguished collectors on high-value Modernist acquisitions and auction bidding.",
        languages: ["English", "Hindi"],
        timeSlots: ["14:00 - 16:00", "18:00 - 20:00"],
        reviews: [
            { author: "Rajiv Singhania", rating: 5, date: "October 2026", text: "Invaluable counsel on our post-war contemporary art acquisitions." }
        ]
    }
];

// Initial mock bookings in localStorage if empty
const INITIAL_DEMO_BOOKINGS = [
    {
        id: "LUMA-BK-8901",
        profileId: "luma-talent-04",
        profileName: "Kavya Kulkarni",
        profileImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80",
        role: "Couture & Red Carpet Stylist",
        tier: "The Establishments",
        date: "2026-11-15",
        timeSlot: "11:00 - 13:00",
        rate: 3499,
        status: "Confirmed",
        bookedAt: "2026-11-06T14:20:00Z"
    },
    {
        id: "LUMA-BK-8902",
        profileId: "luma-talent-08",
        profileName: "Ishani Singhania",
        profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80",
        role: "Agency Creative Director",
        tier: "The Agencies",
        date: "2026-11-18",
        timeSlot: "13:00 - 15:00",
        rate: 7500,
        status: "Pending",
        bookedAt: "2026-11-07T09:10:00Z"
    }
];
