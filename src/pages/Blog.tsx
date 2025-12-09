import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "What is the Cuban Adjustment Act (CAA) and how does it work?",
    excerpt:
      "Learn the basics of this important law that has helped Cuban migrants find stability in the United States for decades.",
    content: `
      <p>The Cuban Adjustment Act (CAA), enacted in 1966, is a federal law that allows Cuban nationals who have been physically present in the United States for at least one year to apply for permanent resident status (a green card).</p>
      
      <h2>Key Features of the CAA</h2>
      <p>Unlike most other immigration pathways, the CAA provides a unique opportunity for Cuban nationals:</p>
      <ul>
        <li>Cubans can apply for adjustment of status after one year of physical presence</li>
        <li>Applicants do not need an employer sponsor or family petition</li>
        <li>The law recognizes the special circumstances of Cuban migrants</li>
      </ul>
      
      <h2>Eligibility Requirements</h2>
      <p>To be eligible for adjustment under the CAA, you must:</p>
      <ul>
        <li>Be a native or citizen of Cuba</li>
        <li>Have been inspected and admitted or paroled into the United States</li>
        <li>Have been physically present in the U.S. for at least one year</li>
        <li>Be admissible as an immigrant</li>
      </ul>
      
      <h2>Why the CAA Matters</h2>
      <p>The CAA reflects the humanitarian concerns of the United States regarding the situation in Cuba. It provides a pathway for Cuban migrants to build stable lives and contribute to American society.</p>
      
      <p><strong>Important:</strong> This information is for educational purposes only. For legal advice about your specific situation, please consult a licensed immigration attorney.</p>
    `,
    date: "December 5, 2024",
    tag: "CAA basics",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "How to avoid fraud in immigration services: 5 warning signs",
    excerpt:
      "Protect yourself and your family from scams and abusive practices when seeking immigration help.",
    content: `
      <p>Unfortunately, fraud in immigration services is a serious problem that affects many Cuban migrants. Here are five warning signs to help you protect yourself and your family.</p>
      
      <h2>1. Guarantees of Success</h2>
      <p>No legitimate attorney or representative can guarantee the outcome of an immigration case. If someone promises you will definitely get your green card or visa, be very cautious.</p>
      
      <h2>2. Pressure to Sign Quickly</h2>
      <p>Legitimate professionals give you time to review documents and ask questions. If someone pressures you to sign papers immediately without explaining them, this is a red flag.</p>
      
      <h2>3. Cash-Only Payments</h2>
      <p>Reputable attorneys and accredited representatives provide receipts and accept multiple payment methods. Be wary of anyone who only accepts cash and refuses to provide documentation.</p>
      
      <h2>4. Notario Fraud</h2>
      <p>In many Latin American countries, a "notario" is a licensed attorney. In the United States, a notary public is NOT authorized to provide legal advice. Be careful of notaries who claim they can help with immigration matters.</p>
      
      <h2>5. Missing or Suspicious Credentials</h2>
      <p>Always verify that an attorney is licensed with their state bar association. For non-attorney representatives, check that they are accredited by the Department of Justice.</p>
      
      <h2>What to Do If You Suspect Fraud</h2>
      <p>If you believe you have been a victim of immigration fraud, you can report it to our Observatory (OEAM) or directly to state authorities. We document these cases to protect the community.</p>
    `,
    date: "December 1, 2024",
    tag: "Fraud prevention",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Why Cuba's State Sponsor of Terrorism designation matters for Cuban migrants",
    excerpt:
      "Understanding the implications of this designation and what it means for those seeking to leave Cuba.",
    content: `
      <p>Cuba has been designated by the United States as a State Sponsor of Terrorism. This designation has significant implications for Cuban migrants and the broader international community.</p>
      
      <h2>What Does This Designation Mean?</h2>
      <p>The State Sponsor of Terrorism designation is applied to countries that the U.S. government determines have repeatedly provided support for acts of international terrorism. This designation triggers various sanctions and restrictions.</p>
      
      <h2>Implications for Cuban Migrants</h2>
      <p>The designation reflects the serious human rights situation in Cuba that drives many people to seek refuge in the United States. It underscores why the Cuban Adjustment Act remains an important humanitarian pathway.</p>
      
      <h2>Our Perspective</h2>
      <p>As a non-partisan organization, we focus on the humanitarian aspects of this situation. Many Cubans are fleeing repression, lack of freedoms, and economic hardship. They deserve fair treatment and access to legal pathways for stability.</p>
      
      <h2>What We Advocate For</h2>
      <ul>
        <li>Humane application of existing immigration laws</li>
        <li>Protection of Cuban migrants from fraud and abuse</li>
        <li>Education about rights and responsibilities</li>
        <li>Community support for families in transition</li>
      </ul>
    `,
    date: "November 28, 2024",
    tag: "Policy and context",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Community ambassadors: Cuban voices protecting Cuban families",
    excerpt:
      "Meet the volunteers across the United States who share verified information and support our community.",
    content: `
      <p>Our Community Ambassadors Program brings together Cuban migrants and allies across the United States who are committed to protecting their communities.</p>
      
      <h2>Who Are Our Ambassadors?</h2>
      <p>Our ambassadors are volunteers from different cities and states who have experienced the immigration process themselves or have deep connections to the Cuban community. They understand the challenges families face.</p>
      
      <h2>What Ambassadors Do</h2>
      <ul>
        <li>Share verified, accurate information about immigration processes</li>
        <li>Help families identify trustworthy resources and avoid fraud</li>
        <li>Report patterns of abuse to our Observatory (OEAM)</li>
        <li>Organize local events and educational workshops</li>
        <li>Connect community members with each other for mutual support</li>
      </ul>
      
      <h2>The Impact</h2>
      <p>Since launching the program, our ambassadors have helped hundreds of families access accurate information and avoid potential scams. They are the trusted voices in their local communities.</p>
      
      <h2>Join Us</h2>
      <p>If you are passionate about protecting Cuban families and have connections in your local community, we invite you to apply to become an ambassador. Training and support are provided.</p>
    `,
    date: "November 25, 2024",
    tag: "Community stories",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
  },
];

const tags = ["All", "CAA basics", "Fraud prevention", "Policy and context", "Community stories", "Observatory reports"];

function BlogList() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">Blog & News</h1>
            <p className="text-xl text-muted-foreground">
              News, guides, and stories from our community. Stay informed about
              the Cuban Adjustment Act, fraud prevention, and community updates.
            </p>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-8 border-b">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  tag === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                      <Tag className="w-3 h-3" />
                      {post.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary">
                    Read more
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="heading-2 text-foreground mb-4">Post not found</h1>
          <Button asChild>
            <Link to="/blog">Back to blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="section-padding">
        <div className="container-narrow">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to blog
            </Link>
          </Button>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                <Tag className="w-3.5 h-3.5" />
                {post.tag}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
            </div>
            <h1 className="heading-1 text-foreground mb-6">{post.title}</h1>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden mb-10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="prose prose-lg max-w-none text-muted-foreground
              prose-headings:text-foreground prose-headings:font-semibold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-p:leading-relaxed prose-p:mb-4
              prose-ul:my-4 prose-li:my-1
              prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
              <strong>Disclaimer:</strong> This article is for educational and
              informational purposes only. It does not constitute legal advice.
              For advice about your specific situation, please consult a
              licensed attorney.
            </p>
          </div>
        </div>
      </article>
    </Layout>
  );
}

export default function Blog() {
  const { id } = useParams();
  return id ? <BlogPost /> : <BlogList />;
}
