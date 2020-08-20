title: 
    name: "Design Notes: This Website"
    html1: "Design Notes: This Website"
    short: Design Notes
id: this
featured: 3
date: "12/08/2020"
extra_js: pictoarray
main_img_data:
    file_name: "this-main.jpg"
    size: "1600x1017"
    caption: "Pictogram Sketches. Beograd, 2020"
lead: "A story of how this website came to be. The story about drawing, writing, programming, and shaping one’s own identity between order and chaos."
lead_short: "A story of how this website came to be"
content:
    - type: "txt"
      html: "<p>In one text, Julio Cortázar mentions a <span class='italic-style'>classifier's madness</span>. This website came to be as a result of a similar madness, that I've felt ever since the time of my boyhood, when I was drawing detailed maps of my backyard.<sup id='s1'>✿</sup></p> 
      <p>The Western Man, <span class='italic-style'>homo occidentalis</span>, always had the need to devise categories for cutting the world around him and to organize these cut pieces of the world into drawers of his cabinets.<sup id='s2'>♞</sup> In my case, however, I recognize a double need: to create the categories and dismantle them at the same time, to escape from the matrix and return to it, to keep the world in a floating, trembling state between two magnetic poles: order and chaos.</p> 
      <p>Apart from maps, I liked to draw complicated scenes with a lot of minuscule stick figure characters that I called <span class='italic-style'>Minikin Men</span>. I would draw the scenes first, then their taxonomies: which kinds of Minikin Men exist, how can they be divided, what powers they have, etc. These menageries of stock characters – an acrobat, a pirate, a faqir, a strongman, an inventor, a parachutist, a painter, a robot, a miner, a sleepwalker – were a game of identity multiplication.</p>
      <p>The following drawings were made in 1996. They were drawn with a thin felt-tip marker on A4 papers.</p>"
    - type: "img"
      grid_rules: "grid-template-columns: 680fr 383fr 680fr;"
      img_data:
        - file_name: "this001.jpg"
          size: "680x960"
          caption: "Minikin Men. Pančevo, 1996"
        - file_name: "this003.jpg"
          size: "383x960"
          caption: "Types of Minikin Men. Pančevo, 1996"
        - file_name: "this002.jpg"
          size: "680x960"
          caption: "Minikin Men. Pančevo, 1996"
    - type: "txt"
      html: "<p>It was an unconscious homage to the arcade aesthetics we born in the Orwell year grew up with, an homage to platform 8-bit games and ASCII art.<sup id='s3'>❥</sup></p>
      <p>Last year, when I started working on my website, I realized that the most difficult task will be to find the right shape – visual, textual, and interactive – for my fluid personal and professional identity. I wrote the site almost from scratch and it was not easy in technological terms: Python Flask, Nginx server, YAML, pure HTML and CSS, SVG for graphics, JavaScript and D3.JS for interactions and animations, etc. The most difficult thing, however, was to organize one's own life and projects, to classify them, to understand what makes sense to show publicly and in what way, to understand what you are and what you aren't, what is an egotrip and what is a legitimate personal archive, what is insecurity and what is constructive reconsideration, what is personal and what is professional. The most difficult thing was, as always, to articulate one's identity. In fact, one's identity confusion.</p>
      <p>That is why I returned to the Minikin Men: because of their simplicity and flexibility, fluidity and the power of transformation. One minikin body could exist in many forms: as a storyteller, an inventor, a maker, a teacher.</p>
      <p>First, I defined categories for my projects: data art, animation, books, data visualization, digital literature, etc. For each of them, I drew hundreds of alternative symbols, based on the minikin body.</p>
      <p>I set myself a design constraint: each symbol<sup id = 's4'>✹</sup> must contain one circle and four lines, curved or straight, possibly overlapping, plus optionally one dot. For a generic minikin character, the one in the upper left corner, the circle is the head, the lines are the arms and legs, the point is the invisible crux of the body. For a character who, for example, represents books and publications, the circle is the book spine, while lines represent four pages.</p>
      <p>The vector SVG pictograms were preceded by numerous hand-drawn sketches. The following drawings were made during 2020 and 2019.</p>"
    - type: "img"
      grid_rules: "grid-template-columns: 1fr 1fr;
      margin-bottom: 10px !important;"
      img_data:
        - file_name: "thisA01.jpg"
          size: "1200x795"
          caption: "Pictogram Sketches. Belgrade, 2020"
        - file_name: "thisA02.jpg"
          size: "1200x795"
          caption: "Pictogram Sketches. Belgrade, 2020"
    - type: "img"
      grid_rules: "grid-template-columns: 1055fr 1200fr 1055fr;
      margin-top: 0 !important;"
      img_data:
        - file_name: "thisB01.jpg"
          size: "1055x699"
          caption: "Pictogram Sketches. Belgrade, 2020"
        - file_name: "thisB02.jpg"
          size: "1200x699"
          caption: "Pictogram Sketches. Belgrade, 2020"
        - file_name: "thisB03.jpg"
          size: "1055x699"
          caption: "Pictogram Sketches. Belgrade, 2020"
    - type: "txt"
      html: "<p>After drawing pictograms by hand, I drew then in Adobe Illustrator, finally in SVG format, directly in code, so any of them could be algorithmically transformed into any other, so they could become the digital clay for shaping the fluidity of one's identity. Currently, there are 14 symbols for 14 categories. The site is made in a generative manner, which mean that if at some point I decide to add or subtract a category, the site would adapt immediately.</p>
      <p>These symbols are a small dedication to the artist and designer Luigi Serafini.<Sup id = 's5'>☛ </sup> I deliberately made them abstract and cryptic, like an alien language. I hope that everyone will try to find their own meaning in them.</p>
      <p>Here's a hint though:</p>
      <div class='all-pictocont'> 
      <a href='/work/projects/category/data-art'>
        <div class='pictocont'>
            <div id='data-art-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Data Art</span> — a human dance above the data point in a coordinate system, a human element in the digital grid.</div>
        </div>
      </a>
      <a href='/work/projects/category/ai'>
        <div class='pictocont'>
            <div id='ai-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Artificial Intelligence</span> — the eye of the machine with which we share the 21st century, the HAL 9000's eye.</div>
        </div>
      </a>
      <a href='/work/projects/category/digital-literature'>
        <div class='pictocont'>
            <div id='digital-literature-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Digital Literature</span> — book pages, punctuation, birds, bits, bytes, curly braces</div>
        </div>
      </a>
      <a href='/work/projects/category/dataviz'>
        <div class='pictocont'>
            <div id='dataviz-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Data Visualization</span> — aesthetics of the abscissa and the ordinate, of the compass and the sextant.</div></div></a>
      <a href='/work/projects/category/interactive'>
        <div class='pictocont'>
            <div id='interactive-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Interactive Art + Design</span> — Pac-Man as a symbol for designing digital labyrinths, images and texts.</div></div></a>
      <a href='/work/projects/category/animation'>
        <div class='pictocont'>
            <div id='animation-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Animation</span> — a walking figure and a walking cycle as the first serious exercise of any animator, both classic and digital.</div></div></a>
      <a href='/work/projects/category/software'>
        <div class='pictocont'>
            <div id='software-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Software</span> — a machine construction, an algorithmic device, a gadget, a Calderesque object.</div></div></a>
      <a href='/work/projects/category/book'><div class='pictocont'>
        <div id='book-symbol' class='pictoimage symbol'></div>
        <div class='pictotext'><span>Books + Publications</span> — a book with pages that resembles a gear, a comet or a Sputnik satellite.</div></div></a>
      <a href='/work/projects/category/installation'>
        <div class='pictocont'>
            <div id='installation-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Installations + Performances</span> — a flower, a plant, a tree, an installation as the applied gardening, as (agri)culture.</div></div></a>
      <a href='/work/projects/category/workshop'>
        <div class='pictocont'>
            <div id='workshop-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Workshops</span> — students orbit around the teacher, and vice versa: sometimes you are in the center, sometimes outside.</div></div></a>
      <a href='/work/projects/category/geography'>
        <div class='pictocont'>
            <div id='geography-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Experimental Geography</span> — a journey, an orbit, a planet, an axis of rotation, a trajectory, an act of travelling.</div></div></a>
      <a href='/work/projects/category/cartography'>
        <div class='pictocont'>
            <div id='cartography-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Experimental Cartography</span> — a pin on a map, a geotag within a geocoordinate system.</div></div></a>
      <a href='/work/projects/category/drawing'>
        <div class='pictocont'>
            <div id='drawing-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Digital Drawing</span> — an angry eye or a rubber body, a dance of free lines despite the oppression of the digital matrix.</div></div></a>
      <a href='/work/projects/category/research'>
        <div class='pictocont'>
            <div id='research-symbol' class='pictoimage symbol'></div>
            <div class='pictotext'><span>Academic Research</span> — the view of an astronomer who looks at the sky, takes notes and tries to make some sense of it.</div></div></a>
      </div>
      <p>These are, of course, subsequent rationalizations. As you draw, you have no idea what is the meaning of the lines. That's why drawing is so enjoyable and why it's so important even for strictly digital projects – because it weakens the ego, the dominance of the compulsive mind, weakens the matrix and the magnet, weakens the <span class='italic-style'>Snap to Grid</span> effect<sup id = 's6'>✦</sup>, weakens the <span class = 'italic-style'>classifier's madness</span>. There is no digital art without drawing, just as there isn't one without programming or writing.</p>
       <p> The matrix and the magnet come back afterwards, because they have to return, because they are too strong, but there is a moment when you are free, the moment of levitation between order and chaos. <mark>&#9632;</mark></p>"
    - type: "img"
      grid_rules: "grid-template-columns: 1fr 1fr;"
      img_data:
        - file_name: "iskra02.jpg"
          size: "960x640"
          caption: "Artist Talk, Nova Iskra, 2017"
        - file_name: "iskra01.jpg"
          size: "960x640"
          caption: "Artist Talk, Nova Iskra, 2017"
sidenotes:
    - id: 1
      html: "<a href='/work/projects/early-data-art' target='_blank'><img src='/static/media/notes/this/img/map.jpg'></a>"
    - id: 2
      html: "I also imagined this site as <span class='italic-style'>ein Digitales Kunstkabinett</span>, a digital <a href='https://en.wikipedia.org/wiki/Cabinet_of_curiosities' target='_blank'>cabinet of curiosities</a>."
    - id: 3
      html: "U svom najjednostavnijem obliku, <a href='https://en.wikipedia.org/wiki/ASCII_art' target='_blank'>ASCII art</a> javlja se kao tipografski emotikon :-)"
    - id: 4
      html: "<a href='/rad/' target='_blank'><img src='/static/media/notes/this/img/flowerchart.jpg'></a>"
    - id: 5
      html: "And to his otherworldly atlas or encyclopedia, the magnificent <span class='italic-style'><a href='http://www.openculture.com/2017/09/an-introduction-to-the-codex-seraphinianus-the-strangest-book-ever-published.html' target='_blank'>Codex Seraphinianus</a></span>."
    - id: 6
      html: "A digital <a href='https://docs.gimp.org/2.10/nl/gimp-view-snap-to-grid.html' target='_blank'>options for object alignment</a>, <span class='italic-style'>Snap to Grid</span> can also serve as a metaphor for contemporary life within the digital grid, within the social and linguistic matrix."