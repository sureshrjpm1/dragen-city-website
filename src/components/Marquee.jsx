const words = [
  { en: 'Electronics', zh: '电子产品' },
  { en: 'Fashion', zh: '时尚' },
  { en: 'Furniture', zh: '家具' },
  { en: 'Food Court', zh: '美食广场' },
  { en: 'Wholesale', zh: '批发' },
  { en: 'Retail', zh: '零售' },
  { en: 'Toys', zh: '玩具' },
  { en: 'Sports', zh: '运动' },
  { en: 'Home Decor', zh: '家居装饰' },
  { en: 'Lighting', zh: '照明' },
];

export default function Marquee() {
  return (
    <div className="relative py-5 bg-dragon overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 40s linear infinite' }}>
        {[...words, ...words, ...words].map((word, i) => (
          <span key={i} className="mx-8 text-sm font-medium text-white/90 tracking-wider uppercase flex items-center gap-3">
            {word.en}
            <span className="font-chinese text-white/40 text-xs normal-case">{word.zh}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 ml-5" />
          </span>
        ))}
      </div>
    </div>
  );
}
