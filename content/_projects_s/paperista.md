title: 
    name: Paperista
id: paperista
date: 2013
featured: 2
ranks:
    visual: 3
    digital: 4
    textual: 2
category: 
    - id: dataviz
      name: Vizuelizacija podataka
    - id: research
      name: Akademsko istraživanje
    - id: software
      name: Softver
    - id: interactive
      name: Interaktivna umetnost + dizajn
role:
    - id: designer
      name: Ko-dizajner
    - id: programmer
      name: Ko-programer
    - id: researcher
      name: Akademski istraživač
medium:
    - id: dataviz
      name: Interaktivna vizuelizacija podataka
    - id: software
      name: Veb aplikacija
    - id: research
      name: Akademski tekst
team:
    - name: Nikola Milikić (Good Old AI Lab)
      link: "http://nikola.milikic.info/"
    - name: Bojan Franzee Brankov (Uzrok Studio)
      link: "http://moonburntstudio.com/press/#credits"
    - name: Srđan Keča (Uzrok Studio)
      link: "https://skeca.com/"
    - name: Luka Knežević-Strika (Uzrok Studio)
      link: "http://www.lukaknezevicstrika.com/"
    - name: Jovan Vesić (Uzrok Studio)
      link: "https://twitter.com/1edan/"
    - name: Jelena Jovanović (Good Old AI Lab)
      link: "https://jelenajovanovic.net/"
presentation_title: Presentations
presentations:
    - year: 2013
      events:
        - name: <span class='italic-style'>International Conference on Learning Analytics and Knowledge</span>, Leuven, Belgija
publications:
    - year: 2013
      pubs:
        - link: "/download/research/paperista2013.pdf"
          linked: "Visual Exploration of Semantically Annotated Research Papers"
          name: "Milikic N., Krcadinac U., Jovanovic J., Brankov B. & Keča S., Learning Analytics and Knowledge. Data Challenge, 2013."
img_to_show: 1
img_data:
    - size: "652x654"
      caption: "Paperista Visualization (detalj)"
    - size: "924x658"
      caption: "Paperista Visualization (detalj)"
    - size: "1600x960"
      caption: "Paperista interfejs"
    - size: "1600x1080"
      caption: "Različiti pregledi (views) grafikona s mehurićima (bubble chart): (1) sve godine / sve teme (bez istaknutih); sve godine / sve teme (bez istaknutih); sve godine / grupisane teme (sa istaknutima); po godinama / grupisane teme (sa istaknutima)" 
lead: "Povezujući <a href='/rad/projekti/category/dataviz'>dizajn interaktivnih vizuelizacija podataka</a> sa <a href='/rad/projekti/category/ai'>primenjenom veštačkom inteligencijom</a>, Paperista predstavlja interaktivni animirani vizuelni pretraživač za semantički anotirane istraživačke radove u oblasti tehnološki unapređenog učenja (<span class='italic-style'>technology-enhanced learning</span>)."

Paperista se bavi problemom vizuelizacije i pregleda skupa podataka o istraživačkim publikacijama u dve oblasti tehnološki unapređenog učenja (<span class='italic-style'>technology-enhanced learning</span>): <a href="https://en.wikipedia.org/wiki/Learning_analytics" target="_blank">analitika učenja i podučavanja</a> (<span class='italic-style'>Learning Analytics</span>, LA) i <a href="https://en.wikipedia.org/wiki/Educational_data_mining" target="_blank">rudarenje nad podacima u kontekstu obrazovanja</a> (<span class='italic-style'>Educational Data Mining</span>, EDM). Naš pristup zasnovan je na semantičkoj notaciji koja povezuje publikacije iz baze podataka sa terminima iz Vikipedije.

Kao alatka za vizuelizaciju i pretragu, Paperista predstavlja ove termine u obliku linijskih grafikona i dijagrama sa mehurićima (<span class='italic-style'>bubble charts</span>). Interfejs Paperiste obezbeđuje višestruke načine pregleda. Tako je korisnicima omogućeno da posmatraju i interaguju s terminima, i da tako steknu dublje razumevanje njihove evolucije i razvoja njihovih međusobnih odnosa. Takođe je omogućeno poređenje između različitih istraživačkih oblasti (npr. LA i EDM). Najzad, korisnici mogu da istražuju radove koji su u vezi sa predstavljenim terminima, te da prave odgovarajuće pretrage na Vebu kako bi pristupili kompletnom tekstu radova.

Sistem Paperista sastoji se od Veb aplikacije i serverske aplikacije koja obezbeđuje RESTful API za komunikaciju sa skupom podataka. Interaktivna Veb vizuelizacija je napisana uz pomoć sistema <a href="https://d3js.org/" target="_blank">D3.js</a>.

Paperista je nastala kao zajednički projekat laboratorije <a href="https://goodoldai.org/" target="_blank">Good Old AI</a> na Univerzitetu u Beogradu i studija Uzrok, studija za dizajn interakcija i filmsku produkciju, koji smo osnovali i nekoliko godina vodili Bojan Franzee Brankov, Srđan Keča, Luka Knežević-Strika, Jovan Vesić i ja. <mark>&#9632;</mark>