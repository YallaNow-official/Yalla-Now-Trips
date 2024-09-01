import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

export const supportedLngs = {
    en: 'English',
    ar: 'Arabic (العربية)',
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: Object.keys(supportedLngs),
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    home: {
                        hero_title: 'Discover the beauty of Egypt',
                        hero_text:
                            'Book your adventure today to discover the beauty and rich history of Egypt with yalla now. and make memories that will last a lifetime.',
                        search_place_placeholder: 'Where are you going?',
                        booking_type_placeholder: 'Booking Type',
                        search_button: 'Search',
                        inspirations_title:
                            'Get inspiration for your next trip',
                        offers_title: 'Offers',
                        banner_subtitle: 'Yalla now mobile application',
                        banner_title: 'upcoming Soon',
                    },
                    common: {
                        see_all: 'See all',
                        inspirations_not_found: 'No inspirations found',
                        trips_not_found: 'No trips found',
                        trips_title: 'Popular trips',
                        tours_title: 'Popular tours',
                        about_us: 'About Us',
                        home: 'Home',
                        yalla_now: 'Yalla Now',
                        contact_soon:
                            'Please enter your information and we will contact you soon.',
                        hotels: 'Hotels',
                        transportation: 'Transportation',
                        airplane: 'Airplane',
                        contact_us: 'Contact us',
                        trips: 'Trips',
                        tours: 'Tours',
                    },
                    contact: {
                        contact_label: 'Contact',
                        get_in_touch: 'Get in touch with us',
                        your_name_placeholder: 'Your name*',
                        email_placeholder: 'Email*',
                        phone_placeholder: 'Phone Number*',
                        city_placeholder: 'City*',
                        message_placeholder: 'Your Message',
                        submit_button: 'Submit Message',
                        banner_text:
                            "We're here to help you make the most of your to Egypt! Whether you have questions, need assistance with planning your trip, or want to learn more about our services, our team is ready to assist you.",
                    },
                    about: {
                        banner_text:
                            'Welcome to Yalla Now, your gateway to the wonders of Egypt! We are passionate about sharing the beauty, history, and culture of this ancient land with travelers from around the world. Our',
                        about_text: {
                            first: "Welcome to Yalla Now, your gateway to the wonders of Egypt! We are passionate about sharing the beauty, history, and culture of this ancient land with travelers from around the world. Our mission is to provide you with unforgettable experiences, whether you are exploring Egypt's famous landmarks, relaxing in luxurious hotels, or embarking on the adventure of a lifetime.",
                            second: 'With years of experience in the travel industry, we offer a wide range of services, custom trip planning, convenient transportation options, and exclusive offers. Our dedicated team is committed to making your trip as smooth and enjoyable as possible, taking care of all the details so you can focus on creating lasting memories.',
                            third: 'Let us be your trusted partner in discovering the magic of Egypt, designed according to your unique interests and preferences.',
                            fourth: 'Join us to explore the treasures of Egypt—your adventure awaits!',
                        },
                    },
                    trip_planner: {
                        title: 'Trip Planner',
                        banner_text:
                            "Plan your dream trip with ease using our Trip Planner. Customize your itinerary, select your preferred destinations, and let us handle the details to create a personalized travel experience that's perfectly tailored to your interests.",
                    },
                    hotels: {
                        banner_title: 'Yalla Now Hotels',
                        banner_text:
                            "Find the perfect accommodation for your stay in Egypt. Whether you're looking for luxury, comfortable or budget-friendly options, we'll offer something to suit every traveler's tastes and needs.",
                        title: 'Book your fav hotel now',
                    },
                    transportation: {
                        banner_title: 'Yalla now transportation',
                        banner_text:
                            'Enjoy our transportation services. We offer a variety of options, including private transportation to move from any place to another easily and conveniently with the transportation service provided by Yalla Now for your convenience.',
                    },
                    airplane: {
                        banner_title: 'Yalla Now Airplane',
                        banner_text:
                            'Book your flights easily with Yalla Now, which is easy to use. We will provide access to a wide range of airlines and routes, helping you find the best deals and timetables for your flight to and from Egypt.',
                    },
                    form: {
                        name_label: 'Name',
                        number_label: 'Number',
                        country_label: 'Country',
                        city_label: 'City',
                        start_date_label: 'Start Date',
                        end_date_label: 'End Date',
                        budget_label: 'Budget',
                        number_of_adults_label: 'Number of Adults',
                        number_of_kids_label: 'Number of Kids',
                        number_of_juniors_label: 'Number of Juniors',
                        activity_preferences_label: 'Activity Preferences',
                        area_name_label: 'Area Name',
                        nationality_label: 'Nationality',
                        from_label: 'From',
                        to_label: 'To',
                        time_label: 'Time',
                        car_type_label: 'Car Type',
                        type_label: 'Type',
                        email_label: 'Email',
                        preferred_categories_label: 'Preferred Categories',
                        placeholder_name: 'name',
                        placeholder_number: 'Number',
                        placeholder_country: 'Country',
                        placeholder_city: 'City',
                        placeholder_budget: 'Budget',
                        placeholder_area_name: 'location',
                        placeholder_nationality: 'Nationality',
                        placeholder_location: 'Location',
                        placeholder_other: 'Other',
                        placeholder_email: 'Email',
                        submit_button_text: 'Submit',
                    },
                    footer: {
                        quick_links: 'Quick Links',
                        help: 'Help',
                        follow_us: 'Follow us',
                    },
                    details: {
                        tour: 'Tour Details',
                        trip: 'Trip Details',
                        overview: 'Overview',
                        program: 'Program',
                        guest_reviews: 'Guest Reviews',
                        take_with_you: 'Take with you',
                        include: 'Include',
                        not_include: 'Not Include',
                        duration: 'Duration',
                        days: 'days',
                        star_rating: 'Star Rating',
                        book_now: 'Book Now',
                        day: 'Day',
                        similar_tours: 'Similar Tours',
                        similar_trips: 'Similar Trips',
                        reviews: 'Reviews',
                        customer_reviews: 'Customer Reviews',
                    },
                    booking: {
                        title: 'Booking',
                        summary: 'Booking Summary',
                        total: 'Total',
                        sub_total: 'Sub Total',
                        discount: 'Discount',
                        book: 'Book',
                    },
                    not_found: {
                        text: "We can't find that page.",
                        back_to_home: 'Back to Home',
                        tours: 'No tours found',
                        trips: 'No trips found',
                        inspirations: 'No inspirations found',
                    },
                    filter: {
                        country: 'Country',
                        all_countries: 'All Countries',
                        rating: 'Rating',
                        price_range: 'Price Range',
                        all_prices: 'All Prices',
                        min_price: 'Min price',
                        max_price: 'Max price',
                        booking_type: 'Booking Type',
                        all_types: 'All Types',
                        activities: 'Activities',
                        all_activities: 'All Activities',
                        rating_subtitle: 'Show only rating more than',
                    },
                    auth: {
                        sign_in: 'Sign In',
                        sign_up: 'Sign Up',
                        sign_in_small: 'Sign in',
                        email: 'Email Address',
                        password: 'Password',
                        forgot_password: 'Forgot Password',
                        google_login: 'Login with Google',
                        google_signup: 'Sign up with Google',
                        first_name: 'First Name',
                        last_name: 'Last Name',
                        username: 'Username',
                        phone_number: 'Phone Number',
                        gender: 'Gender',
                        or: 'or',
                    },
                    success: {
                        contact: 'Your message has been sent successfully',
                        review_submitted: 'Review submitted successfully',
                        request_booking:
                            'Your request has been submitted successfully',
                        booking: 'Booking submitted successfully',
                        hotel: 'Your booking has been submitted successfully',
                        login: 'Login successful',
                        register: 'Account created successfully',
                    },
                    error: {
                        invalid_data: 'Invalid data, please try again',
                        unauthorized: 'You need to login first',
                        something_wrong:
                            'Something went wrong, please try again later',
                        unexpected_error: 'An unexpected error occurred',
                        trip_not_found: 'Trip not found',
                        error_occurred:
                            'An error occurred, please try again later',
                        internal_server_error:
                            'Internal server error, please try again later',
                    },
                },
            },
            ar: {
                translation: {
                    home: {
                        hero_title: 'اكتشف جمال مصر',
                        hero_text:
                            'احجز مغامرتك اليوم لاكتشاف جمال وتاريخ مصر الغني مع يلا ناو. واصنع ذكريات ستدوم مدى الحياة.',
                        search_place_placeholder: 'أين تذهب؟',
                        booking_type_placeholder: 'نوع الحجز',
                        search_button: 'بحث',
                        inspirations_title: 'احصل على إلهام لرحلتك القادمة',
                        offers_title: 'عروض',
                        banner_subtitle: 'تطبيق يلا ناو المحمول',
                        banner_title: 'قريبًا',
                    },
                    common: {
                        see_all: 'شاهد الكل',
                        inspirations_not_found: 'لم يتم العثور على إلهام',
                        trips_not_found: 'لم يتم العثور على رحلات',
                        trips_title: 'رحلات شعبية',
                        tours_title: 'جولات شعبية',
                        about_us: 'من نحن',
                        home: 'الرئيسية',
                        yalla_now: 'يلا ناو',
                        contact_soon: 'الرجاء إدخال معلوماتك وسنتصل بك قريبًا.',
                        hotels: 'فنادق',
                        transportation: 'نقل',
                        airplane: 'طائرة',
                        contact_us: 'اتصل بنا',
                        trips: 'رحلات',
                        tours: 'جولات',
                    },
                    contact: {
                        contact_label: 'اتصل',
                        get_in_touch: 'تواصل معنا',
                        your_name_placeholder: 'اسمك*',
                        email_placeholder: 'البريد الإلكتروني*',
                        phone_placeholder: 'رقم الهاتف*',
                        city_placeholder: 'المدينة*',
                        message_placeholder: 'رسالتك',
                        submit_button: 'إرسال الرسالة',
                        banner_text:
                            'نحن هنا لمساعدتك في الاستفادة القصوى من رحلتك إلى مصر! سواء كان لديك أسئلة، أو تحتاج إلى مساعدة في تخطيط رحلتك، أو ترغب في معرفة المزيد عن خدماتنا، فإن فريقنا جاهز لمساعدتك.',
                    },
                    about: {
                        banner_text:
                            'مرحبًا بكم في يلا ناو، بوابتك إلى عجائب مصر! نحن متحمسون لمشاركة جمال وتاريخ وثقافة هذه الأرض العريقة مع المسافرين من جميع أنحاء العالم.',
                        about_text: {
                            first: 'مرحبًا بكم في يلا ناو، بوابتك إلى عجائب مصر! نحن متحمسون لمشاركة جمال وتاريخ وثقافة هذه الأرض العريقة مع المسافرين من جميع أنحاء العالم. مهمتنا هي أن نقدم لك تجارب لا تُنسى، سواء كنت تستكشف المعالم الشهيرة في مصر، أو تسترخي في فنادق فاخرة، أو تنطلق في مغامرة العمر.',
                            second: 'مع سنوات من الخبرة في صناعة السفر، نقدم مجموعة واسعة من الخدمات، تخطيط رحلات مخصص، خيارات نقل مريحة، وعروض حصرية. فريقنا المخلص ملتزم بجعل رحلتك سلسة وممتعة قدر الإمكان، حيث نتولى جميع التفاصيل لتتمكن من التركيز على خلق ذكريات تدوم.',
                            third: 'دعنا نكون شريكك الموثوق في اكتشاف سحر مصر، مصممًا وفقًا لاهتماماتك وتفضيلاتك الفريدة.',
                            fourth: 'انضم إلينا لاستكشاف كنوز مصر— مغامرتك في انتظارك!',
                        },
                    },
                    trip_planner: {
                        title: 'مخطط الرحلة',
                        banner_text:
                            'خطط لرحلتك الحلم بسهولة باستخدام مخطط الرحلات الخاص بنا. خصص جدول رحلتك، اختر وجهاتك المفضلة، ودعنا نتولى التفاصيل لنخلق لك تجربة سفر شخصية مصممة تمامًا وفق اهتماماتك.',
                    },
                    hotels: {
                        banner_title: 'فنادق يلا ناو',
                        banner_text:
                            'استمتع بخدمات النقل لدينا. نقدم مجموعة متنوعة من الخيارات، بما في ذلك وسائل النقل الخاصة للتنقل من أي مكان إلى آخر بسهولة وراحة مع خدمة النقل المقدمة من يلا ناو لراحتك.',
                        title: 'احجز فندقك المفضل الآن',
                    },
                    transportation: {
                        banner_title: 'نقل يلا ناو',
                        banner_text:
                            'استمتع بخدمات النقل لدينا. نقدم مجموعة متنوعة من الخيارات، بما في ذلك وسائل النقل الخاصة للتنقل من أي مكان إلى آخر بسهولة وراحة مع خدمة النقل المقدمة من يلا ناو لراحتك.',
                    },
                    airplane: {
                        banner_title: 'طائرة يلا ناو',
                        banner_text:
                            'احجز رحلاتك بسهولة مع يلا ناو، الذي يسهل الاستخدام. سنقدم لك الوصول إلى مجموعة واسعة من شركات الطيران والمسارات، مما سيساعدك في العثور على أفضل العروض والجداول الزمنية لرحلتك إلى مصر ومن مصر.',
                    },
                    form: {
                        name_label: 'الاسم',
                        number_label: 'الرقم',
                        country_label: 'البلد',
                        city_label: 'المدينة',
                        start_date_label: 'تاريخ البدء',
                        end_date_label: 'تاريخ الانتهاء',
                        budget_label: 'الميزانية',
                        number_of_adults_label: 'عدد البالغين',
                        number_of_kids_label: 'عدد الأطفال',
                        number_of_juniors_label: 'عدد الشباب',
                        activity_preferences_label: 'تفضيلات النشاط',
                        area_name_label: 'اسم المنطقة',
                        nationality_label: 'الجنسية',
                        from_label: 'من',
                        to_label: 'إلى',
                        car_type_label: 'نوع السيارة',
                        time_label: 'الوقت',
                        type_label: 'النوع',
                        email_label: 'البريد الإلكتروني',
                        preferred_categories_label: 'الفئات المفضلة',
                        placeholder_name: 'الاسم',
                        placeholder_number: 'الرقم',
                        placeholder_country: 'البلد',
                        placeholder_city: 'المدينة',
                        placeholder_budget: 'الميزانية',
                        placeholder_area_name: 'الموقع',
                        placeholder_nationality: 'الجنسية',
                        placeholder_location: 'الموقع',
                        placeholder_other: 'أخرى',
                        placeholder_email: 'البريد الإلكتروني',
                        submit_button_text: 'إرسال',
                    },
                    footer: {
                        quick_links: 'روابط سريعة',
                        help: 'مساعدة',
                        follow_us: 'تابعنا',
                    },
                    details: {
                        tour: 'تفاصيل الجولة',
                        trip: 'تفاصيل الرحلة',
                        overview: 'نظرة عامة',
                        program: 'برنامج',
                        guest_reviews: 'آراء الضيوف',
                        take_with_you: 'خذ معك',
                        include: 'تشمل',
                        not_include: 'لا تشمل',
                        duration: 'المدة',
                        days: 'أيام',
                        star_rating: 'تقييم النجوم',
                        book_now: 'احجز الآن',
                        day: 'يوم',
                        similar_tours: 'جولات مماثلة',
                        similar_trips: 'رحلات مماثلة',
                        reviews: 'التقييمات',
                        customer_reviews: 'تقييمات العملاء',
                    },
                    booking: {
                        title: 'الحجز',
                        summary: 'ملخص الحجز',
                        total: 'الإجمالي',
                        sub_total: 'الإجمالي الفرعي',
                        discount: 'الخصم',
                        book: 'احجز',
                    },
                    not_found: {
                        text: 'لا يمكننا العثور على تلك الصفحة.',
                        back_to_home: 'العودة إلى الصفحة الرئيسية',
                        tours: 'لم يتم العثور على جولات',
                        trips: 'لم يتم العثور على رحلات',
                        inspirations: 'لم يتم العثور على إلهام',
                    },
                    filter: {
                        country: 'البلد',
                        all_countries: 'جميع البلدان',
                        rating: 'التقييم',
                        price_range: 'نطاق السعر',
                        all_prices: 'جميع الأسعار',
                        min_price: 'الحد الأدنى للسعر',
                        max_price: 'الحد الأقصى للسعر',
                        booking_type: 'نوع الحجز',
                        all_types: 'جميع الأنواع',
                        activities: 'الأنشطة',
                        all_activities: 'جميع الأنشطة',
                        rating_subtitle: 'إظهار التقييم الذي يزيد عن',
                    },
                    auth: {
                        sign_in: 'تسجيل الدخول',
                        sign_up: 'التسجيل',
                        sign_in_small: 'تسجيل الدخول',
                        email: 'البريد الإلكتروني',
                        password: 'كلمة المرور',
                        forgot_password: 'نسيت كلمة المرور',
                        google_login: 'تسجيل الدخول بحساب جوجل',
                        google_signup: 'التسجيل بحساب جوجل',
                        first_name: 'الاسم الأول',
                        last_name: 'الاسم الأخير',
                        username: 'اسم المستخدم',
                        phone_number: 'رقم الهاتف',
                        gender: 'الجنس',
                        or: 'أو',
                    },
                    success: {
                        contact: 'تم إرسال رسالتك بنجاح',
                        review_submitted: 'تم تقديم التقييم بنجاح',
                        request_booking: 'تم إرسال طلبك بنجاح',
                        booking: 'تم تقديم الحجز بنجاح',
                        hotel: 'تم تقديم حجزك بنجاح',
                        login: 'تم تسجيل الدخول بنجاح',
                        register: 'تم إنشاء الحساب بنجاح',
                    },
                    error: {
                        invalid_data:
                            'بيانات غير صالحة، يرجى المحاولة مرة أخرى',
                        unauthorized:
                            'يجب عليك تسجيل الدخول أولاً لتقديم تقييم',
                        something_wrong:
                            'حدث خطأ ما، يرجى المحاولة مرة أخرى في وقت لاحق',
                        unexpected_error: 'حدث خطأ غير متوقع',
                        trip_not_found: 'الرحلة غير موجودة',
                        error_occurred:
                            'حدث خطأ، يرجى المحاولة مرة أخرى في وقت لاحق',
                        internal_server_error:
                            'خطأ في الخادم الداخلي، يرجى المحاولة مرة أخرى في وقت لاحق',
                    },
                },
            },
        },
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
