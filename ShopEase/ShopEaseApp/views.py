from django.shortcuts import render, get_object_or_404
from .models import Produit, Categorie
from .models import Client 

def index(request):
    categories = Categorie.objects.all()
    produits = Produit.objects.filter(stock__quantite__gt=0)  # Vérification stock (corrigé)
    return render(request, 'ShopEaseApp/index.html', {'categories': categories, 'produits': produits})

def dashboard(request):
    return render(request, 'ShopEaseApp/dashboard.html')

def product_list(request):
    produits = Produit.objects.all()
    return render(request, 'ShopEaseApp/product_list.html', {'produits': produits})

def product_detail(request, pk):
    produit = get_object_or_404(Produit, pk=pk)  # Gestion des erreurs 404
    return render(request, 'ShopEaseApp/product_detail.html', {'produit': produit})

def add_product(request):
    return render(request, 'ShopEaseApp/add_product.html')  # Ajout de la vue

def cart(request):
    return render(request, 'ShopEaseApp/cart.html')

def checkout(request):
    return render(request, 'ShopEaseApp/checkout.html')

def invoices(request):
    return render(request, 'ShopEaseApp/invoices.html')

def loyalty_program(request):
    return render(request, 'ShopEaseApp/loyalty_program.html')

def returns(request):
    return render(request, 'ShopEaseApp/returns.html')

def clients(request):
    clients_list = Client.objects.all()
    context = {
        'clients': clients_list
    }
    return render(request, 'ShopEaseApp/clients.html', context)
