// ============================================================
// Medelite — Mock content library
//
// Localized, structured data used across the site. This replaces
// the placeholder pages with a complete, realistic preview so
// stakeholders can review the composition before real content
// and a CMS are wired in.
// ============================================================

export type Locale = "ka" | "ru" | "en";

type L<T> = Record<Locale, T>;

// ------------------------------------------------------------
// Services
// ------------------------------------------------------------

export type ServiceCategory =
  | "internal"
  | "surgical"
  | "diagnostics"
  | "women-children"
  | "aesthetic"
  | "mind-body";

export type Service = {
  slug: string;
  category: ServiceCategory;
  number: string; // editorial numeral, e.g. "01"
  name: L<string>;
  short: L<string>;
  description: L<string>;
  procedures: L<string[]>;
  highlights: L<{ title: string; body: string }[]>;
  doctors: string[]; // doctor slugs
  faqs: L<{ q: string; a: string }[]>;
  priceFrom: number; // GEL
};

export const serviceCategories: L<Record<ServiceCategory, string>> = {
  ka: {
    internal: "შინაგანი მედიცინა",
    surgical: "ქირურგია",
    diagnostics: "დიაგნოსტიკა",
    "women-children": "ქალი და ბავშვი",
    aesthetic: "ესთეტიკური მედიცინა",
    "mind-body": "ფსიქიკური ჯანმრთელობა",
  },
  ru: {
    internal: "Внутренняя медицина",
    surgical: "Хирургия",
    diagnostics: "Диагностика",
    "women-children": "Женщина и ребёнок",
    aesthetic: "Эстетическая медицина",
    "mind-body": "Психическое здоровье",
  },
  en: {
    internal: "Internal medicine",
    surgical: "Surgery",
    diagnostics: "Diagnostics",
    "women-children": "Women & children",
    aesthetic: "Aesthetic medicine",
    "mind-body": "Mind & body",
  },
};

export const services: Service[] = [
  {
    slug: "cardiology",
    category: "internal",
    number: "01",
    name: {
      ka: "კარდიოლოგია",
      ru: "Кардиология",
      en: "Cardiology",
    },
    short: {
      ka: "გულისა და სისხლძარღვთა მრავალპროფილური მოვლა.",
      ru: "Многопрофильное наблюдение сердца и сосудов.",
      en: "Comprehensive care for the heart and vessels.",
    },
    description: {
      ka: "კარდიოლოგიის განყოფილება უძღვება როგორც პრევენციული შემოწმებების პროგრამას, ასევე მწვავე მდგომარეობების დიაგნოსტიკას — ჰოლტერი, ვერგოერგომეტრია, ექოკარდიოგრაფია და 24-საათიანი არტერიული წნევის მონიტორინგი ერთ სივრცეში.",
      ru: "Отделение кардиологии ведёт как программы профилактики, так и диагностику острых состояний — холтер, велоэргометрия, эхокардиография и суточный мониторинг давления в одном пространстве.",
      en: "The cardiology department runs both preventive programmes and acute diagnostics — Holter, ergometry, echocardiography and 24-hour blood pressure monitoring under one roof.",
    },
    procedures: {
      ka: [
        "კარდიოლოგის კონსულტაცია",
        "ეკგ 12 არხზე",
        "ჰოლტერის მონიტორინგი 24/48 სთ",
        "ექოკარდიოგრაფია",
        "ვერგოერგომეტრია (დატვირთვის ტესტი)",
        "არტერიული წნევის დღიური მონიტორინგი",
        "კარდიოლოგიური პრევენციული პაკეტი",
      ],
      ru: [
        "Консультация кардиолога",
        "ЭКГ в 12 отведениях",
        "Холтер-мониторинг 24/48 ч",
        "Эхокардиография",
        "Велоэргометрия (нагрузочный тест)",
        "Суточный мониторинг АД",
        "Профилактический пакет кардиолога",
      ],
      en: [
        "Cardiologist consultation",
        "12-lead ECG",
        "Holter monitor 24/48 h",
        "Echocardiography",
        "Exercise stress test",
        "24-hour blood pressure monitoring",
        "Preventive cardiology package",
      ],
    },
    highlights: {
      ka: [
        { title: "მოწინავე აპარატურა", body: "Philips Affiniti 50 ექოკარდიოგრაფი და GE MAC 2000 ეკგ." },
        { title: "სწრაფი დასკვნა", body: "დოკუმენტი ხელმისაწვდომია პაციენტის პორტალზე 24 საათში." },
        { title: "საერთაშორისო სტანდარტი", body: "ESC-ის პროტოკოლები — European Society of Cardiology." },
      ],
      ru: [
        { title: "Современное оборудование", body: "Эхокардиограф Philips Affiniti 50 и ЭКГ GE MAC 2000." },
        { title: "Быстрое заключение", body: "Документ доступен в личном кабинете в течение 24 часов." },
        { title: "Международный стандарт", body: "Протоколы ESC — Европейского общества кардиологов." },
      ],
      en: [
        { title: "Advanced imaging", body: "Philips Affiniti 50 echo and GE MAC 2000 ECG." },
        { title: "Fast reporting", body: "Documents land in the patient portal within 24 hours." },
        { title: "International standard", body: "Protocols follow the European Society of Cardiology." },
      ],
    },
    doctors: ["kiknadze", "beridze"],
    faqs: {
      ka: [
        { q: "საჭიროა თუ არა ჩანაწერი წინასწარ?", a: "კარდიოლოგის ვიზიტზე რეკომენდებულია წინასწარ ჩაწერა — ეკგ-ის დროზე ვატარებთ იმავე დღეს." },
        { q: "რა მომზადებაა საჭირო ვერგოერგომეტრიისთვის?", a: "კვლევამდე 2 საათით ადრე თავი აარიდეთ მძიმე საკვებს, კოფეინს და ფიზიკურ დატვირთვას." },
      ],
      ru: [
        { q: "Нужна ли предварительная запись?", a: "На приём кардиолога рекомендуем записаться заранее — ЭКГ выполняем в тот же день." },
        { q: "Как готовиться к велоэргометрии?", a: "За 2 часа до исследования избегайте тяжёлой еды, кофеина и физических нагрузок." },
      ],
      en: [
        { q: "Do I need an appointment in advance?", a: "We recommend booking a cardiology visit ahead — ECG is performed the same day." },
        { q: "How do I prepare for the stress test?", a: "Avoid heavy meals, caffeine and exertion for two hours before the exam." },
      ],
    },
    priceFrom: 120,
  },
  {
    slug: "general-medicine",
    category: "internal",
    number: "02",
    name: {
      ka: "ზოგადი თერაპია",
      ru: "Общая терапия",
      en: "General medicine",
    },
    short: {
      ka: "თქვენი პირველი კონტაქტი — თერაპევტი, რომელიც გიცნობთ.",
      ru: "Ваш первый контакт — терапевт, который знает вас.",
      en: "Your first point of contact — an internist who knows you.",
    },
    description: {
      ka: "ოჯახის ექიმის კონცეფცია თანამედროვე ფორმატში. ერთი თერაპევტი იცნობს თქვენს ისტორიას, ახდენს სპეციალისტებთან კოორდინაციას და ინახავს თქვენი ჯანმრთელობის სრულ სურათს.",
      ru: "Концепция семейного врача в современном формате. Один терапевт знает вашу историю, координирует специалистов и хранит полную картину вашего здоровья.",
      en: "A family-doctor model, redesigned. One internist knows your history, coordinates specialists and keeps the full picture of your health.",
    },
    procedures: {
      ka: [
        "თერაპევტის კონსულტაცია",
        "პერიოდული ჩექ-აპი",
        "სეზონური აცრის პროგრამა",
        "მწვავე მდგომარეობების მოვლა",
        "ქრონიკული პაციენტების გეგმიური მონიტორინგი",
      ],
      ru: [
        "Консультация терапевта",
        "Периодический чек-ап",
        "Сезонная программа вакцинации",
        "Ведение острых состояний",
        "Плановое наблюдение хронических пациентов",
      ],
      en: [
        "Internist consultation",
        "Periodic check-up",
        "Seasonal vaccination programme",
        "Acute condition management",
        "Chronic patient follow-up",
      ],
    },
    highlights: {
      ka: [
        { title: "დრო გაქვთ", body: "თითო ვიზიტი იგეგმება 40 წუთზე — არა 10-ზე." },
        { title: "ერთი ჯანმრთელობის ქარტია", body: "ყველა გამოკვლევა, რეცეპტი და დასკვნა — ერთ ფაილში." },
        { title: "კონტაქტი ვიზიტების გარეშე", body: "კითხვების დასმა შესაძლებელია პაციენტის პორტალიდან." },
      ],
      ru: [
        { title: "Для вас есть время", body: "Один приём — 40 минут, а не 10." },
        { title: "Единая карта здоровья", body: "Все исследования, рецепты и заключения — в одном файле." },
        { title: "Контакт без визита", body: "Вопросы можно задать через личный кабинет." },
      ],
      en: [
        { title: "Time to talk", body: "Visits are 40 minutes — not 10." },
        { title: "One health record", body: "Tests, prescriptions and reports all live in one file." },
        { title: "Contact between visits", body: "Ask questions through the patient portal." },
      ],
    },
    doctors: ["beridze", "jorbenadze"],
    faqs: {
      ka: [
        { q: "შემიძლია თერაპევტის არჩევა?", a: "დიახ — თითოეული პაციენტი ირჩევს თავის ოჯახის ექიმს." },
      ],
      ru: [
        { q: "Могу ли я выбрать терапевта?", a: "Да — каждый пациент выбирает своего семейного врача." },
      ],
      en: [
        { q: "Can I choose my internist?", a: "Yes — each patient selects their own family physician." },
      ],
    },
    priceFrom: 90,
  },
  {
    slug: "dermatology",
    category: "aesthetic",
    number: "03",
    name: {
      ka: "დერმატოლოგია და ესთეტიკური მედიცინა",
      ru: "Дерматология и эстетическая медицина",
      en: "Dermatology & aesthetic medicine",
    },
    short: {
      ka: "კანის მედიცინა ზომიერი, გემოვნებიანი მიდგომით.",
      ru: "Медицина кожи в сдержанном и вдумчивом формате.",
      en: "Skin medicine with a restrained, considered approach.",
    },
    description: {
      ka: "დერმატოლოგია Medelite-ში არ გულისხმობს დრამატულ ტრანსფორმაციას — ის არის კანის ჯანმრთელობის გეგმიური, გრძელვადიანი თანმხლები. მოლის მონიტორინგი, აკნეს პროგრამა, ლაზერული პროცედურები და მდუმარე ანტი-ეიჯინგი.",
      ru: "Дерматология в Medelite — не драматичные преображения, а плановое и долгосрочное сопровождение кожи. Мониторинг родинок, программа при акне, лазерные процедуры и сдержанный anti-aging.",
      en: "Dermatology at Medelite isn't about dramatic transformation — it is a patient, long-term partnership with your skin. Mole mapping, acne programmes, laser treatments and quiet anti-ageing.",
    },
    procedures: {
      ka: [
        "დერმატოლოგის კონსულტაცია",
        "დერმატოსკოპია / მოლის მონიტორინგი",
        "აკნეს სამედიცინო პროგრამა",
        "ქიმიური პილინგი",
        "ლაზერული რესერფეისინგი",
        "ბოტულინოთერაპია",
        "ბიორევიტალიზაცია",
      ],
      ru: [
        "Консультация дерматолога",
        "Дерматоскопия / картирование родинок",
        "Медицинская программа при акне",
        "Химический пилинг",
        "Лазерная шлифовка",
        "Ботулинотерапия",
        "Биоревитализация",
      ],
      en: [
        "Dermatology consultation",
        "Dermoscopy / mole mapping",
        "Medical acne programme",
        "Chemical peel",
        "Laser resurfacing",
        "Botulinum therapy",
        "Biorevitalisation",
      ],
    },
    highlights: {
      ka: [
        { title: "მცირე დოზა, დიდი მოთმინება", body: "ვთავაზობთ მინიმალურ ინტერვენციას — შედეგი იგება ხანგრძლივად." },
        { title: "სრული გამჭვირვალობა", body: "ყოველი პროცედურა ფასდება ცალკე, ფარული ხარჯების გარეშე." },
        { title: "კანი, რომელიც გამოიცნობთ", body: "ჩვენი მიზანი არ არის ნიღბის დადება — თქვენი კანი რჩება თქვენი." },
      ],
      ru: [
        { title: "Малые дозы, большое терпение", body: "Мы делаем минимальные вмешательства — результат строится надолго." },
        { title: "Полная прозрачность", body: "Каждая процедура оценивается отдельно, без скрытых расходов." },
        { title: "Кожа, которую вы узнаёте", body: "Наша цель — не маска, ваша кожа остаётся вашей." },
      ],
      en: [
        { title: "Small doses, long patience", body: "We favour minimal intervention — the result is built slowly." },
        { title: "Transparent pricing", body: "Every procedure is quoted on its own, without hidden fees." },
        { title: "A skin you recognise", body: "Our goal isn't a mask — your face stays your face." },
      ],
    },
    doctors: ["tsereteli"],
    faqs: {
      ka: [
        { q: "მაქვს აკნე. რამდენად გრძელი კურსი იქნება?", a: "საშუალო პროგრამა გრძელდება 4–6 თვე, ინდივიდუალური გეგმით." },
        { q: "არის ეფექტი ბოტოქსის შემდეგ ხილული სხვებისთვის?", a: "ჩვენი მიდგომა — „ნაკლებად“. შედეგი რბილია და არაფარაული." },
      ],
      ru: [
        { q: "У меня акне. Насколько долгий будет курс?", a: "Средняя программа длится 4–6 месяцев с индивидуальным планом." },
        { q: "Заметен ли результат ботокса окружающим?", a: "Наш подход — „меньше“. Результат мягкий и ненавязчивый." },
      ],
      en: [
        { q: "I have acne. How long will the course take?", a: "An average programme runs 4–6 months, on an individual plan." },
        { q: "Will my botox result be visible to others?", a: "Our rule is 'less.' The outcome is soft and non-obvious." },
      ],
    },
    priceFrom: 110,
  },
  {
    slug: "gynaecology",
    category: "women-children",
    number: "04",
    name: {
      ka: "გინეკოლოგია და მეანობა",
      ru: "Гинекология и акушерство",
      en: "Gynaecology & obstetrics",
    },
    short: {
      ka: "ქალის ჯანმრთელობა — პირველი ვიზიტიდან მშობიარობამდე.",
      ru: "Женское здоровье — от первого визита до родов.",
      en: "Women's health — from the first visit through to birth.",
    },
    description: {
      ka: "სრული ციკლის სერვისი: გეგმიური გამოკვლევებიდან რეპროდუქციულ კონსულტაციამდე. ჩვენი კაბინეტები დიზაინირებულია, როგორც დასასვენებელი სივრცე — არა როგორც პროცედურა.",
      ru: "Полный цикл сервиса: от плановых осмотров до репродуктивных консультаций. Кабинеты оформлены как пространство покоя, а не как процедура.",
      en: "Full-cycle care, from routine exams to reproductive consultations. Our rooms are designed as places of rest, not as procedure suites.",
    },
    procedures: {
      ka: [
        "გინეკოლოგის კონსულტაცია",
        "პაპ-ტესტი და HPV პანელი",
        "ტრანსვაგინალური ექო",
        "ორსულობის წარმართვა",
        "კონტრაცეპციის კონსულტაცია",
        "მენოპაუზის მართვა",
      ],
      ru: [
        "Консультация гинеколога",
        "ПАП-тест и HPV-панель",
        "Трансвагинальное УЗИ",
        "Ведение беременности",
        "Консультация по контрацепции",
        "Менопауза — сопровождение",
      ],
      en: [
        "Gynaecology consultation",
        "Pap test & HPV panel",
        "Transvaginal ultrasound",
        "Pregnancy follow-up",
        "Contraception counselling",
        "Menopause management",
      ],
    },
    highlights: {
      ka: [
        { title: "ქალი ექიმები", body: "სურვილის შემთხვევაში — სრული გუნდი ქალი სპეციალისტებისგან." },
        { title: "სიჩუმის პოლიტიკა", body: "ვიზიტებს შორის — სრული კონფიდენციალურობა." },
        { title: "კაცის თანმხლები", body: "ვიზიტზე პარტნიორი შეიძლება მიიღოთ, თუ ეს თქვენი სურვილია." },
      ],
      ru: [
        { title: "Женский состав", body: "По желанию — полностью женская команда специалистов." },
        { title: "Политика тишины", body: "Между визитами — полная конфиденциальность." },
        { title: "Партнёр рядом", body: "Партнёра можно взять на приём, если вам так комфортнее." },
      ],
      en: [
        { title: "Female team", body: "On request — an all-female clinical team." },
        { title: "Quiet policy", body: "Between visits — total confidentiality, unprompted." },
        { title: "Bring a partner", body: "You can bring a partner into the room if that is your preference." },
      ],
    },
    doctors: ["chikovani"],
    faqs: {
      ka: [
        { q: "შემიძლია თუ არა ქალი ექიმის მოთხოვნა?", a: "დიახ, ეს თქვენი უფლებაა — ვიზიტზე ჩაწერისას მონიშნეთ." },
      ],
      ru: [
        { q: "Могу ли я попросить врача-женщину?", a: "Да, это ваше право — отметьте при записи на визит." },
      ],
      en: [
        { q: "Can I request a female physician?", a: "Yes — simply note it when you book." },
      ],
    },
    priceFrom: 100,
  },
  {
    slug: "paediatrics",
    category: "women-children",
    number: "05",
    name: {
      ka: "პედიატრია",
      ru: "Педиатрия",
      en: "Paediatrics",
    },
    short: {
      ka: "ბავშვის ჯანმრთელობა — უყოყმანოდ, უშფოთველად.",
      ru: "Детское здоровье — без спешки и тревоги.",
      en: "Children's health — without rush, without panic.",
    },
    description: {
      ka: "პედიატრია Medelite-ში არის მშვიდი ოთახი, თბილი დასველები და ექიმი, რომელიც ბავშვს ესაუბრება პაციენტივით. ყოველდღე, დასვენების დღის ჩათვლით.",
      ru: "Педиатрия в Medelite — это тихая комната, тёплые приёмы и врач, который разговаривает с ребёнком как с пациентом. Ежедневно, включая выходные.",
      en: "Paediatrics at Medelite is a quiet room, warm greetings and a doctor who speaks to the child as a patient. Seven days a week.",
    },
    procedures: {
      ka: [
        "ბავშვთა პირველადი ვიზიტი",
        "აცრის ეროვნული და დამატებითი კალენდარი",
        "ზრდა-განვითარების მონიტორინგი",
        "სეზონური ვირუსული დაავადებების მოვლა",
        "ნეონატალური ვიზიტი ბინაზე",
      ],
      ru: [
        "Первичный приём ребёнка",
        "Национальный и дополнительный календарь прививок",
        "Мониторинг роста и развития",
        "Ведение сезонных вирусных заболеваний",
        "Неонатальный визит на дом",
      ],
      en: [
        "Initial paediatric visit",
        "National & extended vaccination calendar",
        "Growth & development monitoring",
        "Seasonal viral illness care",
        "At-home neonatal visit",
      ],
    },
    highlights: {
      ka: [
        { title: "ცალკე შესასვლელი", body: "ბავშვთა განყოფილებას აქვს ცალკე მისაღები — ავადმყოფებისგან დაშორებით." },
        { title: "სათამაშო სივრცე", body: "ვიზიტის დროს დიდი და პატარა ბავშვებისთვის არის თავისი კუთხე." },
        { title: "კონტაქტი ვიზიტების გარეშე", body: "დილის დარეკვა უფასოა რეგისტრირებული პაციენტებისთვის." },
      ],
      ru: [
        { title: "Отдельный вход", body: "Детское отделение имеет отдельный ресепшн — вне зоны других пациентов." },
        { title: "Игровое пространство", body: "Во время приёма есть уголок и для малышей, и для старших детей." },
        { title: "Контакт между визитами", body: "Утренний звонок — бесплатно для зарегистрированных пациентов." },
      ],
      en: [
        { title: "Separate entrance", body: "The paediatric wing has its own reception, away from other patients." },
        { title: "A play corner", body: "There's a space for younger and older kids during the visit." },
        { title: "Contact between visits", body: "Morning calls are free for registered patients." },
      ],
    },
    doctors: ["pataridze"],
    faqs: {
      ka: [
        { q: "შაბათ-კვირას მუშაობთ?", a: "დიახ, შაბათს 09:00–18:00, კვირას 10:00–16:00." },
      ],
      ru: [
        { q: "Работаете ли вы в выходные?", a: "Да, суббота 09:00–18:00, воскресенье 10:00–16:00." },
      ],
      en: [
        { q: "Are you open on weekends?", a: "Yes — Saturday 09:00–18:00 and Sunday 10:00–16:00." },
      ],
    },
    priceFrom: 80,
  },
  {
    slug: "dentistry",
    category: "surgical",
    number: "06",
    name: {
      ka: "სტომატოლოგია",
      ru: "Стоматология",
      en: "Dentistry",
    },
    short: {
      ka: "კარგი კბილები — მდუმარედ, გემოვნებიანად.",
      ru: "Хорошие зубы — тихо и с чувством меры.",
      en: "Good teeth — quietly, with taste.",
    },
    description: {
      ka: "თერაპია, ჰიგიენა, ესთეტიკური სტომატოლოგია, იმპლანტაცია და პროთეზირება. ციფრული ანაბეჭდი, გამჭვირვალე ფასი და გაძლიერებული კონტროლი ყოველ ეტაპზე.",
      ru: "Терапия, гигиена, эстетическая стоматология, имплантация и протезирование. Цифровой слепок, прозрачная цена и усиленный контроль на каждом этапе.",
      en: "Therapy, hygiene, aesthetic dentistry, implants and prosthetics. Digital scans, transparent pricing and careful follow-up at every stage.",
    },
    procedures: {
      ka: [
        "სტომატოლოგის კონსულტაცია",
        "პროფესიული ჰიგიენა + Airflow",
        "ფოტოკომპოზიტური პლომბი",
        "ენდოდონტია (ფესვის არხი)",
        "კბილის იმპლანტაცია",
        "ციფრული პროთეზირება",
        "გათეთრება Opalescence Boost",
      ],
      ru: [
        "Консультация стоматолога",
        "Профессиональная гигиена + Airflow",
        "Фотокомпозитная пломба",
        "Эндодонтия (лечение корневого канала)",
        "Имплантация",
        "Цифровое протезирование",
        "Отбеливание Opalescence Boost",
      ],
      en: [
        "Dental consultation",
        "Professional hygiene + Airflow",
        "Composite filling",
        "Endodontics (root canal)",
        "Dental implant",
        "Digital prosthetics",
        "Opalescence Boost whitening",
      ],
    },
    highlights: {
      ka: [
        { title: "ციფრული სკანირება", body: "iTero სკანერი — ხილული გეგმა, ყოველი ეტაპი შენახული." },
        { title: "საგარანტიო ვადა", body: "იმპლანტაციაზე — 10 წლის გარანტია, პროთეზებზე — 5 წლის." },
        { title: "სიჩუმე", body: "სპეციალურად შერჩეული აპარატურა — მინიმალური ხმის ფონი." },
      ],
      ru: [
        { title: "Цифровой скан", body: "Сканер iTero — видимый план, каждый этап зафиксирован." },
        { title: "Гарантия", body: "На имплантацию — 10 лет, на протезирование — 5 лет." },
        { title: "Тишина", body: "Подобранное оборудование — минимальный уровень шума." },
      ],
      en: [
        { title: "Digital scanning", body: "iTero scanner — a plan you can see, every step saved." },
        { title: "Warranty", body: "10 years on implants, 5 years on prosthetics." },
        { title: "Quiet", body: "Equipment selected for its low acoustic profile." },
      ],
    },
    doctors: ["metreveli"],
    faqs: {
      ka: [
        { q: "შეიძლება თუ არა განვადება?", a: "დიახ, გვაქვს 3, 6 და 12 თვიანი უპროცენტო განვადება." },
      ],
      ru: [
        { q: "Есть ли рассрочка?", a: "Да, 3, 6 и 12 месяцев без процентов." },
      ],
      en: [
        { q: "Do you offer instalments?", a: "Yes — 3, 6 and 12 months, interest-free." },
      ],
    },
    priceFrom: 60,
  },
  {
    slug: "neurology",
    category: "internal",
    number: "07",
    name: {
      ka: "ნევროლოგია",
      ru: "Неврология",
      en: "Neurology",
    },
    short: {
      ka: "თავის ტკივილი, ძილის დარღვევა, ნერვული სისტემა — სიღრმისეული ყურადღებით.",
      ru: "Головная боль, нарушения сна, нервная система — с глубокой внимательностью.",
      en: "Headache, sleep disorders, the nervous system — looked at closely.",
    },
    description: {
      ka: "დიაგნოსტირება მიგრენიდან, ეპილეფსიიდან, ინსულტის შემდგომი რეაბილიტაციიდან ძილის დარღვევებამდე. განყოფილებას აქვს საკუთარი ეეგ-ის კაბინეტი და ნეიროფიზიოლოგიური ლაბორატორია.",
      ru: "Диагностика — от мигрени, эпилепсии и постинсультной реабилитации до нарушений сна. Отделение располагает собственным кабинетом ЭЭГ и нейрофизиологической лабораторией.",
      en: "Diagnostics for migraine, epilepsy, post-stroke recovery and sleep disorders. The department has its own EEG suite and neurophysiology lab.",
    },
    procedures: {
      ka: [
        "ნევროლოგის კონსულტაცია",
        "ეეგ (ელექტროენცეფალოგრაფია)",
        "ემგ (ელექტრომიოგრაფია)",
        "მიგრენის პროგრამა",
        "ძილის აუდიტი",
      ],
      ru: [
        "Консультация невролога",
        "ЭЭГ",
        "ЭМГ",
        "Программа при мигрени",
        "Аудит сна",
      ],
      en: [
        "Neurology consultation",
        "EEG",
        "EMG",
        "Migraine programme",
        "Sleep audit",
      ],
    },
    highlights: {
      ka: [
        { title: "მიგრენის პროგრამა", body: "6-თვიანი თანმხლები — თავდასხმის სიხშირის შემცირება." },
        { title: "კვლევა ერთ ვიზიტზე", body: "კონსულტაცია და ეეგ — იმავე დღეს." },
      ],
      ru: [
        { title: "Программа при мигрени", body: "6-месячное сопровождение — снижение частоты приступов." },
        { title: "Исследование в один визит", body: "Консультация и ЭЭГ — в тот же день." },
      ],
      en: [
        { title: "Migraine programme", body: "A 6-month companion plan — fewer attacks over time." },
        { title: "One-visit workup", body: "Consultation and EEG on the same day." },
      ],
    },
    doctors: ["chanturia"],
    faqs: {
      ka: [
        { q: "საჭიროა თუ არა ეეგ-მდე რაიმე მომზადება?", a: "თმა უნდა იყოს სუფთა და მშრალი, გელების გარეშე." },
      ],
      ru: [
        { q: "Нужна ли подготовка к ЭЭГ?", a: "Волосы должны быть чистыми и сухими, без геля." },
      ],
      en: [
        { q: "Any prep for the EEG?", a: "Hair should be clean, dry, with no styling product." },
      ],
    },
    priceFrom: 110,
  },
  {
    slug: "orthopaedics",
    category: "surgical",
    number: "08",
    name: {
      ka: "ორთოპედია და ტრავმატოლოგია",
      ru: "Ортопедия и травматология",
      en: "Orthopaedics & traumatology",
    },
    short: {
      ka: "ძვლები, სახსრები, ზურგი — ფუნქციის დაბრუნება ერთი კი-ით.",
      ru: "Кости, суставы, спина — возвращение функции одной командой.",
      en: "Bones, joints, back — one team to get function back.",
    },
    description: {
      ka: "სპორტული ტრავმის მოვლა, სახსრის ფიზიოთერაპია, არტროსკოპია და მცირე ოპერაცია. ყველა ოპერაციამდე ტარდება ინდივიდუალური გეგმის სესია ორთოპედთან.",
      ru: "Спортивные травмы, физиотерапия суставов, артроскопия и малая хирургия. Перед каждой операцией — индивидуальная сессия планирования с ортопедом.",
      en: "Sports injuries, joint physiotherapy, arthroscopy and minor surgery. Every operation is preceded by a one-to-one planning session with the surgeon.",
    },
    procedures: {
      ka: [
        "ორთოპედის კონსულტაცია",
        "ტრავმის მოვლა",
        "სახსრის ინექცია",
        "კვლევითი არტროსკოპია",
        "ფიზიოთერაპიული პროგრამა",
      ],
      ru: [
        "Консультация ортопеда",
        "Лечение травм",
        "Инъекции в сустав",
        "Диагностическая артроскопия",
        "Программа физиотерапии",
      ],
      en: [
        "Orthopaedic consultation",
        "Trauma care",
        "Joint injection",
        "Diagnostic arthroscopy",
        "Physiotherapy programme",
      ],
    },
    highlights: {
      ka: [
        { title: "ერთ სივრცეში", body: "კონსულტაცია, ვიზუალიზაცია და პროცედურა — ერთი ვიზიტი." },
        { title: "აღდგენის გეგმა", body: "ოპერაციის შემდგომი 12-კვირიანი თანმხლები." },
      ],
      ru: [
        { title: "В одном пространстве", body: "Консультация, визуализация и процедура — один визит." },
        { title: "План восстановления", body: "12-недельное сопровождение после операции." },
      ],
      en: [
        { title: "One roof", body: "Consultation, imaging and procedure in one visit." },
        { title: "Recovery plan", body: "12-week post-op follow-up programme." },
      ],
    },
    doctors: ["shubladze"],
    faqs: {
      ka: [
        { q: "საჭიროა თუ არა მიმართვა?", a: "არა, პაციენტებს პირდაპირ ვიღებთ." },
      ],
      ru: [
        { q: "Нужно ли направление?", a: "Нет, принимаем пациентов напрямую." },
      ],
      en: [
        { q: "Do I need a referral?", a: "No — we accept patients directly." },
      ],
    },
    priceFrom: 120,
  },
  {
    slug: "endocrinology",
    category: "internal",
    number: "09",
    name: {
      ka: "ენდოკრინოლოგია",
      ru: "Эндокринология",
      en: "Endocrinology",
    },
    short: {
      ka: "ფარისებრი, დიაბეტი, ჰორმონული ბალანსი — მონიტორინგი რომელიც არ ნებდება.",
      ru: "Щитовидная железа, диабет, гормональный баланс — наблюдение, которое не отступает.",
      en: "Thyroid, diabetes, hormonal balance — the kind of follow-up that doesn't give up.",
    },
    description: {
      ka: "ენდოკრინოლოგიური სერვისი იმ ადამიანებისთვის, რომლებიც ცხოვრობენ ქრონიკულ მდგომარეობასთან — დიაბეტი I და II, ფარისებრის ქრონიკული ანთება, პოლიკისტოზი. მოდელი: გრძელვადიანი, არა ეპიზოდური.",
      ru: "Эндокринологический сервис для тех, кто живёт с хроническим диагнозом — диабет I и II, хронический тиреоидит, поликистоз. Модель — долгосрочная, а не эпизодическая.",
      en: "Endocrinology care for people living with chronic conditions — type I and II diabetes, chronic thyroiditis, PCOS. A long-term model, not an episodic one.",
    },
    procedures: {
      ka: [
        "ენდოკრინოლოგის კონსულტაცია",
        "ჰბა1ც და გლუკოზის პროფილი",
        "ფარისებრის ექოსკოპია",
        "დიაბეტის პროგრამა",
        "მენოპაუზის ჰორმონული კონსულტაცია",
      ],
      ru: [
        "Консультация эндокринолога",
        "HbA1c и профиль глюкозы",
        "УЗИ щитовидной железы",
        "Программа диабета",
        "Гормональная консультация при менопаузе",
      ],
      en: [
        "Endocrinology consultation",
        "HbA1c and glucose profile",
        "Thyroid ultrasound",
        "Diabetes programme",
        "Menopause hormone consultation",
      ],
    },
    highlights: {
      ka: [
        { title: "დიაბეტის პროგრამა", body: "12-თვიანი კომპლექსი — ენდოკრინოლოგი, დიეტოლოგი, პსიქოლოგი." },
        { title: "ინდივიდუალური გეგმა", body: "მედიკამენტებისა და ცხოვრების სტილის კორექცია ერთ ფურცელზე." },
      ],
      ru: [
        { title: "Программа диабета", body: "12-месячный комплекс — эндокринолог, диетолог, психолог." },
        { title: "Индивидуальный план", body: "Коррекция медикаментов и образа жизни — на одной странице." },
      ],
      en: [
        { title: "Diabetes programme", body: "A 12-month package — endocrinologist, dietician, psychologist." },
        { title: "One plan, one page", body: "Medication and lifestyle adjustments, side by side." },
      ],
    },
    doctors: ["jorbenadze"],
    faqs: {
      ka: [
        { q: "დიაბეტის პროგრამა მოიცავს თუ არა მონიტორებს?", a: "დიახ, გვაქვს უწყვეტი გლუკოზის მონიტორინგი (CGM)." },
      ],
      ru: [
        { q: "Включает ли программа диабета мониторы?", a: "Да, предлагаем систему непрерывного мониторинга (CGM)." },
      ],
      en: [
        { q: "Does the diabetes programme include monitors?", a: "Yes — we offer continuous glucose monitoring (CGM)." },
      ],
    },
    priceFrom: 100,
  },
  {
    slug: "imaging",
    category: "diagnostics",
    number: "10",
    name: {
      ka: "დიაგნოსტიკური ვიზუალიზაცია",
      ru: "Диагностическая визуализация",
      en: "Diagnostic imaging",
    },
    short: {
      ka: "ულტრაბგერა, რენტგენი, MR და CT — ერთ დონეზე, ერთ დღეში.",
      ru: "УЗИ, рентген, МРТ и КТ — на одном уровне, за один день.",
      en: "Ultrasound, X-ray, MRI and CT — one standard, one day.",
    },
    description: {
      ka: "ვიზუალიზაციის განყოფილება უძღვება როგორც გეგმიურ, ასევე სასწრაფო კვლევას. რადიოლოგის დასკვნა საშუალოდ 24 საათში, რთულ შემთხვევებზე — 48 საათში.",
      ru: "Отделение визуализации ведёт как плановые, так и неотложные исследования. Заключение рентгенолога — в среднем за 24 часа, в сложных случаях — за 48.",
      en: "The imaging department handles both scheduled and urgent studies. Radiologist report in 24 hours on average, 48 for complex cases.",
    },
    procedures: {
      ka: [
        "ულტრაბგერითი კვლევა",
        "ციფრული რენტგენი",
        "კომპიუტერული ტომოგრაფია (CT)",
        "მაგნიტურ-რეზონანსული ტომოგრაფია (MRI 1.5T)",
        "მამოგრაფია",
        "დენსიტომეტრია",
      ],
      ru: [
        "Ультразвуковое исследование",
        "Цифровой рентген",
        "Компьютерная томография (КТ)",
        "МРТ 1.5Т",
        "Маммография",
        "Денситометрия",
      ],
      en: [
        "Ultrasound",
        "Digital X-ray",
        "Computed tomography (CT)",
        "MRI 1.5T",
        "Mammography",
        "Densitometry",
      ],
    },
    highlights: {
      ka: [
        { title: "ახალი MR სუიტი", body: "Siemens Magnetom Sola 1.5T — 2024 წლიდან." },
        { title: "სრული ანგარიში", body: "დასკვნა, სურათები და DICOM-ის ფაილი — ერთ არქივში." },
      ],
      ru: [
        { title: "Новый MR-кабинет", body: "Siemens Magnetom Sola 1.5T — с 2024 года." },
        { title: "Полный отчёт", body: "Заключение, снимки и DICOM — один архив." },
      ],
      en: [
        { title: "A new MR suite", body: "Siemens Magnetom Sola 1.5T — installed in 2024." },
        { title: "Full report", body: "Findings, images and DICOM — all in one archive." },
      ],
    },
    doctors: ["beridze"],
    faqs: {
      ka: [
        { q: "შემიძლია თუ არა ფაილების სახლში წაღება?", a: "დიახ, DICOM-ის ფაილი ხელმისაწვდომია USB-ზე ან პორტალზე." },
      ],
      ru: [
        { q: "Могу ли я забрать файлы домой?", a: "Да, DICOM доступен на USB или в личном кабинете." },
      ],
      en: [
        { q: "Can I take the files home?", a: "Yes — DICOM is available on a USB or through the portal." },
      ],
    },
    priceFrom: 70,
  },
  {
    slug: "ophthalmology",
    category: "internal",
    number: "11",
    name: {
      ka: "ოფთალმოლოგია",
      ru: "Офтальмология",
      en: "Ophthalmology",
    },
    short: {
      ka: "თვალის ჯანმრთელობა — ფრთხილი, ზუსტი, მდუმარე.",
      ru: "Здоровье глаз — осторожно, точно, тихо.",
      en: "Eye care — careful, precise, quiet.",
    },
    description: {
      ka: "სრული სპექტრი: რეფრაქციის კონტროლი, ფსკერის ფოტოგრაფია, OCT, გლაუკომას მართვა. მოწინავე აპარატურა Carl Zeiss-ისგან.",
      ru: "Полный спектр: контроль рефракции, фотография глазного дна, ОКТ, ведение глаукомы. Оборудование Carl Zeiss.",
      en: "Full spectrum: refractive checks, fundus photography, OCT, glaucoma care. Equipment from Carl Zeiss.",
    },
    procedures: {
      ka: [
        "ოფთალმოლოგის კონსულტაცია",
        "რეფრაქციის კონტროლი",
        "ფსკერის ფოტოგრაფია",
        "OCT",
        "გლაუკომას მართვა",
      ],
      ru: [
        "Консультация офтальмолога",
        "Контроль рефракции",
        "Фотография глазного дна",
        "ОКТ",
        "Ведение глаукомы",
      ],
      en: [
        "Ophthalmology consultation",
        "Refractive check",
        "Fundus photography",
        "OCT",
        "Glaucoma management",
      ],
    },
    highlights: {
      ka: [
        { title: "სრული პაკეტი", body: "ყველა კვლევა ერთ ვიზიტზე — 60 წუთი." },
      ],
      ru: [
        { title: "Полный пакет", body: "Все исследования за один визит — 60 минут." },
      ],
      en: [
        { title: "Full workup", body: "All exams in one visit — 60 minutes." },
      ],
    },
    doctors: ["kvaratskhelia"],
    faqs: {
      ka: [
        { q: "შემიძლია თუ არა ლინზის არჩევა იმავე დღეს?", a: "დიახ, ჩვენი ოპტიკის სალონი თანამშრომლობს განყოფილებასთან." },
      ],
      ru: [
        { q: "Могу ли я подобрать линзы в тот же день?", a: "Да, наш оптический салон работает с отделением напрямую." },
      ],
      en: [
        { q: "Can I pick lenses the same day?", a: "Yes — our optics shop works directly with the department." },
      ],
    },
    priceFrom: 90,
  },
  {
    slug: "psychology",
    category: "mind-body",
    number: "12",
    name: {
      ka: "ფსიქოლოგია და ფსიქოთერაპია",
      ru: "Психология и психотерапия",
      en: "Psychology & psychotherapy",
    },
    short: {
      ka: "ფსიქიკური ჯანმრთელობა — ნორმალური ნაწილი ჯანმრთელობისა.",
      ru: "Психическое здоровье — обычная часть общего здоровья.",
      en: "Mental health — a normal part of health.",
    },
    description: {
      ka: "ცალკე შესასვლელი, ცალკე ოთახი, ცალკე პოლიტიკა. ვმუშაობთ KBT-ით, ACT-ით და EMDR-ით. შეხვედრები შესაძლებელია სახეში ან ვიდეოში.",
      ru: "Отдельный вход, отдельный кабинет, отдельная политика. Работаем в КПТ, ACT и EMDR. Встречи — очно или по видео.",
      en: "Separate entrance, separate room, separate policy. We work in CBT, ACT and EMDR. Sessions in person or by video.",
    },
    procedures: {
      ka: [
        "საწყისი შეფასება",
        "ინდივიდუალური ფსიქოთერაპია",
        "წყვილების თერაპია",
        "ბავშვების ფსიქოთერაპია",
        "ფსიქიატრის კონსულტაცია",
      ],
      ru: [
        "Первичная оценка",
        "Индивидуальная психотерапия",
        "Терапия пары",
        "Детская психотерапия",
        "Консультация психиатра",
      ],
      en: [
        "Initial assessment",
        "Individual psychotherapy",
        "Couples therapy",
        "Child psychotherapy",
        "Psychiatrist consultation",
      ],
    },
    highlights: {
      ka: [
        { title: "სრული კონფიდენციალურობა", body: "ფსიქოთერაპია ცალკე ფაილშია — არ იკითხება სხვა ექიმებისგან." },
        { title: "ვიდეო სესია", body: "შესაძლებელია სახლიდან — უსაფრთხო პლატფორმაზე." },
      ],
      ru: [
        { title: "Полная конфиденциальность", body: "Психотерапия — в отдельном файле, не читается другими врачами." },
        { title: "Видео-сессия", body: "Можно из дома — на защищённой платформе." },
      ],
      en: [
        { title: "Full confidentiality", body: "Psychotherapy lives in a separate record, closed to other doctors." },
        { title: "Video sessions", body: "From home, on a secure platform." },
      ],
    },
    doctors: ["jorbenadze"],
    faqs: {
      ka: [
        { q: "ჩანაწერი რამდენი დრო მოითხოვს?", a: "პირველი შეხვედრის დროა 60 წუთი." },
      ],
      ru: [
        { q: "Сколько длится запись?", a: "Первая встреча — 60 минут." },
      ],
      en: [
        { q: "How long is a session?", a: "The first meeting is 60 minutes." },
      ],
    },
    priceFrom: 90,
  },
  {
    slug: "urology",
    category: "surgical",
    number: "13",
    name: {
      ka: "უროლოგია",
      ru: "Урология",
      en: "Urology",
    },
    short: {
      ka: "უროლოგია კაცებისთვის, ქალებისთვის, ყოველ ასაკში.",
      ru: "Урология для мужчин, женщин и в любом возрасте.",
      en: "Urology for men, women and every age.",
    },
    description: {
      ka: "სრული ციკლის სერვისი: გეგმიური სკრინინგი, ქვის დაავადება, პროსტატის ჯანმრთელობა, ინკონტინენცია. კონსულტაცია, უროლოგის ექოსკოპია და ლაბორატორია — ერთ სივრცეში.",
      ru: "Полный цикл: плановый скрининг, мочекаменная болезнь, здоровье простаты, недержание. Консультация, УЗИ и лаборатория — в одном пространстве.",
      en: "Full-cycle care: screening, stone disease, prostate health, incontinence. Consultation, urological ultrasound and lab in one space.",
    },
    procedures: {
      ka: [
        "უროლოგის კონსულტაცია",
        "უროლოგიური ექოსკოპია",
        "ურინოფლოუმეტრია",
        "პროსტატის სკრინინგი (PSA, TRUS)",
        "შარდ-კენჭური დაავადების დიაგნოსტიკა",
      ],
      ru: [
        "Консультация уролога",
        "УЗИ мочеполовой системы",
        "Урофлоуметрия",
        "Скрининг простаты (PSA, ТРУЗИ)",
        "Диагностика МКБ",
      ],
      en: [
        "Urology consultation",
        "Urological ultrasound",
        "Uroflowmetry",
        "Prostate screening (PSA, TRUS)",
        "Stone disease workup",
      ],
    },
    highlights: {
      ka: [
        { title: "ცალკე ოთახი", body: "კონსულტაცია და ექოსკოპია ტარდება ერთ ოთახში — მოძრაობის გარეშე." },
        { title: "სრული გამჭვირვალობა", body: "შედეგები პორტალზე 24 საათში." },
      ],
      ru: [
        { title: "Один кабинет", body: "Консультация и УЗИ в одной комнате — без перемещений." },
        { title: "Прозрачные результаты", body: "Заключение — в личном кабинете за 24 часа." },
      ],
      en: [
        { title: "One room", body: "Consultation and ultrasound in the same room — no shuffling." },
        { title: "Transparent results", body: "Reports land in the portal within 24 hours." },
      ],
    },
    doctors: ["gelashvili"],
    faqs: {
      ka: [
        { q: "საჭიროა თუ არა PSA ყოველწლიურად?", a: "40 წლის ზევით — დიახ, შედგენილი სქემით. გაცნობის ვიზიტზე შევთანხმდებით ინტერვალზე." },
      ],
      ru: [
        { q: "Нужен ли PSA ежегодно?", a: "После 40 — да, по согласованной схеме. Интервал обсудим на первом визите." },
      ],
      en: [
        { q: "Is yearly PSA required?", a: "After 40, yes — on an agreed schedule we'll set at the first visit." },
      ],
    },
    priceFrom: 100,
  },
  {
    slug: "ent-otolaryngology",
    category: "internal",
    number: "14",
    name: {
      ka: "ოტორინოლარინგოლოგია (LOR)",
      ru: "Оториноларингология (ЛОР)",
      en: "Otolaryngology (ENT)",
    },
    short: {
      ka: "ყური, ცხვირი, ყელი — სიფაქიზით.",
      ru: "Ухо, горло, нос — с вниманием.",
      en: "Ear, nose, throat — with care.",
    },
    description: {
      ka: "ენდოსკოპიური კვლევა, სმენის აუდიოგრამა, ვესტიბულარული ტესტი, ქრონიკული რინიტის პროგრამა. ბავშვთა LOR განყოფილების ცალკე მიმდინარეობით.",
      ru: "Эндоскопическое исследование, аудиограмма, вестибулярный тест, программа при хроническом рините. Отдельная ЛОР-линия для детей.",
      en: "Endoscopic exam, audiogram, vestibular testing, chronic-rhinitis programme. A separate ENT line for children.",
    },
    procedures: {
      ka: [
        "LOR-ის კონსულტაცია",
        "ენდოსკოპიური კვლევა",
        "აუდიომეტრია",
        "ტიმპანომეტრია",
        "ქრონიკული რინიტის პროგრამა",
      ],
      ru: [
        "Консультация ЛОРа",
        "Эндоскопия",
        "Аудиометрия",
        "Тимпанометрия",
        "Программа при хроническом рините",
      ],
      en: [
        "ENT consultation",
        "Endoscopic exam",
        "Audiometry",
        "Tympanometry",
        "Chronic rhinitis programme",
      ],
    },
    highlights: {
      ka: [
        { title: "ბავშვთა მიმართულება", body: "ბავშვთა LOR-ის ოთახი — სათამაშოებით, ცალკე შესასვლელით." },
        { title: "ერთი დღე", body: "კონსულტაცია და აუდიომეტრია იმავე ვიზიტზე." },
      ],
      ru: [
        { title: "Детское направление", body: "Отдельная детская ЛОР-комната — с игрушками, отдельный вход." },
        { title: "Один день", body: "Консультация и аудиометрия в один визит." },
      ],
      en: [
        { title: "A children's line", body: "A separate paediatric ENT room — with toys, its own entrance." },
        { title: "Same-day workup", body: "Consultation and audiometry on the same visit." },
      ],
    },
    doctors: ["rusieshvili"],
    faqs: {
      ka: [
        { q: "საჭიროა თუ არა მომზადება აუდიომეტრიაზე?", a: "არა, უბრალოდ თავი აარიდეთ ხმაურის ფონს კვლევამდე 4 საათის განმავლობაში." },
      ],
      ru: [
        { q: "Нужна ли подготовка к аудиометрии?", a: "Нет, просто избегайте шумной среды за 4 часа до исследования." },
      ],
      en: [
        { q: "Any prep for audiometry?", a: "No — just avoid noisy environments for 4 hours beforehand." },
      ],
    },
    priceFrom: 90,
  },
  {
    slug: "gastroenterology",
    category: "internal",
    number: "15",
    name: {
      ka: "გასტროენტეროლოგია",
      ru: "Гастроэнтерология",
      en: "Gastroenterology",
    },
    short: {
      ka: "საჭმლის მომნელებელი სისტემა — სიმშვიდით და ზუსტად.",
      ru: "ЖКТ — спокойно и точно.",
      en: "The GI tract — calmly and precisely.",
    },
    description: {
      ka: "კუჭ-ნაწლავის დარღვევები, ღვიძლის ჯანმრთელობა, საჭმლის მომნელებელი ენდოსკოპია, H. pylori-ის ტესტირება. ჩვენი განყოფილება მუშაობს დიეტოლოგთან ერთად — ერთ გეგმაში.",
      ru: "ЖКТ-расстройства, здоровье печени, эндоскопия, H. pylori. Отделение работает в связке с диетологом — в одном плане.",
      en: "GI disorders, liver health, endoscopy, H. pylori. The department works alongside our nutrition team in one plan.",
    },
    procedures: {
      ka: [
        "გასტროენტეროლოგის კონსულტაცია",
        "გასტროსკოპია",
        "კოლონოსკოპია",
        "H. pylori-ის ტესტი",
        "ღვიძლის ფიბროსკანი",
      ],
      ru: [
        "Консультация гастроэнтеролога",
        "Гастроскопия",
        "Колоноскопия",
        "H. pylori-тест",
        "Фиброскан печени",
      ],
      en: [
        "Gastroenterology consultation",
        "Gastroscopy",
        "Colonoscopy",
        "H. pylori test",
        "Liver FibroScan",
      ],
    },
    highlights: {
      ka: [
        { title: "სედაცია", body: "მოთხოვნისას — მსუბუქი სედაცია ანესთეზიოლოგის თანხლებით." },
        { title: "ერთი გეგმა", body: "გასტროენტეროლოგი და დიეტოლოგი — ერთი კომბინირებული გეგმით." },
      ],
      ru: [
        { title: "Седация", body: "По запросу — лёгкая седация с анестезиологом." },
        { title: "Один план", body: "Гастроэнтеролог и диетолог — один объединённый план." },
      ],
      en: [
        { title: "Sedation", body: "On request — light sedation with an anaesthetist on hand." },
        { title: "One plan", body: "Gastroenterologist and dietician — one combined plan." },
      ],
    },
    doctors: ["tabatadze"],
    faqs: {
      ka: [
        { q: "საჭიროა თუ არა მომზადება კოლონოსკოპიისთვის?", a: "დიახ, 24 საათიანი დაცვითი დიეტა და სპეციალური პრეპარატი. დეტალები — ჩაწერის დროს." },
      ],
      ru: [
        { q: "Нужна ли подготовка к колоноскопии?", a: "Да — 24-часовая диета и специальный препарат. Инструкции — при записи." },
      ],
      en: [
        { q: "How do I prep for a colonoscopy?", a: "A 24-hour clear diet and a specific prep solution. We send detailed instructions when you book." },
      ],
    },
    priceFrom: 110,
  },
  {
    slug: "pulmonology",
    category: "internal",
    number: "16",
    name: {
      ka: "პულმონოლოგია",
      ru: "Пульмонология",
      en: "Pulmonology",
    },
    short: {
      ka: "სუნთქვის ჯანმრთელობა — ასთმიდან ძილის აპნოემდე.",
      ru: "Здоровье дыхания — от астмы до апноэ сна.",
      en: "Respiratory health — from asthma to sleep apnoea.",
    },
    description: {
      ka: "ასთმის კონტროლის პროგრამა, ქოხ-ნერვული დაავადების (COPD) თანმხლები, ძილის აპნოეს დიაგნოსტიკა საკუთარი ძილის ლაბორატორიით.",
      ru: "Программа контроля астмы, ведение ХОБЛ, диагностика апноэ сна в собственной лаборатории.",
      en: "Asthma-control programme, COPD follow-up, sleep-apnoea diagnostics in our in-house sleep lab.",
    },
    procedures: {
      ka: [
        "პულმონოლოგის კონსულტაცია",
        "სპიროგრაფია",
        "FeNO ტესტი (ანთების მარკერი)",
        "პოლისომნოგრაფია (ძილი)",
        "ასთმის კონტროლის პროგრამა",
      ],
      ru: [
        "Консультация пульмонолога",
        "Спирография",
        "FeNO (маркер воспаления)",
        "Полисомнография (сон)",
        "Программа контроля астмы",
      ],
      en: [
        "Pulmonology consultation",
        "Spirometry",
        "FeNO test (inflammation marker)",
        "Polysomnography (sleep study)",
        "Asthma-control programme",
      ],
    },
    highlights: {
      ka: [
        { title: "საკუთარი ძილის ლაბორატორია", body: "ერთი ღამე კლინიკაში — სრული ანგარიში 48 საათში." },
        { title: "სეზონური ალერგია", body: "კონტროლის პროგრამა მარტიდან ივნისამდე." },
      ],
      ru: [
        { title: "Собственная лаборатория сна", body: "Одна ночь в клинике — полный отчёт за 48 часов." },
        { title: "Сезонная аллергия", body: "Программа контроля с марта по июнь." },
      ],
      en: [
        { title: "In-house sleep lab", body: "One night in-clinic — a full report within 48 hours." },
        { title: "Seasonal allergy", body: "A control programme from March through June." },
      ],
    },
    doctors: ["jorbenadze"],
    faqs: {
      ka: [
        { q: "შემიძლია თუ არა CPAP აპარატის გაცდა?", a: "დიახ — 10-დღიანი საცდელი პერიოდი ფასდაკლებით." },
      ],
      ru: [
        { q: "Можно ли попробовать CPAP?", a: "Да — 10-дневный тестовый период со скидкой." },
      ],
      en: [
        { q: "Can I trial a CPAP machine?", a: "Yes — a 10-day trial period at a discount." },
      ],
    },
    priceFrom: 100,
  },
  {
    slug: "physiotherapy",
    category: "mind-body",
    number: "17",
    name: {
      ka: "ფიზიოთერაპია და რეაბილიტაცია",
      ru: "Физиотерапия и реабилитация",
      en: "Physiotherapy & rehabilitation",
    },
    short: {
      ka: "აღდგენა — ყოველდღიური ჩვევით, არა ეპიზოდით.",
      ru: "Восстановление — ежедневной практикой, а не эпизодом.",
      en: "Recovery, built as a daily practice — not an episode.",
    },
    description: {
      ka: "სპორტული ტრავმის რეაბილიტაცია, ოპერაციის შემდგომი აღდგენა, ზურგის ქრონიკული ტკივილი. ყველა გეგმა იწყება ფიზიოთერაპევტის 60-წუთიანი შეფასებით.",
      ru: "Реабилитация спортивных травм, восстановление после операций, хронические боли в спине. Каждая программа начинается с 60-минутной оценки физиотерапевта.",
      en: "Sports rehabilitation, post-operative recovery, chronic back pain. Every plan begins with a 60-minute physio assessment.",
    },
    procedures: {
      ka: [
        "ფიზიოთერაპევტის შეფასება",
        "ინდივიდუალური ვარჯიშის გეგმა",
        "მანუალური თერაპია",
        "კინეზიოთერაპია",
        "მაღალი ინტენსივობის ლაზერი",
      ],
      ru: [
        "Оценка физиотерапевта",
        "Индивидуальный план упражнений",
        "Мануальная терапия",
        "Кинезиотерапия",
        "Лазеротерапия высокой интенсивности",
      ],
      en: [
        "Physiotherapy assessment",
        "Individual exercise plan",
        "Manual therapy",
        "Kinesiotherapy",
        "High-intensity laser therapy",
      ],
    },
    highlights: {
      ka: [
        { title: "ცალკე სტუდია", body: "40 მ² დარბაზი — ხალხმრავლობის გარეშე, ბუნებრივი შუქით." },
        { title: "ვიდეო-დასახმარებელი", body: "საშინაო ვარჯიშის ვიდეო ბიბლიოთეკა პაციენტის პორტალზე." },
      ],
      ru: [
        { title: "Отдельная студия", body: "Зал 40 м² — без толпы, с естественным светом." },
        { title: "Видео-поддержка", body: "Библиотека домашних упражнений в личном кабинете." },
      ],
      en: [
        { title: "A dedicated studio", body: "A 40 m² room — uncrowded, with natural light." },
        { title: "Video support", body: "A home-exercise video library in the patient portal." },
      ],
    },
    doctors: ["lomidze"],
    faqs: {
      ka: [
        { q: "რამდენი სეანსი დასჭირდება?", a: "საშუალო გეგმა — 8–12 სეანსი კვირაში ორჯერ. ვაფასებთ შუა გზაზე." },
      ],
      ru: [
        { q: "Сколько сеансов потребуется?", a: "В среднем 8–12, дважды в неделю. На половине курса оцениваем прогресс." },
      ],
      en: [
        { q: "How many sessions do I need?", a: "Typically 8–12, twice weekly. We review progress at the halfway mark." },
      ],
    },
    priceFrom: 70,
  },
  {
    slug: "nutrition",
    category: "mind-body",
    number: "18",
    name: {
      ka: "დიეტოლოგია",
      ru: "Диетология",
      en: "Nutrition",
    },
    short: {
      ka: "კვება — როგორც მედიცინა, არა როგორც დიეტა.",
      ru: "Питание — как медицина, а не как диета.",
      en: "Food as medicine, not as a diet.",
    },
    description: {
      ka: "დიეტოლოგია Medelite-ში ემსახურება სამ ჯგუფს: ქრონიკულ პაციენტებს (დიაბეტი, ჰიპერტონია), ორსულობისა და ლაქტაციის პერიოდის ქალებს და სპორტულ ცხოვრების სტილის მქონეებს.",
      ru: "Диетология в Medelite обслуживает три группы: хронических пациентов (диабет, гипертония), беременных и кормящих и спортивный образ жизни.",
      en: "Nutrition at Medelite serves three groups: chronic patients (diabetes, hypertension), pregnant and nursing women and active-lifestyle clients.",
    },
    procedures: {
      ka: [
        "დიეტოლოგის კონსულტაცია",
        "სხეულის კომპოზიციის ანალიზი (ბიოიმპედანსი)",
        "კვების გეგმა ქრონიკული პაციენტებისთვის",
        "ორსულობის კვების თანხლება",
        "სპორტული კვების პროგრამა",
      ],
      ru: [
        "Консультация диетолога",
        "Биоимпеданс (состав тела)",
        "План питания при хронических заболеваниях",
        "Сопровождение питания при беременности",
        "Программа спортивного питания",
      ],
      en: [
        "Dietitian consultation",
        "Bioimpedance body-composition analysis",
        "Chronic-patient meal planning",
        "Pregnancy nutrition follow-up",
        "Sports nutrition programme",
      ],
    },
    highlights: {
      ka: [
        { title: "ერთი გეგმა, ერთი ფურცელი", body: "კვების გეგმა — ხილული, პრაქტიკული, ქართული პროდუქტებით." },
        { title: "კონტაქტი კვირაში", body: "SMS-ით გავცდით ძირითადი ცვლილების ქულა." },
      ],
      ru: [
        { title: "Один план — одна страница", body: "План питания — наглядный, практичный, с грузинскими продуктами." },
        { title: "Еженедельный контакт", body: "SMS с ключевыми точками изменений." },
      ],
      en: [
        { title: "One plan, one page", body: "Meal plan on one printable page — practical, built around local produce." },
        { title: "Weekly check-in", body: "A short SMS tracking the key change points." },
      ],
    },
    doctors: ["lomidze"],
    faqs: {
      ka: [
        { q: "შესაძლებელია თუ არა ვიდეო-კონსულტაცია?", a: "დიახ — პირველი ვიზიტი ფიზიკურად, შემდგომი ვიდეოში." },
      ],
      ru: [
        { q: "Возможна ли видеоконсультация?", a: "Да — первый визит очно, последующие — по видео." },
      ],
      en: [
        { q: "Can we meet by video?", a: "Yes — the first visit is in person, follow-ups can be video." },
      ],
    },
    priceFrom: 80,
  },
];

// ------------------------------------------------------------
// Doctors
// ------------------------------------------------------------

export type Doctor = {
  slug: string;
  name: L<string>;
  title: L<string>;
  specialty: L<string>;
  years: number;
  bio: L<string>;
  education: L<string[]>;
  languages: ("ka" | "ru" | "en" | "de" | "fr")[];
  initials: string; // for placeholder portrait
};

export const doctors: Doctor[] = [
  {
    slug: "kiknadze",
    name: { ka: "ნინო კიკნაძე", ru: "Нино Кикнадзе", en: "Nino Kiknadze" },
    title: { ka: "სამედიცინო მეცნიერებათა დოქტორი", ru: "Доктор медицинских наук", en: "MD, PhD" },
    specialty: { ka: "კარდიოლოგი", ru: "Кардиолог", en: "Cardiologist" },
    years: 18,
    bio: {
      ka: "სპეციალისტი ინვაზიური და პრევენციული კარდიოლოგიაში. ESC-ის წევრი. 2008 წლიდან ხელმძღვანელობდა კარდიოდიაგნოსტიკის კაბინეტს ერთ-ერთ წამყვან კლინიკაში.",
      ru: "Специалист по инвазивной и профилактической кардиологии. Член ESC. С 2008 года руководила кабинетом кардиодиагностики в одной из ведущих клиник.",
      en: "Specialist in invasive and preventive cardiology. ESC member. Headed a cardiology diagnostics suite at a leading Tbilisi clinic from 2008.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი, MD", "შარიტე, ბერლინი — კარდიოლოგიის ფელოუშიფი", "ESC EACVI სერტიფიკატი"],
      ru: ["Тбилисский гос. медуниверситет, MD", "Шарите, Берлин — фелоушип", "Сертификат ESC EACVI"],
      en: ["Tbilisi State Medical University, MD", "Charité, Berlin — cardiology fellowship", "ESC EACVI certification"],
    },
    languages: ["ka", "ru", "en", "de"],
    initials: "NK",
  },
  {
    slug: "beridze",
    name: { ka: "გიორგი ბერიძე", ru: "Георгий Беридзе", en: "Giorgi Beridze" },
    title: { ka: "ექიმი", ru: "Врач", en: "MD" },
    specialty: { ka: "თერაპევტი, ოჯახის ექიმი", ru: "Терапевт, семейный врач", en: "Internist, family physician" },
    years: 22,
    bio: {
      ka: "Medelite-ის ერთ-ერთი დამფუძნებელი, ოჯახის ექიმის პრაქტიკის ხელმძღვანელი. „ოჯახის ექიმის მოდელი“ არის მისი პირადი ტრადიცია.",
      ru: "Один из соучредителей Medelite, руководит практикой семейных врачей. „Модель семейного врача“ — его личная традиция.",
      en: "Co-founder of Medelite, heads the family-medicine practice. The 'family physician' model is his personal tradition.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი, MD", "RCGP — Royal College of General Practitioners, UK"],
      ru: ["ТГМУ, MD", "RCGP — Royal College of General Practitioners, UK"],
      en: ["Tbilisi State Medical University, MD", "Royal College of General Practitioners, UK"],
    },
    languages: ["ka", "ru", "en"],
    initials: "GB",
  },
  {
    slug: "tsereteli",
    name: { ka: "მარიამ წერეთელი", ru: "Мариам Церетели", en: "Mariam Tsereteli" },
    title: { ka: "ექიმი", ru: "Врач", en: "MD" },
    specialty: { ka: "დერმატოლოგი, ესთეტიკური მედიცინა", ru: "Дерматолог, эстетическая медицина", en: "Dermatologist, aesthetic medicine" },
    years: 14,
    bio: {
      ka: "სპეციალიზაცია: აკნეს სამედიცინო მართვა, მელანომას სკრინინგი, ლაზერული პროცედურები. „ნაკლები უფრო მეტია“ — მისი პრაქტიკული ფილოსოფიაა.",
      ru: "Специализация: медицинское ведение акне, скрининг меланомы, лазерные процедуры. „Меньше — значит больше“ — её рабочая философия.",
      en: "Specialises in medical acne management, melanoma screening and laser treatments. 'Less is more' is her working philosophy.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი", "AAD — American Academy of Dermatology, წევრი"],
      ru: ["ТГМУ, MD", "AAD — American Academy of Dermatology, член"],
      en: ["Tbilisi State Medical University, MD", "American Academy of Dermatology, member"],
    },
    languages: ["ka", "en", "fr"],
    initials: "MT",
  },
  {
    slug: "chanturia",
    name: { ka: "დავით ჩანტურია", ru: "Давид Чантурия", en: "Davit Chanturia" },
    title: { ka: "სამედიცინო მეცნიერებათა დოქტორი", ru: "Доктор медицинских наук", en: "MD, PhD" },
    specialty: { ka: "ნევროლოგი", ru: "Невролог", en: "Neurologist" },
    years: 20,
    bio: {
      ka: "სპეციალისტი თავის ტკივილის მართვასა და ძილის მედიცინაში. ევროპული ინსულტის ასოციაციის წევრი.",
      ru: "Специалист по головной боли и медицине сна. Член Европейской ассоциации по инсульту.",
      en: "Specialist in headache management and sleep medicine. Member of the European Stroke Organisation.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი, PhD", "Pitié-Salpêtrière, პარიზი — ფელოუშიფი"],
      ru: ["ТГМУ, PhD", "Pitié-Salpêtrière, Париж — фелоушип"],
      en: ["Tbilisi State Medical University, PhD", "Pitié-Salpêtrière, Paris — fellowship"],
    },
    languages: ["ka", "ru", "en", "fr"],
    initials: "DC",
  },
  {
    slug: "chikovani",
    name: { ka: "თამარ ჩიქოვანი", ru: "Тамара Чиковани", en: "Tamar Chikovani" },
    title: { ka: "ექიმი", ru: "Врач", en: "MD" },
    specialty: { ka: "გინეკოლოგი, მეანი", ru: "Гинеколог, акушер", en: "Gynaecologist, obstetrician" },
    years: 16,
    bio: {
      ka: "სპეციალიზაცია: რეპროდუქციული მედიცინა, ორსულობის მართვა, მენოპაუზის სამედიცინო მოვლა. FIGO-ს წევრი.",
      ru: "Специализация: репродуктивная медицина, ведение беременности, менопаузальная помощь. Член FIGO.",
      en: "Specialises in reproductive medicine, pregnancy care and menopause. FIGO member.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი, MD", "RCOG — Royal College of Obstetricians, UK"],
      ru: ["ТГМУ, MD", "RCOG — Royal College of Obstetricians, UK"],
      en: ["Tbilisi State Medical University, MD", "Royal College of Obstetricians and Gynaecologists, UK"],
    },
    languages: ["ka", "ru", "en"],
    initials: "TC",
  },
  {
    slug: "shubladze",
    name: { ka: "ლევან შუბლაძე", ru: "Леван Шубладзе", en: "Levan Shubladze" },
    title: { ka: "ექიმი", ru: "Врач", en: "MD" },
    specialty: { ka: "ორთოპედი, ტრავმატოლოგი", ru: "Ортопед, травматолог", en: "Orthopaedic surgeon" },
    years: 19,
    bio: {
      ka: "სპეციალიზაცია: სპორტული ტრავმა, არტროსკოპია, სახსრის ენდოპროთეზირება. ევროპული ორთოპედიული საზოგადოების წევრი.",
      ru: "Специализация: спортивная травма, артроскопия, эндопротезирование. Член EFORT.",
      en: "Specialises in sports injuries, arthroscopy and joint replacement. EFORT member.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი", "AO Trauma, ციურიხი"],
      ru: ["ТГМУ, MD", "AO Trauma, Цюрих"],
      en: ["Tbilisi State Medical University, MD", "AO Trauma, Zürich"],
    },
    languages: ["ka", "ru", "en"],
    initials: "LS",
  },
  {
    slug: "jorbenadze",
    name: { ka: "ეკატერინე ჯორბენაძე", ru: "Екатерина Джорбенадзе", en: "Eka Jorbenadze" },
    title: { ka: "ექიმი", ru: "Врач", en: "MD" },
    specialty: { ka: "ენდოკრინოლოგი", ru: "Эндокринолог", en: "Endocrinologist" },
    years: 12,
    bio: {
      ka: "სპეციალიზაცია: ტიპი I და II დიაბეტი, ფარისებრის დაავადება, ჰორმონული დარღვევები. ADA-ს წევრი.",
      ru: "Специализация: диабет 1 и 2 типа, щитовидная железа, гормональные нарушения. Член ADA.",
      en: "Specialises in type 1 and 2 diabetes, thyroid disease and hormonal disorders. ADA member.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი", "ADA — American Diabetes Association"],
      ru: ["ТГМУ, MD", "ADA — American Diabetes Association"],
      en: ["Tbilisi State Medical University, MD", "American Diabetes Association"],
    },
    languages: ["ka", "ru", "en"],
    initials: "EJ",
  },
  {
    slug: "metreveli",
    name: { ka: "ნიკა მეტრეველი", ru: "Ника Метревели", en: "Nika Metreveli" },
    title: { ka: "DDS", ru: "DDS", en: "DDS" },
    specialty: { ka: "სტომატოლოგი", ru: "Стоматолог", en: "Dentist" },
    years: 15,
    bio: {
      ka: "სპეციალიზაცია: ციფრული პროთეზირება, იმპლანტაცია, ენდოდონტია.",
      ru: "Специализация: цифровое протезирование, имплантация, эндодонтия.",
      en: "Specialises in digital prosthetics, implants and endodontics.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი, DDS", "ITI — International Team for Implantology"],
      ru: ["ТГМУ, DDS", "ITI — International Team for Implantology"],
      en: ["Tbilisi State Medical University, DDS", "International Team for Implantology"],
    },
    languages: ["ka", "en"],
    initials: "NM",
  },
  {
    slug: "pataridze",
    name: { ka: "სოფიო პატარიძე", ru: "София Патаридзе", en: "Sofio Pataridze" },
    title: { ka: "ექიმი", ru: "Врач", en: "MD" },
    specialty: { ka: "პედიატრი, ნეონატოლოგი", ru: "Педиатр, неонатолог", en: "Paediatrician, neonatologist" },
    years: 11,
    bio: {
      ka: "სპეციალიზაცია: ნეონატალური მოვლა, ადრეული ასაკის განვითარება.",
      ru: "Специализация: неонатальная помощь, развитие в раннем возрасте.",
      en: "Specialises in neonatal care and early development.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი", "EAPS — European Academy of Paediatrics"],
      ru: ["ТГМУ, MD", "EAPS — European Academy of Paediatrics"],
      en: ["Tbilisi State Medical University, MD", "European Academy of Paediatrics"],
    },
    languages: ["ka", "ru", "en"],
    initials: "SP",
  },
  {
    slug: "kvaratskhelia",
    name: { ka: "რეზო კვარაცხელია", ru: "Резо Кварацхелия", en: "Rezo Kvaratskhelia" },
    title: { ka: "ექიმი", ru: "Врач", en: "MD" },
    specialty: { ka: "ოფთალმოლოგი", ru: "Офтальмолог", en: "Ophthalmologist" },
    years: 24,
    bio: {
      ka: "სპეციალიზაცია: გლაუკომა, რეფრაქციული კორექცია. ESCRS-ის წევრი.",
      ru: "Специализация: глаукома, рефракционная коррекция. Член ESCRS.",
      en: "Specialises in glaucoma and refractive correction. ESCRS member.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი", "Moorfields, ლონდონი"],
      ru: ["ТГМУ, MD", "Moorfields, Лондон"],
      en: ["Tbilisi State Medical University, MD", "Moorfields Eye Hospital, London"],
    },
    languages: ["ka", "ru", "en"],
    initials: "RK",
  },
  {
    slug: "gelashvili",
    name: { ka: "ირაკლი გელაშვილი", ru: "Ираклий Гелашвили", en: "Irakli Gelashvili" },
    title: { ka: "ექიმი", ru: "Врач", en: "MD" },
    specialty: { ka: "უროლოგი", ru: "Уролог", en: "Urologist" },
    years: 17,
    bio: {
      ka: "სპეციალიზაცია: ენდოუროლოგია, პროსტატის ჯანმრთელობა, უროლოგიური ონკო-სკრინინგი. EAU-ის წევრი.",
      ru: "Специализация: эндоурология, здоровье простаты, урологический онкоскрининг. Член EAU.",
      en: "Specialises in endourology, prostate health and urological oncology screening. EAU member.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი", "AKH Wien — უროლოგიის ფელოუშიფი"],
      ru: ["ТГМУ, MD", "AKH Wien — уролог, фелоушип"],
      en: ["Tbilisi State Medical University, MD", "AKH Wien — urology fellowship"],
    },
    languages: ["ka", "ru", "en", "de"],
    initials: "IG",
  },
  {
    slug: "rusieshvili",
    name: { ka: "ანა რუსიეშვილი", ru: "Ана Русиешвили", en: "Ana Rusieshvili" },
    title: { ka: "ექიმი", ru: "Врач", en: "MD" },
    specialty: { ka: "ოტორინოლარინგოლოგი", ru: "Оториноларинголог", en: "Otolaryngologist (ENT)" },
    years: 13,
    bio: {
      ka: "სპეციალიზაცია: ბავშვთა LOR, ქრონიკული რინიტი, აუდიოლოგია. EUFOS-ის წევრი.",
      ru: "Специализация: детская ЛОР, хронический ринит, аудиология. Член EUFOS.",
      en: "Specialises in paediatric ENT, chronic rhinitis and audiology. EUFOS member.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი", "IRCCS Milano — ბავშვთა LOR"],
      ru: ["ТГМУ, MD", "IRCCS Milano — детская ЛОР"],
      en: ["Tbilisi State Medical University, MD", "IRCCS Milano — paediatric ENT"],
    },
    languages: ["ka", "ru", "en"],
    initials: "AR",
  },
  {
    slug: "tabatadze",
    name: { ka: "ზურაბ ტაბატაძე", ru: "Зураб Табатадзе", en: "Zurab Tabatadze" },
    title: { ka: "სამედიცინო მეცნიერებათა დოქტორი", ru: "Доктор медицинских наук", en: "MD, PhD" },
    specialty: { ka: "გასტროენტეროლოგი", ru: "Гастроэнтеролог", en: "Gastroenterologist" },
    years: 23,
    bio: {
      ka: "სპეციალიზაცია: ენდოსკოპიური დიაგნოსტიკა, ღვიძლის დაავადებები, ანთებითი ნაწლავური დაავადებები. UEG-ის წევრი.",
      ru: "Специализация: эндоскопическая диагностика, болезни печени, ВЗК. Член UEG.",
      en: "Specialises in endoscopic diagnostics, liver disease and inflammatory bowel disease. UEG member.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი, PhD", "Humanitas Milan — ფელოუშიფი"],
      ru: ["ТГМУ, PhD", "Humanitas Milan — фелоушип"],
      en: ["Tbilisi State Medical University, PhD", "Humanitas Milan — fellowship"],
    },
    languages: ["ka", "ru", "en"],
    initials: "ZT",
  },
  {
    slug: "lomidze",
    name: { ka: "ეკა ლომიძე", ru: "Эка Ломидзе", en: "Eka Lomidze" },
    title: { ka: "DPT", ru: "DPT", en: "DPT" },
    specialty: { ka: "ფიზიოთერაპევტი, დიეტოლოგი", ru: "Физиотерапевт, диетолог", en: "Physiotherapist & nutritionist" },
    years: 10,
    bio: {
      ka: "სპეციალიზაცია: სპორტული რეაბილიტაცია, ზურგის ქრონიკული ტკივილი, ქრონიკული პაციენტების კვების გეგმები.",
      ru: "Специализация: спортивная реабилитация, хронические боли в спине, питание при хронических заболеваниях.",
      en: "Specialises in sports rehabilitation, chronic back pain and clinical nutrition for chronic patients.",
    },
    education: {
      ka: ["თბილისის სახ. სამედიცინო უნივერსიტეტი, DPT", "ESSKA — სპორტული ორთოპედიის სერტიფიკატი"],
      ru: ["ТГМУ, DPT", "ESSKA — спортивная ортопедия"],
      en: ["Tbilisi State Medical University, DPT", "ESSKA sports orthopaedics certification"],
    },
    languages: ["ka", "ru", "en"],
    initials: "EL",
  },
];

// ------------------------------------------------------------
// News
// ------------------------------------------------------------

export type NewsCategory = "clinic" | "education" | "research" | "patient";

export type NewsPost = {
  slug: string;
  category: NewsCategory;
  date: string; // ISO date
  readingMin: number;
  title: L<string>;
  excerpt: L<string>;
  body: L<string[]>; // paragraphs
  author: string; // doctor slug or "editorial"
};

export const newsCategories: L<Record<NewsCategory, string>> = {
  ka: {
    clinic: "კლინიკა",
    education: "განათლება",
    research: "კვლევა",
    patient: "პაციენტები",
  },
  ru: {
    clinic: "Клиника",
    education: "Образование",
    research: "Исследования",
    patient: "Пациенты",
  },
  en: {
    clinic: "Clinic",
    education: "Education",
    research: "Research",
    patient: "Patients",
  },
};

export const news: NewsPost[] = [
  {
    slug: "autumn-screening-programme",
    category: "clinic",
    date: "2026-10-14",
    readingMin: 4,
    author: "editorial",
    title: {
      ka: "შემოდგომის პრევენციული სკრინინგის პროგრამა — ღიაა ჩაწერა",
      ru: "Открыта запись: осенняя профилактическая программа",
      en: "Autumn screening programme — enrolment open",
    },
    excerpt: {
      ka: "ოთხი განყოფილების გაერთიანებული პაკეტი ერთ დღეში. მოიცავს კარდიოლოგიას, ენდოკრინოლოგიას, გინეკოლოგიას და ლაბორატორიას.",
      ru: "Объединённый пакет четырёх отделений за один день. Кардиология, эндокринология, гинекология и лаборатория.",
      en: "A combined package from four departments in a single day — cardiology, endocrinology, gynaecology and lab.",
    },
    body: {
      ka: [
        "ოქტომბრიდან იანვრამდე Medelite ახორციელებს სრული ჩექ-აპის პროგრამას, რომელიც გაერთიანებულია ერთ დღეში.",
        "პროგრამა მოიცავს თერაპევტის ვიზიტს, ეკგ-ს, ფარისებრის ექოს, გინეკოლოგის ან უროლოგის კონსულტაციას და 24 ლაბორატორიული ტესტის პანელს.",
        "ჩაწერა მიმდინარეობს პორტალზე ან ტელეფონით. პაკეტის ღირებულება — 390 GEL.",
      ],
      ru: [
        "С октября по январь Medelite проводит программу полного чек-апа, собранную в один день.",
        "Программа включает приём терапевта, ЭКГ, УЗИ щитовидной железы, консультацию гинеколога или уролога и панель из 24 лабораторных тестов.",
        "Запись — через личный кабинет или по телефону. Стоимость пакета — 390 GEL.",
      ],
      en: [
        "From October to January, Medelite runs a full check-up programme condensed into a single day.",
        "It includes an internist visit, ECG, thyroid ultrasound, gynaecology or urology consultation and a 24-test lab panel.",
        "Booking is open through the patient portal or by phone. Package price — GEL 390.",
      ],
    },
  },
  {
    slug: "new-mri-suite",
    category: "clinic",
    date: "2026-09-02",
    readingMin: 3,
    author: "editorial",
    title: {
      ka: "ახალი MR სუიტი იწყებს მუშაობას",
      ru: "Новая МР-операционная открыта",
      en: "A new MR suite opens",
    },
    excerpt: {
      ka: "Siemens Magnetom Sola 1.5T — სრული სპექტრის კვლევა ერთი დღის ფარგლებში.",
      ru: "Siemens Magnetom Sola 1.5T — полноценные исследования в рамках одного дня.",
      en: "Siemens Magnetom Sola 1.5T — full-spectrum studies within a single day.",
    },
    body: {
      ka: [
        "ახალი MR-ის აპარატურა უზრუნველყოფს სპექტრის სრულ მოცულობას — ნეირო, მუსკულოსკელეტური, აბდომინალური.",
        "კვლევის დრო — 15-დან 40 წუთამდე. რადიოლოგის დასკვნა იწარმოება 24 საათში.",
      ],
      ru: [
        "Новое оборудование МРТ обеспечивает полный спектр — нейро, мышечно-скелетные, абдоминальные исследования.",
        "Время исследования — от 15 до 40 минут. Заключение рентгенолога готово за 24 часа.",
      ],
      en: [
        "The new MR scanner supports the full range — neuro, musculoskeletal and abdominal imaging.",
        "Studies run between 15 and 40 minutes. The radiologist report is ready within 24 hours.",
      ],
    },
  },
  {
    slug: "esc-barcelona",
    category: "education",
    date: "2026-08-21",
    readingMin: 5,
    author: "kiknadze",
    title: {
      ka: "ESC-ის კონგრესი ბარსელონაში: რა ვისწავლეთ",
      ru: "Конгресс ESC в Барселоне: что мы вынесли",
      en: "ESC Congress in Barcelona: what we took home",
    },
    excerpt: {
      ka: "კარდიოლოგიის განყოფილების ხელმძღვანელი იზიარებს სამ მთავარ აქცენტს ESC 2026-დან.",
      ru: "Руководитель отделения кардиологии делится тремя главными акцентами ESC 2026.",
      en: "Our head of cardiology shares three takeaways from ESC 2026.",
    },
    body: {
      ka: [
        "მკვლევარები აქცენტს აკეთებდნენ გულის უკმარისობის ახალ პრევენციულ გეგმებზე.",
        "მეორე თემა — AI-ზე დაფუძნებული ეკგ-ის ინტერპრეტაცია.",
        "მესამე — სოციალური ფაქტორების გავლენა გულის ჯანმრთელობაზე.",
      ],
      ru: [
        "Исследователи делали акцент на новых профилактических планах при сердечной недостаточности.",
        "Вторая тема — ИИ в интерпретации ЭКГ.",
        "Третья — влияние социальных факторов на здоровье сердца.",
      ],
      en: [
        "Researchers focused on new preventive plans for heart failure.",
        "The second theme — AI-driven ECG interpretation.",
        "The third — social determinants of cardiovascular health.",
      ],
    },
  },
  {
    slug: "ucl-partnership",
    category: "research",
    date: "2026-07-10",
    readingMin: 2,
    author: "editorial",
    title: {
      ka: "კვლევითი თანამშრომლობა UCL-თან",
      ru: "Исследовательское сотрудничество с UCL",
      en: "A research partnership with UCL",
    },
    excerpt: {
      ka: "Medelite შედის ევროპული კარდიოდიაგნოსტიკური კვლევის ჯგუფში University College London-თან ერთად.",
      ru: "Medelite входит в европейскую группу кардиодиагностических исследований совместно с University College London.",
      en: "Medelite joins a European cardiology research group with University College London.",
    },
    body: {
      ka: [
        "სამი წლის პერსპექტივით, ჩვენი კარდიოლოგიის განყოფილება იქნება ერთ-ერთი კვლევითი კვანძი შემოდგომის სკრინინგის მოდელის ვალიდაციაში.",
      ],
      ru: [
        "В течение трёх лет наше кардиологическое отделение станет одним из исследовательских узлов для валидации модели осеннего скрининга.",
      ],
      en: [
        "Over three years, our cardiology department will serve as a node for validating the autumn-screening model.",
      ],
    },
  },
  {
    slug: "winter-wellness",
    category: "clinic",
    date: "2026-06-05",
    readingMin: 3,
    author: "editorial",
    title: {
      ka: "ზამთრის ველნეს პროგრამა — ადრეული ჩაწერა",
      ru: "Зимняя wellness-программа — ранняя запись",
      en: "Winter wellness programme — early access",
    },
    excerpt: {
      ka: "სამი თვის თანმხლები — თერაპევტი, დიეტოლოგი, ფსიქოლოგი.",
      ru: "Три месяца сопровождения — терапевт, диетолог, психолог.",
      en: "A three-month companion plan — internist, dietician, psychologist.",
    },
    body: {
      ka: [
        "ზამთრის პროგრამა ფოკუსირდება ენერგიის სეზონურ შემცირებაზე, ძილის რეგულაციაზე და იმუნურ მხარდაჭერაზე.",
      ],
      ru: [
        "Зимняя программа сфокусирована на сезонном снижении энергии, регуляции сна и поддержке иммунитета.",
      ],
      en: [
        "The winter programme focuses on seasonal energy, sleep regulation and immune support.",
      ],
    },
  },
  {
    slug: "patient-story-bypass",
    category: "patient",
    date: "2026-05-14",
    readingMin: 6,
    author: "editorial",
    title: {
      ka: "პაციენტის ისტორია: ერთი წლის შემდეგ",
      ru: "История пациента: год спустя",
      en: "A patient's story: one year on",
    },
    excerpt: {
      ka: "თორმეტი თვე გულის ოპერაციის შემდეგ — რა შეიცვალა და რა დარჩა.",
      ru: "Двенадцать месяцев после операции на сердце — что изменилось и что осталось.",
      en: "Twelve months after cardiac surgery — what changed and what stayed.",
    },
    body: {
      ka: [
        "ჩვენი პაციენტი იზიარებს თერაპიული კურსის გამოცდილებას და აღდგენის ყოველდღიურ რიტუალებს.",
      ],
      ru: [
        "Наш пациент делится опытом терапевтического курса и ежедневными ритуалами восстановления.",
      ],
      en: [
        "Our patient shares the therapy journey and the daily rituals of recovery.",
      ],
    },
  },
  {
    slug: "pharmacy-behind-the-scenes",
    category: "clinic",
    date: "2026-04-03",
    readingMin: 4,
    author: "editorial",
    title: {
      ka: "კულისებში: კლინიკის აფთიაქი",
      ru: "За кулисами: аптека клиники",
      en: "Behind the scenes: the clinic pharmacy",
    },
    excerpt: {
      ka: "როგორ იწყობა მედიკამენტების მართვის სისტემა 400 პოზიციისთვის.",
      ru: "Как устроена система управления медикаментами на 400 позиций.",
      en: "How a 400-SKU medication management system comes together.",
    },
    body: {
      ka: [
        "შესანახი ჯაჭვი, ბარკოდი, შიდა აუდიტი — ყოველი ფლაკონის გზა ფიქსირდება.",
      ],
      ru: [
        "Склад, штрих-код, внутренний аудит — путь каждого флакона фиксируется.",
      ],
      en: [
        "Storage, barcoding and internal audit — every vial's journey is logged.",
      ],
    },
  },
  {
    slug: "heart-month",
    category: "clinic",
    date: "2026-02-07",
    readingMin: 2,
    author: "editorial",
    title: {
      ka: "გულის ჯანმრთელობის თვე — უფასო სკრინინგი",
      ru: "Месяц здоровья сердца — бесплатный скрининг",
      en: "Heart month — free screening",
    },
    excerpt: {
      ka: "თებერვალში კარდიოლოგის პირველადი კონსულტაცია — ყველა რეგისტრირებული პაციენტისთვის.",
      ru: "В феврале первичная консультация кардиолога — для всех зарегистрированных пациентов.",
      en: "In February, an initial cardiology consultation is free for every registered patient.",
    },
    body: {
      ka: [
        "საერთაშორისო გულის თვის ფარგლებში ვატარებთ ერთი კვირის პრევენციული სკრინინგის მოქმედებას.",
      ],
      ru: [
        "В рамках международного месяца сердца проводим недельную акцию по профилактическому скринингу.",
      ],
      en: [
        "During international heart month, we run a week of preventive screening.",
      ],
    },
  },
  {
    slug: "paediatric-wing-opening",
    category: "clinic",
    date: "2026-03-18",
    readingMin: 3,
    author: "pataridze",
    title: {
      ka: "ახალი პედიატრიული ფრთა — ცალკე შესასვლელით",
      ru: "Открыто новое детское крыло — с отдельным входом",
      en: "The new paediatric wing — with its own entrance",
    },
    excerpt: {
      ka: "სამი კონსულტაციის ოთახი, პირადი სათამაშო ფართი და ცალკე რეცეფცია.",
      ru: "Три кабинета консультаций, своё игровое пространство и отдельный ресепшн.",
      en: "Three consultation rooms, a dedicated play area and a separate front desk.",
    },
    body: {
      ka: [
        "მარტიდან კლინიკაში იხსნება ცალკე პედიატრიული ფრთა, რომელსაც გააჩნია საკუთარი შესასვლელი აბაშიძის ქუჩიდან.",
        "ფრთა მოიცავს სამ კონსულტაციის ოთახს, ვაქცინაციის კაბინეტს და 60 მ² სათამაშო ფართს. ყველა მასალა ბავშვთა უსაფრთხო სტანდარტებთანაა შესაბამისი.",
        "პედიატრის ვიზიტი — უცვლელი 40 წუთი. წინასწარი ჩაწერა მიმდინარეობს პორტალზე.",
      ],
      ru: [
        "С марта в клинике открывается отдельное детское крыло с собственным входом с улицы Абашидзе.",
        "Крыло включает три кабинета консультаций, прививочный кабинет и 60 м² игровой площади. Все материалы соответствуют детским стандартам безопасности.",
        "Приём педиатра — те же 40 минут. Запись — через личный кабинет.",
      ],
      en: [
        "From March, Medelite opens a dedicated paediatric wing with its own entrance on Abashidze Street.",
        "It houses three consultation rooms, a vaccination suite and a 60 m² play area. All materials meet child-safety standards.",
        "Paediatric visits stay at 40 minutes. Booking is open through the patient portal.",
      ],
    },
  },
  {
    slug: "nutrition-programme-spring",
    category: "education",
    date: "2026-03-05",
    readingMin: 4,
    author: "lomidze",
    title: {
      ka: "საგაზაფხულო კვების პროგრამა — ქართული სეზონით",
      ru: "Весенняя программа питания — по грузинскому сезону",
      en: "Spring nutrition programme — on the Georgian calendar",
    },
    excerpt: {
      ka: "ოთხ-კვირიანი პროგრამა, რომელიც აშენებს კვებას ადგილობრივი სეზონური პროდუქტების გარშემო.",
      ru: "Четырёхнедельная программа, выстроенная вокруг местных сезонных продуктов.",
      en: "A four-week plan built around local, seasonal produce.",
    },
    body: {
      ka: [
        "საგაზაფხულო პროგრამა მოიცავს ოთხ შეხვედრას დიეტოლოგთან და ყოველკვირეულ SMS-ზე მიწოდებულ შეხსენებებს.",
        "ფოკუსი — ქართული ბაზრის ტრადიციული გაზაფხულის პროდუქტზე: მწვანილები, ხილის სეზონი და ფერმენტაცია.",
        "ფასი — 290 GEL, მოიცავს ბიოიმპედანსის კვლევას და წერილობით გეგმას.",
      ],
      ru: [
        "Весенняя программа — четыре встречи с диетологом и еженедельные SMS-напоминания.",
        "В центре внимания — традиционные весенние продукты грузинского рынка: зелень, сезонные фрукты и ферментация.",
        "Стоимость — 290 GEL, включает биоимпеданс и письменный план.",
      ],
      en: [
        "The spring programme includes four dietician visits and weekly SMS nudges.",
        "The focus: traditional Georgian spring produce — greens, seasonal fruit, fermentation.",
        "Price: GEL 290, including a bioimpedance scan and a written plan.",
      ],
    },
  },
  {
    slug: "telemedicine-launch",
    category: "clinic",
    date: "2026-01-22",
    readingMin: 2,
    author: "editorial",
    title: {
      ka: "ვიდეო-კონსულტაცია — ოთხი განყოფილებიდან იწყება",
      ru: "Видеоконсультации стартуют в четырёх отделениях",
      en: "Video consultations go live in four departments",
    },
    excerpt: {
      ka: "თერაპია, ფსიქოთერაპია, დერმატოლოგია, დიეტოლოგია — უსაფრთხო პლატფორმაზე.",
      ru: "Терапия, психотерапия, дерматология, диетология — на защищённой платформе.",
      en: "Internal medicine, psychotherapy, dermatology and nutrition — on a secure platform.",
    },
    body: {
      ka: [
        "ვიდეო-კონსულტაცია ხელმისაწვდომია განმეორებითი ვიზიტებისთვის ოთხ განყოფილებაში.",
        "პირველი ვიზიტი — ფიზიკურად; ყველა შემდგომი — პაციენტის არჩევით.",
      ],
      ru: [
        "Видеоконсультации доступны для повторных визитов в четырёх отделениях.",
        "Первый визит — очно; все последующие — по выбору пациента.",
      ],
      en: [
        "Video consultations are available for follow-ups across four departments.",
        "First visits remain in person; every follow-up is the patient's call.",
      ],
    },
  },
  {
    slug: "annual-report-2026",
    category: "research",
    date: "2026-11-01",
    readingMin: 6,
    author: "editorial",
    title: {
      ka: "წლიური ანგარიში 2026: როგორ გავაცადეთ 12 000 ვიზიტი",
      ru: "Годовой отчёт 2026: как мы провели 12 000 визитов",
      en: "Annual report 2026: how we ran 12,000 visits",
    },
    excerpt: {
      ka: "სრული სტატისტიკა, ფასდადება, გაფართოება და რაც შემდეგ გელოდებათ.",
      ru: "Полная статистика, прозрачность цен, расширение и что дальше.",
      en: "Full numbers, price transparency, expansion — and what comes next.",
    },
    body: {
      ka: [
        "ანგარიში შედგენილია სამი ნაწილისგან: ოპერაცია, ხარისხი და გეგმები.",
        "ოპერაცია: 12 041 ვიზიტი, 42% განმეორებითი პაციენტები. საშუალო ლოდინის ხანგრძლივობა რეცეპციაზე — 3 წუთი.",
        "ხარისხი: 96% პაციენტების კმაყოფილების ქულა, 11 საჩივარი, ყველა გადაწყვეტილი 10 დღის განმავლობაში.",
        "გეგმები: ახალი კარდიოლოგიური კათეტერიზაციის ოთახი, გაფართოებული ლაბორატორია, 6 ახალი სპეციალისტი 2027 წელს.",
      ],
      ru: [
        "Отчёт состоит из трёх частей: операции, качество, планы.",
        "Операции: 12 041 визит, 42% — возвратные пациенты. Среднее ожидание на ресепшене — 3 минуты.",
        "Качество: 96% удовлетворённость пациентов, 11 жалоб — все урегулированы за 10 дней.",
        "Планы: новый кабинет кардио-катетеризации, расширение лаборатории, 6 новых специалистов в 2027.",
      ],
      en: [
        "The report runs in three parts: operations, quality, plans.",
        "Operations: 12,041 visits, 42% returning patients. Average front-desk wait: 3 minutes.",
        "Quality: 96% patient satisfaction, 11 complaints — all resolved within 10 days.",
        "Plans: a new cath lab, an expanded clinical lab, 6 new specialists in 2027.",
      ],
    },
  },
];

// ------------------------------------------------------------
// Values / mission
// ------------------------------------------------------------

export const values: L<{ title: string; body: string }[]> = {
  ka: [
    { title: "დრო პაციენტზე", body: "40 წუთი — არა 10. გეგმიური ვიზიტი არ არის კონვეიერი." },
    { title: "ერთი ჯანმრთელობის ქარტია", body: "ყველა გამოკვლევა, რეცეპტი, ფოტო — ერთ ფაილში, ხელმისაწვდომი თქვენთვის." },
    { title: "მინიმალური ინტერვენცია", body: "პირველ რიგში — ცხოვრების სტილი და მონიტორინგი. მედიკამენტი — როცა ის ნამდვილად საჭიროა." },
    { title: "გამჭვირვალე ფასი", body: "ფასი ხილულია ვიზიტამდე. არ არსებობს „დანამატი“." },
    { title: "მდუმარე სივრცე", body: "დიზაინი ჩუმია, რომ სმენა დაიცვას — ჩვენი, თქვენი, თქვენი ოჯახის." },
  ],
  ru: [
    { title: "Время на пациента", body: "40 минут, а не 10. Плановый визит — не конвейер." },
    { title: "Одна карта здоровья", body: "Все исследования, рецепты, фото — в одном файле, доступном вам." },
    { title: "Минимальное вмешательство", body: "Сначала — образ жизни и наблюдение. Лекарство — когда оно действительно нужно." },
    { title: "Прозрачная цена", body: "Цена видна до визита. Никаких «надбавок»." },
    { title: "Тихое пространство", body: "Дизайн тихий, чтобы сохранить слух — наш, ваш, вашей семьи." },
  ],
  en: [
    { title: "Time with the patient", body: "40 minutes, not 10. A scheduled visit is not a conveyor belt." },
    { title: "One health record", body: "Every exam, prescription and image in one file — accessible to you." },
    { title: "Minimal intervention", body: "First: lifestyle and monitoring. Medication when it is actually necessary." },
    { title: "Transparent pricing", body: "Prices are visible before the visit. No 'surcharges'." },
    { title: "A quiet space", body: "The design is quiet to protect everyone's hearing — ours, yours, your family's." },
  ],
};

// ------------------------------------------------------------
// Timeline
// ------------------------------------------------------------

export const timeline: L<{ year: string; title: string; body: string }[]> = {
  ka: [
    { year: "2015", title: "დაფუძნება", body: "ოთხი ექიმი და ერთი რეცეფცია — ვაკეში." },
    { year: "2017", title: "პირველი ფილიალი", body: "250 მ², სამი განყოფილება: თერაპია, კარდიოლოგია, გინეკოლოგია." },
    { year: "2019", title: "ლაბორატორია", body: "საკუთარი კლინიკური ლაბორატორიის გახსნა — Siemens Atellica." },
    { year: "2021", title: "სტომატოლოგია", body: "სრული სპექტრის სტომატოლოგიური განყოფილება, ციფრული iTero-ით." },
    { year: "2023", title: "ოთხი განყოფილება", body: "ფსიქოთერაპია, ნევროლოგია, პედიატრია, ენდოკრინოლოგია." },
    { year: "2024", title: "ახალი MR", body: "Siemens Magnetom Sola 1.5T. 24-საათიანი რეპორტი." },
    { year: "2026", title: "ახალი სახლი", body: "ი. ჭავჭავაძის 48 — 1400 მ², 18 განყოფილება." },
  ],
  ru: [
    { year: "2015", title: "Основание", body: "Четыре врача и один ресепшн — в Ваке." },
    { year: "2017", title: "Первый филиал", body: "250 м², три отделения: терапия, кардиология, гинекология." },
    { year: "2019", title: "Лаборатория", body: "Собственная клиническая лаборатория — Siemens Atellica." },
    { year: "2021", title: "Стоматология", body: "Полноценное стоматологическое отделение с iTero." },
    { year: "2023", title: "Четыре отделения", body: "Психотерапия, неврология, педиатрия, эндокринология." },
    { year: "2024", title: "Новое МРТ", body: "Siemens Magnetom Sola 1.5T. Отчёт за 24 часа." },
    { year: "2026", title: "Новый дом", body: "просп. И. Чавчавадзе 48 — 1400 м², 18 отделений." },
  ],
  en: [
    { year: "2015", title: "Founded", body: "Four doctors and one reception in Vake." },
    { year: "2017", title: "First outpost", body: "250 m², three departments: internal medicine, cardiology, gynaecology." },
    { year: "2019", title: "Lab", body: "Own clinical lab — Siemens Atellica." },
    { year: "2021", title: "Dentistry", body: "Full-spectrum dentistry suite with iTero." },
    { year: "2023", title: "Four more", body: "Psychotherapy, neurology, paediatrics, endocrinology." },
    { year: "2024", title: "New MR", body: "Siemens Magnetom Sola 1.5T. 24-hour reports." },
    { year: "2026", title: "A new home", body: "48 I. Chavchavadze Ave — 1,400 m², 18 departments." },
  ],
};

// ------------------------------------------------------------
// Testimonials
// ------------------------------------------------------------

export type Testimonial = {
  slug: string;
  quote: L<string>;
  author: L<string>;
  context: L<string>;
  service: string; // service slug this maps to
  rating: 5;
};

export const testimonials: Testimonial[] = [
  {
    slug: "a-mother",
    service: "paediatrics",
    rating: 5,
    quote: {
      ka: "ეს პირველი კლინიკაა, სადაც ჩემი შვილი არ ტირის კარის გახსნისას. ჩვენი პედიატრი იცნობს მას სახელით და იცის, რას უყურებს ორი თვის წინ.",
      ru: "Это первая клиника, где мой ребёнок не плачет на пороге. Педиатр знает его по имени и помнит, что мы смотрели два месяца назад.",
      en: "It's the first clinic where my child doesn't cry at the door. The paediatrician knows him by name and remembers what we looked at two months ago.",
    },
    author: { ka: "ნინა გ., 36", ru: "Нина Г., 36", en: "Nina G., 36" },
    context: {
      ka: "დედა, 4 წლის ბიჭის",
      ru: "мама 4-летнего мальчика",
      en: "mother of a 4-year-old",
    },
  },
  {
    slug: "a-father",
    service: "cardiology",
    rating: 5,
    quote: {
      ka: "კარდიოლოგის ვიზიტი Medelite-ში დავიწყე მას შემდეგ, რაც მამა ინფარქტმა გაიტანა. მანდ არ მომექცნენ როგორც პაციენტს — მომექცნენ როგორც პაციენტის შვილს.",
      ru: "К кардиологу Medelite я попал после инфаркта у отца. Меня встретили не как пациента, а как сына пациента.",
      en: "I booked a cardiology visit after my father's heart attack. I wasn't treated as a patient — I was treated as the son of a patient.",
    },
    author: { ka: "ვახო მ., 41", ru: "Вахо М., 41", en: "Vakho M., 41" },
    context: {
      ka: "კარდიოპრევენციული პაკეტი",
      ru: "кардио-профилактика",
      en: "cardio prevention package",
    },
  },
  {
    slug: "a-reader",
    service: "psychology",
    rating: 5,
    quote: {
      ka: "ფსიქოთერაპევტი ყოველ კვირა მელოდება იმავე ოთახში, იმავე საათზე. ეს არის პირველი ადგილი, სადაც არ ვგრძნობ, რომ ვაფერხებ რიგს.",
      ru: "Психотерапевт встречает меня каждую неделю в той же комнате и в то же время. Это первое место, где я не чувствую, что торможу очередь.",
      en: "My therapist meets me every week in the same room, at the same hour. It's the first place I don't feel I'm holding up a queue.",
    },
    author: { ka: "ქეთი ბ., 29", ru: "Кети Б., 29", en: "Keti B., 29" },
    context: {
      ka: "ფსიქოთერაპია, 14 თვე",
      ru: "психотерапия, 14 месяцев",
      en: "psychotherapy, 14 months",
    },
  },
  {
    slug: "a-returning-patient",
    service: "dentistry",
    rating: 5,
    quote: {
      ka: "სტომატოლოგიური გეგმა მომცეს წერილობითი — ფასით, თარიღებით, გარანტიით. 11 თვე გავიდა, არც ერთი დანამატი არ გამოჩნდა. ეს ქვეყანაში იშვიათია.",
      ru: "Мне выдали план стоматологического лечения на бумаге — с ценой, датами, гарантией. Прошло 11 месяцев, никаких доплат. В этой стране это редкость.",
      en: "They gave me the dental plan in writing — price, dates, warranty. Eleven months later, no add-ons. In this country, that's rare.",
    },
    author: { ka: "ალექსი ჭ., 52", ru: "Алекси Ч., 52", en: "Alexi Ch., 52" },
    context: {
      ka: "იმპლანტაცია + პროთეზი",
      ru: "имплантация и протез",
      en: "implants & prosthetics",
    },
  },
  {
    slug: "an-expat",
    service: "general-medicine",
    rating: 5,
    quote: {
      ka: "თბილისში ვცხოვრობ ხუთი წელი. Medelite ერთადერთი კლინიკაა, სადაც თერაპევტი მკითხავს ინგლისურად რაიმე სპეციალიზებული სიტყვა გაუგე თუ არა — არა იმიტომ, რომ ეჭვი აქვს, არამედ ზრდილობიანობის გამო.",
      ru: "Я живу в Тбилиси пять лет. Medelite — единственная клиника, где терапевт переспрашивает по-английски, понял ли я специфический термин, — не из недоверия, а из вежливости.",
      en: "I've lived in Tbilisi five years. Medelite is the only clinic where my internist asks, in English, whether I caught a specialist term — not from distrust, out of courtesy.",
    },
    author: { ka: "მარტინ ს., 44", ru: "Мартин С., 44", en: "Martin S., 44" },
    context: {
      ka: "საერთაშორისო პაციენტი",
      ru: "международный пациент",
      en: "international patient",
    },
  },
  {
    slug: "a-woman",
    service: "gynaecology",
    rating: 5,
    quote: {
      ka: "აქ ჩემი ვიზიტები არ არის პროცედურა — ეს არის საუბარი. გინეკოლოგი მკითხავს, როგორ ვძინავ, არა მხოლოდ იმას, რას ვხედავ.",
      ru: "Здесь мои визиты — не процедура, а разговор. Гинеколог спрашивает, как я сплю, а не только что я вижу.",
      en: "My visits here aren't a procedure — they're a conversation. My gynaecologist asks how I sleep, not just what I see.",
    },
    author: { ka: "თათია ქ., 33", ru: "Татиа К., 33", en: "Tatia K., 33" },
    context: {
      ka: "წლიური შემოწმება",
      ru: "ежегодный осмотр",
      en: "annual check-up",
    },
  },
];

// ------------------------------------------------------------
// Home FAQ
// ------------------------------------------------------------

export const homeFaq: L<{ q: string; a: string }[]> = {
  ka: [
    {
      q: "საჭიროა თუ არა მიმართვა მოხვედრისთვის?",
      a: "არა. Medelite არის ამბულატორიული კლინიკა — ყველა განყოფილებაში შეგიძლიათ პირდაპირ ჩაეწეროთ, მიმართვის გარეშე. თუ გსურთ, რომ თერაპევტმა თქვენი შემთხვევა წინასწარ გაიცნოს — ჯერ მასთან ჩაწერეთ.",
    },
    {
      q: "რა დრო დასჭირდება პირველ ვიზიტს?",
      a: "პირველი ვიზიტი ყველა განყოფილებაში იგეგმება 40 წუთზე. ეს ითვალისწინებს ფაილის გახსნას, ანამნეზს და გეგმის შემუშავებას. განმეორებითი ვიზიტები — 25–30 წუთი.",
    },
    {
      q: "ვმუშაობთ თუ არა დაზღვევებთან?",
      a: "ვიღებთ GPI-ს, Aldagi-ს, IMEDI L-ს, Ardi-ს და TBC Insurance-ს. მკურნალობის დაფარვა დამოკიდებულია თქვენი პოლისის პირობებზე — ჩაწერის დროს დახმარებას გაგიწევთ ადმინისტრატორი.",
    },
    {
      q: "შემიძლია თუ არა ჩანაწერების გატანა საზღვარგარეთ?",
      a: "დიახ. პაციენტის პორტალიდან შეგიძლიათ PDF ან DICOM ფაილის გადმოტვირთვა. ინგლისურ ენაზე თარგმნა ფასიანია — 20 GEL გვერდი.",
    },
    {
      q: "აქვთ თუ არა ფასდაკლება ოჯახური პაკეტისთვის?",
      a: "დიახ — თუ ოჯახი დაარეგისტრირებს ოთხ ან მეტ წევრს თერაპევტთან, ყოველი შემდგომი კონსულტაცია იანგარიშდება 15%-იანი ფასდაკლებით ერთი წლის განმავლობაში.",
    },
    {
      q: "შესაძლებელია თუ არა ვიდეო-კონსულტაცია?",
      a: "დიახ — ფსიქოთერაპია და თერაპევტის განმეორებითი ვიზიტები მზადდება უსაფრთხო ვიდეო პლატფორმაზე. პირველი ვიზიტი — ფიზიკურად.",
    },
  ],
  ru: [
    {
      q: "Нужно ли направление, чтобы попасть на приём?",
      a: "Нет. Medelite — амбулаторная клиника; вы можете записаться напрямую в любое отделение, без направления. Если хотите, чтобы терапевт ознакомился с вашим случаем заранее — сначала запишитесь к нему.",
    },
    {
      q: "Сколько длится первый визит?",
      a: "Первый визит в любом отделении рассчитан на 40 минут. Это время включает открытие файла, сбор анамнеза и составление плана. Повторные визиты — 25–30 минут.",
    },
    {
      q: "Работаете ли вы со страховыми компаниями?",
      a: "Принимаем GPI, Aldagi, IMEDI L, Ardi и TBC Insurance. Степень покрытия зависит от условий полиса — администратор поможет разобраться при записи.",
    },
    {
      q: "Могу ли я вывезти записи за границу?",
      a: "Да. Из личного кабинета можно скачать PDF или DICOM. Перевод на английский — платная услуга, 20 GEL за страницу.",
    },
    {
      q: "Есть ли скидка для семейного пакета?",
      a: "Да — если четыре и более членов семьи закреплены за одним терапевтом, каждая последующая консультация считается со скидкой 15% в течение года.",
    },
    {
      q: "Возможна ли видеоконсультация?",
      a: "Да — психотерапия и повторные приёмы у терапевта доступны на защищённой видеоплатформе. Первый визит — очно.",
    },
  ],
  en: [
    {
      q: "Do I need a referral to see a doctor?",
      a: "No. Medelite is an outpatient clinic — you can book directly into any department without a referral. If you'd prefer an internist to review your case first, start with them.",
    },
    {
      q: "How long is a first visit?",
      a: "Across every department, the first visit is scheduled for 40 minutes. That time covers opening the record, taking history and building a plan. Follow-ups are 25–30 minutes.",
    },
    {
      q: "Do you work with insurance?",
      a: "We work with GPI, Aldagi, IMEDI L, Ardi, and TBC Insurance. Coverage depends on your policy — our front desk will help you check it when you book.",
    },
    {
      q: "Can I take my records abroad?",
      a: "Yes. The patient portal lets you download PDF or DICOM files. English translation is a paid service — GEL 20 per page.",
    },
    {
      q: "Is there a family discount?",
      a: "Yes — if four or more family members register with the same internist, every subsequent consultation is 15% off for one year.",
    },
    {
      q: "Can I have a video consultation?",
      a: "Yes — psychotherapy and follow-up internist visits run on a secure video platform. The first visit is always in person.",
    },
  ],
};

// ------------------------------------------------------------
// Image library
// Real photography sourced from Unsplash (free, broadly licensed).
// Served through next/image with `images.remotePatterns` in next.config.ts.
// ------------------------------------------------------------

export type Photo = { src: string; alt: L<string> };

const unsplash = (id: string, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=65&auto=format&fit=crop`;

export const serviceImages: Record<string, Photo> = {
  cardiology: {
    src: unsplash("1559757148-5c350d0d3c56"),
    alt: {
      ka: "კარდიოლოგის ხელი სტეტოსკოპით",
      ru: "Руки кардиолога со стетоскопом",
      en: "A cardiologist's hand with a stethoscope",
    },
  },
  "general-medicine": {
    src: unsplash("1584982751601-97dcc096659c"),
    alt: {
      ka: "თერაპევტი პაციენტთან მშვიდ კონსულტაციაში",
      ru: "Терапевт в тихой консультации с пациентом",
      en: "An internist in quiet consultation",
    },
  },
  dermatology: {
    src: unsplash("1570172619644-dfd03ed5d881"),
    alt: {
      ka: "დერმატოლოგიური ოთახი",
      ru: "Дерматологический кабинет",
      en: "A dermatology treatment room",
    },
  },
  gynaecology: {
    src: unsplash("1584515933487-779824d29309"),
    alt: {
      ka: "გინეკოლოგის კონსულტაციის ოთახი",
      ru: "Кабинет гинеколога",
      en: "A gynaecology consultation room",
    },
  },
  paediatrics: {
    src: unsplash("1503676260728-1c00da094a0b"),
    alt: {
      ka: "პედიატრია — ბავშვი ვიზიტზე",
      ru: "Педиатрия — ребёнок на приёме",
      en: "Paediatrics — a child at a visit",
    },
  },
  dentistry: {
    src: unsplash("1606811971618-4486d14f3f99"),
    alt: {
      ka: "სტომატოლოგიური კაბინეტი",
      ru: "Стоматологический кабинет",
      en: "A dental surgery",
    },
  },
  neurology: {
    src: unsplash("1559757175-5700dde675bc"),
    alt: {
      ka: "ნევროლოგია — ფილტრი და ტვინის ვიზუალიზაცია",
      ru: "Неврология — визуализация мозга",
      en: "Neurology — brain imaging",
    },
  },
  orthopaedics: {
    src: unsplash("1583416750470-965b2707b355"),
    alt: {
      ka: "ორთოპედიული კონსულტაცია",
      ru: "Ортопедическая консультация",
      en: "Orthopaedic consultation",
    },
  },
  endocrinology: {
    src: unsplash("1559757175-5700dde675bc"),
    alt: {
      ka: "ენდოკრინოლოგის პანელი",
      ru: "Эндокринологический кабинет",
      en: "Endocrinology suite",
    },
  },
  imaging: {
    src: unsplash("1631815588090-d4bfec5b1ccb"),
    alt: {
      ka: "MR სუიტი კლინიკაში",
      ru: "МР-кабинет клиники",
      en: "Clinic MR suite",
    },
  },
  ophthalmology: {
    src: unsplash("1586015555751-63bb77f4322a"),
    alt: {
      ka: "ოფთალმოლოგიური აპარატურა",
      ru: "Офтальмологическая аппаратура",
      en: "Ophthalmology equipment",
    },
  },
  psychology: {
    src: unsplash("1573497019940-1c28c88b4f3e"),
    alt: {
      ka: "ფსიქოთერაპიის მშვიდი ოთახი",
      ru: "Тихий кабинет психотерапии",
      en: "A quiet therapy room",
    },
  },
  urology: {
    src: unsplash("1532938911079-1b06ac7ceec7"),
    alt: {
      ka: "უროლოგის კონსულტაცია",
      ru: "Консультация уролога",
      en: "Urology consultation",
    },
  },
  "ent-otolaryngology": {
    src: unsplash("1571772805064-207c8435df79"),
    alt: {
      ka: "LOR პანელი",
      ru: "ЛОР-кабинет",
      en: "ENT examination",
    },
  },
  gastroenterology: {
    src: unsplash("1579684385127-1ef15d508118"),
    alt: {
      ka: "გასტროენტეროლოგია",
      ru: "Гастроэнтерология",
      en: "Gastroenterology",
    },
  },
  pulmonology: {
    src: unsplash("1584362917165-526a968579e8"),
    alt: {
      ka: "პულმონოლოგიის ოთახი",
      ru: "Пульмонологический кабинет",
      en: "Pulmonology room",
    },
  },
  physiotherapy: {
    src: unsplash("1571019614242-c5c5dee9f50b"),
    alt: {
      ka: "ფიზიოთერაპიის ოთახი",
      ru: "Зал физиотерапии",
      en: "Physiotherapy studio",
    },
  },
  nutrition: {
    src: unsplash("1490645935967-10de6ba17061"),
    alt: {
      ka: "დიეტოლოგის სადესერტო",
      ru: "Диетолог — свежие продукты",
      en: "Nutrition — fresh produce",
    },
  },
};

export const doctorImages: Record<string, Photo> = {
  kiknadze: {
    src: unsplash("1594824476967-48c8b964273f", 900),
    alt: {
      ka: "ნინო კიკნაძე, კარდიოლოგი",
      ru: "Нино Кикнадзе, кардиолог",
      en: "Nino Kiknadze, cardiologist",
    },
  },
  beridze: {
    src: unsplash("1612349317150-e413f6a5b16d", 900),
    alt: {
      ka: "გიორგი ბერიძე, თერაპევტი",
      ru: "Георгий Беридзе, терапевт",
      en: "Giorgi Beridze, internist",
    },
  },
  tsereteli: {
    src: unsplash("1559839734-2b71ea197ec2", 900),
    alt: {
      ka: "მარიამ წერეთელი, დერმატოლოგი",
      ru: "Мариам Церетели, дерматолог",
      en: "Mariam Tsereteli, dermatologist",
    },
  },
  chanturia: {
    src: unsplash("1537368910025-700350fe46c7", 900),
    alt: {
      ka: "დავით ჩანტურია, ნევროლოგი",
      ru: "Давид Чантурия, невролог",
      en: "Davit Chanturia, neurologist",
    },
  },
  chikovani: {
    src: unsplash("1551884170-09fb70a3a2ed", 900),
    alt: {
      ka: "თამარ ჩიქოვანი, გინეკოლოგი",
      ru: "Тамара Чиковани, гинеколог",
      en: "Tamar Chikovani, gynaecologist",
    },
  },
  shubladze: {
    src: unsplash("1622253692010-333f2da6031d", 900),
    alt: {
      ka: "ლევან შუბლაძე, ორთოპედი",
      ru: "Леван Шубладзе, ортопед",
      en: "Levan Shubladze, orthopaedic surgeon",
    },
  },
  jorbenadze: {
    src: unsplash("1527613426441-4da17471b66d", 900),
    alt: {
      ka: "ეკატერინე ჯორბენაძე, ენდოკრინოლოგი",
      ru: "Екатерина Джорбенадзе, эндокринолог",
      en: "Eka Jorbenadze, endocrinologist",
    },
  },
  metreveli: {
    src: unsplash("1551836022-d5d88e9218df", 900),
    alt: {
      ka: "ნიკა მეტრეველი, სტომატოლოგი",
      ru: "Ника Метревели, стоматолог",
      en: "Nika Metreveli, dentist",
    },
  },
  pataridze: {
    src: unsplash("1612531386530-97286d97c2d2", 900),
    alt: {
      ka: "სოფიო პატარიძე, პედიატრი",
      ru: "София Патаридзе, педиатр",
      en: "Sofio Pataridze, paediatrician",
    },
  },
  kvaratskhelia: {
    src: unsplash("1550831107-1553da8c8464", 900),
    alt: {
      ka: "რეზო კვარაცხელია, ოფთალმოლოგი",
      ru: "Резо Кварацхелия, офтальмолог",
      en: "Rezo Kvaratskhelia, ophthalmologist",
    },
  },
  gelashvili: {
    src: unsplash("1584467735815-f778f274e296", 900),
    alt: {
      ka: "ირაკლი გელაშვილი, უროლოგი",
      ru: "Ираклий Гелашвили, уролог",
      en: "Irakli Gelashvili, urologist",
    },
  },
  rusieshvili: {
    src: unsplash("1535025183041-0991a977e25b", 900),
    alt: {
      ka: "ანა რუსიეშვილი, LOR ექიმი",
      ru: "Ана Русиешвили, ЛОР-врач",
      en: "Ana Rusieshvili, ENT doctor",
    },
  },
  tabatadze: {
    src: unsplash("1582750433449-648ed127bb54", 900),
    alt: {
      ka: "ზურაბ ტაბატაძე, გასტროენტეროლოგი",
      ru: "Зураб Табатадзе, гастроэнтеролог",
      en: "Zurab Tabatadze, gastroenterologist",
    },
  },
  lomidze: {
    src: unsplash("1577962917302-cd874c4e31d2", 900),
    alt: {
      ka: "ეკა ლომიძე, ფიზიოთერაპევტი",
      ru: "Эка Ломидзе, физиотерапевт",
      en: "Eka Lomidze, physiotherapist",
    },
  },
};

export const newsImages: Record<string, Photo> = {
  "autumn-screening-programme": {
    src: unsplash("1559757148-5c350d0d3c56"),
    alt: {
      ka: "სტეტოსკოპი და მედიცინა",
      ru: "Стетоскоп и медицина",
      en: "Stethoscope and medicine",
    },
  },
  "new-mri-suite": {
    src: unsplash("1631815588090-d4bfec5b1ccb"),
    alt: {
      ka: "MR აპარატი",
      ru: "МРТ-аппарат",
      en: "MRI scanner",
    },
  },
  "esc-barcelona": {
    src: unsplash("1540575467063-178a50c2df87"),
    alt: {
      ka: "კონგრესის აუდიტორია",
      ru: "Зал конференции",
      en: "Conference hall",
    },
  },
  "ucl-partnership": {
    src: unsplash("1532094349884-543bc11b234d"),
    alt: {
      ka: "კვლევითი ლაბორატორია",
      ru: "Исследовательская лаборатория",
      en: "Research laboratory",
    },
  },
  "winter-wellness": {
    src: unsplash("1506784365847-bbad939e9335"),
    alt: {
      ka: "ზამთრის ფანჯარა",
      ru: "Зимнее окно",
      en: "A winter window",
    },
  },
  "patient-story-bypass": {
    src: unsplash("1507003211169-0a1dd7228f2d"),
    alt: {
      ka: "ფეხის სიარული ტბილისში",
      ru: "Прогулка в Тбилиси",
      en: "A walk in Tbilisi",
    },
  },
  "pharmacy-behind-the-scenes": {
    src: unsplash("1587854692152-cbe660dbde88"),
    alt: {
      ka: "აფთიაქის სტელაჟი",
      ru: "Полки аптеки",
      en: "Pharmacy shelves",
    },
  },
  "heart-month": {
    src: unsplash("1518152006812-edab29b069ac"),
    alt: {
      ka: "გულის სიმბოლო",
      ru: "Символ сердца",
      en: "A heart motif",
    },
  },
  "paediatric-wing-opening": {
    src: unsplash("1503676260728-1c00da094a0b"),
    alt: {
      ka: "ბავშვთა განყოფილება",
      ru: "Детское отделение",
      en: "The paediatric wing",
    },
  },
  "nutrition-programme-spring": {
    src: unsplash("1490645935967-10de6ba17061"),
    alt: {
      ka: "სეზონური ხილი",
      ru: "Сезонные фрукты",
      en: "Seasonal produce",
    },
  },
  "telemedicine-launch": {
    src: unsplash("1588776814546-1ffcf47267a5"),
    alt: {
      ka: "ვიდეო კონსულტაცია",
      ru: "Видео-консультация",
      en: "Video consultation",
    },
  },
  "annual-report-2026": {
    src: unsplash("1554224155-6726b3ff858f"),
    alt: {
      ka: "ანგარიში და მონაცემები",
      ru: "Отчёт и данные",
      en: "Report and data",
    },
  },
};

export const facilityPhotos: Photo[] = [
  {
    src: unsplash("1587351021355-a479a299d2f9"),
    alt: {
      ka: "კლინიკის ფოიე, ბუნებრივი შუქი",
      ru: "Фойе клиники, естественный свет",
      en: "The clinic foyer, natural light",
    },
  },
  {
    src: unsplash("1629909613654-28e377c37b09"),
    alt: {
      ka: "კონსულტაციის ოთახი",
      ru: "Кабинет консультации",
      en: "Consultation room",
    },
  },
  {
    src: unsplash("1538108149393-fbbd81895907"),
    alt: {
      ka: "ექიმის სამუშაო მაგიდა",
      ru: "Рабочее место врача",
      en: "A doctor's desk",
    },
  },
  {
    src: unsplash("1631217868264-e5b90bb7e133"),
    alt: {
      ka: "სამედიცინო პრეპარაცია",
      ru: "Медицинская подготовка",
      en: "Clinical preparation",
    },
  },
  {
    src: unsplash("1666214280557-f1b5022eb634"),
    alt: {
      ka: "ფოიეს კორიდორი",
      ru: "Коридор клиники",
      en: "The clinic hallway",
    },
  },
  {
    src: unsplash("1551601651-2a8555f1a136"),
    alt: {
      ka: "დიაგნოსტიკური აპარატურა",
      ru: "Диагностическое оборудование",
      en: "Diagnostic equipment",
    },
  },
];

export const heroPhoto: Photo = {
  src: unsplash("1629909613654-28e377c37b09", 1600),
  alt: {
    ka: "Medelite — მდუმარე სივრცე, ბუნებრივი შუქი",
    ru: "Medelite — тихое пространство, естественный свет",
    en: "Medelite — a quiet space, natural light",
  },
};

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getNews(slug: string): NewsPost | undefined {
  return news.find((n) => n.slug === slug);
}

export function getServicePhoto(slug: string): Photo | undefined {
  return serviceImages[slug];
}

export function getDoctorPhoto(slug: string): Photo | undefined {
  return doctorImages[slug];
}

export function getNewsPhoto(slug: string): Photo | undefined {
  return newsImages[slug];
}

export function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  return d.toLocaleDateString(
    locale === "ka" ? "ka-GE" : locale === "ru" ? "ru-RU" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

export function isLocale(value: string): value is Locale {
  return value === "ka" || value === "ru" || value === "en";
}
