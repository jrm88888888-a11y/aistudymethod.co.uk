#!/usr/bin/env python3
# Chunk 1: religious-studies true mismatches (9 stems)
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPECS = os.path.join(ROOT, 'adventures', '_specs')
BANKS = os.path.join(ROOT, 'evaluate', 'misconception-banks')

DATA = {
"religious-studies-gcse-ccea-christianity-through-a-study-of-the-gospel-of-matthew-mark-luke-adventure-1": {
 "concepts": [
  {"term": "Synoptic Gospels", "def": "Matthew, Mark and Luke are called synoptic because they share similar content, order and wording, presenting Jesus' ministry from a common viewpoint."},
  {"term": "Parable", "def": "A short story drawn from everyday life that Jesus used to teach a spiritual truth, such as the Sower or the Good Samaritan."},
  {"term": "Miracle", "def": "An event attributed to God's power in the Gospels, including healings, exorcisms and nature miracles such as Jesus calming the storm."},
  {"term": "Discipleship", "def": "The call to follow Jesus and live by his teaching; the Gospels show Jesus calling twelve disciples and demanding self-denial and service."},
  {"term": "Kingdom of God", "def": "The central theme of Jesus' preaching: God's rule breaking into the world, explained through parables such as the Mustard Seed."},
  {"term": "Passion narrative", "def": "The Gospel account of Jesus' final days: the Last Supper, arrest in Gethsemane, trials before the authorities, crucifixion and burial."}
 ],
 "mcqs": [
  {"q": "In the Gospels, what is a parable?", "options": [["A short everyday story teaching a spiritual truth", 1], ["An eyewitness report of a miracle", 0], ["A prayer recited in the synagogue", 0], ["A law taken from the Old Testament", 0]]},
  {"q": "Which of these is one of the Synoptic Gospels?", "options": [["Mark", 1], ["John", 0], ["Acts", 0], ["Revelation", 0]]},
  {"q": "According to the Synoptic Gospels, what did Peter declare at Caesarea Philippi?", "options": [["That Jesus is the Christ", 1], ["That Jesus should be baptised", 0], ["That the Temple would be rebuilt", 0], ["That Rome should be overthrown by force", 0]]},
  {"q": "At which event did Jesus share bread and wine with his disciples before his arrest?", "options": [["The Last Supper", 1], ["The Transfiguration", 0], ["The feeding of the five thousand", 0], ["The Sermon on the Mount", 0]]}
 ],
 "numericals": [{"q": "How many disciples did Jesus call into his closest group?", "answer": 12, "tolerance": 0, "unit": "disciples", "options": [12, 10, 7, 3]}],
 "bank": [
  {"q": "What is a parable?", "correct": "A short story from everyday life used by Jesus to teach a deeper spiritual truth, often about the Kingdom of God.", "misconception": "Parables are factual historical reports of events that actually happened.", "random_wrong": "A parable is a type of psalm sung in the Temple.", "why": "Students often read parables literally and miss the point: they are teaching stories whose meaning lies in the spiritual lesson, not in whether the events occurred."},
  {"q": "Why are Matthew, Mark and Luke called the Synoptic Gospels?", "correct": "Because they share much of the same content, order and wording, so they can be 'seen together' (syn-optic) and compared side by side.", "misconception": "They are called synoptic because the same author wrote all three.", "random_wrong": "Because they were the only Gospels accepted by the Roman Empire.", "why": "Students confuse literary similarity with common authorship; the term describes the shared perspective and overlapping material, not a single writer."},
  {"q": "What did Jesus teach about the Sabbath in the Synoptic Gospels?", "correct": "That 'the Sabbath was made for man, not man for the Sabbath' (Mark 2:27) — human need, such as healing, takes priority over rigid observance.", "misconception": "Jesus taught that Sabbath laws must never be broken for any reason.", "random_wrong": "Jesus abolished the idea of a day of rest entirely.", "why": "Students see Jesus' Sabbath conflicts as either total endorsement or total rejection of the law, missing his point that the Sabbath serves human wellbeing."}
 ]
},
"religious-studies-gcse-ccea-world-religions-judaism-islam-buddhism-hinduism-adventure-1": {
 "concepts": [
  {"term": "Covenant (Judaism)", "def": "The agreement between God and the Jewish people, made with Abraham and renewed with Moses at Sinai through the giving of the Torah."},
  {"term": "Torah", "def": "The first five books of the Hebrew Bible, Judaism's most sacred text, containing the mitzvot and read in synagogue from a handwritten scroll."},
  {"term": "Five Pillars (Islam)", "def": "The core duties of Muslim life: Shahadah (declaration of faith), Salah (prayer), Zakah (almsgiving), Sawm (fasting) and Hajj (pilgrimage)."},
  {"term": "Four Noble Truths (Buddhism)", "def": "The Buddha's teaching that life involves suffering, suffering arises from craving, craving can be ended, and the Eightfold Path leads to its end."},
  {"term": "Karma and samsara", "def": "In Hinduism and Buddhism, actions shape future rebirth within the cycle of samsara; liberation is called moksha in Hinduism and nirvana in Buddhism."},
  {"term": "Brahman (Hinduism)", "def": "The supreme reality in Hinduism, expressed through many deities such as Vishnu and Shiva, so many Hindus see one ultimate God behind many forms."}
 ],
 "mcqs": [
  {"q": "Which religion teaches the Four Noble Truths?", "options": [["Buddhism", 1], ["Judaism", 0], ["Islam", 0], ["Hinduism", 0]]},
  {"q": "What is the Torah?", "options": [["The first five books of the Hebrew Bible", 1], ["An Islamic law code", 0], ["A Hindu epic poem", 0], ["A Buddhist monastic rule", 0]]},
  {"q": "In Hinduism, what is moksha?", "options": [["Liberation from the cycle of rebirth", 1], ["An annual pilgrimage to the Ganges", 0], ["The festival of lights", 0], ["A food law", 0]]},
  {"q": "Which of these is one of the Five Pillars of Islam?", "options": [["Sawm — fasting during Ramadan", 1], ["Baptism", 0], ["Puja", 0], ["Keeping kosher", 0]]}
 ],
 "numericals": [{"q": "How many Pillars of Islam are there?", "answer": 5, "tolerance": 0, "unit": "pillars", "options": [5, 4, 6, 10]}],
 "bank": [
  {"q": "Is the Buddha worshipped as a creator god in Buddhism?", "correct": "No — the Buddha was a human teacher who attained enlightenment; Buddhists revere him as a guide rather than worshipping him as a creator god.", "misconception": "Buddhists worship the Buddha as the god who created the world.", "random_wrong": "The Buddha is the Hindu god of wisdom.", "why": "Students assume every religion centres on a creator god, but Buddhism is non-theistic at its core: the Buddha shows the path, he does not rule the universe."},
  {"q": "Is Hinduism simply the worship of many unrelated gods?", "correct": "No — many Hindus understand the various deities as expressions of one supreme reality, Brahman, so Hinduism can be seen as one ultimate divine behind many forms.", "misconception": "Hinduism is pure polytheism with millions of separate, unconnected gods.", "random_wrong": "Hindus worship only one god called Krishna and reject all others.", "why": "Students count deities and conclude polytheism, missing the widespread Hindu view that deities are manifestations of the one Brahman."},
  {"q": "Do Muslims worship Muhammad?", "correct": "No — Muslims worship Allah alone; Muhammad is honoured as the final prophet and messenger, but he is human and is never worshipped.", "misconception": "Muslims worship Muhammad in the way Christians worship Jesus.", "random_wrong": "Muhammad is the Arabic name Muslims use for God.", "why": "Students map the Christian model of a divine founder onto Islam, but Tawhid forbids worship of anyone or anything besides Allah."}
 ]
},
"religious-studies-gcse-edexcel-igcse-beliefs-about-deity-adventure-1": {
 "concepts": [
  {"term": "Monotheism", "def": "Belief in one God only; foundational to Christianity, Judaism and Islam, in contrast to polytheism, the belief in many gods."},
  {"term": "Omnipotence", "def": "The belief that God is all-powerful, able to do anything consistent with the divine nature, shown in creation and miracles."},
  {"term": "Omnibenevolence", "def": "The belief that God is all-loving and supremely good, caring for creation; questioned by the existence of evil and suffering."},
  {"term": "Transcendence and immanence", "def": "God is transcendent, existing beyond space and time, yet also immanent, present and active within the world and human lives."},
  {"term": "Trinity", "def": "The Christian belief that the one God exists as three persons — Father, Son and Holy Spirit — distinct yet united in one being."},
  {"term": "Revelation", "def": "God making the divine known to humans: general revelation through nature and conscience, and special revelation through scripture, prophets and religious experience."}
 ],
 "mcqs": [
  {"q": "What does it mean to describe God as omnipotent?", "options": [["All-powerful", 1], ["All-knowing", 0], ["Present everywhere", 0], ["All-loving", 0]]},
  {"q": "What does 'transcendent' mean when applied to God?", "options": [["Existing beyond space, time and the physical universe", 1], ["Limited by the laws of nature", 0], ["Identical with the physical universe", 0], ["Visible in human form today", 0]]},
  {"q": "Which term describes belief in one God?", "options": [["Monotheism", 1], ["Polytheism", 0], ["Atheism", 0], ["Agnosticism", 0]]},
  {"q": "Which of these is an example of special revelation?", "options": [["God speaking through scripture or a prophet", 1], ["Inferring a creator from the beauty of nature", 0], ["Reasoning that the universe had a cause", 0], ["Observing the regularity of the seasons", 0]]}
 ],
 "numericals": [{"q": "How many persons are there in the Christian Trinity?", "answer": 3, "tolerance": 0, "unit": "persons", "options": [3, 1, 2, 4]}],
 "bank": [
  {"q": "Does the doctrine of the Trinity mean Christians believe in three gods?", "correct": "No — the Trinity teaches one God in three persons (Father, Son, Holy Spirit), distinct in person but united in one being; Christianity remains monotheistic.", "misconception": "Christians believe in three separate gods.", "random_wrong": "The Trinity refers to the three wise men at Jesus' birth.", "why": "Students hear 'three persons' and conclude polytheism; the orthodox teaching insists the three persons share one divine essence."},
  {"q": "What is the difference between omnipotent and omniscient?", "correct": "Omnipotent means all-powerful; omniscient means all-knowing. They are distinct attributes of God, often listed together with omnibenevolence (all-loving).", "misconception": "Omnipotent means God knows everything that will happen.", "random_wrong": "Omnipotent means God exists only in heaven.", "why": "The similar Latin prefixes lead students to swap the meanings; exams frequently test these attribute definitions precisely."},
  {"q": "Can God be both transcendent and immanent?", "correct": "Yes — most theists hold both: God is beyond the universe (transcendent) yet also present and active within it (immanent), for example through answered prayer.", "misconception": "If God is transcendent and outside the universe, God cannot also act within the world.", "random_wrong": "Transcendent and immanent are two different gods in Christianity.", "why": "Students treat the two attributes as contradictory opposites that force a choice, but mainstream theology holds them together as complementary."}
 ]
},
"religious-studies-gcse-edexcel-igcse-sources-of-wisdom-authority-adventure-1": {
 "concepts": [
  {"term": "The Bible", "def": "The sacred text of Christianity, a library of law, history, prophecy, Gospels and letters; Christians differ over literal and liberal interpretation."},
  {"term": "The Qur'an", "def": "Islam's holiest book, believed by Muslims to be the direct word of Allah revealed to Muhammad, recited and studied in Arabic."},
  {"term": "The Torah", "def": "The first five books of the Hebrew Bible, the most authoritative scripture in Judaism, containing the commandments given to Moses."},
  {"term": "Church tradition and the Magisterium", "def": "For Catholics, the teaching authority of the Pope and bishops, which interprets scripture and tradition for the faithful."},
  {"term": "Conscience", "def": "The inner sense of right and wrong, regarded by many believers as a God-given guide that must be informed and followed."},
  {"term": "Religious leaders", "def": "Figures such as priests, imams and rabbis who teach, interpret scripture and guide their communities in worship and moral decisions."}
 ],
 "mcqs": [
  {"q": "For Catholics, which authority officially interprets scripture and tradition?", "options": [["The Magisterium — the Pope and bishops", 1], ["Each individual believer alone", 0], ["The local government", 0], ["University professors", 0]]},
  {"q": "How do Muslims regard the Qur'an?", "options": [["As the direct word of Allah revealed to Muhammad", 1], ["As a biography of Muhammad written centuries later", 0], ["As a translation of the Torah", 0], ["As a code of laws written by imams", 0]]},
  {"q": "What is the Torah?", "options": [["The first five books of the Hebrew Bible", 1], ["A commentary on the Talmud", 0], ["A Jewish prayer book", 0], ["A history of the rabbis", 0]]},
  {"q": "In religious ethics, conscience is often described as what?", "options": [["An inner, God-given sense of right and wrong", 1], ["A legal ruling issued by a court", 0], ["A tax paid to the church", 0], ["A pilgrimage undertaken once in a lifetime", 0]]}
 ],
 "numericals": [{"q": "How many books are in the Protestant Bible?", "answer": 66, "tolerance": 0, "unit": "books", "options": [66, 72, 39, 27]}],
 "bank": [
  {"q": "Do all Christians read the Bible literally?", "correct": "No — some Christians read it literally as the exact word of God, while liberal Christians treat parts as symbolic or shaped by human authors; interpretation varies widely.", "misconception": "Every Christian believes every word of the Bible is literally true.", "random_wrong": "Christians are forbidden from reading the Bible without a priest present.", "why": "Students generalise the fundamentalist position to all Christians, missing the spectrum from literalist to liberal interpretation that exam answers must acknowledge."},
  {"q": "Do Muslims believe Muhammad wrote the Qur'an?", "correct": "No — Muslims believe the Qur'an is the literal word of Allah revealed to Muhammad through the angel Jibril; Muhammad is the messenger, not the author.", "misconception": "Muhammad composed the Qur'an himself as a record of his own teachings.", "random_wrong": "The Qur'an was originally written in Latin and later translated into Arabic.", "why": "Students apply a human-author model of scripture to Islam, but Muslim belief in the Qur'an's divine authorship is exactly what gives it supreme authority."},
  {"q": "Is conscience always a reliable source of authority for believers?", "correct": "Many traditions teach conscience must be informed by scripture and church teaching first; Catholics, for example, must educate their conscience before following it.", "misconception": "Religious believers think any gut feeling counts as the voice of God.", "random_wrong": "Conscience is a written document kept by each church.", "why": "Students equate conscience with mere instinct, but religious ethics treats it as a faculty that needs forming through scripture, tradition and reason."}
 ]
},
"religious-studies-gcse-ocr-religion-philosophy-ethics-the-existence-of-god-adventure-1": {
 "concepts": [
  {"term": "Cosmological argument", "def": "Aquinas argued everything in the universe is caused, an infinite chain of causes is impossible, so there must be an uncaused First Cause: God."},
  {"term": "Teleological (design) argument", "def": "Paley's watchmaker analogy: just as a watch's complexity implies a watchmaker, the order and purpose in nature imply an intelligent designer."},
  {"term": "Ontological argument", "def": "Anselm defined God as 'that than which nothing greater can be conceived', arguing such a being must exist in reality, not only in the mind."},
  {"term": "Problem of evil", "def": "The existence of evil and suffering challenges belief in a God who is both all-powerful and all-loving, since such a God could and would prevent it."},
  {"term": "Religious experience", "def": "Visions, conversions and numinous experiences cited as personal evidence for God, though critics suggest psychological or physical explanations."},
  {"term": "Atheism and agnosticism", "def": "Atheism is the belief that no God exists; agnosticism holds that God's existence cannot be known or proven either way."}
 ],
 "mcqs": [
  {"q": "Paley's watchmaker analogy supports which argument for God's existence?", "options": [["The design (teleological) argument", 1], ["The cosmological argument", 0], ["The ontological argument", 0], ["The moral argument", 0]]},
  {"q": "Aquinas's First Cause argument is a version of which argument?", "options": [["The cosmological argument", 1], ["The design argument", 0], ["The ontological argument", 0], ["The argument from religious experience", 0]]},
  {"q": "The problem of evil challenges which two attributes of God?", "options": [["Omnipotence and omnibenevolence", 1], ["Transcendence and immanence", 0], ["Eternity and immutability", 0], ["Unity and simplicity", 0]]},
  {"q": "Who defined God as 'that than which nothing greater can be conceived'?", "options": [["Anselm", 1], ["Paley", 0], ["Darwin", 0], ["Dawkins", 0]]}
 ],
 "numericals": [{"q": "In what year did Paley publish Natural Theology, containing the watchmaker analogy?", "answer": 1802, "tolerance": 0, "unit": "year (CE)", "options": [1802, 1779, 1859, 1078]}],
 "bank": [
  {"q": "What does the cosmological argument actually claim?", "correct": "That everything that exists has a cause, an infinite regress of causes is impossible, so there must be an uncaused First Cause, which Aquinas identified as God.", "misconception": "The cosmological argument says God exists because the Bible says so.", "random_wrong": "The cosmological argument claims the universe is itself God.", "why": "Students confuse philosophical arguments with appeals to scripture; the cosmological argument deliberately reasons from observation of cause and effect, not from religious authority."},
  {"q": "Does Paley's design argument prove God's existence with certainty?", "correct": "No — it is an inductive argument claiming design is the best explanation of order in nature; critics like Hume, and Darwin's evolution, offer alternative explanations, so it is probable at best.", "misconception": "Paley's watch analogy gives conclusive proof that God exists.", "random_wrong": "Paley argued that watches occur naturally without any maker.", "why": "Students overstate inductive arguments as proofs; evaluation marks require recognising the argument's probabilistic nature and its standard criticisms."},
  {"q": "Is an agnostic the same as an atheist?", "correct": "No — an atheist believes there is no God, while an agnostic holds that God's existence cannot be known or proven either way.", "misconception": "Agnostics and atheists both assert that God definitely does not exist.", "random_wrong": "An agnostic is someone who attends church without enjoying it.", "why": "Students collapse the two positions, but the distinction between denial of God and suspension of judgement is a frequent definition question."}
 ]
},
"religious-studies-gcse-religion--society-adventure-1": {
 "concepts": [
  {"term": "Secularisation", "def": "The declining influence of religion in public life, law and daily habits, seen in falling church attendance in many Western societies."},
  {"term": "Religious pluralism", "def": "The coexistence of many faiths within one society, such as modern Britain, raising questions of tolerance, dialogue and shared values."},
  {"term": "Social justice", "def": "Religious commitment to fighting poverty and inequality, expressed in Christian agape love, Islamic Zakah and Jewish tzedakah."},
  {"term": "Stewardship", "def": "The belief that humans are entrusted by God to care for creation responsibly, underpinning religious teaching on the environment."},
  {"term": "Sanctity of life", "def": "The belief that life is sacred and God-given, shaping religious responses to issues such as abortion, euthanasia and capital punishment."},
  {"term": "Freedom of religion", "def": "The human right to hold, practise and change one's beliefs, protected in UK law by the Human Rights Act 1998."}
 ],
 "mcqs": [
  {"q": "What does secularisation mean?", "options": [["The declining influence of religion in society", 1], ["The growth of new religious movements", 0], ["The union of church and state", 0], ["A ban on all religious worship", 0]]},
  {"q": "Which term describes the religious duty to care for the natural world on God's behalf?", "options": [["Stewardship", 1], ["Dominion without limits", 0], ["Secularism", 0], ["Asceticism", 0]]},
  {"q": "What does the sanctity of life mean?", "options": [["Life is sacred because it is given by God", 1], ["Life should be extended at any financial cost", 0], ["Only religious people's lives have value", 0], ["Animals matter more than humans", 0]]},
  {"q": "Zakah in Islam and tzedakah in Judaism are both examples of what?", "options": [["Religious duties of charitable giving", 1], ["Pilgrimage obligations", 0], ["Food laws", 0], ["Daily prayer rituals", 0]]}
 ],
 "numericals": [{"q": "What percentage of qualifying wealth do Muslims give annually as Zakah?", "answer": 2.5, "tolerance": 0, "unit": "%", "options": [2.5, 10, 5, 1]}],
 "bank": [
  {"q": "Does secularisation mean religion has disappeared from Britain?", "correct": "No — it means religion's public influence and attendance have declined, yet Britain remains a multi-faith society where religion persists and diversifies.", "misconception": "Secularisation means nobody in Britain is religious any more.", "random_wrong": "Secularisation is a government ban on religious worship.", "why": "Students treat decline as disappearance; evaluation answers need the nuance that religion changes its social role rather than simply vanishing."},
  {"q": "Does the Genesis idea of 'dominion' mean humans may exploit the earth freely?", "correct": "Most believers interpret dominion alongside stewardship: authority over creation carries responsibility to care for it on God's behalf, not licence to exploit it.", "misconception": "Religious teaching says humans can use the earth however they like because God gave them dominion.", "random_wrong": "Dominion is a church tax on farmland.", "why": "Students quote 'dominion' (Genesis 1:28) without the balancing stewardship teaching, producing one-sided answers on religion and the environment."},
  {"q": "Is Zakah an optional donation in Islam?", "correct": "No — Zakah is an obligatory Pillar of Islam, normally 2.5% of qualifying wealth each year; voluntary additional charity is called sadaqah.", "misconception": "Zakah is just an optional gift Muslims make when they feel generous.", "random_wrong": "Zakah is a tax paid to the government of Saudi Arabia.", "why": "Students confuse obligatory Zakah with voluntary sadaqah; the distinction between duty and optional charity is a standard exam point."}
 ]
},
"religious-studies-gcse-ethics--relationships-adventure-1": {
 "concepts": [
  {"term": "Marriage", "def": "A legally or religiously recognised union; many Christians see it as a lifelong covenant before God for companionship, support and raising children."},
  {"term": "Cohabitation", "def": "Living together as a couple without being married; accepted by many today but discouraged by some religious traditions."},
  {"term": "Adultery", "def": "A sexual relationship with someone other than one's spouse, condemned in the Ten Commandments and regarded as a serious wrong in most religions."},
  {"term": "Divorce and remarriage", "def": "The legal ending of a marriage; religions differ, with Catholic teaching rejecting divorce while Islam permits it as a last resort."},
  {"term": "Contraception", "def": "Methods of preventing pregnancy; Catholic teaching opposes artificial contraception, while most Protestant churches permit it within marriage."},
  {"term": "Family roles", "def": "Religious traditions stress duties within the family: parents nurture and educate children in faith, and children honour their parents."}
 ],
 "mcqs": [
  {"q": "What is cohabitation?", "options": [["A couple living together without being married", 1], ["A trial separation before divorce", 0], ["A religious wedding ceremony", 0], ["An arranged marriage", 0]]},
  {"q": "What is the Islamic marriage contract called?", "options": [["Nikah", 1], ["Mahr", 0], ["Iddah", 0], ["Talaq", 0]]},
  {"q": "Which 1968 papal encyclical prohibited artificial contraception for Catholics?", "options": [["Humanae Vitae", 1], ["Rerum Novarum", 0], ["Laudato Si'", 0], ["Pacem in Terris", 0]]},
  {"q": "What is adultery?", "options": [["A sexual relationship with someone other than one's spouse", 1], ["Marrying more than one person", 0], ["Living together before marriage", 0], ["Ending a marriage in court", 0]]}
 ],
 "numericals": [{"q": "What is the maximum number of wives a Muslim man may marry under Islamic law?", "answer": 4, "tolerance": 0, "unit": "wives", "options": [4, 2, 1, 7]}],
 "bank": [
  {"q": "What is the difference between annulment and divorce in Catholic teaching?", "correct": "An annulment declares a sacramental marriage was never valid in the first place; divorce claims to end a valid marriage, which the Catholic Church does not recognise.", "misconception": "Annulment is simply the Catholic word for divorce.", "random_wrong": "An annulment is a blessing given on a wedding anniversary.", "why": "Students treat the two as identical, but the Catholic position only allows annulment precisely because it holds a valid sacramental marriage cannot be dissolved."},
  {"q": "Does Islam forbid divorce completely?", "correct": "No — divorce is permitted in Islam as a last resort after attempts at reconciliation, followed by a waiting period (iddah), though hadith describes it as disliked by Allah.", "misconception": "Divorce is absolutely forbidden for Muslims in all circumstances.", "random_wrong": "Muslim divorce requires the approval of a Christian court.", "why": "Students assume all religions ban divorce like traditional Catholic teaching, missing Islam's distinctive position of permitted-but-discouraged."},
  {"q": "Do all Christians hold the same view on contraception?", "correct": "No — official Catholic teaching opposes artificial contraception (Humanae Vitae, 1968), while most Protestant churches accept it as a responsible choice within marriage.", "misconception": "All Christians are forbidden from using any form of contraception.", "random_wrong": "Contraception is mentioned in the Ten Commandments.", "why": "Students generalise the Catholic position to all Christianity; exam answers must contrast denominational views to reach higher levels."}
 ]
},
"religious-studies-ibdp-sl-internal-assessment-investigative-study-of-a-religious-practice-adventure-1": {
 "concepts": [
  {"term": "Investigative study", "def": "An internally assessed task requiring first-hand investigation of a religious practice and analysis of its meaning and significance for practitioners."},
  {"term": "Participant observation", "def": "A research method in which the investigator attends a service, ritual or festival, observing carefully and recording what practitioners actually do."},
  {"term": "Emic and etic perspectives", "def": "The emic view describes a practice from the insider's standpoint; the etic view analyses it from the outside using academic categories."},
  {"term": "Primary and secondary sources", "def": "Primary sources include interviews, site visits and original texts; secondary sources are scholarly books and articles interpreting the practice."},
  {"term": "Research ethics", "def": "Investigating living communities requires informed consent, sensitivity, confidentiality and respect for the beliefs and dignity of participants."},
  {"term": "Phenomenological approach", "def": "Describing a religious practice as practitioners experience it, while bracketing the researcher's own assumptions and value judgements."}
 ],
 "mcqs": [
  {"q": "What is an emic perspective in the study of religion?", "options": [["The insider's own understanding of a practice", 1], ["The outsider's academic analysis", 0], ["A statistical survey method", 0], ["A critique of religion as false", 0]]},
  {"q": "Which of these is a primary source for investigating a religious practice?", "options": [["An interview with a worshipper at the site", 1], ["A textbook chapter on the religion", 0], ["An encyclopedia entry", 0], ["A review of a scholarly book", 0]]},
  {"q": "Which is an essential ethical step when interviewing members of a religious community?", "options": [["Obtaining their informed consent", 1], ["Recording them secretly for accuracy", 0], ["Paying them to give favourable answers", 0], ["Publishing their names without asking", 0]]},
  {"q": "A phenomenological approach to a ritual requires the researcher to do what?", "options": [["Suspend personal judgements and describe the practice as experienced", 1], ["Prove the ritual's beliefs are true", 0], ["Convert to the religion being studied", 0], ["Rank religions from best to worst", 0]]}
 ],
 "numericals": [],
 "bank": [
  {"q": "What is the difference between emic and etic perspectives?", "correct": "Emic is the insider's perspective — how practitioners themselves understand their practice; etic is the outsider's analytical perspective using academic frameworks.", "misconception": "Emic means the researcher's own academic interpretation of the practice.", "random_wrong": "Emic and etic are two categories of religious ritual.", "why": "Students reverse the terms or assume the scholarly view is 'emic'; keeping insider (emic) and outsider (etic) straight is essential for methodology marks."},
  {"q": "Is a textbook account a primary source for studying a religious practice?", "correct": "No — primary sources are first-hand: observations, interviews, original scriptures or artefacts. Textbooks and scholarly articles are secondary sources interpreting them.", "misconception": "Anything published in a reputable book counts as a primary source.", "random_wrong": "Primary sources are any sources written before the year 1900.", "why": "Students judge sources by authority rather than proximity; the primary/secondary distinction rests on first-hand versus interpretive material."},
  {"q": "Should an investigative study judge whether the religion's beliefs are true?", "correct": "No — the task is to investigate the meaning and significance of a practice for its practitioners, using balanced, empathetic analysis rather than verdicts on truth claims.", "misconception": "A good investigative study must conclude whether the religion is right or wrong.", "random_wrong": "The study must end with the researcher joining the practice.", "why": "Students confuse evaluation of significance with judging truth; the assessment rewards understanding practitioners' perspectives, not apologetics or debunking."}
 ]
},
"religious-studies-ibdp-sl-religious-practices-rituals-adventure-1": {
 "concepts": [
  {"term": "Ritual", "def": "A patterned, repeated symbolic action — such as prayer, offering or procession — that expresses belief and binds a religious community together."},
  {"term": "Rites of passage", "def": "Rituals marking transitions between life stages, such as birth, coming of age, marriage and death ceremonies across religious traditions."},
  {"term": "Van Gennep's three stages", "def": "Arnold van Gennep analysed rites of passage as separation from the old status, a transitional (liminal) phase, and incorporation into the new status."},
  {"term": "Liminality and communitas", "def": "Victor Turner described the liminal phase as a threshold state 'betwixt and between', generating communitas, an intense bond among participants."},
  {"term": "Pilgrimage", "def": "A journey to a sacred site, such as the Hajj to Mecca or the Kumbh Mela, undertaken for devotion, purification or fulfilment of duty."},
  {"term": "Festivals and sacred calendar", "def": "Annual observances such as Passover, Easter, Eid and Diwali that commemorate sacred events and renew communal identity through shared ritual."}
 ],
 "mcqs": [
  {"q": "What are van Gennep's three stages of a rite of passage?", "options": [["Separation, transition, incorporation", 1], ["Birth, marriage, death", 0], ["Prayer, fasting, feasting", 0], ["Confession, penance, absolution", 0]]},
  {"q": "Which scholar linked the liminal phase of ritual with 'communitas'?", "options": [["Victor Turner", 1], ["Emile Durkheim", 0], ["William James", 0], ["Rudolf Otto", 0]]},
  {"q": "The Hajj is a pilgrimage to which city?", "options": [["Mecca", 1], ["Jerusalem", 0], ["Varanasi", 0], ["Medina", 0]]},
  {"q": "What is a rite of passage?", "options": [["A ritual marking a person's transition between life stages", 1], ["A daily prayer routine", 0], ["A text read aloud during worship", 0], ["A pilgrimage route through a holy city", 0]]}
 ],
 "numericals": [{"q": "How many stages did van Gennep identify in rites of passage?", "answer": 3, "tolerance": 0, "unit": "stages", "options": [3, 2, 4, 7]}],
 "bank": [
  {"q": "Are rituals just meaningless repetition?", "correct": "No — rituals carry symbolic meaning, transmit belief, mark transitions and, as Durkheim argued, generate social cohesion and shared identity within the community.", "misconception": "Rituals are empty habits performed without purpose or function.", "random_wrong": "Rituals may only be performed by ordained religious leaders.", "why": "Students dismiss repetition as meaningless, missing the analytical point that repetition itself encodes meaning and sustains community across generations."},
  {"q": "What are the three stages of a rite of passage according to van Gennep?", "correct": "Separation from the previous status, a transitional liminal stage, and incorporation into the new status.", "misconception": "The three stages are birth, marriage and death.", "random_wrong": "The three stages are dawn, noon and dusk ceremonies.", "why": "Students name occasions for rites of passage instead of the structural stages every such rite passes through — a key distinction in ritual theory."},
  {"q": "Is pilgrimage a compulsory duty in every religion?", "correct": "No — obligation varies: Hajj is obligatory once for Muslims who are able, while most Christian and Hindu pilgrimages are voluntary acts of devotion.", "misconception": "All religions require pilgrimage as a compulsory duty like the Hajj.", "random_wrong": "Pilgrimage means permanently relocating to a holy city.", "why": "Students generalise the Islamic obligation to other faiths; comparing the status of practices across traditions is central to this course."}
 ]
}
}

for stem, d in DATA.items():
    sp = os.path.join(SPECS, stem + '.json')
    s = json.load(open(sp))
    if 'mcqs_expanded' not in s:
        print('SKIP (already repaired):', stem); continue
    s['concepts'] = d['concepts']
    s['mcqs'] = d['mcqs']
    s['numericals'] = d['numericals']
    del s['mcqs_expanded']
    with open(sp, 'w') as f:
        json.dump(s, f, ensure_ascii=False, indent=1, separators=(',', ': '))
    json.load(open(sp))
    bp = os.path.join(BANKS, stem + '.json')
    b = json.load(open(bp))
    b['items'] = d['bank']
    b.pop('derived_items', None)
    with open(bp, 'w') as f:
        json.dump(b, f, ensure_ascii=False, indent=1, separators=(',', ': '))
    json.load(open(bp))
    print('OK:', stem)
print('chunk1 done')
