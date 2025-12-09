import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function BlogList() {
  const { t } = useLanguage();

  const blogPosts = [
    {
      id: "1",
      title: t("blog.post1.title"),
      excerpt: t("blog.post1.excerpt"),
      date: "December 5, 2024",
      tag: t("blog.post1.tag"),
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
    },
    {
      id: "2",
      title: t("blog.post2.title"),
      excerpt: t("blog.post2.excerpt"),
      date: "December 1, 2024",
      tag: t("blog.post2.tag"),
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    },
    {
      id: "3",
      title: t("blog.post3.title"),
      excerpt: t("blog.post3.excerpt"),
      date: "November 28, 2024",
      tag: t("blog.post3.tag"),
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
    },
  ];

  const tags = [
    t("blog.tagAll"),
    t("blog.tagCaaBasics"),
    t("blog.tagFraudPrevention"),
    t("blog.tagPolicy"),
    t("blog.tagCommunity"),
    t("blog.tagObservatory"),
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">{t("blog.heroTitle")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("blog.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-8 border-b">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag, index) => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
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
                    {t("blog.readMore")}
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
  const { t, language } = useLanguage();

  // Blog post content in both languages
  const blogPostsContent: Record<string, { EN: any; ES: any }> = {
    "1": {
      EN: {
        title: "What is the Cuban Adjustment Act (CAA) and how does it work?",
        excerpt: "Learn the basics of this important law that has helped Cuban migrants find stability in the United States for decades.",
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
      },
      ES: {
        title: "¿Qué es la Ley de Ajuste Cubano (CAA) y cómo funciona?",
        excerpt: "Conoce los fundamentos de esta importante ley que ha ayudado a migrantes cubanos a encontrar estabilidad en Estados Unidos durante décadas.",
        content: `
          <p>La Ley de Ajuste Cubano (CAA), promulgada en 1966, es una ley federal que permite a los nacionales cubanos que han estado físicamente presentes en Estados Unidos por al menos un año solicitar el estatus de residente permanente (green card).</p>
          
          <h2>Características Principales de la CAA</h2>
          <p>A diferencia de la mayoría de las otras vías migratorias, la CAA proporciona una oportunidad única para los nacionales cubanos:</p>
          <ul>
            <li>Los cubanos pueden solicitar el ajuste de estatus después de un año de presencia física</li>
            <li>Los solicitantes no necesitan un patrocinador empleador o petición familiar</li>
            <li>La ley reconoce las circunstancias especiales de los migrantes cubanos</li>
          </ul>
          
          <h2>Requisitos de Elegibilidad</h2>
          <p>Para ser elegible para el ajuste bajo la CAA, debes:</p>
          <ul>
            <li>Ser nativo o ciudadano de Cuba</li>
            <li>Haber sido inspeccionado y admitido o en parole en Estados Unidos</li>
            <li>Haber estado físicamente presente en EE.UU. por al menos un año</li>
            <li>Ser admisible como inmigrante</li>
          </ul>
          
          <h2>Por Qué Importa la CAA</h2>
          <p>La CAA refleja las preocupaciones humanitarias de Estados Unidos respecto a la situación en Cuba. Proporciona una vía para que los migrantes cubanos construyan vidas estables y contribuyan a la sociedad estadounidense.</p>
          
          <p><strong>Importante:</strong> Esta información es solo para fines educativos. Para asesoramiento legal sobre su situación específica, consulte a un abogado de inmigración licenciado.</p>
        `,
        date: "5 de diciembre de 2024",
        tag: "Fundamentos CAA",
      },
    },
    "2": {
      EN: {
        title: "How to avoid fraud in immigration services: 5 warning signs",
        excerpt: "Protect yourself and your family from scams and abusive practices when seeking immigration help.",
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
      },
      ES: {
        title: "Cómo evitar el fraude en servicios migratorios: 5 señales de advertencia",
        excerpt: "Protégete a ti y a tu familia de estafas y prácticas abusivas al buscar ayuda migratoria.",
        content: `
          <p>Desafortunadamente, el fraude en servicios migratorios es un problema serio que afecta a muchos migrantes cubanos. Aquí hay cinco señales de advertencia para ayudarte a protegerte a ti y a tu familia.</p>
          
          <h2>1. Garantías de Éxito</h2>
          <p>Ningún abogado o representante legítimo puede garantizar el resultado de un caso migratorio. Si alguien te promete que definitivamente obtendrás tu green card o visa, ten mucho cuidado.</p>
          
          <h2>2. Presión para Firmar Rápido</h2>
          <p>Los profesionales legítimos te dan tiempo para revisar documentos y hacer preguntas. Si alguien te presiona para firmar papeles inmediatamente sin explicarlos, esto es una señal de alerta.</p>
          
          <h2>3. Pagos Solo en Efectivo</h2>
          <p>Los abogados y representantes acreditados proporcionan recibos y aceptan múltiples métodos de pago. Ten cuidado con cualquiera que solo acepte efectivo y se niegue a proporcionar documentación.</p>
          
          <h2>4. Fraude de Notario</h2>
          <p>En muchos países latinoamericanos, un "notario" es un abogado licenciado. En Estados Unidos, un notary public NO está autorizado para proporcionar asesoramiento legal. Ten cuidado con los notarios que afirman que pueden ayudar con asuntos migratorios.</p>
          
          <h2>5. Credenciales Faltantes o Sospechosas</h2>
          <p>Siempre verifica que un abogado esté licenciado con su colegio de abogados estatal. Para representantes no abogados, verifica que estén acreditados por el Departamento de Justicia.</p>
          
          <h2>Qué Hacer Si Sospechas Fraude</h2>
          <p>Si crees que has sido víctima de fraude migratorio, puedes reportarlo a nuestro Observatorio (OEAM) o directamente a las autoridades estatales. Documentamos estos casos para proteger a la comunidad.</p>
        `,
        date: "1 de diciembre de 2024",
        tag: "Prevención de fraude",
      },
    },
    "3": {
      EN: {
        title: "Community ambassadors: Cuban voices protecting Cuban families",
        excerpt: "Meet the volunteers across the United States who share verified information and support our community.",
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
        date: "November 28, 2024",
        tag: "Community stories",
      },
      ES: {
        title: "Embajadores comunitarios: Voces cubanas protegiendo familias cubanas",
        excerpt: "Conoce a los voluntarios en Estados Unidos que comparten información verificada y apoyan a nuestra comunidad.",
        content: `
          <p>Nuestro Programa de Embajadores Comunitarios reúne a migrantes cubanos y aliados en Estados Unidos que están comprometidos con proteger a sus comunidades.</p>
          
          <h2>¿Quiénes Son Nuestros Embajadores?</h2>
          <p>Nuestros embajadores son voluntarios de diferentes ciudades y estados que han experimentado el proceso migratorio ellos mismos o tienen conexiones profundas con la comunidad cubana. Entienden los desafíos que enfrentan las familias.</p>
          
          <h2>Qué Hacen los Embajadores</h2>
          <ul>
            <li>Comparten información verificada y precisa sobre procesos migratorios</li>
            <li>Ayudan a las familias a identificar recursos confiables y evitar el fraude</li>
            <li>Reportan patrones de abuso a nuestro Observatorio (OEAM)</li>
            <li>Organizan eventos locales y talleres educativos</li>
            <li>Conectan a miembros de la comunidad entre sí para apoyo mutuo</li>
          </ul>
          
          <h2>El Impacto</h2>
          <p>Desde el lanzamiento del programa, nuestros embajadores han ayudado a cientos de familias a acceder a información precisa y evitar posibles estafas. Son las voces confiables en sus comunidades locales.</p>
          
          <h2>Únete a Nosotros</h2>
          <p>Si te apasiona proteger a las familias cubanas y tienes conexiones en tu comunidad local, te invitamos a solicitar ser embajador. Se proporciona capacitación y apoyo.</p>
        `,
        date: "28 de noviembre de 2024",
        tag: "Historias comunitarias",
      },
    },
  };

  const post = id ? blogPostsContent[id]?.[language] : null;

  if (!post) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="heading-2 text-foreground mb-4">{t("blog.postNotFound")}</h1>
          <Button asChild>
            <Link to="/blog">{t("blog.backToBlog")}</Link>
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
              {t("blog.backToBlog")}
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
              src={`https://images.unsplash.com/photo-${id === "1" ? "1589829545856-d10d557cf95f" : id === "2" ? "1450101499163-c8848c66ca85" : "1529156069898-49953e39b3ac"}?w=800&h=400&fit=crop`}
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
              <strong>Disclaimer:</strong> {t("blog.disclaimer")}
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
