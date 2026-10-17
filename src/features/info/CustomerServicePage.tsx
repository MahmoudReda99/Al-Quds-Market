import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import {
  HelpCircle,
  Phone,
  Mail,
  RotateCcw,
  ShieldCheck,
  FileText,
  ChevronDown,
  Clock,
  MapPin,
  CheckCircle2,
  CreditCard,
  Send,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export type CustomerServiceTab = 'faq' | 'contact' | 'return' | 'privacy' | 'terms';

interface CustomerServicePageProps {
  defaultTab?: CustomerServiceTab;
}

function getTabFromPath(path: string, defaultTab?: CustomerServiceTab): CustomerServiceTab {
  if (path.includes('faq')) return 'faq';
  if (path.includes('contact')) return 'contact';
  if (path.includes('return')) return 'return';
  if (path.includes('privacy')) return 'privacy';
  if (path.includes('terms')) return 'terms';
  return defaultTab || 'faq';
}

export default function CustomerServicePage({ defaultTab }: CustomerServicePageProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<CustomerServiceTab>(() =>
    getTabFromPath(location.pathname, defaultTab)
  );

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname, defaultTab));
  }, [location.pathname, defaultTab]);

  const handleTabChange = (tab: CustomerServiceTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const routes: Record<CustomerServiceTab, string> = {
      faq: '/faq',
      contact: '/contact',
      return: '/return-policy',
      privacy: '/privacy',
      terms: '/terms',
    };
    navigate(routes[tab]);
  };

  const tabs = [
    {
      id: 'faq' as const,
      labelAr: 'الأسئلة الشائعة',
      labelEn: 'FAQ',
      Icon: HelpCircle,
    },
    {
      id: 'contact' as const,
      labelAr: 'تواصل معنا',
      labelEn: 'Contact Us',
      Icon: Phone,
    },
    {
      id: 'return' as const,
      labelAr: 'سياسة الاستبدال والاسترجاع',
      labelEn: 'Return Policy',
      Icon: RotateCcw,
    },
    {
      id: 'privacy' as const,
      labelAr: 'سياسة الخصوصية',
      labelEn: 'Privacy Policy',
      Icon: ShieldCheck,
    },
    {
      id: 'terms' as const,
      labelAr: 'الشروط والأحكام',
      labelEn: 'Terms & Conditions',
      Icon: FileText,
    },
  ];

  return (
    <div className="min-h-[70vh] bg-surface-muted/40 py-8 sm:py-12 animate-fade-in">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-foreground-muted">
          <Link to="/" className="hover:text-brand-700 transition-colors">
            {t('common.home')}
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">
            {isAr ? 'خدمة العملاء والدعم' : 'Customer Service & Support'}
          </span>
        </nav>

        {/* Hero Header */}
        <div className="rounded-3xl bg-brand-gradient p-6 sm:p-10 text-white shadow-card mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold backdrop-blur-sm mb-3">
                <Sparkles size={14} className="text-accent-300" />
                {isAr ? 'مركز مساعدة سوق القدس' : 'Al Quds Market Help Center'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black leading-tight">
                {isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?'}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-white/85 max-w-xl">
                {isAr
                  ? 'إجابات وافية ومهنية لجميع استفساراتك حول التوصيل، المنتجات، الاسترجاع، وطرق التواصل المباشر.'
                  : 'Clear, professional answers to all questions regarding delivery, fresh products, returns, and direct customer care.'}
              </p>
            </div>

            {/* Quick Contact Badge */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              <a
                href="tel:+201110891114"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-brand-800 shadow-md hover:bg-brand-50 transition-all"
              >
                <Phone size={16} />
                <span dir="ltr">+20 111 089 1114</span>
              </a>
              <a
                href="https://wa.me/201110891114"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-all"
              >
                <MessageCircle size={16} />
                <span>{isAr ? 'واتساب فوري' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {tabs.map(({ id, labelAr, labelEn, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleTabChange(id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-bold transition-all shadow-xs shrink-0 ${
                  isActive
                    ? 'bg-brand-700 text-white shadow-md'
                    : 'bg-white text-foreground hover:bg-brand-50 hover:text-brand-800 border border-surface-border'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-brand-600'} />
                <span>{isAr ? labelAr : labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div className="rounded-3xl border border-surface-border bg-white p-6 sm:p-10 shadow-card">
          {activeTab === 'faq' && <FaqSection isAr={isAr} />}
          {activeTab === 'contact' && <ContactSection isAr={isAr} ArrowIcon={ArrowIcon} />}
          {activeTab === 'return' && <ReturnPolicySection isAr={isAr} />}
          {activeTab === 'privacy' && <PrivacyPolicySection isAr={isAr} />}
          {activeTab === 'terms' && <TermsSection isAr={isAr} />}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. FAQ SECTION
───────────────────────────────────────────────────────────── */
function FaqSection({ isAr }: { isAr: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      categoryAr: 'التوصيل والسرعة',
      categoryEn: 'Delivery & Speed',
      qAr: 'كم يستغرق وقت توصيل الطلب في سوق القدس؟',
      qEn: 'How long does delivery take at Al Quds Market?',
      aAr: 'نقدم خدمة التوصيل فائق السرعة خلال 15 دقيقة فقط داخل مدينة 6 أكتوبر والمناطق المحيطة بها. يقوم فريقنا بتجهيز المنتجات وتغليفها فور استلام الطلب وتوجيه أقرب مندوب إليك مباشرة لضمان وصول طلبك طازجاً وسريعاً.',
      aEn: 'We deliver in an average of 15 minutes across 6th of October City and surrounding areas. Our dedicated pickers prepare and pack your order immediately upon placement, dispatching the nearest courier straight to your door.',
    },
    {
      categoryAr: 'التوصيل والسرعة',
      categoryEn: 'Delivery & Speed',
      qAr: 'ما هي مواعيد العمل واستقبال الطلبات؟',
      qEn: 'What are the operating and delivery hours?',
      aAr: 'المتجر متاح ونستقبل ونسلم طلباتكم على مدار 24 ساعة يومياً وطوال أيام الأسبوع (24/7)، بما في ذلك العطلات الأسبوعية والإجازات الرسمية دون توقف.',
      aEn: 'The market is available 24 hours a day, 7 days a week (24/7). We accept, prepare, and deliver orders around the clock, including weekends and official holidays.',
    },
    {
      categoryAr: 'التوصيل والسرعة',
      categoryEn: 'Delivery & Speed',
      qAr: 'ما هي المناطق المغطاة حالياً وما هي رسوم التوصيل؟',
      qEn: 'Which areas are currently covered and what are delivery fees?',
      aAr: 'نغطي كافة أحياء وتوسعات مدينة 6 أكتوبر (الأحياء من الأول حتى الثاني عشر، الحي المتميز، التوسعات الشمالية، منطقة الحصري، وأهم الكمبوندات المجاورة). رسوم التوصيل رمزية تبدأ من 15 ج.م، والتوصيل مجاني تماماً للطلبات التي تزيد عن 200 ج.م.',
      aEn: 'We cover all districts of 6th of October City (Districts 1-12, Al Motamayez, Northern Expansions, Al Hosary, and major neighboring compounds). Delivery fees start at just 15 EGP, and delivery is completely FREE on orders over 700 EGP.',
    },
    {
      categoryAr: 'طرق الدفع',
      categoryEn: 'Payment Methods',
      qAr: 'ما هي طرق الدفع المتاحة لدى سوق القدس؟',
      qEn: 'What payment methods are supported?',
      aAr: 'نوفر لك خيارات دفع مريحة وآمنة: يمكنك الدفع نقداً عند الاستلام (Cash on Delivery)، أو الدفع ببطاقات الائتمان والخصم المباشر (Visa / MasterCard / ميزة) مع مندوب التوصيل عبر ماكينة POS الإلكترونية.',
      aEn: 'We offer flexible and secure payment options: Cash on Delivery (COD) or payment via credit/debit cards (Visa, MasterCard, Meeza) directly with the delivery courier via portable POS machines.',
    },
    {
      categoryAr: 'المنتجات والجودة',
      categoryEn: 'Products & Quality',
      qAr: 'كيف تضمنون طزاجة وجودة الخضروات، الفواكه، والألبان؟',
      qEn: 'How do you guarantee the freshness of vegetables, fruit, and dairy?',
      aAr: 'نلتزم بأعلى معايير سلامة الأغذية. يتم توريد الخضار والفواكه يومياً في الصباح الباكر، وفرزها وتدريجها بعناية فائقة. أما الألبان واللحوم والأغذية المجمدة فيتم حفظها في غرف ومبردات بدرجات حرارة معيارية ويتم نقلها بحقائب معزولة حرارياً.',
      aEn: 'We adhere to the highest food quality standards. Fresh fruits and vegetables are sourced daily and rigorously inspected. Dairy, poultry, and frozen items are kept in calibrated chillers and transported in thermal insulated delivery bags.',
    },
    {
      categoryAr: 'الطلبات والإلغاء',
      categoryEn: 'Orders & Changes',
      qAr: 'هل يمكنني إلغاء أو تعديل الطلب بعد تأكيده؟',
      qEn: 'Can I cancel or modify my order after placing it?',
      aAr: 'نعم، يمكنك إلغاء الطلب بسهولة ومجاناً من خلال لوحة "طلباتي" ما دام الطلب في مرحلة "معلق" أو "قيد التجهيز". وإذا أردت إضافة أو استبدال أي صنف يمكنك التواصل مباشرة مع خدمة العملاء عبر الواتساب أو الهاتف لتحديثه قبل خروج المندوب.',
      aEn: 'Yes, you can easily cancel your order free of charge from your "My Orders" screen as long as it is in "Pending" or "Processing" status. To add or modify items, simply reach out to our WhatsApp or phone support.',
    },
    {
      categoryAr: 'الاسترجاع والاستبدال',
      categoryEn: 'Returns & Refunds',
      qAr: 'ماذا أفعل إذا استلمت منتجاً غير مطابق أو تالفاً؟',
      qEn: 'What if an item is damaged, expired, or incorrect?',
      aAr: 'يحق لك فحص الطلب مع المندوب ورفض أي صنف لا ينال رضاك التام دون دفع ثمنه. وإذا اكتشفت أي مشكلة بعد مغادرة المندوب، تواصل معنا خلال 24 ساعة وسنقوم بإرسال بديل طازج فوراً أو استرداد كامل المبلغ دون أي تعقيد.',
      aEn: 'You are welcome to inspect your items upon delivery and decline any product that does not meet your complete satisfaction. If an issue is noted afterward, simply notify us within 24 hours for an immediate replacement or full refund.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-surface-border pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-foreground">
          {isAr ? 'الأسئلة الأكثر شيوعاً' : 'Frequently Asked Questions'}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          {isAr
            ? 'كل ما تود معرفته عن خدمات سوق القدس، سرعة التوصيل، وطرق الدفع والضمانات.'
            : 'Everything you need to know about our fast delivery, accepted payment methods, and quality guarantees.'}
        </p>
      </div>

      <div className="divide-y divide-surface-border">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between text-start gap-4 focus:outline-none group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xs font-bold text-brand-700 group-hover:bg-brand-100 transition-colors">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 block mb-0.5">
                      {isAr ? faq.categoryAr : faq.categoryEn}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-brand-700 transition-colors">
                      {isAr ? faq.qAr : faq.qEn}
                    </h3>
                  </div>
                </div>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-brand-50 text-brand-700' : 'text-foreground-muted'
                  }`}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              {isOpen && (
                <div className="mt-3 pe-4 ps-10 animate-fade-in text-sm sm:text-base leading-relaxed text-foreground-muted">
                  <p>{isAr ? faq.aAr : faq.aEn}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions? */}
      <div className="mt-8 rounded-2xl bg-brand-50/60 border border-brand-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="font-bold text-foreground text-base">
            {isAr ? 'لم تجد إجابة لسؤالك؟' : 'Still have questions?'}
          </h4>
          <p className="text-xs sm:text-sm text-foreground-muted mt-1">
            {isAr
              ? 'فريق خدمة العملاء متواجد لمساعدتك لحظة بلحظة عبر الهاتف والواتساب.'
              : 'Our customer support team is available to assist you right now via phone or WhatsApp.'}
          </p>
        </div>
        <a
          href="https://wa.me/201110891114"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-brand-800 transition-colors shadow-xs shrink-0"
        >
          <MessageCircle size={16} />
          <span>{isAr ? 'تحدث مع الدعم الآن' : 'Chat with Support'}</span>
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. CONTACT US SECTION
───────────────────────────────────────────────────────────── */
function ContactSection({
  isAr,
  ArrowIcon,
}: {
  isAr: boolean;
  ArrowIcon: React.ElementType;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-surface-border pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-foreground">
          {isAr ? 'قنوات التواصل المباشر' : 'Direct Contact Channels'}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          {isAr
            ? 'نسعد بخدمتكم وتلقي ملاحظاتكم واستفساراتكم على مدار 24 ساعة يومياً (24/7).'
            : 'We are delighted to serve you and welcome your feedback 24 hours daily (24/7).'}
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Phone */}
        <div className="rounded-2xl border border-surface-border bg-surface-muted/30 p-5 flex flex-col justify-between hover:border-brand-300 transition-colors">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 mb-3">
              <Phone size={20} />
            </div>
            <h3 className="font-bold text-foreground text-base">
              {isAr ? 'الخط الساخن والمكالمات' : 'Customer Hotline'}
            </h3>
            <p className="mt-1 text-xs text-foreground-muted leading-relaxed">
              {isAr ? 'اتصال مباشر بفريق خدمة العملاء للطلبات العاجلة والتتبع.' : 'Direct voice call for urgent inquiries, delivery updates, and orders.'}
            </p>
            <p className="mt-3 font-extrabold text-brand-700 text-lg" dir="ltr">
              +20 111 089 1114
            </p>
          </div>
          <a
            href="tel:+201110891114"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-2 text-xs font-bold text-white hover:bg-brand-800 transition-all"
          >
            <span>{isAr ? 'اتصل الآن' : 'Call Now'}</span>
            <ArrowIcon size={14} />
          </a>
        </div>

        {/* WhatsApp */}
        <div className="rounded-2xl border border-surface-border bg-emerald-50/40 p-5 flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-3">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-bold text-foreground text-base">
              {isAr ? 'واتساب الدعم الفوري' : 'WhatsApp Support'}
            </h3>
            <p className="mt-1 text-xs text-foreground-muted leading-relaxed">
              {isAr ? 'إرسال اللوكيشن، صور المنتجات، والاستفسار الفوري عن التوصيل.' : 'Share live location, product photos, or chat instantly with customer care.'}
            </p>
            <p className="mt-3 font-extrabold text-emerald-700 text-lg" dir="ltr">
              +20 111 089 1114
            </p>
          </div>
          <a
            href="https://wa.me/201110891114"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-all"
          >
            <span>{isAr ? 'محادثة واتساب' : 'WhatsApp Chat'}</span>
            <ArrowIcon size={14} />
          </a>
        </div>

        {/* Working Hours & Location */}
        <div className="rounded-2xl border border-surface-border bg-surface-muted/30 p-5 flex flex-col justify-between hover:border-brand-300 transition-colors sm:col-span-2 lg:col-span-1">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 mb-3">
              <Clock size={20} />
            </div>
            <h3 className="font-bold text-foreground text-base">
              {isAr ? 'ساعات العمل والموقع' : 'Working Hours & Location'}
            </h3>
            <div className="mt-2 space-y-2 text-xs text-foreground-muted">
              <div className="flex items-start gap-2">
                <Clock size={15} className="text-brand-600 shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'المتجر متاح 24 ساعة يومياً طوال أيام الأسبوع (24/7)'
                    : 'The Market is Available 24 Hours Daily (Open 24/7)'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-brand-600 shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'المحور المركزي / الحي المتميز، مدينة 6 أكتوبر، الجيزة'
                    : 'Central Axis / Al Motamayez, 6th of October City, Giza'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={15} className="text-brand-600 shrink-0 mt-0.5" />
                <span dir="ltr">info@alqudsmarket.ps</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-border text-[11px] text-foreground-subtle font-medium">
            {isAr ? 'التوصيل فائق السرعة خلال 15 دقيقة' : 'Express 15-Minute Delivery'}
          </div>
        </div>
      </div>

      {/* Send Message Form */}
      <div className="rounded-2xl border border-surface-border bg-surface-muted/20 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-foreground mb-1">
          {isAr ? 'أرسل لنا رسالة أو اقتراحاً' : 'Send us a message or inquiry'}
        </h3>
        <p className="text-xs sm:text-sm text-foreground-muted mb-6">
          {isAr
            ? 'سيتواصل معك ممثل خدمة العملاء في أقرب وقت عبر الهاتف أو البريد الإلكتروني.'
            : 'Our support team will follow up promptly via phone or email.'}
        </p>

        {submitted ? (
          <div className="rounded-2xl bg-brand-50 border border-brand-200 p-6 text-center animate-fade-in">
            <CheckCircle2 size={36} className="text-brand-600 mx-auto mb-2" />
            <h4 className="font-bold text-brand-800 text-base">
              {isAr ? 'تم استلام رسالتك بنجاح!' : 'Your message has been received!'}
            </h4>
            <p className="text-xs sm:text-sm text-brand-700 mt-1">
              {isAr
                ? 'شكراً لتواصلك مع سوق القدس. سنقوم بمراجعة رسالتك والرد عليك بأسرع وقت.'
                : 'Thank you for contacting Al Quds Market. We will review and respond as soon as possible.'}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
              }}
              className="mt-4 bg-white"
            >
              {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isAr ? 'مثال: أحمد محمود' : 'e.g. John Doe'}
                  className="rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isAr ? 'رقم الهاتف أو الواتساب *' : 'Phone / WhatsApp *'}
                </label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={isAr ? 'مثال: 01110891114' : 'e.g. +20 111 089 1114'}
                  className="rounded-xl bg-white"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="rounded-xl bg-white"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isAr ? 'موضوع الرسالة *' : 'Subject *'}
                </label>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={isAr ? 'استفسار عن طلب، شكوى، اقتراح' : 'Order inquiry, suggestion, general'}
                  className="rounded-xl bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                {isAr ? 'نص الرسالة أو تفاصيل الاستفسار *' : 'Message Details *'}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={
                  isAr
                    ? 'اكتب تفاصيل طلبك أو استفسارك هنا وسنكون سعداء بالرد عليك...'
                    : 'Write the details of your inquiry or message here...'
                }
                className="w-full rounded-xl border border-surface-border bg-white p-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="rounded-xl bg-brand-700 text-white gap-2 px-6">
                <Send size={16} />
                <span>{isAr ? 'إرسال الرسالة' : 'Submit Message'}</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. RETURN & REFUND POLICY SECTION
───────────────────────────────────────────────────────────── */
function ReturnPolicySection({ isAr }: { isAr: boolean }) {
  return (
    <div className="space-y-8">
      <div className="border-b border-surface-border pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-foreground">
          {isAr ? 'سياسة الاستبدال والاسترجاع' : 'Return & Refund Policy'}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          {isAr
            ? 'في سوق القدس رضاكم هو غايتنا الأولى. نضمن لكم حق الفحص والاسترجاع بكل مرونة وسهولة.'
            : 'At Al Quds Market, your complete satisfaction is guaranteed with transparent, flexible return terms.'}
        </p>
      </div>

      {/* Core Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-brand-200 bg-brand-50/40 p-6">
          <div className="flex items-center gap-3 text-brand-700 mb-3">
            <CheckCircle2 size={24} />
            <h3 className="font-bold text-base text-foreground">
              {isAr ? 'فحص المنتجات عند الاستلام' : 'Inspection Upon Delivery'}
            </h3>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {isAr
              ? 'يحق للعميل دائماً مراجعة وفحص كامل الأصناف مع مندوب التوصيل قبل الاستلام والدفع. في حال عدم مطابقة أي صنف أو عدم رضائك التام عن جودته، يمكنك إعادته فوراً مع المندوب دون أي مصاريف إضافية.'
              : 'You have full right to inspect all ordered items with the courier prior to payment. If any item does not meet your high standards, you may return it on the spot with zero extra fees.'}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
          <div className="flex items-center gap-3 text-emerald-700 mb-3">
            <RotateCcw size={24} />
            <h3 className="font-bold text-base text-foreground">
              {isAr ? 'المنتجات الطازجة والقابلة للتلف' : 'Fresh & Perishable Produce'}
            </h3>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {isAr
              ? 'بالنسبة للخضروات، الفواكه، المخبوزات، الألبان، واللحوم المبردة: نتيح الاستبدال أو الاسترجاع خلال 24 ساعة من تاريخ الاستلام في حالة وجود أي عيب في الجودة أو الطزاجة.'
              : 'For fresh fruits, vegetables, dairy, bakery, and meats: we offer immediate replacement or refund within 24 hours of receipt in case of any quality or freshness discrepancy.'}
          </p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface-muted/30 p-6">
          <div className="flex items-center gap-3 text-blue-700 mb-3">
            <FileText size={24} />
            <h3 className="font-bold text-base text-foreground">
              {isAr ? 'السلع الغذائية المعلبة والجافة' : 'Packaged Grocery Goods'}
            </h3>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {isAr
              ? 'السلع الجافة والمعلبات والمستلزمات المنزلية: يحق للعميل استبدالها أو استرجاعها خلال 14 يوماً وفقاً لقانون حماية المستهلك المصري، شريطة أن تكون العبوة بحالتها الأصلية غير مفتوحة وغير تالفة ومع الفاتورة.'
              : 'Packaged goods, canned food, and household items can be exchanged or returned within 14 days according to Egyptian Consumer Protection Law, provided the packaging remains sealed in original condition.'}
          </p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface-muted/30 p-6">
          <div className="flex items-center gap-3 text-amber-700 mb-3">
            <CreditCard size={24} />
            <h3 className="font-bold text-base text-foreground">
              {isAr ? 'آلية استرداد الأموال (Refunds)' : 'Refund Settlement'}
            </h3>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {isAr
              ? 'في حال الدفع نقداً عند الاستلام، يتم رد المبلغ نقداً فوراً أو إضافته كرصيد في محفظة حسابك. وفي حال الدفع بالبطاقة البنكية، يتم استرجاع المبلغ لنفس البطاقة وفقاً للإجراءات البنكية المعتمدة.'
              : 'For cash-on-delivery orders, refunds are issued immediately in cash or credited to your account balance. For card payments, refunds are credited back to the original card according to banking terms.'}
          </p>
        </div>
      </div>

      {/* Step by step procedure */}
      <div className="rounded-2xl bg-surface-muted/20 border border-surface-border p-6">
        <h4 className="font-bold text-base text-foreground mb-4">
          {isAr ? 'خطوات تقديم طلب استرجاع أو استبدال صنف:' : 'How to request a return or replacement:'}
        </h4>
        <ol className="space-y-3 text-sm text-foreground-muted list-decimal list-inside leading-relaxed">
          <li>
            {isAr
              ? 'تواصل معنا مباشرة عبر الواتساب أو الهاتف على الرقم 01110891114 مع ذكر رقم الطلب.'
              : 'Contact our customer care team via WhatsApp or call +20 111 089 1114 with your order number.'}
          </li>
          <li>
            {isAr
              ? 'أرسل صورة سريعة للمنتج في حال وجود تلف أو خطأ في الصنف لتسريع الإجراء.'
              : 'Share a quick photo of the item if damaged or incorrect to expedite replacement.'}
          </li>
          <li>
            {isAr
              ? 'سيصلك مندوب التوصيل خلال وقت وجيز لاستبدال الصنف أو رد قيمته نقداً إلى باب منزلك.'
              : 'Our courier will arrive promptly to exchange the product or refund the cash right at your door.'}
          </li>
        </ol>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. PRIVACY POLICY SECTION
───────────────────────────────────────────────────────────── */
function PrivacyPolicySection({ isAr }: { isAr: boolean }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-surface-border pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-foreground">
          {isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy & Data Protection Policy'}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          {isAr
            ? 'نولي في سوق القدس أهمية قصوى لخصوصية عملائنا وسلامة بياناتهم الشخصية.'
            : 'We take your privacy and personal data protection with the utmost commitment and integrity.'}
        </p>
      </div>

      <div className="space-y-5 text-sm sm:text-base leading-relaxed text-foreground-muted">
        <div>
          <h3 className="font-bold text-foreground text-base mb-1">
            {isAr ? '1. البيانات التي نجمعها' : '1. Information We Collect'}
          </h3>
          <p>
            {isAr
              ? 'عند تسجيل حساب أو إتمام طلب شراء، نجمع المعلومات الضرورية لتوصيل طلبك بدقة، وتشمل: الاسم، رقم الهاتف، عنوان التوصيل المفصل (الشارع، رقم المبنى، الشقة)، والبريد الإلكتروني.'
              : 'When registering or placing an order, we collect essential fulfillment information including: full name, contact phone number, detailed delivery address (street, building, apartment), and email address.'}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-foreground text-base mb-1">
            {isAr ? '2. كيفية استخدام بياناتك' : '2. How We Use Your Data'}
          </h3>
          <p>
            {isAr
              ? 'تُستخدم بياناتك حصرياً للأغراض التالية: معالجة الطلبات وإعداد الفواتير، توجيه مندوب التوصيل للعنوان الدقيق، إرسال إشعارات حالة الطلب عبر الرسائل القصيرة أو التطبيق، وتطوير جودة خدماتنا.'
              : 'Your data is strictly utilized to: process orders and invoices, guide couriers directly to your doorstep, send live delivery tracking notifications, and continuously improve our service experience.'}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-foreground text-base mb-1">
            {isAr ? '3. سرية وأمان البيانات' : '3. Data Security & Confidentiality'}
          </h3>
          <p>
            {isAr
              ? 'نلتزم التزاماً قاطعاً بعدم بيع أو تأجير أو مشاركة أي من بيانات عملائنا مع أي جهة خارجية أو أطراف دعائية غير مصرح لها. يتم تخزين كافة البيانات الحساسة وكلمات المرور بتشفير تام على خوادم سحابية آمنة.'
              : 'We strictly guarantee never selling, renting, or leasing your personal information to third-party marketers. All sensitive account data and passwords are secure and encrypted using modern industry standards.'}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-foreground text-base mb-1">
            {isAr ? '4. حقوق العميل والتحكم بالبيانات' : '4. Your Rights & Data Control'}
          </h3>
          <p>
            {isAr
              ? 'يحق للعميل في أي وقت استعراض، تعديل، أو حذف بيانات حسابه وعناوينه المسجلة عبر صفحة "حسابي"، أو من خلال التواصل مع فريق الدعم الفني لحذف الحساب نهائياً.'
              : 'You retain full rights to review, update, or remove your personal data and delivery addresses via your "Account" page or by requesting permanent account removal through customer support.'}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   5. TERMS & CONDITIONS SECTION
───────────────────────────────────────────────────────────── */
function TermsSection({ isAr }: { isAr: boolean }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-surface-border pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-foreground">
          {isAr ? 'الشروط والأحكام العامة' : 'Terms & Conditions'}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          {isAr
            ? 'شروط وضوابط استخدام منصة وخدمات سوق القدس الإلكترونية.'
            : 'Terms of service governing the usage of Al Quds Market digital platform.'}
        </p>
      </div>

      <div className="space-y-5 text-sm sm:text-base leading-relaxed text-foreground-muted">
        <div>
          <h3 className="font-bold text-foreground text-base mb-1">
            {isAr ? '1. القبول والالتزام' : '1. Acceptance of Terms'}
          </h3>
          <p>
            {isAr
              ? 'يُعد استخدامك لمنصة سوق القدس أو تسجيل طلب شراء بمثابة موافقة كاملة وصريحة على هذه الشروط والأحكام وكافة السياسات الملحقة بها.'
              : 'By browsing, registering, or placing an order on Al Quds Market, you agree to be bound by these terms and all associated operating policies.'}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-foreground text-base mb-1">
            {isAr ? '2. الأسعار وتوفر المنتجات' : '2. Pricing & Product Availability'}
          </h3>
          <p>
            {isAr
              ? 'جميع الأسعار المعروضة على المنصة مقومة بالجنيه المصري (EGP) وشاملة للضرائب المطبقة. نحرص دائماً على دقة المخزون والأسعار، وفي حالة نفاذ أي صنف يتم التواصل الفوري مع العميل لاقتراح البديل الأنسب أو تعديل قيمة الطلب.'
              : 'All prices are listed in Egyptian Pounds (EGP) including applicable taxes. We maintain live inventory sync. In the rare event an item is out of stock, customer care contacts you immediately for an approved substitution.'}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-foreground text-base mb-1">
            {isAr ? '3. التوصيل السريع خلال 15 دقيقة' : '3. Express 15-Minute Delivery'}
          </h3>
          <p>
            {isAr
              ? 'يبذل فريق التوصيل قصارى جهده للالتزام بتوصيل الطلب في حدود 15 دقيقة ضمن النطاق الجغرافي المحدد بمدينة 6 أكتوبر. في حالات استثنائية مثل الذروة الشديدة أو الظروف الجوية القاسية، قد يطرأ تأخير طفيف مع إخطار العميل.'
              : 'Our delivery fleet works diligently to deliver within 15 minutes across designated 6th of October zones. Minor delays may occur during extreme weather or traffic peaks, with proactive customer notification.'}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-foreground text-base mb-1">
            {isAr ? '4. مسؤولية العميل وصحة البيانات' : '4. Customer Accuracy & Conduct'}
          </h3>
          <p>
            {isAr
              ? 'يتحمل العميل مسؤولية تزويدنا برقم هاتف صحيح وعنوان توصيل دقيق وواضح لضمان وصول المندوب دون تأخير، والتواجد للاستلام عند وصول المندوب.'
              : 'Customers are responsible for providing accurate contact numbers and clear delivery coordinates to ensure timely delivery without misplacement.'}
          </p>
        </div>
      </div>
    </div>
  );
}
