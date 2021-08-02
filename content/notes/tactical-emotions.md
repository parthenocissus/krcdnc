title: 
    name: "Tactical Emotions"
    html: "Tactical Emotions"
    short: Tactical Emotions
id: tactical-emotions
featured: 3
date: "01/07/2021"
main_img_data:
    file_name: "tactical-emotions-main.jpg"
    size: "1600x1000"
    caption: "Photo: Ivona Petrov. Belgrade, 2021."
lead: "By reframing literary writing as a counter-surveillance technique (and vice versa), this essay proposes novel poetic strategies for the AI-driven society. Its original version was published in the book <span class=italic-style><a href='/download/research/tactical_poetics_2020.pdf' target='_blank'>Tactical Poetics</a></span>, written by <a href='https://monoskop.org/Darija_Medi%C4%87' target='_blank'>Darija Medić</a> and me (<a href='https://mi2.hr/en/2021/01/english-darija-medic-uros-krcadinac-tactical-poetics-optimised-poetics/' target='_blank'>Multimedia Institute</a>, 2020)."
lead_short: "Essay from the book <span class=italic-style>Tactical Poetics</span>"
content:
    - type: "txt"
      html: "<p>In 2008 my lab partners and I started an open project in affective computing, a field that connects computer systems with human emotions. The project was called Synesketch.<sup id='s1'>1</sup> It was a free open-source software library for textual emotion recognition and generative visualization.<sup id='s2'>2</sup> Inspired by the concept of synesthesia, Synesketch was in fact an artificial synesthete,<sup id='s3'>3</sup> software that maps text to generative visuals via feelings. The project started in the pre-post-truth, pre-crisis era, when affective AI technologies were perceived as relatively innocent, especially among programming and creative coding communities.</p>
      <p>How does Synesketch work? You could, for instance, type in “I am happy” and get a visual swirl of brightly colored particles; or type in “I am not happy” or “I feel heartsick” and get a bluish ocean of twinkling dots.<sup id='s4'>4</sup> Its recognition technique is grounded on a refined keyword spotting method which employs a set of heuristic rules, a WordNet-based word lexicon, and a lexicon of emoticons and common abbreviations.</p>
      <p>Twelve years later, however, when I look at the project, I see it as an abstract portrait of data naïveté. It is hard to deny that affective tech has become another tool for digital control, propaganda, affect management, and the exploitation of emotional labor.</p>
      <p>For example, in his “Radical Technologies”<sup id='s5'>5</sup> Adam Greenfield writes about Japan’s Keikyu Corporation, which measures the quality of its frontline employees’ smiles.<sup id='s6'>6</sup> Keikyu’s software scans the workers’ eye movements, lip curves and wrinkles, and rates them on a 0-100 scale. “For those with low scores,” Greenfield quotes a Foreign Policy article about the system, “advice like ‘You still look too serious,’ or ‘Lift up your mouth corners,’ will be displayed on the screen. Workers will print out and carry around an image of their best smile in an attempt to remember it.”</p>
      <p>Although it has nothing to do with these exact algorithms, Synesketch exists within the same category of affect quantification technologies. What was treated as a digital art experiment effectively became a political-economic weapon. In other words, Synesketch was not only an artsy gadget, it was a small battleship – both an æsthetic object and a tactical object. That is why, a decade later, I decided to reapproach it as such.</p>"
    - type: "img"
      grid_rules: "grid-template-columns: 1fr; margin-bottom: 10px !important;"
      img_data:
        - file_name: "dazzle002.png"
          size: "812x276"
          caption: "Dazzle war ships and how they work. Photograph of the USS West Mahomet in Dazzle camouflage, 1918. Courtesy US Naval Historical and Heritage Command, NH 1733."
    - type: "img"
      grid_rules: "grid-template-columns: 49fr 142fr; margin-top: 0 !important;"
      img_data:
        - file_name: "dazzle003.png"
          size: "490x800"
          caption: "Official report on a camouflaged ship in 1918."
        - file_name: "dazzle004.png"
          size: "1420x800"
          caption: "Artistic rendering of a camouflaged ship. Via <a href='https://99percentinvisible.org/episode/episode-65-razzle-dazzle/' target='_blank'>Roman Mars</a>, 99% Invisible."
    - type: "txt"
      html: "<p>There is an intriguing example from technological history, that combines visual æsthetics and military tactics. Before the First World War, the British and US military started to paint its ships in strange – and rather beautiful – black-and-white zebra-like shapes, in order to confuse German torpedo-equipped U-Boats. This naval camouflage tactics was called Dazzle.<sup id='s7'>7</sup></p>
      <p>“This camouflage was not about invisibility”, said the writer and producer Roman Mars.<sup id='s8'>8</sup> “It was about disruption. Confusion.” Artists such as Picasso considered these ships æsthetic objects, even claiming such artistic camouflage was invented by cubists.</p>
      <p>In 2010 artist and technologist Adam Harvey initiated a media art project called CV Dazzle.<sup id='s9'>9</sup> It is a set of fashion strategies for making your face unrecognizable by face recognition algorithms. These strategies have an exciting visual flair (including eccentric make-up and hairdos), showing again that a style driven by tactics can indeed be æsthetically significant.</p>"
    - type: "img"
      grid_rules: "grid-template-columns: 656fr 1211fr;"
      img_data:
        - file_name: "cv-dazzle2.jpg"
          size: "656x656"
          caption: "Anti-surveillance make-up, <a href='https://cvdazzle.com/' target='_blank'>CV Dazzle</a>, concept by Adam Harvey, 2010-2021."
        - file_name: "cv-dazzle1.jpg"
          size: "1211x656"
          caption: "Anti-surveillance make-up, <a href='https://cvdazzle.com/' target='_blank'>CV Dazzle</a>, concept by Adam Harvey, 2010-2021."
    - type: "txt"
      html: "<p>If we apply the same logic to textual instead of visual media, we get a version of textual expression embedded as playful encryption. That is the core concept of the <em>Tactical Emotions</em><sup id='s10'>10</sup> project: to reapproach Synesketch only to use it in a game of contemporary dazzle.</p>
      <p>Similar to Dazzle battleships and their artistic camouflage, the intention behind <em>Tactical Emotions</em> is to deliberately confuse and fool textual emotion recognition systems and software tools for sentiment analysis. Not only Synesketch, but also Python NLTK<sup id='s11'>11</sup> (for English) and Inspiratron<sup id='s12'>12</sup> (for Serbo-Croatian). This is done by searching for phrases, sentences, styles, verses, and text fragments whose emotional meaning these systems couldn’t interpret – yet humans can. For example, if you type in “I am happy but”, Synesketch will recognize a positive emotion. We as humans, however, know this “but” changes everything. This offers a novel way of looking at literary æsthetics.</p>
      <p>Take this sentence: “It is meaningless to love.” It would not be hard to agree that it is not a very positive proposition, however Python NLTK recognized it as such, probably because the affective weight of the word “love” (which is positive) outweights the word “meaningless” (which is negative). A line from Oskar Davičo's poem, “love is a beacon and saved sailors,” turns out negative. Is it because it alludes to a shipwreck? If John Lennon's “a working class hero is something to be” gets recognised as negative, does it mean that algorithms perceive “working class” itself as something negative? Banal statistical vulgarity of sentiment analysis algorithms, when read and experienced by humans, turns into fine poetic irony.
      <p>Metaphors and allegories have always been, at least in part, a form of strategic encryption of meaning. What makes it new is the computational aspect of contemporary surveillance, control, and machine-mediated power. Tactical Emotion is, thus, writing against the machine, recontextualized as poetry.</p>
      <p>One could say that poetry – by this very definition – is something computers cannot recognize. Instead, poetry becomes digital camouflage. ↓</p>"
    - type: "img"
      grid_rules: "grid-template-columns: 628fr 948fr 628fr 948fr;"
      img_data:
        - file_name: "tactical-poetics00XB.jpg"
          size: "628x948"
          caption: "<a href='/work/projects/optimised-tactical-poetics/' target='_blank'>Tactical Emotions</a>. Photo: Ivona Petrov, 2021."
        - file_name: "tactical-poetics002B.jpg"
          size: "948x948"
          caption: "<a href='/work/projects/optimised-tactical-poetics/' target='_blank'>Tactical Emotions</a>. Photo: Ivona Petrov, 2021."
        - file_name: "tactical-poetics001B.jpg"
          size: "628x948"
          caption: "<a href='/work/projects/optimised-tactical-poetics/' target='_blank'>Tactical Emotions</a>. Photo: Ivona Petrov, 2021."
        - file_name: "tactical-poetics003B.jpg"
          size: "948x948"
          caption: "<a href='/work/projects/optimised-tactical-poetics/' target='_blank'>Tactical Emotions</a>. Photo: Ivona Petrov, 2021."
    - type: "txt"
      html: "<div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                It’s not you, it’s me.
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised positive by Python NLTK
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                You are my post-truth.
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised positive by Python NLTK
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                Tell me, how is it to be
                young and beautiful in an ugly country?
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised positive by Inspiratron
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                It is futile, my dear,<br>
                it is meaningless to love.
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised positive by Inspiratron
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                So it goes.
            </section>
            <section>
            — Kurt Vonnegut
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised neutral by Synesketch
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                How wild it was to let it be.
            </section>
            <section>
                — Cheryl Strayed
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised neutral by Synesketch
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                A working class hero<br>
                is something to be.</span>
            </section>
            <section>
                — John Lennon
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised negative by Synesketch
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                Well, that escalated quickly.
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised neutral by Python NLTK
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                Caressing the distant hills and icy mountains, tenderly, with our hand.
            </section>
            <section>
            – Miloš Crnjanski
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised negative by Inspiratron
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                While history was happening, what did I do?<br>
                Just loved you.
            </section>
            <section>
                – Izet Sarajlić
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised negative by Inspiratron
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                A box of lead letters, and that’s not much... but it’s the only thing man has invented to this day as a weapon in defense of his human pride.
            </section>
            <section>
                – Miroslav Krleža
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised negative by Inspiratron
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                Put an empty space<br> 
                Between a colon<br> 
                And a closed bracket,<br> 
                And your textual symbol<br> 
                Your textual emoticon<br>
                Such as this one : )<br>
                Will not be turned<br>
                Automatically<br>
                Into an artificial emoji<br>
                Such as this one 🙂<br>
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised negative by Python NLTK
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                Love is a beacon and saved sailors.
            </section>
            <section>
                – Oskar Davičo
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised negative by Inspiratron
            </section>
        </div>  
    </div>
    <div class='optimised-poetry-cont tactical tact-margin'>
        <div class='col1'>
            <section class='xbold'>
                Poetry is not dead.
            </section>
        </div>
        <div class='col2'>
            <section>
                ☜ recognised negative by Inspiratron
            </section>
        </div>  
    </div>"
    - type: "img"
      grid_rules: "grid-template-columns: 1fr 1fr;"
      img_data:
        - file_name: "tactical-poetics005.jpg"
          size: "1600x1060"
          caption: "<a href='/work/projects/optimised-tactical-poetics/' target='_blank'>Tactical Emotions</a>. Photo: Ivona Petrov, 2021."
        - file_name: "tactical-poetics004.jpg"
          size: "1600x1060"
          caption: "<a href='/work/projects/optimised-tactical-poetics/' target='_blank'>Tactical Emotions</a>. Photo: Ivona Petrov, 2021."
    - type: "txt"
      html: "<p>↑ The original concept for Tactical Poetics was conceived in 2018 for the <a href='/work/projects/optimized-poetry/' target='_blank'>Digital Poetry Workshop</a>, organized as a part of the Art + Science conference in Belgrade. The concept was also presented at <a href='https://www.ted.com/talks/uros_krcedinac_buducnost_jezika' target='_blank'>TEDxMokrin</a>. Eventually, it grew into a collaboration with artist and researcher <a href='https://monoskop.org/Darija_Medi%C4%87' target='_blank'>Darija Medić</a>, with whom I've co-written a pair of books, <a href='/work/projects/optimised-tactical-poetics/' target='_blank'><em>Optimized Poetics & Tactical Poetics</em></a>, published by the <a href='https://mi2.hr/en/2021/01/english-darija-medic-uros-krcadinac-tactical-poetics-optimised-poetics/' target='_blank'>Multimedia Institute</a> in 2020. <mark>&#9632;</mark></p>"
sidenotes:
    - id: 1
      html: "<a href='/work/projects/synesketch'>The Synesketch Project</a>, Krcadinac.com"
    - id: 2
      html: "<p>Synesketch visuals:</p><p><img src='/static/media/notes/tactical-emotions/img/synesketch-example.jpg'></p>"
    - id: 3
      html: "<a href='/download/synesketch/research/2013-Synesketch_An_Open_Source_Library_for_Sentence-based_Emotion_Recognition-Krcadinac_Pasquier_Jovanovic_and_Devedzic.pdf' target='_blank'><em>Synesketch: An Open Source Library for Sentence-Based Emotion Recognition</em></a>, Uroš Krčadinac et al., IEEE Transactions on Affective Computing, 2013."
    - id: 4
      html: "<a href='/download/synesketch/research/2016-Textual_Affect_Communication_and_Evocation_Using_Abstract_Generative_Visuals-Krcadinac_Jovanovic_Devedzic_and_Pasquier.pdf' target='_blank'><em>Textual affect communication and evocation using abstract generative visuals</em></a>, Uroš Krčadinac et al., IEEE Transactions on Human-Machine Systems, 2016.</p>"
    - id: 5
      html: "<a href='https://www.versobooks.com/books/2742-radical-technologies' target='_blank'><em>Radical Technologies: The Design of Everyday Life</em></a>, Adam Greenfield, Verso, 2018."
    - id: 6
      html: "<img src='/static/media/notes/tactical-emotions/img/smilescan3.png'>"
    - id: 7
      html: "<a href='https://chrisbarton.info/books/dazzle.html' target='_blank'><em>Dazzle Ships: World War I and the Art of Confusion</em></a>, Chris Barton, Millbrook Press, 2017."
    - id: 8
      html: "<a href='https://99percentinvisible.org/episode/episode-65-razzle-dazzle/' target='_blank'><em>Razzle Dazzle</em></a>, Roman Mars, 99% Invisible, 2012."
    - id: 9
      html: "<a href='https://cvdazzle.com' target='_blank'><em>CV Dazzle</em></a>, Adam Harvey, 2010-2021."
    - id: 10
      html: "<a href='/work/projects/optimised-tactical-poetics/' target='_blank'><em>Optimized Poetics & Tactical Poetics</em></a>, Uroš Krčadinac & Darija Medić, Multimedia Institute, 2020."
    - id: 11
      html: "<a href='https://www.nltk.org/' target='_blank'><em>NLTK</em></a>, a free open-source Python library for Natural Language Processing."
    - id: 12
      html: "<a href='https://www.inspiratron.org/SerbianSentiment.php' target='_blank'><em>Inspiratron</em></a>, Sentiment Analysis for Serbian and related languages."