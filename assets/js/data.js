/* =========================================================
   LFL Création — La Ferme de Longchamp
   Catalogue RÉEL & enrichi (noms, prix, options, photos et
   descriptions repris de lflcreation.com).
   - "options" : tailles disponibles avec prix (€).
   - "price"   : prix d'entrée (le plus bas) ; "from" => "dès".
   ========================================================= */

const PRODUCTS = [
  /* ============ CORBEILLES DE FRUITS ============ */
  {
    id:"hawai-2530", name:"Corbeille Hawaï 25/30 personnes", cat:"Corbeilles",
    price:349, from:false, options:null, people:"25 à 30 personnes",
    occasions:["Anniversaire","Fête de famille","Bureau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Priorisez les fruits découpés en début de dégustation, puis les fruits en hauteur, avant de réfrigérer pour le lendemain.",
    badge:"Best-seller", badgeClass:"", emoji:"🍍", grad:"grad--exo", img:"assets/img/hawai-2530.jpg?2",
    short:"Le grand classique de la maison : une explosion de couleurs et de saveurs.",
    desc:"Succombez à ce grand classique de La Ferme de Longchamp. Une fine association de couleurs et de saveurs qui ne laissera personne indifférent, sculptée à la main pour 25 à 30 personnes.",
    inside:["Fruits frais & exotiques de saison","Sculptés à la main le matin même","Fruits de Rungis","100 % frais, sans sucre ajouté"]
  },
  {
    id:"hawai-revisitee", name:"Hawaï Revisitée 35/40 personnes", cat:"Corbeilles",
    price:399, from:false, options:null, people:"35 à 40 personnes",
    occasions:["Grand événement","Séminaire","Mariage"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Priorisez les fruits découpés en début de dégustation, puis les fruits en hauteur, avant de réfrigérer pour le lendemain.",
    badge:"Best-seller", badgeClass:"", emoji:"🍉", grad:"grad--exo", img:"assets/img/hawai-revisitee.jpg?2",
    short:"Le grand classique revisité : plus grand, plus généreux.",
    desc:"Succombez à ce grand classique revisité de La Ferme de Longchamp. Une composition généreuse et spectaculaire pour 35 à 40 personnes.",
    inside:["Sélection exotique premium","Fruits sculptés à la main","Fruits de Rungis","100 % frais, sans sucre ajouté"]
  },
  {
    id:"athenes", name:"Corbeille Athènes", cat:"Corbeilles",
    price:249, from:false, options:null, people:"15 personnes",
    occasions:["Réception","Bureau","Cadeau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Priorisez en début de dégustation les fruits les plus juteux (ananas, pastèque), qui s'oxydent plus vite.",
    badge:"", badgeClass:"", emoji:"🍇", grad:"grad--berry", img:"assets/img/athenes.jpg?2",
    short:"Une corbeille originale, un paradis de fruits juteux.",
    desc:"Une corbeille originale et un paradis de fruits juteux, riche en couleurs, pour 15 personnes à déguster sans modération.",
    inside:["Grenade & pomme","Datte fraîche & Medjool","Figue fraîche & sèche","Ananas & pastèque"]
  },
  {
    id:"lima", name:"Corbeille Lima", cat:"Corbeilles",
    price:189, from:false, options:null, people:"12 personnes",
    occasions:["Cadeau","Bureau","Maison"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Se consomme immédiatement, à conserver au frais si non dégustée le jour même.",
    badge:"", badgeClass:"", emoji:"🥭", grad:"grad--citrus", img:"assets/img/lima.jpg?2",
    short:"Une corbeille de saison exotique, riche en couleurs et en goûts.",
    desc:"Une corbeille de saison exotique, riche en couleurs et en goûts, pour 12 personnes sans modération.",
    inside:["Fruits exotiques de saison","Sculptés à la main","Fruits de Rungis","100 % frais"]
  },
  {
    id:"caire", name:"Le Caire", cat:"Corbeilles",
    price:149, from:false, options:null, people:"8 à 12 personnes",
    occasions:["Cadeau","Maison","Bureau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"À déguster à la cuillère. Chaque fruit prend place dans la chair du fruit de la passion.",
    badge:"", badgeClass:"", emoji:"🍊", grad:"grad--citrus", img:"assets/img/caire.jpg?2",
    short:"Une pyramide de fruits de saison, une explosion de saveurs.",
    desc:"Une pyramide de fruits de saison et une explosion de saveurs à déguster à la cuillère, sublimée par le fruit de la passion.",
    inside:["Grenade & pomme","Datte fraîche & Medjool","Figue fraîche & sèche","Fruit de la passion"]
  },
  {
    id:"reserve-810", name:"La Réserve – 8/10 personnes", cat:"Corbeilles",
    price:95, from:false, options:null, people:"8 à 10 personnes",
    occasions:["Maison","Bureau","Cadeau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"À conserver au frais. Idéale à partager en famille ou entre collègues.",
    badge:"", badgeClass:"", emoji:"🍏", grad:"grad--green", img:"assets/img/reserve.jpg?2",
    short:"Une sélection variée de fruits, riche en vitamines et antioxydants.",
    desc:"Une sélection variée de fruits tropicaux, riches en vitamines et antioxydants. Une composition harmonieuse de couleurs, de textures et de saveurs.",
    inside:["Fruits tropicaux de saison","Riche en vitamines","Fruits de Rungis","100 % frais"]
  },
  {
    id:"eclat", name:"Corbeille Éclat de Fraîcheur 3/5 personnes", cat:"Corbeilles",
    price:59, from:false, options:null, people:"3 à 5 personnes",
    occasions:["Cadeau","Maison","Bureau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Présentée dans une élégante caisse ajourée en bois. À conserver au frais.",
    badge:"", badgeClass:"", emoji:"🍎", grad:"grad--green", img:"assets/img/eclat.jpg?2",
    short:"Couleur, goût et bien-être dans une élégante caisse en bois.",
    desc:"Apportez couleur, goût et bien-être avec cette corbeille de fruits frais de saison soigneusement sélectionnés, présentée dans une élégante caisse ajourée en bois.",
    inside:["Fruits frais de saison","Caisse ajourée en bois","Fruits de Rungis","100 % frais"]
  },
  {
    id:"saison-810", name:"Corbeille de saison – 8/10 personnes", cat:"Corbeilles",
    price:69, from:false, options:null, people:"8 à 10 personnes · 5 kg",
    occasions:["Maison","Bureau","Cadeau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Un panier de fraîcheur de 5 kg, à conserver au frais.",
    badge:"", badgeClass:"", emoji:"🧺", grad:"grad--green", img:"assets/img/saison-810.jpg?2",
    short:"Un panier de fraîcheur de 5 kg, pour tous les gourmands.",
    desc:"Notre corbeille de 5 kg de fruits, un véritable panier de fraîcheur sélectionné avec soin pour satisfaire tous les amateurs de fruits frais.",
    inside:["Variété de fruits de saison","Panier de 5 kg","Fruits de Rungis","100 % frais"]
  },
  {
    id:"saison-1215", name:"Corbeille de saison – 12/15 personnes", cat:"Corbeilles",
    price:129, from:false, options:null, people:"12 à 15 personnes · 9,5 kg",
    occasions:["Réception","Bureau","Grand événement"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Grand format 9,5 kg. À conserver au frais.",
    badge:"", badgeClass:"", emoji:"🍇", grad:"grad--berry", img:"assets/img/saison-1215.jpg?2",
    short:"Grand format 9,5 kg pour les événements de grande envergure.",
    desc:"Une corbeille de 9,5 kg de fruits frais, colorés et savoureux. Idéale pour un événement de grande envergure : elle satisfera tous vos invités.",
    inside:["Large variété de fruits","Format 9,5 kg","Fruits de Rungis","100 % frais"]
  },
  {
    id:"bigmama", name:"Corbeille BIG MAMA – 100 personnes", cat:"Corbeilles",
    price:845, from:false, options:null, people:"100 personnes",
    occasions:["Grand événement","Mariage","Séminaire"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Corbeille de fruits découpés, prête à partager. À conserver au frais.",
    badge:"XXL", badgeClass:"product__badge--mangue", emoji:"🍉", grad:"grad--exo", img:"assets/img/bigmama.jpg?2",
    short:"La pièce hors norme : de quoi régaler 100 personnes.",
    desc:"Préparez-vous à une expérience fruitée hors du commun avec la Big Mama, une corbeille de fruits découpés idéale pour partager et régaler 100 personnes.",
    inside:["Fruits découpés en abondance","Prêts à partager","Fruits de Rungis","100 % frais"]
  },

  /* ============ CRÉATIONS ============ */
  {
    id:"salade-revisitee", name:"Salade de fruits revisitée", cat:"Créations",
    price:79, from:true, options:[{label:"8 personnes",price:79},{label:"10 personnes",price:99}],
    people:"8 à 10 personnes", occasions:["Dessert","Réception","Bureau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Tout est comestible, contenant compris (socle en ananas). À conserver au frais.",
    badge:"Nouveau", badgeClass:"product__badge--mangue", emoji:"🍓", grad:"grad--berry", img:"assets/img/salade-revisitee.jpg?2",
    short:"La salade de fruits totalement revisitée — tout est comestible.",
    desc:"Succombez à cette salade de fruits totalement revisitée. Notre artisan l'a conçue de sorte que tout soit comestible, contenant comme contenu, avec un socle en ananas.",
    inside:["Socle en ananas comestible","Grenade & pomme","Datte fraîche & Medjool","Figue fraîche & sèche"]
  },
  {
    id:"plateau-gourmet", name:"Plateau Gourmet", cat:"Créations",
    price:49, from:true, options:[{label:"S · 3/5 pers.",price:49},{label:"M · 6/8 pers.",price:79},{label:"L · 10/12 pers.",price:119}],
    people:"3 à 12 personnes", occasions:["Buffet","Séminaire","Réception"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Fruits découpés en morceaux faciles à manger. À conserver au frais.",
    badge:"3 tailles", badgeClass:"", emoji:"🍈", grad:"grad--green", img:"assets/img/plateau-gourmet.jpg?2",
    short:"Le plateau de fruits exotiques prêts à déguster — 3 tailles.",
    desc:"Une variété de fruits exotiques soigneusement sélectionnés, découpés en morceaux faciles à manger. Une explosion de couleurs et une expérience sensorielle à chaque bouchée.",
    inside:["Fruits exotiques découpés","Prêts à déguster","Fruits de Rungis","100 % frais, sans sucre ajouté"]
  },
  {
    id:"su-fruits", name:"Su-fruits", cat:"Créations",
    price:24, from:true, options:[{label:"8 pièces",price:24},{label:"15 pièces",price:45},{label:"30 pièces",price:90}],
    people:"8 à 30 pièces", occasions:["Apéritif","Réception","Cadeau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"À déguster frais. Nos « sushis » de fruits, préparés à la commande.",
    badge:"Signature", badgeClass:"product__badge--mangue", emoji:"🍣", grad:"grad--berry", img:"assets/img/su-fruits.jpg?2",
    short:"Nos « sushis » de fruits — délices exotiques et raffinés.",
    desc:"Plongez dans un monde de délices exotiques avec nos Su-fruits, une création exclusive : chaque « sushi » de fruits est méticuleusement préparé à partir des fruits les plus exquis.",
    inside:["Fruits exotiques taillés","Préparé à la commande","Fruits de Rungis","100 % frais"]
  },
  {
    id:"pics-vitamines", name:"Les Pics Vitaminés", cat:"Créations",
    price:89, from:true, options:[{label:"30 pièces",price:89},{label:"50 pièces",price:149}],
    people:"30 à 50 brochettes", occasions:["Apéritif","Séminaire","Buffet"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Brochettes prêtes à déguster. À conserver au frais.",
    badge:"", badgeClass:"", emoji:"🍢", grad:"grad--exo", img:"assets/img/pics-vitamines.jpg?2",
    short:"Des brochettes de fruits frais, alternance de saveurs.",
    desc:"Des brochettes composées de morceaux de fruits frais soigneusement sélectionnés : une alternance savoureuse de fruits exotiques et de saison, en parfait équilibre.",
    inside:["Brochettes de fruits frais","Fruits exotiques & de saison","Prêtes à déguster","100 % frais"]
  },
  {
    id:"plateau-etoile", name:"Plateau Étoilé – Un Voyage Fruité", cat:"Créations",
    price:69, from:false, options:null, people:"6 à 8 personnes",
    occasions:["Dessert","Réception","Buffet"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Création 100 % fruits, à conserver au frais.",
    badge:"", badgeClass:"", emoji:"⭐", grad:"grad--green", img:"assets/img/plateau-etoile.jpg?2",
    short:"Billes de pastèque, melon et ananas, touche de menthe.",
    desc:"Un plateau étoilé, création 100 % fruits alliant fraîcheur et élégance : billes de pastèque, melon et ananas, sublimées par des raisins croquants et une touche de menthe.",
    inside:["Billes de pastèque, melon, ananas","Raisins croquants","Menthe fraîche","100 % fruits"]
  },
  {
    id:"plateau-plaisir", name:"Plateau Plaisir Fruités – 3/5 personnes", cat:"Créations",
    price:39, from:false, options:null, people:"3 à 5 personnes",
    occasions:["Dessert","Maison","Bureau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Fruits de saison découpés, à conserver au frais.",
    badge:"", badgeClass:"", emoji:"🍉", grad:"grad--citrus", img:"assets/img/plateau-plaisir.jpg?2",
    short:"Un assortiment riche et varié de fruits de saison découpés.",
    desc:"Un assortiment riche et varié de fruits de saison, soigneusement découpés et présentés pour ravir les yeux et les papilles. Idéal pour partager un moment convivial.",
    inside:["Fruits de saison découpés","Prêts à déguster","Fruits de Rungis","100 % frais"]
  },
  {
    id:"eclats-gourmandises", name:"Éclats de Gourmandises X7", cat:"Créations",
    price:79, from:false, options:null, people:"7 saveurs",
    occasions:["Réception","Cadeau","Dessert"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Petites bouchées de fruits frais, à conserver au frais.",
    badge:"", badgeClass:"", emoji:"🍬", grad:"grad--berry", img:"assets/img/eclats-gourmandises.jpg?2",
    short:"7 saveurs en un plateau — une explosion gourmande.",
    desc:"Une véritable explosion de saveurs : 7 saveurs en un plateau, un mille-fruits coloré composé de petites bouchées de fruits frais, tendres et sucrés.",
    inside:["7 saveurs de fruits frais","Petites bouchées","Fruits de Rungis","100 % frais"]
  },
  {
    id:"mille-fruit", name:"Le mille-fruit", cat:"Créations",
    price:129, from:false, options:null, people:"10 à 12 personnes",
    occasions:["Anniversaire","Réception","Dessert"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Sortez la création 15 minutes avant la dégustation. Sans pâte ni sucre.",
    badge:"", badgeClass:"", emoji:"🎂", grad:"grad--exo", img:"assets/img/mille-fruit.jpg?2",
    short:"Un « gâteau » 100 % fruits, sans pâte ni sucre.",
    desc:"Une création unique 100 % fruits de saison, sans sucre et sans pâte. Elle garde toute sa consistance grâce au talent de notre créateur.",
    inside:["100 % fruits de saison","Sans pâte, sans sucre","Sculpté à la main","Effet gâteau garanti"]
  },
  {
    id:"centre-table", name:"Centre de Table", cat:"Créations",
    price:59, from:false, options:null, people:"Décor de table",
    occasions:["Réception","Mariage","Événement"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Centre de table décoratif et comestible. À conserver au frais.",
    badge:"", badgeClass:"", emoji:"🍇", grad:"grad--berry", img:"assets/img/centre-table.jpg?2",
    short:"Un centre de table de fruits, décoratif et comestible.",
    desc:"Apportez couleur, fraîcheur et originalité à vos réceptions avec ce somptueux centre de table : pomme et grenades éclatantes, figues charnues, raisins et baies gourmandes.",
    inside:["Pomme & grenade","Figues & raisins","Baies gourmandes","100 % frais"]
  },
  {
    id:"plateau-douceur", name:"Plateau douceur", cat:"Créations",
    price:89, from:false, options:null, people:"6 à 8 personnes",
    occasions:["Cadeau","Fêtes","Réception"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Fruits secs & douceurs artisanales. Se conserve à température ambiante.",
    badge:"", badgeClass:"", emoji:"🌰", grad:"grad--citrus", img:"assets/img/plateau-douceur.jpg?2",
    short:"Fruits secs d'exception et douceurs artisanales.",
    desc:"Une explosion de saveurs naturelles avec une sélection de fruits secs d'exception et de douceurs artisanales, choisis pour leur qualité et leur fraîcheur.",
    inside:["Fruits secs d'exception","Douceurs artisanales","Sélection premium","Écrin cadeau"]
  },
  {
    id:"gourmandise-pot", name:"Gourmandise en pot", cat:"Créations",
    price:35.90, from:true, options:[{label:"6 pots",price:35.90},{label:"15 pots",price:89}],
    people:"6 à 15 pots", occasions:["Bureau","Petit-déjeuner","Snack"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Fruits frais découpés en pot, prêts à emporter. À conserver au frais.",
    badge:"", badgeClass:"", emoji:"🥤", grad:"grad--green", img:"assets/img/gourmandise-pot.jpg?2",
    short:"Fruits frais découpés en pot, prêts à emporter.",
    desc:"Une sélection soignée de fruits frais découpés et disposés en pot. Légers et sucrés, idéaux pour une dégustation rapide tout en apportant vitamines et fibres.",
    inside:["Fruits frais découpés","Format pot individuel","Prêt à emporter","100 % frais"]
  },
  {
    id:"fraisier", name:"Fraisier primeur", cat:"Créations",
    price:99, from:false, options:null, people:"8 à 10 personnes",
    occasions:["Anniversaire","Dessert","Fête"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Sans pâte ni sucre : base de pastèque fourrée banane cœur mangue. À conserver au frais.",
    badge:"Signature", badgeClass:"product__badge--mangue", emoji:"🍰", grad:"grad--berry", img:"assets/img/fraisier.jpg?2",
    short:"Le fraisier 100 % fruits, sans pâte ni sucre.",
    desc:"Aucune pâte, aucun sucre, et pourtant ce fraisier ravira les plus gourmands : une base de pastèque fourrée à la banane, cœur mangue. Une création signature.",
    inside:["Base de pastèque","Fourré banane, cœur mangue","Fraises fraîches","Sans pâte, sans sucre"]
  },
  {
    id:"fraisier-coeur", name:"Fraisier Cœur", cat:"Créations",
    price:79, from:false, options:null, people:"6 à 8 personnes",
    occasions:["Saint-Valentin","Anniversaire","Dessert"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"100 % fruits, sans pâte ni sucre. Sortez la création 15 min avant la dégustation.",
    badge:"Amour", badgeClass:"product__badge--framboise", emoji:"❤️", grad:"grad--berry", img:"assets/img/fraisier-coeur.jpg?2",
    short:"Un fraisier en forme de cœur, 100 % fruits.",
    desc:"Succombez à la douceur d'un fraisier revisité en forme de cœur, imaginé pour célébrer l'amour. Entièrement confectionné à base de fruits : une explosion de fraîcheur et de saveurs naturelles.",
    inside:["100 % fruits frais","En forme de cœur","Sans pâte, sans sucre","Fraises & fruits de saison"]
  },
  {
    id:"coeur-valentin", name:"Cœur de fruit Saint-Valentin", cat:"Créations",
    price:49, from:false, options:null, people:"2 personnes",
    occasions:["Saint-Valentin","Cadeau","Dessert"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Création signature Saint-Valentin. 100 % fruits, à conserver au frais.",
    badge:"Saint-Valentin", badgeClass:"product__badge--framboise", emoji:"💝", grad:"grad--berry", img:"assets/img/coeur-valentin.jpg?2",
    short:"Un cadeau sain et gourmand pour votre moitié.",
    desc:"Offrez un cadeau sain et gourmand à votre valentin·e. Cette création pour 2 personnes ravira votre moitié et vos papilles. 100 % fruits, 100 % sain.",
    inside:["100 % fruits frais","Pour 2 personnes","En forme de cœur","Sans sucre ajouté"]
  },
  {
    id:"buche", name:"Bûche 100 % fruits", cat:"Créations",
    price:89, from:true, options:[{label:"Duo exotique · 6 pers.",price:89},{label:"Duo exotique · 8 pers.",price:129}],
    people:"6 à 8 personnes", occasions:["Noël","Fêtes","Dessert"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Bûche 100 % fruits, sans pâte ni sucre. À réserver pour les fêtes.",
    badge:"Fêtes", badgeClass:"product__badge--mangue", emoji:"🎄", grad:"grad--exo", img:"assets/img/buche.jpg?2",
    short:"La bûche de Noël 100 % fruits, sans pâte ni sucre.",
    desc:"Découvrez une bûche 100 % fruits, sans pâte ni sucre, à base d'ananas et de produits exotiques. Elle explose en bouche et rafraîchit : elle ravira toute la famille et vos invités.",
    inside:["Base d'ananas & fruits exotiques","Sans pâte, sans sucre","Création de fête","100 % fruits"]
  },

  /* ============ CRUDITÉS ============ */
  {
    id:"corbeille-crudites", name:"Corbeille de crudités", cat:"Crudités",
    price:149, from:false, options:null, people:"Buffet",
    occasions:["Buffet","Séminaire","Apéritif"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Légumes croquants découpés avec précision. À conserver au frais.",
    badge:"", badgeClass:"", emoji:"🥕", grad:"grad--green", img:"assets/img/corbeille-crudites.jpg?2",
    short:"Fraîcheur et croquant : légumes découpés pour vos buffets.",
    desc:"Apportez une touche de fraîcheur colorée à vos buffets avec cette corbeille de crudités : une sélection de légumes croquants, découpés avec précision et présentés avec élégance.",
    inside:["Carottes & concombre","Légumes croquants de saison","Découpés à la main","100 % frais"]
  },
  {
    id:"apero-nature", name:"Apéro nature – 8/10 personnes", cat:"Crudités",
    price:69, from:false, options:null, people:"8 à 10 personnes",
    occasions:["Apéritif","Bureau","Réception"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Sélection saine et savoureuse, à conserver au frais.",
    badge:"", badgeClass:"", emoji:"🥑", grad:"grad--green", img:"assets/img/apero-nature.jpg?2",
    short:"Un apéritif léger et naturel, sain et savoureux.",
    desc:"Un moment de convivialité avec notre Apéro Nature : une sélection de produits sains et savoureux, parfaits pour un apéritif léger et naturel.",
    inside:["Sélection de légumes & fruits","Produits sains","En-cas de qualité","100 % frais"]
  },
  {
    id:"jardin-croquant", name:"Jardin croquant", cat:"Crudités",
    price:29.90, from:false, options:null, people:"3 à 5 personnes",
    occasions:["Apéritif","Snack","Bureau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Légumes frais et croquants de saison. À conserver au frais.",
    badge:"Healthy", badgeClass:"", emoji:"🥒", grad:"grad--green", img:"assets/img/jardin-croquant.jpg?2",
    short:"Un mélange de légumes frais, croquants et savoureux.",
    desc:"Un mélange irrésistible de légumes frais, croquants et savoureux, directement issus de la nature. Une variété de légumes de saison, parfaits pour un en-cas sain.",
    inside:["Légumes de saison","Frais & croquants","Découpés à la main","100 % naturel"]
  },
  {
    id:"apero-green", name:"Apéro Green 3/5 personnes", cat:"Crudités",
    price:24.90, from:false, options:null, people:"3 à 5 personnes",
    occasions:["Apéritif","Healthy","Bureau"], delai:"Livraison gratuite à Paris & Île-de-France",
    conseil:"Sélection healthy et responsable, à conserver au frais.",
    badge:"Healthy", badgeClass:"", emoji:"🥗", grad:"grad--green", img:"assets/img/apero-green.jpg?2",
    short:"Simple et healthy : l'apéritif qui fait du bien.",
    desc:"L'Apéro Green se distingue par sa simplicité et son côté healthy, parfait pour savourer de bons mets tout en respectant votre bien-être.",
    inside:["Légumes croquants","Sélection healthy","En-cas responsable","100 % frais"]
  },

  /* ============ JUS DE FRUITS (pressés maison) ============ */
  {
    id:"jus-orange", name:"Jus Orange", cat:"Jus",
    price:2.90, from:true, options:[{label:"25 cl",price:2.90},{label:"50 cl",price:3.90}],
    people:"25 cl / 50 cl", occasions:["Petit-déjeuner","Bureau","Au quotidien"], delai:"Pressé 10 min avant la livraison",
    conseil:"Pressé 10 minutes avant la livraison pour conserver tous ses nutriments (vitamine C).",
    badge:"", badgeClass:"", emoji:"🍊", grad:"grad--citrus", img:"assets/img/jus-orange.jpg?2",
    short:"100 % pur jus pressé maison, rien d'autre.",
    desc:"Jus d'orange pressé 10 minutes avant la livraison : il conserve tous ses bons nutriments. Favorise l'équilibre nutritionnel (vitamine C), la digestion et le système immunitaire.",
    inside:["Oranges pressées maison","Sans sucre ajouté","Sans conservateur","Pressé minute"]
  },
  {
    id:"jus-oap", name:"Jus Orange Ananas Passion", cat:"Jus",
    price:4.90, from:true, options:[{label:"25 cl",price:4.90},{label:"50 cl",price:7.90}],
    people:"25 cl / 50 cl", occasions:["Détox","Bureau","Plaisir"], delai:"Pressé 10 min avant la livraison",
    conseil:"Préparé 10 minutes avant la livraison pour conserver tous ses bienfaits.",
    badge:"", badgeClass:"", emoji:"🧃", grad:"grad--exo", img:"assets/img/jus-oap.jpg?2",
    short:"Une évasion tropicale : orange, ananas, passion.",
    desc:"Une association savoureuse de jus d'orange, ananas et passion. Favorise l'équilibre nutritionnel (vitamine A), la protection immunitaire et la prévention cardiovasculaire.",
    inside:["Orange, ananas, passion","Pressé maison","Sans sucre ajouté","Pressé minute"]
  },
  {
    id:"jus-detox", name:"Jus Concombre Pomme verte Céleri", cat:"Jus",
    price:4.90, from:true, options:[{label:"25 cl",price:4.90},{label:"50 cl",price:8.90}],
    people:"25 cl / 50 cl", occasions:["Détox","Healthy","Bureau"], delai:"Pressé 10 min avant la livraison",
    conseil:"Préparé 10 minutes avant la livraison pour conserver tous ses bienfaits.",
    badge:"Healthy", badgeClass:"", emoji:"🥒", grad:"grad--green", img:"assets/img/jus-detox.jpg?2",
    short:"Le vert détox : concombre, pomme verte, céleri.",
    desc:"Une association de concombre, pomme verte et céleri. Favorise l'équilibre nutritionnel (vitamine B), l'apport en fibres et antioxydants, et la santé cardiovasculaire.",
    inside:["Concombre, pomme verte, céleri","Pressé maison","Sans sucre ajouté","Pressé minute"]
  },
  {
    id:"jus-ocg", name:"Jus Orange Carotte Gingembre", cat:"Jus",
    price:3.90, from:true, options:[{label:"25 cl",price:3.90},{label:"50 cl",price:5.90}],
    people:"25 cl / 50 cl", occasions:["Boost","Immunité","Bureau"], delai:"Pressé 10 min avant la livraison",
    conseil:"Préparé 10 minutes avant la livraison pour conserver tous ses bienfaits.",
    badge:"", badgeClass:"", emoji:"🥕", grad:"grad--citrus", img:"assets/img/jus-ocg.jpg?2",
    short:"Le shot vitalité : orange, carotte, gingembre.",
    desc:"Notre boost vitalité pressé maison : orange, carotte et gingembre. Un concentré de vitamines pour affronter la journée.",
    inside:["Orange, carotte, gingembre","Pressé maison","Sans sucre ajouté","Pressé minute"]
  },
  {
    id:"jus-obf", name:"Jus Orange Banane Fraise", cat:"Jus",
    price:4.90, from:true, options:[{label:"25 cl",price:4.90},{label:"50 cl",price:7.90}],
    people:"25 cl / 50 cl", occasions:["Plaisir","Bureau","Petit-déjeuner"], delai:"Pressé 10 min avant la livraison",
    conseil:"Préparé 10 minutes avant la livraison pour conserver tous ses bienfaits.",
    badge:"", badgeClass:"", emoji:"🍓", grad:"grad--berry", img:"assets/img/jus-obf.jpg?2",
    short:"Le délice orange, banane, fraise.",
    desc:"Le délice de l'association orange, banane et fraise. Préparé 10 minutes avant la livraison pour conserver tous ses bienfaits nutritionnels.",
    inside:["Orange, banane, fraise","Pressé maison","Sans sucre ajouté","Pressé minute"]
  },
  {
    id:"jus-op", name:"Jus Orange Passion", cat:"Jus",
    price:2.90, from:true, options:[{label:"25 cl",price:2.90},{label:"50 cl",price:4.90}],
    people:"25 cl / 50 cl", occasions:["Plaisir","Bureau","Au quotidien"], delai:"Pressé 10 min avant la livraison",
    conseil:"Préparé 10 minutes avant la livraison pour conserver tous ses bienfaits.",
    badge:"", badgeClass:"", emoji:"🧡", grad:"grad--citrus", img:"assets/img/jus-op.jpg?2",
    short:"Envolez-vous vers le soleil : orange, passion.",
    desc:"Envolez-vous vers le soleil avec notre jus Orange Passion. Préparé 10 minutes avant la livraison pour conserver tous ses bienfaits nutritionnels.",
    inside:["Orange & fruit de la passion","Pressé maison","Sans sucre ajouté","Pressé minute"]
  },
  {
    id:"jus-oc", name:"Jus Orange Carotte", cat:"Jus",
    price:2.90, from:true, options:[{label:"25 cl",price:2.90},{label:"50 cl",price:4.90}],
    people:"25 cl / 50 cl", occasions:["Boost","Bureau","Au quotidien"], delai:"Pressé 10 min avant la livraison",
    conseil:"Préparé 10 minutes avant la livraison pour conserver tous ses bienfaits.",
    badge:"", badgeClass:"", emoji:"🥕", grad:"grad--citrus", img:"assets/img/jus-oc.jpg?2",
    short:"Le plein de vitamines : orange, carotte.",
    desc:"Faites le plein de vitamines avec cette association orange et carotte. Préparée 10 minutes avant la livraison pour conserver tous ses bienfaits.",
    inside:["Orange & carotte","Pressé maison","Sans sucre ajouté","Pressé minute"]
  },
  {
    id:"jus-pamplemousse", name:"Jus Pamplemousse", cat:"Jus",
    price:3.90, from:true, options:[{label:"25 cl",price:3.90},{label:"50 cl",price:5.90}],
    people:"25 cl / 50 cl", occasions:["Détox","Bureau","Au quotidien"], delai:"Pressé 10 min avant la livraison",
    conseil:"Pressé 10 minutes avant la livraison pour conserver tous ses nutriments.",
    badge:"", badgeClass:"", emoji:"🍊", grad:"grad--citrus", img:"assets/img/jus-pamplemousse.jpg?2",
    short:"Jus de pamplemousse pressé maison.",
    desc:"Jus de pamplemousse pressé 10 minutes avant la livraison : il conserve tous ses nutriments. Favorise l'équilibre nutritionnel (vitamine C) et le système immunitaire.",
    inside:["Pamplemousse pressé maison","Sans sucre ajouté","Sans conservateur","Pressé minute"]
  },
  {
    id:"jus-ocvp", name:"Jus Orange Citron vert Pamplemousse", cat:"Jus",
    price:3.90, from:true, options:[{label:"25 cl",price:3.90},{label:"50 cl",price:5.90},{label:"1 L",price:9.90}],
    people:"25 cl / 50 cl / 1 L", occasions:["Détox","Boost","Bureau"], delai:"Pressé 10 min avant la livraison",
    conseil:"Pressé 10 minutes avant la livraison pour conserver tous ses nutriments.",
    badge:"", badgeClass:"", emoji:"🍋", grad:"grad--citrus", img:"assets/img/jus-ocvp.jpg?2",
    short:"Un concentré de vitalité : orange, citron vert, pamplemousse.",
    desc:"Un véritable concentré de vitalité. Pressé 10 minutes avant la livraison pour conserver tous ses bienfaits. Favorise l'équilibre nutritionnel (vitamine C), la digestion et le système immunitaire.",
    inside:["Orange, citron vert, pamplemousse","Pressé maison","Sans sucre ajouté","Formats 25 cl / 50 cl / 1 L"]
  },
  {
    id:"jus-opa", name:"Jus Orange Pamplemousse", cat:"Jus",
    price:3.90, from:true, options:[{label:"25 cl",price:3.90},{label:"50 cl",price:5.90},{label:"1 L",price:9.90}],
    people:"25 cl / 50 cl / 1 L", occasions:["Détox","Bureau","Au quotidien"], delai:"Pressé 10 min avant la livraison",
    conseil:"Pressé 10 minutes avant la livraison pour conserver tous ses nutriments.",
    badge:"", badgeClass:"", emoji:"🍊", grad:"grad--citrus", img:"assets/img/jus-opa.jpg?2",
    short:"Le plein de fraîcheur, pur agrumes.",
    desc:"Faites le plein de fraîcheur avec ce jus pur agrumes. Pressé 10 minutes avant la livraison. Favorise l'équilibre nutritionnel (vitamine C) et la digestion.",
    inside:["Orange & pamplemousse","Pressé maison","Sans sucre ajouté","Formats 25 cl / 50 cl / 1 L"]
  }
];

const CATEGORIES = ["Tout", "Corbeilles", "Créations", "Crudités", "Jus"];
