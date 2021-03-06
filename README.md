# generator-troopjs [![Build Status](https://secure.travis-ci.org/garryyao/generator-troopjs.png?branch=develop)](https://travis-ci.org/garryyao/generator-troopjs)

[TroopJS](https://github.com/troopjs/troopjs) application scaffolding generator for [Yeoman](http://yeoman.io).

**Note:** Due to the fact that TroopJS is still under rapid development, this generator is to support only the latest release of each module.

The following which are considered as the minimum amount of modules required for an web application, is required:

 * troopjs-core
 * troopjs-browser
 * troopjs-jquery

While if you're looking for more modules, simply search over bower registration for a list of them and install accordingly.

```
bower search troopjs-
```

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

## Usage

Install `generator-troopjs`:
```
npm install -g generator-troopjs
```

Make a new directory, and `cd` into it:
```
mkdir my-troopjs-app && cd $_
```

Run the scaffold generator with:

```
$ yo troopjs:app
```

Run the troop widget generator using sub generator:

```
$ yo troopjs:widget [widget name]
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
