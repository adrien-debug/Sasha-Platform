# 🌐 Guide d'accès réseau

## ✅ Configuration actuelle

- **IP locale** : `192.168.1.65`
- **Port** : `5555`
- **URL complète** : `http://192.168.1.65:5555`
- **Serveur** : Écoute sur toutes les interfaces (0.0.0.0)

## 🔍 Vérifications à faire

### 1. Vérifier que les appareils sont sur le même réseau
- Tous les appareils doivent être connectés au **même Wi-Fi** ou **même réseau Ethernet**
- Vérifiez l'IP de l'autre appareil : elle doit commencer par `192.168.1.x`

### 2. Tester depuis un autre appareil
Sur l'appareil qui doit se connecter :
```bash
# Sur Windows/Linux
ping 192.168.1.65

# Sur Mac
ping 192.168.1.65
```

Si le ping fonctionne, essayez dans le navigateur :
```
http://192.168.1.65:5555
```

### 3. Vérifier le pare-feu du routeur
Certains routeurs bloquent les communications entre appareils. Vérifiez les paramètres de votre routeur.

### 4. Alternative : Utiliser le nom d'hôte
Essayez aussi avec le nom d'hôte de votre Mac :
```
http://MacBook-Pro-8.local:5555
```

## 🛠️ Solutions de dépannage

### Redémarrer le serveur
```bash
# Arrêter le serveur actuel
pkill -f "next dev"

# Redémarrer
npm run dev
```

### Vérifier que le serveur écoute bien
```bash
lsof -i :5555
# Doit afficher : *:5555 (LISTEN)
```

### Tester depuis la machine locale
```bash
curl http://192.168.1.65:5555
# Doit retourner du HTML
```

## 📱 Accès depuis mobile/tablette

1. Connectez votre appareil au **même Wi-Fi**
2. Ouvrez le navigateur
3. Entrez : `http://192.168.1.65:5555`

## ⚠️ Si ça ne fonctionne toujours pas

1. **Vérifiez l'IP** : Elle peut changer si vous vous reconnectez au Wi-Fi
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. **Vérifiez le routeur** : Certains routeurs ont un mode "isolation des clients" qui empêche la communication entre appareils

3. **Essayez un autre port** : Changez le port dans `package.json` (ex: 3000, 8080)

4. **Vérifiez les paramètres réseau macOS** :
   - Préférences Système > Partage
   - Vérifiez que le partage de fichiers est activé (même si vous ne partagez pas de fichiers)

