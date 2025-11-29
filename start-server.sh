#!/bin/bash

# Script de démarrage du serveur avec accès réseau

echo "🚀 Démarrage du serveur Next.js..."
echo ""

# Récupérer l'IP locale
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

if [ -z "$IP" ]; then
    echo "❌ Impossible de trouver l'adresse IP locale"
    exit 1
fi

echo "📍 Adresse IP locale: $IP"
echo "🌐 Port: 5555"
echo ""
echo "✅ Accès local: http://localhost:5555"
echo "✅ Accès réseau: http://$IP:5555"
echo ""
echo "📱 Pour accéder depuis d'autres appareils:"
echo "   1. Connectez-vous au même réseau Wi-Fi"
echo "   2. Ouvrez: http://$IP:5555"
echo ""
echo "⏳ Démarrage du serveur..."
echo ""

# Démarrer le serveur
npm run dev

