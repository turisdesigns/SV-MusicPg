"use client";
import React from "react";

function MainComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cards = [
    {
      title: "Expert Videographers",
      description:
        "Professional camera operators with years of experience in live event coverage",
      icon: "fas fa-video",
    },
    {
      title: "High-End Equipment",
      description: "Using the latest 4K cameras and professional audio gear",
      icon: "fas fa-camera",
    },
    {
      title: "Fast Turnaround",
      description: "Same-day delivery for all your video content needs",
      icon: "fas fa-bolt",
    },
    {
      title: "Quality Assured",
      description: "Multiple quality checks to ensure perfect results",
      icon: "fas fa-check-circle",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0B0B1F] text-white min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <i className="fas fa-video text-[#B026FF] mr-2"></i>
          Shred Video
        </div>
        <div className="flex gap-8 items-center">
          <a href="#" className="hover:text-[#B026FF] transition-colors">
            HOME
          </a>
          <a href="#" className="hover:text-[#B026FF] transition-colors">
            ABOUT
          </a>
          <a href="#" className="hover:text-[#B026FF] transition-colors">
            SERVICES
          </a>
          <a href="#" className="hover:text-[#B026FF] transition-colors">
            VIDEOS
          </a>
          <a href="#" className="hover:text-[#B026FF] transition-colors">
            CONTACT
          </a>
          <button className="bg-gradient-to-r from-[#B026FF] to-[#FF2674] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
            REQUEST A DEMO
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative h-[700px] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(176, 38, 255, 0.2), rgba(255, 38, 116, 0.2)), url("https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-[#B026FF] to-[#FF2674] text-transparent bg-clip-text">
            CAPTURE
          </h1>
          <h2 className="text-5xl mb-8">EVERY MOMENT</h2>
          <i className="fas fa-chevron-down text-2xl animate-bounce text-[#B026FF]"></i>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B1F]/50 to-[#0B0B1F]"></div>
      </div>

      {/* Who We Are Section with Card Slideshow */}
      <div className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Text Content */}
            <div>
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#B026FF] to-[#FF2674] text-transparent bg-clip-text">
                WHO WE ARE
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                We are a team of passionate videographers and editors dedicated
                to capturing your most important moments with precision and
                creativity.
              </p>
              <p className="text-xl text-gray-300 mb-6">
                Our innovative approach combines cutting-edge technology with
                artistic vision to deliver exceptional video content that
                exceeds expectations.
              </p>
              <p className="text-xl text-gray-300">
                With years of experience in live event coverage, we understand
                the importance of reliability, quality, and quick turnaround
                times.
              </p>
            </div>

            {/* Right Card Slideshow */}
            <div className="relative h-[500px]">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`absolute w-full transition-all duration-500 ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0 scale-100 z-20"
                      : index === (currentSlide + 1) % cards.length
                      ? "opacity-60 translate-x-[60%] scale-90 z-10"
                      : index === (currentSlide + 2) % cards.length
                      ? "opacity-30 translate-x-[120%] scale-80 z-0"
                      : "opacity-0 translate-x-[-100%] scale-70 -z-10"
                  }`}
                >
                  <div className="bg-gradient-to-br from-[#151531] to-[#1A1A3D] p-8 rounded-2xl shadow-xl border border-[#B026FF]/20">
                    <i
                      className={`${card.icon} text-[#B026FF] text-4xl mb-6`}
                    ></i>
                    <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                    <p className="text-gray-400">{card.description}</p>
                  </div>
                </div>
              ))}

              {/* Card Navigation Dots */}
              <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center gap-3">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === index
                        ? "bg-[#B026FF] w-8"
                        : "bg-[#B026FF]/30 hover:bg-[#B026FF]/50"
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#B026FF] to-[#FF2674] text-transparent bg-clip-text">
          OUR SERVICES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "FULL SET VIDEOS",
              icon: "fas fa-film",
              desc: "Multi-cam videos of your entire set/show highlights",
            },
            {
              title: "SOCIAL MEDIA REELS",
              icon: "fas fa-mobile-alt",
              desc: "Vertical videos cut fast for posting",
            },
            {
              title: "SYNCHRONIZED MULTI-CAM",
              icon: "fas fa-video",
              desc: "HD coverage of your event",
            },
            {
              title: "MASTER AUDIO",
              icon: "fas fa-music",
              desc: "Sound design and recording from the master mixing board",
            },
            {
              title: "LIVE AUDIO",
              icon: "fas fa-microphone",
              desc: "Live broadcasting to capture audience reactions",
            },
            {
              title: "PROFESSIONAL MIXING",
              icon: "fas fa-sliders-h",
              desc: "Professional quality video with dual channel audio",
            },
            {
              title: "VIDEOGRAPHER INTEGRATION",
              icon: "fas fa-user-friends",
              desc: "Unlimited footage for streaming",
            },
            {
              title: "RECORDED IN 4K",
              icon: "fas fa-tv",
              desc: "High resolution for capture",
            },
            {
              title: "IMMEDIATE DELIVERY",
              icon: "fas fa-bolt",
              desc: "Ready to publish in real time",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-[#151531] p-8 rounded-2xl hover:bg-[#1A1A3D] transition-all group"
            >
              <i
                className={`${service.icon} text-[#B026FF] text-4xl mb-6 group-hover:scale-110 transition-transform`}
              ></i>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-[#B026FF] to-[#FF2674] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-center">
            <h3 className="text-7xl font-bold mb-4">10x</h3>
            <p className="text-2xl font-semibold mb-4">MORE AFFORDABLE</p>
            <p className="text-white/90 text-lg max-w-md mx-auto">
              Shred Video operates without any dedicated staff, making us 10x
              more cost effective than a traditional video team
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-7xl font-bold mb-4">100x</h3>
            <p className="text-2xl font-semibold mb-4">FASTER DELIVERY</p>
            <p className="text-white/90 text-lg max-w-md mx-auto">
              No more waiting around for edits to drop. Immediate delivery means
              you get your media when you need it most
            </p>
          </div>
        </div>
      </div>

      {/* Generate Revenue Section */}
      <div className="bg-gradient-to-r from-[#B026FF] to-[#FF2674] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">GENERATE REVENUE</h2>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="bg-white/10 p-4 rounded-lg">
                <i className="fas fa-video text-4xl"></i>
              </div>
              <i className="fas fa-arrow-right text-3xl"></i>
              <div className="bg-white/10 p-4 rounded-lg">
                <i className="fas fa-chart-line text-4xl"></i>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-lg mb-4">
                Now that you're capturing every moment, you can sell this media
                to the artists, promoters, and music collectives who perform at
                your venue.
              </p>
              <p className="text-lg mb-4">
                Multi-cam video shoots can cost between $5,000 and $10,000 per
                night. Our services start at less than half per month.
              </p>
              <p className="text-lg">
                We aren't merely cost effective– we'll contribute to your bottom
                line.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center py-20 bg-[#0B0B1F]">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#B026FF] to-[#FF2674] text-transparent bg-clip-text">
          CONTACT US
        </h2>
        <p className="mb-10 text-lg text-gray-300">
          Try Shred Video for $0 commitment.
        </p>
        <button className="bg-gradient-to-r from-[#B026FF] to-[#FF2674] text-white px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
          REQUEST A DEMO
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#151531] py-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-400">
            © 2025 Shred Video Inc. All Rights Reserved
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-[#B026FF] transition-colors"
            >
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#B026FF] transition-colors"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#B026FF] transition-colors"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;