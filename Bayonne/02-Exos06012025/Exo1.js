class Professeur {
    #Tel;
    #SalaireDeBase;
    constructor(Nom, Prenom, Matiere, Tel, Adresse) {
        this.Nom = Nom;
        this.Prenom = Prenom;
        this.Matiere = Matiere;
        this.#Tel = Tel;
        this.Adresse = Adresse;
        this.Creneaux = [];
    }
    set Tel(Tel) {
        this.#Tel = Tel;
    }
    set SalaireDeBase(SalaireDeBase) {
        this.#SalaireDeBase = SalaireDeBase;
    }
    get Tel() {
        return this.#Tel;
    }
    get SalaireDeBase() {
        return this.#SalaireDeBase;
    }
    Afficher() {
        console.log(this.Nom, this.Prenom);
        console.log("Matière : " + this.Matiere);
        console.log("Téléphone : " + this.#Tel);
        console.log("Salaire : " + this.#SalaireDeBase);
        this.Adresse.AfficherAdresse();
        console.log(this.Creneaux.length, "Crénaux\n")
        if (this.Creneaux.length > 0) {
            this.Creneaux.forEach(e => {
                e.AfficherCreneau();
            });
        }
        console.log("-----------");
    }

    AjouterCrenau(HeureDebut, HeureFin, Prof) {
        if (this.Creneaux.length <= 15) {
            this.Creneaux.push(new Creneau(HeureDebut, HeureFin, Prof));
        } else {
            console.error("Nombre de crénaux limité a 15.");
        }
    }
}

class Etudiant {
    constructor(Nom, Prenom, Tel, Adresse, Anniv, Niveau, Commentaire="[Aucun commentaire]") {
        this.Nom = Nom;
        this.Prenom = Prenom;
        this.Tel = Tel;
        this.Adresse = Adresse;
        this.Anniv = Anniv;
        this.Niveau = Niveau;
        this.Commentaire = Commentaire;
    }
    Afficher() {
        console.log(this.Nom, this.Prenom);
        console.log("Téléphone : " + this.Tel);
        console.log("Date de naissance : " + this.Anniv);
        console.log("Niveau : " + this.Niveau);
        console.log("Commentaire : " + this.Commentaire);
        this.Adresse.AfficherAdresse();
        console.log("-----------");
    }
}

class Adresse {
    constructor(Mentions = null, NumeroVoie, TypeDeVoie, NomDeVoie, CodePostal, Ville) {
        this.Mentions = Mentions;
        this.NumeroVoie = NumeroVoie;
        this.TypeDeVoie = TypeDeVoie;
        this.NomDeVoie = NomDeVoie;
        this.CodePostal = CodePostal;
        this.Ville = Ville;
    }
    AfficherAdresse() {
        console.log(this.Mentions);
        console.log(this.NumeroVoie, this.TypeDeVoie, this.NomDeVoie);
        console.log(this.CodePostal, this.Ville);
    }
}

class Creneau {
    constructor(HeureDebut, HeureFin, ProfAsso) {
        this.HeureDebut = HeureDebut;
        this.HeureFin = HeureFin;
        this.ProfAsso = ProfAsso;
    }
    AfficherCreneau() {
        console.log(this.HeureDebut, this.HeureFin);
        console.log("Professeur associé :", this.ProfAsso.Nom, this.ProfAsso.Prenom);
    }
}

const Adress1 = new Adresse("Appartement B24", "12", "avenue", "avenue des Champs", 75008, "Paris");
const Adress2 = new Adresse("", "5", "rue", "rue Victor Hugo", 44000, "Nantes");
const Prof1 = new Professeur("Daniel", "Antoine", "Français", "06-21-89-45-23", Adress1);
const Prof2 = new Professeur("Grégoire", "Dusud", "Math", "06-21-89-45-23", Adress2);
const Prof3 = new Professeur("Edmon", "Bosapin", "Math", "06-21-89-45-23", Adress2);

Prof2.AjouterCrenau("11h00", "11h02", Prof3);

Prof1.SalaireDeBase = "2000€";
Prof1.Tel = "01-23-45-67-89";
Prof2.SalaireDeBase = "2000€";

Prof1.Afficher();
Prof2.Afficher();

const Adress3 = new Adresse("Appartement B24", "12", "avenue", "avenue des Champs", 75008, "Paris");
const Adress4 = new Adresse("", "5", "rue", "rue Victor Hugo", 44000, "Nantes");
const Etudiant1 = new Etudiant("LAMY", "Camille", "07-12-34-56-78", Adress3, "15 mai 1998", "Licence", "Allergique au lactose");
const Etudiant2 = new Etudiant("RIVIÈRE", "Thomas", "06-98-76-54-32", Adress4, "22 janvier 1995", "Master");

Etudiant1.Afficher();
Etudiant2.Afficher();