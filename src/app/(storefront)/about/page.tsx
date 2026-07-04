import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cream-50 to-white py-16 md:py-24">
        <div className="container text-center">
          <img
            src="/logos/grabway-naturals.png"
            alt="Grabway Naturals"
            className="h-24 md:h-32 mx-auto mb-6"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-forest-900">
            About GrabWay Naturals
          </h1>
          <p className="mt-4 text-lg md:text-xl text-honey-700 font-medium">
            How We Started Our Journey
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto space-y-6 text-forest-700 text-lg leading-relaxed">
          <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-honey-600 first-letter:mr-1 first-letter:float-left">
            At GrabWay Naturals, our journey began with a family of four rooted in a traditional 
            grocery business with over 45 years of trust and service. Built on strong values of 
            quality, honesty, and healthy living, our family has always believed in providing pure 
            and natural food to the community.
          </p>

          <p>
            For the past two years, we have been dedicated to the honey business, working closely 
            with experienced beekeepers and sourcing directly from trusted bee farms. Our mission 
            is to bring raw, natural, and carefully sourced honey to every household while 
            supporting local beekeeping communities.
          </p>

          <p>
            We are passionate about creating awareness about natural honey, its nutritional 
            benefits, and the importance of choosing pure, unprocessed food. Along with honey 
            and honey-based products, we continue to promote a healthier lifestyle inspired by 
            nature and tradition.
          </p>

          <p>
            Today, through both our physical store and online platform, we proudly serve 
            customers who value authenticity, purity, and wellness in their everyday lives.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-b from-honey-50 to-cream-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-forest-900 text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pure Natural Honey */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-honey-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🍯</div>
              <h3 className="text-xl font-bold text-forest-900 mb-3">Pure Natural Honey</h3>
              <p className="text-forest-600 leading-relaxed">
                We source our honey directly from trusted beekeepers and natural bee farms to 
                deliver pure, raw, and authentic honey filled with natural goodness.
              </p>
            </div>

            {/* Raw & Unprocessed */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-honey-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-forest-900 mb-3">Raw &amp; Unprocessed</h3>
              <p className="text-forest-600 leading-relaxed">
                Our honey is carefully filtered without heavy processing to preserve its 
                natural taste, aroma, nutrients, and health benefits.
              </p>
            </div>

            {/* Direct From Bee Farms */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-honey-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🐝</div>
              <h3 className="text-xl font-bold text-forest-900 mb-3">Direct From Bee Farms</h3>
              <p className="text-forest-600 leading-relaxed">
                We work closely with experienced beekeepers to ensure ethical sourcing, 
                freshness, and premium quality honey straight from the hive.
              </p>
            </div>

            {/* No Artificial Additives */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-honey-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="text-xl font-bold text-forest-900 mb-3">No Artificial Additives</h3>
              <p className="text-forest-600 leading-relaxed">
                Our honey contains no artificial colors, flavors, or preservatives. Just pure 
                natural honey the way nature intended.
              </p>
            </div>

            {/* Naturally Nutritious */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-honey-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">💛</div>
              <h3 className="text-xl font-bold text-forest-900 mb-3">Naturally Nutritious</h3>
              <p className="text-forest-600 leading-relaxed">
                Rich in natural energy and traditional wellness benefits, our honey is a 
                wholesome addition to your everyday lifestyle.
              </p>
            </div>

            {/* Supporting Natural Living */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-honey-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="text-xl font-bold text-forest-900 mb-3">Supporting Natural Living</h3>
              <p className="text-forest-600 leading-relaxed">
                At GrabWay Naturals, we believe in spreading awareness about natural honey, 
                healthy eating, and supporting sustainable beekeeping communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-forest-800 to-forest-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Experience the Purity of Nature
          </h2>
          <p className="text-forest-200 max-w-lg mx-auto mb-6">
            Join thousands of families who trust GrabWay Naturals for their daily dose of 
            pure, raw honey and natural wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/naturals"
              className="inline-flex items-center justify-center px-6 py-3 bg-honey-500 hover:bg-honey-600 text-white font-semibold rounded-lg transition-colors"
            >
              Shop Honey Products
            </Link>
            <Link
              href="/essentials"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors"
            >
              Explore Essentials
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
