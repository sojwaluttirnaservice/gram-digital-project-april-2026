let goodThoughts = [
    {mr: "एकत्र राहणे म्हणजे शक्ती असणे.", en: "Unity is strength.", hi: "एकता में शक्ति होती है।"},
    {mr: "सकारात्मक विचार आपल्या जीवनाला उज्ज्वल करतात.", en: "Positive thoughts brighten our life.", hi: "सकारात्मक विचार जीवन को उज्ज्वल बनाते हैं।"},
    {mr: "छोट्या बदलांमुळे मोठे परिणाम होऊ शकतात.", en: "Small changes can create big impacts.", hi: "छोटे बदलाव बड़े परिणाम ला सकते हैं।"},
    {mr: "आपले गाव म्हणजे आपली जबाबदारी.", en: "Our village is our responsibility.", hi: "हमारा गाँव हमारी ज़िम्मेदारी है।"},
    {mr: "प्रकृतीशी सुसंगत राहणे ही खरी संपन्नता आहे.", en: "Living in harmony with nature is true prosperity.", hi: "प्रकृति के साथ सामंजस्य में रहना ही सच्ची समृद्धि है।"},

    {mr: "स्वच्छता हे आरोग्याचे मूळ आहे.", en: "Cleanliness is the foundation of health.", hi: "स्वच्छता स्वास्थ्य की नींव है।"},
    {mr: "शिक्षण हे प्रत्येक बदलाची सुरुवात आहे.", en: "Education is the beginning of every change.", hi: "शिक्षा हर बदलाव की शुरुआत है।"},
    {mr: "एकत्र काम केल्यास अडचणी सोप्या होतात.", en: "Working together makes challenges easier.", hi: "मिलकर काम करने से चुनौतियाँ आसान हो जाती हैं।"},
    {mr: "सहकार्य हे विकासाचे मुख्य साधन आहे.", en: "Cooperation is the main tool of development.", hi: "सहयोग विकास का मुख्य साधन है।"},
    {mr: "आपल्या परंपरांचा आदर करा.", en: "Respect your traditions.", hi: "अपनी परंपराओं का सम्मान करें।"},

    {mr: "नवीन कल्पना स्वीकारल्याने प्रगती होते.", en: "Embracing new ideas brings progress.", hi: "नई विचारों को स्वीकार करने से प्रगति होती है।"},
    {mr: "सकारात्मक ऊर्जा प्रसारित करा.", en: "Spread positive energy.", hi: "सकारात्मक ऊर्जा फैलाएँ।"},
    {mr: "स्वतःवर विश्वास ठेवा.", en: "Believe in yourself.", hi: "अपने आप पर विश्वास रखें।"},
    {mr: "सर्वांचा विकास म्हणजे खरा विकास.", en: "Development of all is true development.", hi: "सबका विकास ही सच्चा विकास है।"},
    {mr: "आपले निर्णय पुढील पिढीसाठी मार्गदर्शक असतात.", en: "Your decisions guide the next generation.", hi: "आपके निर्णय अगली पीढ़ी का मार्गदर्शन करते हैं।"},

    {mr: "सकारात्मक बदल हळूहळू घडतात.", en: "Positive change happens gradually.", hi: "सकारात्मक बदलाव धीरे-धीरे होते हैं।"},
    {mr: "आपल्या गावाचे सौंदर्य जपणे आपली जबाबदारी आहे.", en: "Preserving the beauty of our village is our duty.", hi: "अपने गाँव की सुंदरता को बनाए रखना हमारी ज़िम्मेदारी है।"},
    {mr: "सामाजिक बंध मजबूत ठेवणे महत्त्वाचे आहे.", en: "Strengthening social bonds is important.", hi: "सामाजिक रिश्तों को मजबूत रखना महत्वपूर्ण है।"},
    {mr: "चांगल्या सवयींचा प्रसार करा.", en: "Promote good habits.", hi: "अच्छी आदतों का प्रसार करें।"},
    {mr: "एक चांगला विचार अनेक लोकांना प्रेरणा देतो.", en: "One good thought inspires many people.", hi: "एक अच्छा विचार कई लोगों को प्रेरित करता है।"},

    {mr: "सामुहिक मेहनत म्हणजे सामर्थ्य.", en: "Collective effort is strength.", hi: "सामूहिक मेहनत ही शक्ति है।"},
    {mr: "सकारात्मक दृष्टीकोन जीवन बदलतो.", en: "A positive outlook changes life.", hi: "सकारात्मक दृष्टिकोण जीवन बदल देता है।"},
    {mr: "शांतता आणि संयम हे यशाची गुरुकिल्ली आहेत.", en: "Peace and patience are keys to success.", hi: "शांति और संयम सफलता की कुंजी हैं।"},
    {mr: "आपल्या मुलांना चांगले मूल्य शिकवा.", en: "Teach good values to our children.", hi: "अपने बच्चों को अच्छे मूल्य सिखाएँ।"},
    {mr: "प्रकृतीचे रक्षण ही नागरिकाची जबाबदारी आहे.", en: "Protecting nature is every citizen's duty.", hi: "प्रकृति की रक्षा करना हर नागरिक का कर्तव्य है।"},

    {mr: "सहिष्णुता समाजात ऐक्य वाढवते.", en: "Tolerance increases unity in society.", hi: "सहिष्णुता समाज में एकता बढ़ाती है।"},
    {mr: "एक चांगला सवय आपले जीवन बदलते.", en: "A good habit changes your life.", hi: "एक अच्छी आदत आपका जीवन बदल देती है।"},
    {mr: "समाजातील प्रत्येक व्यक्ती महत्त्वाची आहे.", en: "Every person in society is important.", hi: "समाज में हर व्यक्ति महत्वपूर्ण है।"},
    {mr: "आपले आरोग्य आपले खरं धन आहे.", en: "Your health is your true wealth.", hi: "आपका स्वास्थ्य ही आपका असली धन है।"},
    {mr: "सकारात्मक दृष्टिकोन कठीण प्रसंग सुलभ करतो.", en: "A positive attitude makes tough situations easier.", hi: "सकारात्मक दृष्टिकोण कठिन परिस्थितियों को आसान बनाता है।"},

    {mr: "एकत्र काम करून समाज सुधारला जाऊ शकतो.", en: "Society can improve by working together.", hi: "मिलकर काम करने से समाज सुधर सकता है।"},
    {mr: "सकारात्मक ऊर्जा प्रसारित करा.", en: "Spread positive energy.", hi: "सकारात्मक ऊर्जा फैलाएँ।"},
];

module.exports = goodThoughts;
