# BeerBrowser

Réalisé dans le cadre de nos études, **BeerBrowser** est une application simple utilisant *[ReactJS](https://reactjs.org)*, *[Webpack](https://webpack.js.org/)*et [PunkAPI](https://punkapi.com/) pour effectuer des recherches sur des bières.

## Installation

Pour utiliser cette application sur votre machine, il faut d'abord installer npm et nodejs. Une fois cela fait, il vous suffit d'exécuter la commande suivante dans le dossier racine du projet :
`npm install`
Enfin pour exécuter l'application :
`npm run start`
Vous pouvez désormais lancer votre navigateur favori et accéder au lien qui vous est donné (par défaut `localhost:2345`)

## Auteurs

Castel Jérémy et Lenhard Erwan
  
======

## Modification

La première itération de notre programme était basé sur du *JavaScript* pur. Pour notre deuxième itération nous avons basé celui-ci sur [ReactJS](https://reactjs.org).

1. **Framework**<br/>
Comme demandé, nous avons utilisé le Framework [ReactJS](https://reactjs.org) pour faire cette 2ᵉ itération du projet. Ce qui nous a permis de ne plus utiliser les template HTML. 

2. **Programmation Orientée Objet** (POO)<br/>
La première modification est une bien meilleure gestion de la POO. En effet, lors de notre première version nous avions un unique fichier qui se charger de tout l'affichage. Alors que maintenant nous avons 4 classes pour cela. Ces 4 classes étendent la classe *Component* de *[ReactJS](https://reactjs.org)*. Nous avons donc **App** qui est le point d'entré de notre application *React* et c'est elle qui se charge des 3 composants, qui sont **Nav**, **List** et **Beer**. C'est l'une des choses, que lors de notre première revue, il nous a été conseiller d'améliorer. De plus séparer le code de la sorte nous permet d'utiliser plusieurs fois un même composant dans des contextes différents. Par exemple, nous utilisons **List** lors d'une recherche, mais aussi dans le composant **Beer** pour afficher les bières similaires.
	- **Nav** : barre de navigation, avec la recherche et le bouton pour avoir une bière aléatoirement.
	- **List** : Liste les bières en fonction de la recherche.
	- **Beer** : Affiche les caractéristiques d'une bière, ainsi que des bières similaires.

3. **Import**<br/>
Lors de notre première revue, il nous a été montré que nous utilisions encore des URL, notamment pour les font, chose que nous avons amélioré en rendant les fonts dépendante du projet.

4. **Route**<br/>
//TODO JEREM

4. **Modèle**<br/>
La classe **Model** a légèrement été modifié pour qu'elle soit plus simple à utiliser

5. **Amélioration**
	- Le fait de se re-servir de la classe **List** dans **Beer** permet de rendre les bières similaire cliquable 
	- Nous avons ajouter une dépendance à *[Toastr](https://github.com/CodeSeven/toastr)*, qui permet de faire des toast très facilement, ce qui rend les interactions avec l'utilisateur bien plus agréable.
