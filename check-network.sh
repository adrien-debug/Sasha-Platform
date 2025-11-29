#!/bin/bash

# Script de vérification de l'accès réseau

echo "🔍 Vérification de l'accès réseau..."
echo ""

# Récupérer l'IP locale
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

if [ -z "$IP" ]; then
    echo "❌ Impossible de trouver l'adresse IP locale"
    exit 1
fi

echo "📍 Configuration:"
echo "   IP locale: $IP"
echo "   Port: 5555"
echo ""

# Vérifier si le serveur tourne
if lsof -i :5555 | grep -q LISTEN; then
    echo "✅ Serveur actif sur le port 5555"
else
    echo "❌ Aucun serveur sur le port 5555"
    echo "   Lancez: npm run dev"
    exit 1
fi

# Vérifier l'écoute sur toutes les interfaces
if netstat -an | grep -q "\.5555.*LISTEN"; then
    echo "✅ Serveur écoute sur toutes les interfaces (0.0.0.0)"
else
    echo "⚠️  Vérifiez la configuration du serveur"
fi

echo ""
echo "🧪 Tests de connectivité:"
echo ""

# Test localhost
if curl -s -o /dev/null -w "%{http_code}" http://localhost:5555 | grep -q "200"; then
    echo "✅ localhost:5555 - OK"
else
    echo "❌ localhost:5555 - Échec"
fi

# Test IP
if curl -s -o /dev/null -w "%{http_code}" http://$IP:5555 | grep -q "200"; then
    echo "✅ $IP:5555 - OK"
else
    echo "❌ $IP:5555 - Échec"
fi

echo ""
echo "📱 Pour accéder depuis d'autres appareils:"
echo "   http://$IP:5555"
echo ""
echo "💡 Vérifications à faire:"
echo "   1. Les appareils sont sur le même réseau Wi-Fi"
echo "   2. Le pare-feu macOS n'est pas activé (ou autorise Node.js)"
echo "   3. Le routeur n'a pas l'isolation des clients activée"
echo ""

