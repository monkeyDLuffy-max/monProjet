from django.db import models

class Categorie(models.Model):
    nom = models.CharField(max_length=255)

    def ajouterCategorie(self):
        self.save()
    
    def supprimerCategorie(self):
        self.delete()

class Produit(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField()
    prix = models.FloatField()
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE, related_name='produits')

    def ajouterProduit(self):
        self.save()
    
    def modifierProduit(self):
        self.save()
    
    def supprimerProduit(self):
        self.delete()
    
class Stock(models.Model):
    produit = models.OneToOneField(Produit, on_delete=models.CASCADE, related_name='stock')
    quantite = models.IntegerField()
    alerteStock = models.BooleanField(default=False)

    def mettreAJourStock(self, produit, quantite):
        self.produit = produit
        self.quantite = quantite
        self.save()
    
    def verifierStockCritique(self):
        return self.alerteStock

class Utilisateur(models.Model):
    ADMIN = 'Admin'
    VENDEUR = 'Vendeur'
    ROLE_CHOICES = [(ADMIN, 'Admin'), (VENDEUR, 'Vendeur')]
    
    nom = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    motDePasse = models.CharField(max_length=255)

    def authentifier(self, email, motDePasse):
        return Utilisateur.objects.filter(email=email, motDePasse=motDePasse).exists()

class Client(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    adresse = models.TextField()
    pointsFidelite = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.prenom} {self.nom}"
    
    def retirerPoints(self, points):
        self.pointsFidelite -= points
        self.save()
    
    def verifierPoints(self, points):
        return self.pointsFidelite >= points

    def inscription(self):
        self.save()
    
    def modifierInformations(self):
        self.save()
    
    def mettreAJourInformations(self):
        self.save()
        
    
    def ajouterPointsFidelite(self, points):
        self.pointsFidelite += points
        self.save()

class Paiement(models.Model):
    T_MONEY = 'TMoney'
    FLOOZ = 'Flooz'
    MODO_PAIEMENT_CHOICES = [(T_MONEY, 'TMoney'), (FLOOZ, 'Flooz')]
    STATUT_CHOICES = [('Validé', 'Validé'), ('Échoué', 'Échoué')]
    
    def __str__(self):
        return f"{self.montant} {self.moyenPaiement} {self.statut}"
    
    montant = models.FloatField()
    moyenPaiement = models.CharField(max_length=10, choices=MODO_PAIEMENT_CHOICES)
    statut = models.CharField(max_length=10, choices=STATUT_CHOICES)

    def effectuerPaiement(self):
        self.statut = 'Validé'
        self.save()

    def rembourserPaiement(self):
        self.statut = 'Échoué'
        self.save()

class Vente(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    montantTotal = models.FloatField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    paiement = models.OneToOneField(Paiement, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.client} - {self.date}"
    
    def ajouterPaiement(self, paiement):
        self.paiement = paiement
        self.save()
    
    def retirerPaiement(self, paiement):
        self.paiement = paiement
        self.save()

    def ajouterArticle(self, produit, quantite):
        self.montantTotal += produit.prix * quantite
        self.save()
    
    def retirerArticle(self, produit, quantite):
        self.montantTotal -= produit.prix * quantite
        self.save()
        
    
    def validerVente(self):
        self.save()
    
class Facture(models.Model):
    dateEmission = models.DateTimeField(auto_now_add=True)
    montant = models.FloatField()
    vente = models.OneToOneField(Vente, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.vente} - {self.dateEmission}"
    
    def genererPDF(self):
        pass  
    
    def envoyerParEmail(self, client):
        pass  

class RetourRemboursement(models.Model):
    STATUT_CHOICES = [('Accepté', 'Accepté'), ('Refusé', 'Refusé')]
    
    vente = models.ForeignKey(Vente, on_delete=models.CASCADE)
    dateRetour = models.DateTimeField()
    raison = models.TextField()
    statut = models.CharField(max_length=10, choices=STATUT_CHOICES)

    def demanderRetour(self, client):
        pass  
    
    def traiterDemandeRetour(self):
        pass  
    
    def effectuerRemboursement(self):
        pass  

class TableauDeBord(models.Model):
    ventesJour = models.IntegerField()
    ventesMois = models.IntegerField()
    articlesRuptureStock = models.ManyToManyField(Produit)
    
    def afficherStatistiques(self):
        pass 
    
    def alerteStockFaible(self):
        pass 
    
    def genererRapportVentes(self):
        pass 
